import React, { useState } from "react";
import "./Wardrobe.css";


function Wardrobe() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([
    "Hoodie",
    "Pants",
    "Jacket",
    "Shirt",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);


// create cards, examples
  const items = [
    { id: 1, name: "White Shirt", category: "Shirt", icon: "👕" },
    { id: 2, name: "Blue Hoodie", category: "Hoodie", icon: "🧥" },
    { id: 3, name: "Black Pants", category: "Pants", icon: "👖" },
    { id: 4, name: "Light Jacket", category: "Jacket", icon: "🧥" },
    { id: 5, name: "Basic Tee", category: "Shirt", icon: "👕" },
    { id: 6, name: "Grey Hoodie", category: "Hoodie", icon: "🧥" },
    { id: 7, name: "Wide Pants", category: "Pants", icon: "👖" },
    { id: 8, name: "Cream Shirt", category: "Shirt", icon: "👕" },
    { id: 9, name: "Casual Jacket", category: "Jacket", icon: "🧥" },
  ];

// ask  for new category
  function addCategory() {
    const newCategory = window.prompt("Enter a new category:");

    if (
      newCategory && !categories.some(
        (category) =>
          category.toLowerCase() === newCategory.trim().toLowerCase()
      )
    ) // add new category if it doesn't exist
    {
      setCategories([...categories, newCategory.trim()]);
    }
  }
  {/* filter items based on search and category */}
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

  {/* check if selected category is "All" or matches the item's category */}
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="wardrobe-page">
      <section className="wardrobe-container">
        <p className="wardrobe-small-title">TIME TO LOOK THROUGH YOUR CLOSET.</p>

        <div className="wardrobe-controls">
          <input
          // search bar for wardrobe items
            className="wardrobe-search"
            type="text"
            placeholder="🔍 Search for items..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {/* category buttons*/}
          <div className="category-row">
            <button
              className={
                selectedCategory === "All"
                  ? "category-button selected-category"
                  : "category-button"
              }
              onClick={() => setSelectedCategory("All")}
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "category-button selected-category"
                    : "category-button"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}

            <button className="add-category-button" onClick={addCategory}>
              +
            </button>
          </div>
        </div>

          {/* display filtered items in a grid */ }
        <div className="wardrobe-grid">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              className={
                selectedItem === item.id
                  ? "wardrobe-card selected-card"
                  : "wardrobe-card"
              }
              onClick={() => setSelectedItem(item.id)}
            >
              <div className="clothing-image">{item.icon}</div>
              <p>{item.name}</p>
              <span>{item.category}</span>
            </button>
          ))}
        </div>
        
          {/* show message if no items match the search and category */ }
        {filteredItems.length === 0 && (
          <p className="no-items">No matching wardrobe items.</p>
        )}
      </section>
    </main>
  );
}

export default Wardrobe;
