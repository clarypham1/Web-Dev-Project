import Outfit from "../models/outfitModel.js";

// All routes here use requireAuth, so req.user is always the logged-in user.

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

    const outfit = await Outfit.create({
      user: req.user._id, // owner always comes from the token, never from the body
      name,
      image,
      weather,
      destination,
      style,
      items,
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
    // filter by id AND user, so you can't touch someone else's outfit
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

export { getHistory, createOutfit, useOutfit, deleteOutfit };
