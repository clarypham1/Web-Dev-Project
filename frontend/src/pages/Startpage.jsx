import React, { useState, useCallback, useEffect } from "react";
import "./Startpage.css";
import Wardrobe from "./Wardrobe";
import GeneratingPage from "./GeneratingPage";
import ResultsPage from "./ResultsPage";
import OurStoryPage from "./OurStoryPage";
import ContactUsPage from "./ContactUsPage";
import SiteFooter from "../Components/SiteFooter.jsx";

function getWeatherDescription(code) {
  if (code === 0) return "Clear sky";
  if ([1, 2].includes(code)) return "Mostly clear";
  if (code === 3) return "Cloudy";
  if ([45, 48].includes(code)) return "Foggy";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rainy";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snowy";
  if ([95, 96, 99].includes(code)) return "Thunderstorms";
  return "Current conditions";
}


function Startpage({ initialPage = "home" }) {
  const [generationInput, setGenerationInput] = useState(null);
  const [stylePreferences, setStylePreferences] = useState("");
  const [error, setError] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [customPlace, setCustomPlace] = useState("");
  const [confirmedCustomPlace, setConfirmedCustomPlace] = useState("");
  const [generationResult, setGenerationResult] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState("");
  const [weatherLoading, setWeatherLoading] = useState(true);
  const weatherRequestStarted = React.useRef(false);
  

// home page
  const [currentPage, setCurrentPage] = useState(initialPage);
// suggest places
  const places = ["School", "Work", "Gym", "Cafe"];

// choose place
  function handlePlaceClick(place) {
    setSelectedPlace(place);
    setCustomPlace("");
    setConfirmedCustomPlace("");
  }
// type location
  function handleCustomPlaceChange(event) {
    setCustomPlace(event.target.value);
    setSelectedPlace("");
    setConfirmedCustomPlace("");
  }
// Confirm custom place
  function confirmCustomPlace() {
  const cleanPlace = customPlace.trim();
  if (cleanPlace) {
    setConfirmedCustomPlace(cleanPlace);
  }
}

  const handleGetWeather = useCallback(() => {
    if (!navigator.geolocation) {
      setWeatherError("Your browser doesn't support location sharing.");
      setWeatherLoading(false);
      return;
    }

    setWeatherLoading(true);
    setWeatherError("");

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const params = new URLSearchParams({
            latitude: coords.latitude,
            longitude: coords.longitude,
            current: "temperature_2m,weather_code",
            temperature_unit: "celsius",
            timezone: "auto",
          });
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?${params}`
          );

          if (!response.ok) throw new Error("Weather service unavailable.");

          const data = await response.json();
          setWeather({
            temperature: Math.round(data.current.temperature_2m),
            description: getWeatherDescription(data.current.weather_code),
          });
        } catch {
          setWeatherError("Weather is unavailable right now.");
        } finally {
          setWeatherLoading(false);
        }
      },
      () => {
        setWeatherError("Allow location access to see your local weather.");
        setWeatherLoading(false);
      },
      { timeout: 10000 }
    );
  }, []);

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

useEffect(() => {
  if (currentPage !== "home") {
    weatherRequestStarted.current = false;
    return;
  }

  if (!weatherRequestStarted.current) {
    weatherRequestStarted.current = true;
    handleGetWeather();
  }

  const elements = document.querySelectorAll(".scroll-reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });

  return () => observer.disconnect();
}, [currentPage, handleGetWeather]);

  return (
    <div className="app-shell">
      <div className="app-page-content">
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

            <OurStoryPage />

        ) : currentPage === "contact" ? (

          <ContactUsPage />
          ) : (

        <main>
          <section className="hero" id="home">
            <aside className="weather-card" aria-live="polite">
              <span className="weather-card-label">LOCAL WEATHER</span>
              {weather ? (
                <>
                  <span className="weather-temperature">{weather.temperature}°C</span>
                  <span className="weather-description">{weather.description}</span>
                  <a
                    className="weather-attribution"
                    href="https://open-meteo.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Weather by Open-Meteo
                  </a>
                </>
              ) : (
                <>
                  <span className="weather-description">
                    {weatherLoading
                      ? "Getting your local weather..."
                      : weatherError || "Weather is unavailable right now."}
                  </span>
                  {weatherError && (
                    <button
                      className="weather-button"
                      type="button"
                      onClick={handleGetWeather}
                      disabled={weatherLoading}
                    >
                      {weatherLoading ? "Checking…" : "Try again"}
                    </button>
                  )}
                </>
              )}
            </aside>

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
                placeholder="Another occasion? e.g. Dinner, Party, Date..."
                value={customPlace}
                onChange={handleCustomPlaceChange}
                onBlur={confirmCustomPlace}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    confirmCustomPlace();
                    event.currentTarget.blur();
                  }
                }}
              />
              {/* show confirmation only when user types occasion */}
              {confirmedCustomPlace && (
                <div className="custom-confirmation">
                     <p>
                       We'll use this occasion to personalize your outfit.
                     </p>
                </div>
              )}
            </div>
          </section>

          {/*ask for their style*/}
          <section
              className="section two-columns scroll-reveal"
              id="what"
            >
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
          <section className="section two-columns light scroll-reveal" id="how">
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

      <SiteFooter
        onHome={() => setCurrentPage("home")}
        onWardrobe={() => setCurrentPage("wardrobe")}
        onContact={() => setCurrentPage("contact")}
      />
    </div>
  );
}

export default Startpage;
