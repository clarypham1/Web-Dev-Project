const calculateUserPreferences = (items, outfits) => {
  const styleCounts = {};
  const colourCounts = {};
  const categoryCounts = {};
  const itemCounts = {};

  // Look at how often each wardrobe item has actually been worn
  for (const item of items) {
    const timesUsed = item.times_used || 0;

    if (timesUsed > 0) {
      const style = item.style;
      const colour = item.colour;
      const category = item.type;

      if (style) {
        styleCounts[style] = (styleCounts[style] || 0) + timesUsed;
      }

      if (colour) {
        colourCounts[colour] = (colourCounts[colour] || 0) + timesUsed;
      }

      if (category) {
        categoryCounts[category] =
          (categoryCounts[category] || 0) + timesUsed;
      }

      itemCounts[item.name] = timesUsed;
    }
  }

  const sortByCount = (counts) => {
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name);
  };

  return {
    preferredStyles: sortByCount(styleCounts).slice(0, 3),
    preferredColours: sortByCount(colourCounts).slice(0, 5),
    preferredCategories: sortByCount(categoryCounts).slice(0, 5),
    favouriteItems: sortByCount(itemCounts).slice(0, 5),
  };
};

export { calculateUserPreferences };