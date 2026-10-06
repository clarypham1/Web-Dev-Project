// AI outfit generation with Claude (Anthropic API)
//
// generateOutfits({ items, weather, destination, preferences, avoid, count })
//   -> { source: "ai" | "rules", outfitItems: [{ name, reason, itemIds: [...] }] }
//
// Each "outfitItem" = 2 or 3 wardrobe items combined into one outfit.
// If ANTHROPIC_API_KEY is missing, a simple rule-based picker is used instead,
// so the app still works in development without a key.

import Anthropic from "@anthropic-ai/sdk";

const DEFAULT_MODEL = "claude-haiku-4-5-20251001"; // cheapest + fastest Claude model

// ---------- helpers ----------

// the same combination in any order gets the same key: "a|b|c"
const comboKey = (itemIds) => {
  return [...itemIds].map(String).sort().join("|");
};

// rough clothing type from the category/name text (used by the rule-based picker)
const getSlot = (item) => {
  const text = `${item.category || ""} ${item.name || ""}`.toLowerCase();

  if (/(dress|jumpsuit|overall)/.test(text)) {
    return "full";
  }
  if (/(jacket|coat|blazer|cardigan|parka|vest)/.test(text)) {
    return "outer";
  }
  if (/(pant|jean|trouser|skirt|short|legging)/.test(text)) {
    return "bottom";
  }
  if (/(shoe|sneaker|boot|sandal|heel|loafer)/.test(text)) {
    return "shoes";
  }
  if (/(shirt|tee|top|hoodie|sweater|blouse|knit|polo|jumper)/.test(text)) {
    return "top";
  }
  return "accessory";
};

// random order (Fisher-Yates) so "regenerate" gives new combinations
const shuffle = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
};

// keep only valid outfits:
// - 2 or 3 items, all ids exist in the wardrobe, no item twice
// - not a combination the user already saw (avoid) and no duplicates
const cleanOutfits = (rawOutfits, items, avoid, count) => {
  const validIds = new Set(items.map((item) => String(item.id)));
  const seen = new Set(avoid.map(comboKey));
  const result = [];

  for (const outfit of rawOutfits || []) {
    if (!outfit || !Array.isArray(outfit.itemIds)) {
      continue;
    }

    const ids = [...new Set(outfit.itemIds.map(String))];

    if (ids.length < 2 || ids.length > 3) {
      continue;
    }
    if (!ids.every((id) => validIds.has(id))) {
      continue; // AI invented an id -> skip
    }

    const key = comboKey(ids);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);

    result.push({
      name: String(outfit.name || "Your outfit").slice(0, 60),
      reason: String(outfit.reason || "").slice(0, 300),
      itemIds: ids,
    });

    if (result.length >= count) {
      break;
    }
  }

  return result;
};

// ---------- 1. rule-based picker (no API key) ----------
const ruleBasedOutfits = ({ items, weather, avoid, count }) => {
  // group items by slot
  const bySlot = { top: [], bottom: [], full: [], outer: [], shoes: [], accessory: [] };
  for (const item of items) {
    bySlot[getSlot(item)].push(item);
  }

  // cold or wet weather -> add an outer layer when we have one
  let needsLayer = false;
  if (weather) {
    if (weather.temperature < 12) {
      needsLayer = true;
    }
    if (["rainy", "snowy", "stormy"].includes(weather.condition)) {
      needsLayer = true;
    }
  }

  // build every possible base outfit
  const candidates = [];
  for (const top of bySlot.top) {
    for (const bottom of bySlot.bottom) {
      candidates.push([top, bottom]);
    }
  }
  for (const full of bySlot.full) {
    candidates.push([full]);
  }

  // if the wardrobe has no top+bottom, just pair any two items
  if (candidates.length === 0) {
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        candidates.push([items[i], items[j]]);
      }
    }
  }

  const extras = [...bySlot.outer, ...bySlot.shoes, ...bySlot.accessory];

  const raw = shuffle(candidates).map((base) => {
    const picked = [...base];

    // add a 3rd piece: outer layer if needed, otherwise a random extra
    if (picked.length < 3) {
      let extra = null;
      if (needsLayer && bySlot.outer.length > 0) {
        extra = shuffle(bySlot.outer)[0];
      } else if (extras.length > 0 && Math.random() < 0.6) {
        extra = shuffle(extras)[0];
      }
      if (extra) {
        picked.push(extra);
      }
    }

    // a single dress with nothing to add is not 2 items -> add any other item
    if (picked.length < 2) {
      const other = items.find((item) => item.id !== picked[0].id);
      if (other) {
        picked.push(other);
      }
    }

    let reason = `A simple ${picked.map((item) => item.name).join(" + ")} combo.`;
    if (weather) {
      reason = `${reason} Picked for ${weather.temperature}°C and ${weather.condition} weather.`;
    }

    return {
      name: `${picked[0].name} look`,
      reason: reason,
      itemIds: picked.map((item) => item.id),
    };
  });

  return cleanOutfits(raw, items, avoid, count);
};

// ---------- 2. Claude ----------

// The tool forces Claude to answer in this exact JSON shape
const OUTFIT_TOOL = {
  name: "suggest_outfits",
  description: "Return outfit suggestions built only from the user's wardrobe items.",
  input_schema: {
    type: "object",
    properties: {
      outfits: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string", description: "Short catchy outfit name, max 5 words" },
            itemIds: {
              type: "array",
              items: { type: "string" },
              minItems: 2,
              maxItems: 3,
              description: "2 or 3 ids copied exactly from the wardrobe list",
            },
            reason: {
              type: "string",
              description: "One or two friendly sentences: why this works for the weather, place and style",
            },
          },
          required: ["name", "itemIds", "reason"],
        },
      },
    },
    required: ["outfits"],
  },
};

const claudeOutfits = async ({ items, weather, destination, preferences, learnedPreferences, avoid, count }) => {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // only send what the AI needs (no images -> fewer tokens)
  const wardrobe = items.map((item) => ({
    id: String(item.id),
    name: item.name,
    category: item.category,
    color: item.color,
    style: item.style,
    season: item.season,
    details: item.details,
    favorite: item.favorite,
  }));

  let weatherText = "unknown";
  if (weather) {
    weatherText = `${weather.temperature}°C, ${weather.condition} (${weather.weatherLabel || ""}) in ${weather.city || "the user's city"}`;
  }

  // ask for a few extra, because invalid / repeated ones get filtered out
  const askFor = count + 2;

  // tell the AI which combos the user already saw (for "regenerate")
  let avoidText = "";
  if (avoid.length > 0) {
    avoidText = `- Do NOT repeat these combinations the user already saw: ${JSON.stringify(avoid)}`;
  }

  let learnedPreferencesText = "";

  if (learnedPreferences) {
    learnedPreferencesText = [
      "Learned user preferences:",
      `- Preferred styles: ${learnedPreferences.preferredStyles.join(", ") || "none yet"}`,
      `- Preferred colours: ${learnedPreferences.preferredColours.join(", ") || "none yet"}`,
      `- Preferred categories: ${learnedPreferences.preferredCategories.join(", ") || "none yet"}`,
      `- Favourite items: ${learnedPreferences.favouriteItems.join(", ") || "none yet"}`,
    ].join("\n");
  }

  const prompt = [
    `Create ${askFor} different outfits for today.`,
    "",
    `Weather: ${weatherText}`,
    `Going to: ${destination}`,
    `Style wishes: ${preferences || "none, surprise me"}`, 
    learnedPreferencesText,
    "",
    "Rules:",
    "- Each outfit uses 2 or 3 items from the wardrobe below, using their exact ids.",
    "- A normal outfit is a top + bottom (or one dress), plus optionally an outer layer, shoes or accessory.",
    "- Dress for the weather: layers when cold, no shorts in snow, etc.",
    "- Fit the destination (gym = sporty, work = smart ...) and the style wishes.",
    "- Every outfit must be a different combination.",
    avoidText,
    "",
    `Wardrobe: ${JSON.stringify(wardrobe)}`,
  ].join("\n");

  const response = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL || DEFAULT_MODEL,
    max_tokens: 2000,
    system: "You are Closis, a friendly personal stylist. You only use clothes the user owns.",
    tools: [OUTFIT_TOOL],
    tool_choice: { type: "tool", name: "suggest_outfits" }, // always answer with the tool
    messages: [{ role: "user", content: prompt }],
  });

  // find the tool answer in the response
  const toolBlock = response.content.find((block) => block.type === "tool_use");
  if (!toolBlock) {
    throw new Error("AI did not return outfits");
  }

  return cleanOutfits(toolBlock.input.outfits, items, avoid, count);
};

// ---------- 3. main function used by the controller ----------
const generateOutfits = async ({ items, weather, destination, preferences, learnedPreferences, avoid = [], count = 5 }) => {
  // no key -> rule-based
  if (!process.env.ANTHROPIC_API_KEY) {
    return { source: "rules", outfitItems: ruleBasedOutfits({ items, weather, avoid, count }) };
  }

  try {
    const outfitItems = await claudeOutfits({ items, weather, destination, preferences, learnedPreferences, avoid, count });

    // AI gave nothing usable -> fall back so the user still gets something
    if (outfitItems.length === 0) {
      return { source: "rules", outfitItems: ruleBasedOutfits({ items, weather, avoid, count }) };
    }

    // AI gave fewer than asked (some were invalid) -> top up with rule-based ones
    if (outfitItems.length < count) {
      const alreadyUsed = [...avoid, ...outfitItems.map((outfit) => outfit.itemIds)];
      const extra = ruleBasedOutfits({ items, weather, avoid: alreadyUsed, count: count - outfitItems.length });
      return { source: "ai", outfitItems: [...outfitItems, ...extra] };
    }

    return { source: "ai", outfitItems: outfitItems };
  } catch (error) {
    console.error("Claude request failed, using rules instead:", error.message);
    return { source: "rules", outfitItems: ruleBasedOutfits({ items, weather, avoid, count }) };
  }
};

export { generateOutfits, comboKey, getSlot, cleanOutfits };
