import React, { useState, useCallback, useEffect } from "react";
import Wardrobe from "./Wardrobe";
import GeneratingPage from "./GeneratingPage";
import ResultsPage from "./ResultsPage";
import OurStoryPage from "./OurStoryPage";
import ContactUsPage from "./ContactUsPage";


function App() {
  const [generationInput, setGenerationInput] = useState(null);
  const [stylePreferences, setStylePreferences] = useState("");
  const [error, setError] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [customPlace, setCustomPlace] = useState("");
  const [generationResult, setGenerationResult] = useState(null);
  

// home page
//added: if i update on ex. wardrobe i don't fly tohome
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem("currentPage") || "home";
  });
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

// suggest places
  const places = ["School", "Work", "Gym", "Cafe"];

// choose place
  function handlePlaceClick(place) {
    setSelectedPlace(place);
    setCustomPlace("");
  }
// type location
  function handleCustomPlaceChange(event) {
    setCustomPlace(event.target.value);
    setSelectedPlace("");
  }

  // Validate then navigate to Generating Page
  function handleGenerate() {
    const occasion = selectedPlace || customPlace.trim();

    if (!occasion) {
      setError("Please select where you are heading.");
      return;
    }

    setError("");

    const userPreferences = {
      occasion: occasion,
      stylePreferences: stylePreferences.trim()
    };

    // Save user preferences
    setGenerationInput(userPreferences);

    // Navigate to Generating Page
    setCurrentPage("generating");
  }

  // Handle completed recommendation
  const handleGenerationComplete = useCallback((result) => {
    setGenerationResult(result);
    setCurrentPage("results");
  }, []);

  return (
    <div>
      <header className="header">
        <nav className="nav">

        {/* navigation  */}
          <button onClick={() => setCurrentPage("home")}>
            Home
          </button>

          <button onClick={() => setCurrentPage("wardrobe")}>
            Wardrobe
          </button>

          <button onClick={() => setCurrentPage("ourStory")}>
            Our Story
          </button>

          <button onClick={() => setCurrentPage("contact")}>
            Contact Us
          </button>
        </nav>
      </header>

        {/* move to Wardrobe, generating, results page*/ }
     
        {currentPage === "wardrobe" ? (
          <Wardrobe />
        ) : currentPage === "generating" ? (
          <GeneratingPage
            request={generationInput}
            onComplete={handleGenerationComplete}
            onBack={() => setCurrentPage("home")}
          />
        ) : currentPage === "results" ? (
          <ResultsPage
            result={generationResult}
            onBack={() => setCurrentPage("home")}
          />
        ) : currentPage === "ourStory" ? (

            <OurStoryPage
              onGetStarted={() => setCurrentPage("home")}
            />

          ) : currentPage === "contact" ? (

            <ContactUsPage />

          ) : (

        <main>
          <section className="hero" id="home">
            <div className="hero-content">
              <h1>Where are you heading today?</h1>

            {/*place for button */}
              <div className="place-buttons">
                {places.map((place) => (
                  <button
                    key={place}
                    className={
                      selectedPlace === place
                        ? "place-button active"
                        : "place-button" }
                    onClick={() => handlePlaceClick(place)}
                  >
                    {place}
                  </button>
                ))}
              </div>

              {/*ask theirs location*/}
              <input
                className="custom-input"
                type="text"
                placeholder="Somewhere else?"
                value={customPlace}
                onChange={handleCustomPlaceChange}
              />
              {/* show the selected place or custom place */}
              {(selectedPlace || customPlace) && (
                <p className="choice-text">
                  You selected: {selectedPlace || customPlace}
                </p>
              )}
            </div>
          </section>

          {/*ask for their style*/}
          <section className="section two-columns" id="what">
            <div>
              <h2>Is there any stuffs you want to add?</h2>
              <p>
                Please give me some keywords about your outfit,
                style, material that you like ^^
              </p>
                <input
                  className="small-input"
                  type="text"
                  placeholder="e.g. Casual, minimalist, oversized..."
                  value={stylePreferences}
                  onChange={(event) => setStylePreferences(event.target.value)}
                />
            </div>
          {/* placeholder 1 for image */}
            <div className="placeholder placeholder-one"></div>
          </section>


          {/*generating place*/}
          <section className="section two-columns light" id="how">
            <div className="placeholder placeholder-two"></div>
            <div>
              <h2>Ready for your outfit?</h2>
              <p>
                Let AI help you find the perfect outfit for your day!
              </p>
              <button
                type="button"
                className="generate-button"
                onClick={handleGenerate}
              >
                Generate My Outfit 
              </button>
              {error && (
                <p role="alert" className="error-message">
                  {error}
                </p>
              )}
               </div>
          </section>
        </main>
      )}


    </div>
  );
}

export default App;
