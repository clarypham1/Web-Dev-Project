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

  // items must be state because we add/delete items
  const [items, setItems] = useState([
    { id: 1, name: "White Shirt", category: "Shirt", icon: "👕" },
    { id: 2, name: "Blue Hoodie", category: "Hoodie", icon: "🧥" },
    { id: 3, name: "Black Pants", category: "Pants", icon: "👖" },
    { id: 4, name: "Light Jacket", category: "Jacket", icon: "🧥" },
    { id: 5, name: "Basic Tee", category: "Shirt", icon: "👕" },
    { id: 6, name: "Grey Hoodie", category: "Hoodie", icon: "🧥" },
    { id: 7, name: "Wide Pants", category: "Pants", icon: "👖" },
    { id: 8, name: "Cream Shirt", category: "Shirt", icon: "👕" },
    { id: 9, name: "Casual Jacket", category: "Jacket", icon: "🧥" },
  ]);

  // upload form states
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [clothingName, setClothingName] = useState("");
  const [clothingCategory, setClothingCategory] = useState("Hoodie");
  const [clothingColor, setClothingColor] = useState("");
  const [clothingBrand, setClothingBrand] = useState("");
  const [clothingDetails, setClothingDetails] = useState("");

  function addCategory() {
    const newCategory = window.prompt("Enter a new category:");

    if (
      newCategory &&
      !categories.some(
        (category) =>
          category.toLowerCase() === newCategory.trim().toLowerCase()
      )
    ) {
      const cleanCategory = newCategory.trim();
      setCategories([...categories, cleanCategory]);
      setClothingCategory(cleanCategory);
    }
  }

  function handleImageUpload(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setUploadedImage(reader.result);
    };

    reader.readAsDataURL(file);
  }

  function resetUploadForm() {
    setUploadedImage("");
    setClothingName("");
    setClothingCategory(categories[0] || "");
    setClothingColor("");
    setClothingBrand("");
    setClothingDetails("");
  }

  function cancelUpload() {
    setShowUploadForm(false);
    resetUploadForm();
  }

  function confirmUpload() {
    if (clothingName.trim() === "" || clothingCategory === "") {
      alert("Please enter a clothing name and choose a category.");
      return;
    }

    const newItem = {
      id: Date.now(),
      name: clothingName.trim(),
      category: clothingCategory,
      color: clothingColor.trim(),
      brand: clothingBrand.trim(),
      details: clothingDetails.trim(),
      image: uploadedImage,
      icon: "👕",
    };

    setItems([...items, newItem]);
    setShowUploadForm(false);
    resetUploadForm();
  }

  function deleteItem() {
    if (!selectedItem) {
      return;
    }

    setItems(items.filter((item) => item.id !== selectedItem.id));
    setSelectedItem(null);
  }

  // filter items based on search and category
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="wardrobe-page">
      <section className="wardrobe-container">
        <p className="wardrobe-small-title">
          TIME TO LOOK THROUGH YOUR CLOSET.
        </p>

        <div className="wardrobe-controls">
          <input
            className="wardrobe-search"
            type="text"
            placeholder="🔍 Search for items..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

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

            <button
              className="add-item-button"
              onClick={() => setShowUploadForm(true)}
            >
              Add clothing
            </button>
          </div>
        </div>

        <div className="wardrobe-grid">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              className={
                selectedItem?.id === item.id
                  ? "wardrobe-card selected-card"
                  : "wardrobe-card"
              }
              onClick={() => setSelectedItem(item)}
            >
              {item.image ? (
                <img
                  className="clothing-image"
                  src={item.image}
                  alt={item.name}
                />
              ) : (
                <div className="clothing-placeholder">{item.icon}</div>
              )}

              <div className="clothing-information">
                <h3>{item.name}</h3>
                <span>{item.category}</span>
              </div>
            </button>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="no-items">No matching wardrobe items.</p>
        )}

        {showUploadForm && (
          <div className="upload-overlay">
            <div className="upload-box">
              <div className="upload-box-header">
                <h2>Upload Clothing</h2>

                <button
                  className="close-upload-button"
                  onClick={cancelUpload}
                >
                  ×
                </button>
              </div>

              <div className="upload-form-section">
                <h3>Clothing image</h3>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                />

                {uploadedImage && (
                  <div className="upload-image-preview">
                    <img src={uploadedImage} alt="Clothing preview" />
                  </div>
                )}
              </div>

              <div className="form-field">
                <p>Clothing name *</p>
                <input
                  type="text"
                  placeholder="Example: White summer shirt"
                  value={clothingName}
                  onChange={(event) => setClothingName(event.target.value)}
                />
              </div>

              <div className="form-field">
                <p>Category *</p>
                <select
                  value={clothingCategory}
                  onChange={(event) => setClothingCategory(event.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <p>Color</p>
                <input
                  type="text"
                  placeholder="Example: Black"
                  value={clothingColor}
                  onChange={(event) => setClothingColor(event.target.value)}
                />
              </div>

              <div className="form-field">
                <p>Brand</p>
                <input
                  type="text"
                  placeholder="Example: Nike"
                  value={clothingBrand}
                  onChange={(event) => setClothingBrand(event.target.value)}
                />
              </div>

              <div className="form-field">
                <p>Other details</p>
                <textarea
                  placeholder="Example: Oversized, cotton, long sleeve..."
                  value={clothingDetails}
                  onChange={(event) => setClothingDetails(event.target.value)}
                />
              </div>

              <div className="upload-form-buttons">
                <button
                  className="cancel-upload-button"
                  onClick={cancelUpload}
                >
                  Cancel
                </button>

                <button
                  className="confirm-upload-button"
                  onClick={confirmUpload}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedItem && (
          <div className="item-overlay">
            <div className="item-information-box">
              <button
                className="close-button"
                onClick={() => setSelectedItem(null)}
              >
                ×
              </button>

              <div className="item-information-image">
                {selectedItem.image ? (
                  <img src={selectedItem.image} alt={selectedItem.name} />
                ) : (
                  <span>{selectedItem.icon}</span>
                )}
              </div>

              <div className="item-details">
                <h2>{selectedItem.name}</h2>
                <p><strong>Category:</strong> {selectedItem.category}</p>
                <p><strong>Color:</strong> {selectedItem.color || "Not specified"}</p>
                <p><strong>Brand:</strong> {selectedItem.brand || "Not specified"}</p>
                <p><strong>Details:</strong> {selectedItem.details || "Not specified"}</p>
              </div>

              <button className="delete-item-button" onClick={deleteItem}>
                Delete item
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Wardrobe;
