import React, { useState } from "react";
import Wardrobe from "./Wardrobe";

function App() {
  const [selectedPlace, setSelectedPlace] = useState("");
  const [customPlace, setCustomPlace] = useState("");

// home page
  const [currentPage, setCurrentPage] = useState("home");
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
        </nav>
      </header>

  {/* move to Wardrobe page*/ }
      {currentPage === "wardrobe" ? (
        <Wardrobe />) : 
      (

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
                placeholder="Somewhere else? Type here"
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
                placeholder="Type here"
              />
            </div>
          {/* placeholder 1 for image */}
            <div className="placeholder placeholder-one"></div>
          </section>


          {/*generating place*/}
          <section className="section two-columns light" id="how">
          {/* placeholder 2 for animation/image */}
            <div className="placeholder placeholder-two"></div>
            <div>
              <h2>Generating your outfits...</h2>


              <button className="generate-button">
                Click here to see →
              </button>
            </div>

          </section>
        </main>
      )}


      <footer className="footer">

        <div>
          <h3>Discover</h3>
          <p>Find ideas for your everyday style.</p>
        </div>

        <div>
          <h3>Join Us</h3>
          <p>Share ideas and inspiration with others.</p>
        </div>

        <div>
          <h3>Contact Us</h3>
          <p>Questions or suggestions? Get in touch.</p>
        </div>

      </footer>

    </div>
  );
}

export default App;