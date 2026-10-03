
export function buildMockRecommendation(request, wardrobeItems) {

  // Define clothing categories
  const topCategories = [
    "shirt",
    "hoodie",
    "top",
    "t-shirt",
    "tshirt",
    "blouse",
    "sweater"
  ];

  const bottomCategories = [
    "pants",
    "jeans",
    "trousers",
    "skirt",
    "shorts"
  ];

  // Find tops from wardrobe
  const tops = wardrobeItems.filter((item) =>
    topCategories.includes(item.category.toLowerCase())
  );

  // Find bottoms from wardrobe
  const bottoms = wardrobeItems.filter((item) =>
    bottomCategories.includes(item.category.toLowerCase())
  );

  // Check whether wardrobe has enough clothing
  if (tops.length === 0 || bottoms.length === 0) {
    throw new Error(
      "Please add at least one top and one bottom to your wardrobe."
    );
  }

  // Prioritize favorite clothing
  const selectedTop =
    tops.find((item) => item.favorite) || tops[0];

  const selectedBottom =
    bottoms.find((item) => item.favorite) || bottoms[0];

  // Return mock recommendation
  return {
    id: Date.now(),

    title: "Your Daily Outfit",

    occasion: request.occasion,

    stylePreferences: request.stylePreferences,

    items: [selectedTop, selectedBottom],

    reason:
      "This is a sample recommendation using items from your wardrobe. " +
      "AI and live weather evaluation have not been connected yet."
  };
}
