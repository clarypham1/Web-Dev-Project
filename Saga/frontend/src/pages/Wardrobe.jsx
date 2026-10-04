import React, { useState, useEffect } from "react";
import "./Wardrobe.css";

const API_URL = "http://localhost:4000" //BE url

//this is for the filter buttons:
const BEtypes = [
  "t-shirt",   //user will still be able to make their own
  "shirt",
  "hoodie",
  "jeans",
  "shorts",
  "dress",
  "jacket",
  "shoes",
  "accessory",
  "other"
];
/*
const defaultItems = [
  { id: 1, name: "White Shirt", category: "Shirt", icon: "👕" },
  { id: 2, name: "Blue Hoodie", category: "Hoodie", icon: "🧥" },
  { id: 3, name: "Black Pants", category: "Pants", icon: "👖" },
];
*/
function Wardrobe() {
  const [search, setSearch] = useState("");

  // categories must be state because we add categories
  const [categories, setCategories] = useState(() => {
    try {
      const savedCategories = localStorage.getItem("wardrobeCategories");
      const categoryVersion = localStorage.getItem("wardrobeCategoryVersion");

      //this is so, after I personally mess around all will still be pretty

      /*
      if (categoryVersion !== "2") {
        const newCategories = [
          {
            name: "Hoodie",
            types: ["hoodie"]
          },
          {
            name: "Pants",
            types: ["jeans"]
          }
        ];
        localStorage.setItem(
          "wardrobeCategories",
          JSON.stringify(newCategories)
        );

        localStorage.setItem("wardrobeCategoryVersion", "2");
        return newCategories;
      }*/

      if (savedCategories) {
        const parsedCategories = JSON.parse(savedCategories);

        return parsedCategories.map((category) => {
          if (typeof category === "string") {
            return {
              name: category,
              types: [category.toLowerCase()],
              custom: false
            };
          }
          return category;
        })
      }
      return [   //these are what shows on the buttons after favourites
        {
          name: "Hoodie",
          types: ["hoodie"],
          custom: false
        },
        {
          name: "Pants",
          types: ["jeans"],
          custom: false
        },
      ];
    } catch {
      return [
        {
          name: "Hoodie",
          types: ["hoodie"],
          custom: false
        },
        {
          name: "Pants",
          types: ["jeans"],
          custom: false
        },
        {
          name: "Jacket",
          types: ["jacket"],
          custom: false
        },
        {
          name: "Shirt",
          types: ["shirt"],
          custom: false
        }
      ];
    }
  });


  /*
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
  */
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  //for the menu buttons/choosing new categories buttons
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryTypes, setNewCategoryTypes] = useState([]);
  // items must be state because we add/delete items
  //BE: items start empty bc they come from mongo now
  const [items, setItems] = useState([]);
  /* => {
  try {
    const savedItems = localStorage.getItem("wardrobeItems");

    return savedItems ? JSON.parse(savedItems) : defaultItems;
  } catch {
    return defaultItems;
  }
});*/
  //BE: loading for BE items
  const [isLoadingItems, setIsLoadingItems] = useState(true);




  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch(`${API_URL}/items`)

        if (!res.ok) {
          throw new Error("Could not get items :(");
        }

        const data = await res.json();

        const frontendItems = data.map((item) => ({
          ...item,
          id: item._id,
          category: item.type, //backend is marked as type
          color: item.colour, //backend is marked as colour
          icon: "👕",
        }));
        setItems(frontendItems);

      } catch (error) {
        console.error("Failed to get items:", error);
      } finally {
        setIsLoadingItems(false)
      }
    };
    getItems();
  }, []);
  /*localStorage.setItem("wardrobeItems", JSON.stringify(items));
}, [items]);*/


  // upload form states
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [clothingName, setClothingName] = useState("");
  const [clothingCategory, setClothingCategory] = useState("Hoodie");
  const [clothingColor, setClothingColor] = useState("");
  const [clothingBrand, setClothingBrand] = useState("");
  const [clothingDetails, setClothingDetails] = useState("");
  //I used these in BE so added here:
  const [clothingStyle, setClothingStyle] = useState("");
  const [clothingSize, setClothingSize] = useState("");
  const [comfyLevel, setComfyLevel] = useState("");
  const [clothingSeason, setClothingSeason] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  function addCategoryBE(type) {

    if (
      !categories.some(
        (category) =>
          category.name === type
      )) {
      setCategories([...categories, {
        name: type,
        types: [type],
        custom: false
      }
      ]);
    }
    setShowCategoryOptions(false);
  }

  //to toggle which types show
  function changeCategoryType(type) {
    setNewCategoryTypes((previousTypes) => {
      if (previousTypes.includes(type)) {
        return previousTypes.filter((item) => item !== type);
      }
      return [...previousTypes, type];
    });
  }

  //add your own CATEGORY (not type like in backend)
  function createCustomCategory() {

    const cleanName = newCategoryName.trim();
    if (cleanName === "") {
      alert("Please enter a name!");
      return;
    }
    if (newCategoryTypes.length === 0) {
      alert("Please choose a type!");
      return;
    }
    if (
      categories.some(
        (category) =>
          category.name.toLowerCase() === cleanName.toLowerCase()
      )
    ) {
      alert("This category already exists");
      return;
    }
    setCategories([
      ...categories,
      {
        name: cleanName,
        types: newCategoryTypes,
        custom: true
      }
    ]);

    setNewCategoryName("");
    setNewCategoryTypes([]);
    setShowCreateCategory(false);
    setShowCategoryOptions(false);
  }



  async function handleImageUpload(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setUploadedImage(reader.result);
    };

    reader.readAsDataURL(file);

    //multer gets image as file so wee need to switch it
    const formData = new FormData();
    formData.append("image", file);

    setIsUploading(true);

    try {
      const res = await fetch(`${API_URL}/items/image`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Image upload failed");
      }
      console.log("In handleImageUpload: image upload res:", data);

      setClothingName(data.name);  //these are the claude suugestions
      setClothingCategory(data.type);
      setClothingColor(data.colour);
      setClothingStyle(data.style);
      setClothingSeason(data.season);

      setUploadedImage( //the image with no bg
        data.backgroundRemovedImageUrl || data.imageUrl
      );
    } catch (error) {
      console.error("Image upload error:", error)
      alert("Could not upload image!") //for user a popup
    } finally { setIsUploading(false); }
  }

  function resetUploadForm() {
    setUploadedImage("");
    setClothingName("");
    setClothingCategory(categories[0]?.types[0] || "");
    setClothingColor("");
    setClothingBrand("");
    setClothingDetails("");

    //BE: added because used in be
    setClothingStyle("");
    setClothingSize(""); //this one user adds btw
    setComfyLevel(""); //this too
    setClothingSeason("");
  }

  function cancelUpload() {
    setShowUploadForm(false);
    resetUploadForm();
  }


  async function confirmUpload() {
    if (clothingName.trim() === "" || clothingCategory === "") {
      alert("Please enter a clothing name and choose a category.");
      return;
    }

    //individual alerts
    if (!uploadedImage) {
      alert("Please upload an image!");
      return;
    }
    if (clothingStyle === "") {
      alert("Please choose a style!");
      return;
    }
    if (clothingSize === "") {
      alert("Please enter a size!")
      return;
    }
    if (comfyLevel === "") {
      alert("Please choose a comfort level!")
      return;
    }
    if (clothingSeason === "") {
      alert("Please choose a season!")
      return;
    }

    const newItem = {
      //id: Date.now(),
      name: clothingName.trim(),
      type: clothingCategory,
      image: uploadedImage,
      colour: clothingColor.trim(),
      style: clothingStyle,
      brand: clothingBrand.trim(),
      details: clothingDetails.trim(),
      size: Number(clothingSize),
      comfy_level: Number(comfyLevel),
      season: clothingSeason,
    };

    try {
      const res = await fetch(`${API_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Could");
      }
      console.log("ConfirmUpload(): Item saved:", data);

      const frontendItem = {
        ...data,
        id: data._id,
        category: data.type,
        color: data.colour,
        icon: "👕",
      };


      setItems((prevItems) => [...prevItems, frontendItem,]);
      setShowUploadForm(false);
      resetUploadForm();

    } catch (error) {
      console.error("Could not save item:", error);
      alert("Failed to save clothing item!");
    }
  }


  // delete function (BE: i added delete from mongo)
  async function deleteItem() {
    if (!selectedItem) {
      return;
    }

    //mongoo
    if (!selectedItem._id) {
      setItems(
        items.filter((item) => item.id !== selectedItem.id)
      );
      setSelectedItem(null);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/items/${selectedItem._id}`,
        {//find specific item from mongos items with mongo _id and del
          method: "DELETE",
        }
      );

      if (!res.ok && res.status !== 204) {
        const data = await res.json();
        throw new Error(data.message || "Could not delete item");
      }

      setItems(items.filter((item) => item._id !== selectedItem._id));
      setSelectedItem(null);

    } catch (error) {
      console.error("Could not delete item:", error)
      alert("Failed to delete item!");
    }
  }

  // filter items based on search and category
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const selectedCategoryObject = categories.find(
      (category) => category.name === selectedCategory
    );

    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Favorites" && item.favorite) ||
      (
        selectedCategoryObject &&
        selectedCategoryObject.types.includes(item.category)
      );
    return matchesSearch && matchesCategory;
  });

  // Favorite function
  async function toggleFavorite(id) {
    const itemm = items.find((item) => item.id === id);

    if (!itemm) { return; }

    const newFavourite = !itemm.favorite;
    try {
      const res = await fetch(`${API_URL}/items/${itemm._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ favorite: newFavourite, })
        }
      );

      if (!res.ok) {
        throw new Error("Could not update favourite");
      }
      const updatedItem = await res.json();

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? { ...item, favorite: updatedItem.favorite }
            : item
        )
      );
    } catch (error) {
      console.error("Failed to update favourite:", error);
    }
  }

  return (
    <main className="wardrobe-page">
      <section className="wardrobe-container">
        <p className="wardrobe-small-title">
          TIME TO LOOK THROUGH YOUR CLOSET.
        </p>

        <div className="wardrobe-controls">
          <div className="category-row">
            <input
              className="wardrobe-search"
              type="text"
              placeholder="🔍 Search for items..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />




            {/* FAVORITES BUTTON */}
            <button
              className={
                selectedCategory === "Favorites"
                  ? "category-button selected-category"
                  : "category-button"
              }
              onClick={() => setSelectedCategory(selectedCategory === "Favorites" ? "All" : "Favorites")}
            >
              ❤️ Favorites
            </button>

            {/* EXISTING CATEGORY BUTTONS */}
            {categories.map((category) => (
              <div className="category-button-wrapper" key={category.name}>

                <button
                  className={
                    selectedCategory === category.name
                      ? "category-button selected-category"
                      : "category-button"
                  }
                  onClick={() => setSelectedCategory(selectedCategory === category.name ? "All" : category.name)}

                  
                  onDoubleClick={() => {
                    setCategories(categories.filter((item) => item.name !== category.name));
                    if (selectedCategory === category.name) {
                      setSelectedCategory("All");
                    }
                  }}
                >
                  {category.name}
                </button>
              </div>
            ))}

            {/* ADD CATEGORY */}
            <div className="add-category-wrapper">

              <button
                className="add-category-button"
                onClick={() => setShowCategoryOptions(!showCategoryOptions)}
              >
                +
              </button>

              {showCategoryOptions && (
                <div className="category-options">

                  <p>Choose a type</p>

                  {BEtypes.map((type) => (
                    <button
                      className="category-button"
                      key={type}
                      onClick={() => addCategoryBE(type)}
                      disabled={categories.some(
                        (category) => category.name === type
                      )}
                    >
                      {type}
                    </button>
                  ))}

                  <button
                    className="category-button"
                    onClick={() => setShowCreateCategory(true)}
                  >
                    + Create custom category
                  </button>

                </div>
              )}

            </div>

            {/* ADD CLOTHING */}
            <button
              className="category-button"
              onClick={() => setShowUploadForm(true)}
            >
              Add Clothing
            </button>
          </div>


          {/*Loading text, btw i finally figured out how to comment here!!*/}
          {
            isLoadingItems && (
              <p className="no-items">Loading wardrobe...</p>
            )
          }

          <div className="wardrobe-grid">
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
        </div>

        {
          filteredItems.length === 0 && (
            <p className="no-items">No matching wardrobe items.</p>
          )
        }

        {
          showUploadForm && (
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
                    {BEtypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <p>Colour</p>
                  <input
                    type="text"
                    placeholder="Example: Black"
                    value={clothingColor}
                    onChange={(event) => setClothingColor(event.target.value)}
                  />
                </div>

                <div className="form-field">
                  <p>Style</p>
                  <select
                    value={clothingStyle}
                    onChange={(event) => setClothingStyle(event.target.value)}
                  >
                    <option value="">Select style</option>
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                    <option value="sporty">Sporty</option>
                    <option value="streetwear">Streetwear</option>
                    <option value="alternative">Alternative</option>
                    <option value="elegant">Elegant</option>
                    <option value="minimalist">Minimalist</option>
                    <option value="vintage">Vintage</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-field">
                  <p>Season</p>
                  <select
                    value={clothingSeason}
                    onChange={(event) => setClothingSeason(event.target.value)}
                  >
                    <option value="">Select season</option>
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                    <option value="autumn">Autumn</option>
                    <option value="winter">Winter</option>
                    <option value="all-season">All-season</option>
                  </select>
                </div>

                <div className="form-field">
                  <p>Size</p>
                  <input
                    type="number"
                    placeholder="40"
                    value={clothingSize}
                    onChange={(event) => setClothingSize(event.target.value)}
                  />
                </div>

                <div className="form-field">
                  <p>Comfort level</p>
                  <select
                    value={comfyLevel}
                    onChange={(event) => setComfyLevel(event.target.value)}
                  >
                    <option value="">Comfort level</option>
                    <option value="5">5- Very comfortableo</option>
                    <option value="4">4 - Comfortable</option>
                    <option value="3">3 - Okay</option>
                    <option value="2">2 - Uncomfortable</option>
                    <option value="1">1 - Very uncomfortable</option>
                  </select>

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
          )
        }

        {
          selectedItem && (
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

                  <p><strong>Style:</strong> {selectedItem.style || "Not specified"}</p>
                  <p><strong>Season:</strong> {selectedItem.season || "Not specified"}</p>
                  <p><strong>Size:</strong> {selectedItem.size || "Not specified"}</p>
                  <p><strong>Comfort:</strong> {selectedItem.comfy_level || "Not specified"}/5</p>
                </div>

                <button className="delete-item-button" onClick={deleteItem}>
                  Delete item
                </button>
              </div>
            </div>
          )
        }
      </section >
    </main >
  );
}

export default Wardrobe;
