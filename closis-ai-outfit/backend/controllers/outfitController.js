import Outfit from "../models/outfitModel.js";
import Item from "../models/itemModel.js";
import { generateOutfits } from "../services/aiOutfitService.js";

// All routes here use requireAuth, so req.user is always the logged-in user.
const normalizeItem = (item) => {
  let id = item.id;
  if (id === undefined || id === null) {
    id = item._id;
  }
  let category = item.category;
  if (!category) {
    category = item.type;
  }
  let color = item.color;
  if (!color) {
    color = item.colour;
  }

  return {
    id: String(id),
    name: item.name || "Item",
    category: category || "",
    color: color || "",
    style: item.style || "",
    season: item.season || "",
    details: item.details || "",
    favorite: Boolean(item.favorite),
    image: item.image || "",
    icon: item.icon || "",
  };
};

const toAvoidList = (previousOutfits) => {
  const avoid = [];
  if (!Array.isArray(previousOutfits)) {
    return avoid;
  }
  for (const outfit of previousOutfits) {
    if (Array.isArray(outfit)) {
      avoid.push(outfit.map(String));
    } else if (outfit && Array.isArray(outfit.itemIds)) {
      avoid.push(outfit.itemIds.map(String));
    }
  }
  return avoid;
};

// POST /api/outfits/generate
// body: { destination, preferences, weather?, items?, previousOutfits?, count? }
// - weather: the weather object from the weather API, e.g. { temperature: 7, condition: "rainy", city: "Helsinki" }
// - items: the wardrobe from the FE; if empty we use the user's items in MongoDB
// - previousOutfits: combos already shown -> "regenerate" gives new ones
const generateOutfitsForUser = async (req, res) => {
  const { destination, preferences, weather, items, previousOutfits, count } = req.body;

  try {
    if (!destination || !String(destination).trim()) {
      return res.status(400).json({ error: "Please choose where you are heading" });
    }

    let todayWeather = null;
    if (weather && weather.condition && weather.temperature !== undefined) {
      todayWeather = weather;
    }
    let wardrobe = [];
    if (Array.isArray(items) && items.length > 0) {
      wardrobe = items.map(normalizeItem);
    } else {
      const dbItems = await Item.find({ user: req.user._id });
      wardrobe = dbItems.map((item) => normalizeItem(item.toObject()));
    }

    if (wardrobe.length < 2) {
      return res.status(400).json({ error: "Add at least 2 items to your wardrobe first" });
    }
    let howMany = 5;
    if (Number.isInteger(count) && count > 0) {
      howMany = Math.min(count, 8);
    }
    const result = await generateOutfits({
      items: wardrobe,
      weather: todayWeather,
      destination: String(destination).trim(),
      preferences: String(preferences || "").trim(),
      avoid: toAvoidList(previousOutfits),
      count: howMany,
    });

    if (result.outfitItems.length === 0) {
      return res.status(422).json({
        error: "No new combinations left. Add more clothes to your wardrobe!",
      });
    }
    const itemsById = {};
    for (const item of wardrobe) {
      itemsById[item.id] = item;
    }

    const outfitItems = result.outfitItems.map((outfit, index) => {
      return {
        id: `${Date.now()}-${index}`,
        name: outfit.name,
        reason: outfit.reason,
        itemIds: outfit.itemIds,
        items: outfit.itemIds.map((id) => itemsById[id]),
      };
    });

    res.status(200).json({
      source: result.source, 
      weather: todayWeather,
      destination: String(destination).trim(),
      preferences: String(preferences || "").trim(),
      outfitItems: outfitItems,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/outfits/history
const getHistory = async (req, res) => {
  try {
    const outfits = await Outfit.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(outfits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/outfits   body: { name, image, weather, destination, style, items }
const createOutfit = async (req, res) => {
  const { name, image, weather, destination, style, items } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: "Outfit name is required" });
    }

    // keep only the item fields we store
    let savedItems = [];
    if (Array.isArray(items)) {
      savedItems = items.map((item) => {
        const clean = normalizeItem(item);
        return {
          itemId: clean.id,
          name: clean.name,
          category: clean.category,
          color: clean.color,
          image: clean.image,
        };
      });
    }

    const outfit = await Outfit.create({
      user: req.user._id, // owner always comes from the token, never from the body
      name,
      image,
      weather,
      destination,
      style,
      items: savedItems,
    });

    res.status(201).json(outfit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PATCH /api/outfits/:outfitId/use
// "I wore this" -> usageCount + 1 
const useOutfit = async (req, res) => {
  try {
    const outfit = await Outfit.findOneAndUpdate(
      { _id: req.params.outfitId, user: req.user._id },
      { $inc: { usageCount: 1 } },
      { returnDocument: "after" } // return the updated outfit
    );

    if (!outfit) {
      return res.status(404).json({ error: "Outfit not found" });
    }

    res.status(200).json(outfit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /api/outfits/:outfitId
const deleteOutfit = async (req, res) => {
  try {
    const outfit = await Outfit.findOneAndDelete({
      _id: req.params.outfitId,
      user: req.user._id,
    });

    if (!outfit) {
      return res.status(404).json({ error: "Outfit not found" });
    }

    res.status(200).json({ message: "Outfit deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { generateOutfitsForUser, getHistory, createOutfit, useOutfit, deleteOutfit };
