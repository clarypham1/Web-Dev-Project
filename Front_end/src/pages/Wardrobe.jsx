import React, { useState, useEffect, useRef } from "react";
import "./Animations.css";
import useScrollReveal from "../hooks/useScrollReveal";
import "./Wardrobe.css";

const defaultItems = [
  { id: 1, name: "White Shirt", category: "Shirt", icon: "👕" },
  { id: 2, name: "Blue Hoodie", category: "Hoodie", icon: "🧥" },
  { id: 3, name: "Black Pants", category: "Pants", icon: "👖" },
];

function Wardrobe() {
  useScrollReveal();
  const [search, setSearch] = useState("");

// categories must be state because we add categories
const [categories, setCategories] = useState(() => {
  try {
    const savedCategories = localStorage.getItem("wardrobeCategories");

    return savedCategories
      ? JSON.parse(savedCategories)
      : ["Hoodie", "Pants", "Jacket", "Shirt"];
  } catch {
    return ["Hoodie", "Pants", "Jacket", "Shirt"];
  }
});

  useEffect(() => {
  localStorage.setItem(
    "wardrobeCategories",
    JSON.stringify(categories)
  );
}, [categories]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  // items must be state because we add/delete items
  const [items, setItems] = useState(() => {
  try {
    const savedItems = localStorage.getItem("wardrobeItems");

    return savedItems ? JSON.parse(savedItems) : defaultItems;
  } catch {
    return defaultItems;
  }
});

  useEffect(() => {
  localStorage.setItem("wardrobeItems", JSON.stringify(items));
}, [items]);


  // upload form states
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categoryDraft, setCategoryDraft] = useState("");
  const [categoryFormError, setCategoryFormError] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const imageInputRef = useRef(null);
  const [clothingName, setClothingName] = useState("");
  const [clothingCategory, setClothingCategory] = useState(categories[0] || "");
  const [clothingDetails, setClothingDetails] = useState("");
  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  function openCategoryForm() {
    setCategoryDraft("");
    setCategoryFormError("");
    setShowCategoryForm(true);
  }

  function cancelCategoryForm() {
    setShowCategoryForm(false);
    setCategoryDraft("");
    setCategoryFormError("");
  }

  function addCategory(event) {
    event.preventDefault();
    const cleanCategory = categoryDraft.trim();

    if (!cleanCategory) {
      setCategoryFormError("Please fill this blank");
      return;
    }

    if (
      categories.some(
        (category) => category.toLowerCase() === cleanCategory.toLowerCase()
      )
    ) {
      setCategoryFormError("This category already exists");
      return;
    }

    setCategories((previousCategories) => [...previousCategories, cleanCategory]);
    setClothingCategory(cleanCategory);
    setCategoryError("");
    cancelCategoryForm();
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
    setClothingDetails("");
    setNameError("");
    setCategoryError("");
    if (imageInputRef.current) imageInputRef.current.value = "";
  }

  function cancelUpload() {
    setShowUploadForm(false);
    resetUploadForm();
  }

  function confirmUpload() {
    const missingName = clothingName.trim() === "";
    const missingCategory = clothingCategory === "";

    setNameError(missingName ? "Please fill this blank" : "");
    setCategoryError(missingCategory ? "Please fill this blank" : "");

    if (missingName || missingCategory) return;

    const newItem = {
      id: Date.now(),
      name: clothingName.trim(),
      category: clothingCategory,
      details: clothingDetails.trim(),
      image: uploadedImage,
      icon: "👕",
    };

    setItems([...items, newItem]);
    setShowUploadForm(false);
    resetUploadForm();
  }
  // delete function
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
    selectedCategory === "All" ||
    (selectedCategory === "Favorite" && item.favorite) ||
    item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Favorite function
  function toggleFavorite(id) {
  setItems((prevItems) =>
    prevItems.map((item) =>
      item.id === id
        ? { ...item, favorite: !item.favorite }
        : item
    )
  );
}

  return (
    <main className="wardrobe-page page-center">
      <section className="wardrobe-container">
        <p className="wardrobe-small-title">
          TIME TO LOOK THROUGH YOUR CLOSET.
        </p>

        <div className="wardrobe-controls scroll-reveal">
          <input
            className="wardrobe-search"
            type="text"
            placeholder="Search for items..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="category-row">
            {/* ALL BUTTON */}
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

            {/* FAVORITES BUTTON */}
          <button
          className={
            selectedCategory === "Favorite"
            ? "category-button selected-category"
            : "category-button"
              }
            onClick={() => setSelectedCategory("Favorite")}
            >
            Favorite
          </button>

              {/* ADD CLOTHING */}
            <button
              className="add-item-button"
              onClick={() => setShowUploadForm(true)}
            >
              + Add Clothing
            </button>

            {/* ADD CATEGORY */}
            <button className="add-category-button" onClick={openCategoryForm}>
              + Add Category
            </button>

            {/* REMAINING CATEGORIES */}
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
          </div>
        </div>

        <div className="wardrobe-grid scroll-reveal">
  {filteredItems.map((item) => (
    <div className="wardrobe-card-wrap" key={item.id}>

      <button
        className="wardrobe-card"
        onClick={() => setSelectedItem(item)}
      >
        {item.image ? (
          <img
            className="clothing-image"
            src={item.image}
            alt={item.name}
          />
        ) : (
          <div className="clothing-placeholder">
            {item.icon}
          </div>
        )}

        <div className="clothing-information">
          <h3>{item.name}</h3>
          <span>{item.category}</span>
        </div>
      </button>


       
      <button
        type="button"
        className="favorite-button"
        onClick={() => toggleFavorite(item.id)}
        aria-label={
          item.favorite
            ? `Remove ${item.name} from favorites`
            : `Add ${item.name} to favorites`
        }
        aria-pressed={Boolean(item.favorite)}
      >
        {item.favorite ? "❤️" : "🤍"}
      </button>

    </div>
  ))}
</div>

        {filteredItems.length === 0 && (
          <p className="no-items">No matching wardrobe items.</p>
        )}

        {showUploadForm && (
          <div className="upload-overlay modal-overlay-center">
            <div className="upload-box modal-content-center">
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
                <div className="upload-image-heading">
                  <h3>Clothing image</h3>
                  <button
                    className="add-image-button"
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    Add image
                  </button>
                </div>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="visually-hidden-file"
                  tabIndex={-1}
                  aria-hidden="true"
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
                  aria-invalid={Boolean(nameError)}
                  aria-describedby={nameError ? "clothing-name-error" : undefined}
                  onChange={(event) => {
                    setClothingName(event.target.value);
                    if (event.target.value.trim()) setNameError("");
                  }}
                />
                {nameError && <p className="field-error" id="clothing-name-error" role="alert">{nameError}</p>}
              </div>

              <div className="form-field">
                <p>Category *</p>
                <select
                  value={clothingCategory}
                  aria-invalid={Boolean(categoryError)}
                  aria-describedby={categoryError ? "clothing-category-error" : undefined}
                  onChange={(event) => {
                    setClothingCategory(event.target.value);
                    if (event.target.value) setCategoryError("");
                  }}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {categoryError && <p className="field-error" id="clothing-category-error" role="alert">{categoryError}</p>}
              </div>

              <div className="form-field">
                <p>Other details (optional)</p>
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

        {showCategoryForm && (
          <div className="upload-overlay modal-overlay-center">
            <form className="upload-box modal-content-center" onSubmit={addCategory}>
              <div className="upload-box-header">
                <h2>Add Category</h2>
                <button
                  className="close-upload-button"
                  type="button"
                  onClick={cancelCategoryForm}
                  aria-label="Close add category dialog"
                >
                  ×
                </button>
              </div>

              <div className="form-field">
                <p id="category-question">What category do you want to add?</p>
                <input
                  autoFocus
                  type="text"
                  value={categoryDraft}
                  aria-labelledby="category-question"
                  aria-invalid={Boolean(categoryFormError)}
                  aria-describedby={categoryFormError ? "category-form-error" : undefined}
                  onChange={(event) => {
                    setCategoryDraft(event.target.value);
                    setCategoryFormError("");
                  }}
                />
                {categoryFormError && (
                  <p className="field-error" id="category-form-error" role="alert">
                    {categoryFormError}
                  </p>
                )}
              </div>

              <div className="upload-form-buttons">
                <button
                  className="cancel-upload-button"
                  type="button"
                  onClick={cancelCategoryForm}
                >
                  Cancel
                </button>
                <button className="confirm-upload-button" type="submit">
                  OK
                </button>
              </div>
            </form>
          </div>
        )}

        {selectedItem && (
          <div className="item-overlay modal-overlay-enter">
            <div className="item-information-box modal-content-enter">
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
