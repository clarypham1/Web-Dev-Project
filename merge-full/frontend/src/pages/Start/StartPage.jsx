import { useState } from "react";
import { Link } from "react-router-dom";
import "./StartPage.css";
import useWeather from "../../hooks/useWeather";
import useGenerateOutfits from "../../hooks/useGenerateOutfits";
import { getWeatherPhoto, getWeatherEmoji } from "../../utils/weatherPhotos";
import WeatherScene from "./WeatherScene.jsx";

// suggested places (from Ngan's Start page design)
const PLACES = ["School", "Work", "Gym", "Cafe"];

// helper: read the last city the user used (default Helsinki)
const getSavedCity = () => {
    try {
        const saved = localStorage.getItem("closisCity");
        if (saved) {
            return saved;
        }
    } catch {
        // localStorage blocked -> use default
    }
    return "Helsinki";
};

// helper: emoji for an item without a photo
const getItemEmoji = (item) => {
    if (item.icon) {
        return item.icon;
    }
    const text = `${item.category} ${item.name}`.toLowerCase();
    if (/(pant|jean|trouser|short|legging)/.test(text)) {
        return "👖";
    }
    if (/(skirt|dress)/.test(text)) {
        return "👗";
    }
    if (/(jacket|coat|hoodie|blazer|cardigan)/.test(text)) {
        return "🧥";
    }
    if (/(shoe|sneaker|boot|sandal|heel)/.test(text)) {
        return "👟";
    }
    if (/(bag|hat|cap|scarf)/.test(text)) {
        return "👜";
    }
    return "👕";
};

function StartPage() {
    // ---------- 1. weather ----------
    const [city, setCity] = useState(getSavedCity);
    const [cityInput, setCityInput] = useState(getSavedCity);
    const [isEditingCity, setIsEditingCity] = useState(false);
    const { weather, isLoading: weatherLoading, error: weatherError } = useWeather(city);

    // ---------- 2. form ----------
    const [selectedPlace, setSelectedPlace] = useState("");
    const [customPlace, setCustomPlace] = useState("");
    const [preferences, setPreferences] = useState("");
    const [formError, setFormError] = useState("");

    // ---------- 3. outfits ----------
    const { result, isLoading, error, generate, regenerate, chooseOutfit, reset } = useGenerateOutfits();
    const [chosen, setChosen] = useState(null);
    const [choosingId, setChoosingId] = useState("");

    // the destination is a button OR the typed place
    let destination = selectedPlace;
    if (!destination) {
        destination = customPlace.trim();
    }

    // change city
    const handleCitySubmit = (event) => {
        event.preventDefault();
        const newCity = cityInput.trim();
        if (!newCity) {
            return;
        }
        setCity(newCity);
        setIsEditingCity(false);
        try {
            localStorage.setItem("closisCity", newCity);
        } catch {
            // not important if it can't be saved
        }
    };

    // click a place button (click again to unselect)
    const handlePlaceClick = (place) => {
        if (selectedPlace === place) {
            setSelectedPlace("");
        } else {
            setSelectedPlace(place);
        }
        setCustomPlace("");
    };

    // type a place -> unselect the buttons
    const handleCustomPlaceChange = (event) => {
        setCustomPlace(event.target.value);
        setSelectedPlace("");
    };

    // "Generate my outfits"
    const handleGenerate = async () => {
        if (!destination) {
            setFormError("Please choose where you are heading.");
            return;
        }
        setFormError("");
        setChosen(null);

        await generate({
            destination: destination,
            preferences: preferences.trim(),
            weather: weather, // already fetched above, so the backend doesn't fetch again
            city: city
        });
    };

    // "Regenerate"
    const handleRegenerate = async () => {
        setChosen(null);
        await regenerate();
    };

    const handleChoose = async (outfit) => {
        setChoosingId(outfit.id);
        const data = await chooseOutfit(outfit);
        setChoosingId("");
        if (data) {
            setChosen({ id: outfit.id, count: data.outfit.usageCount, isNew: data.isNew });
        }
    };

    const handleReset = () => {
        setChosen(null);
        reset();
    };

    // ---------- weather hero background ----------
    let weatherCondition = "";
    if (weather) {
        weatherCondition = weather.condition;
    }

    let heroClass = "start-hero";
    let heroStyle = {};
    if (weather) {
        heroClass = `start-hero weather-${weather.condition}`;
        const photo = getWeatherPhoto(weather.condition);
        if (photo) {
            heroStyle = { backgroundImage: `url(${photo})` };
        }
    }

    return (
        <main className="start-page">

            {/* ===== 1. WEATHER HERO ===== */}
            <section className={heroClass} style={heroStyle}>
                <WeatherScene condition={weatherCondition} />
                <div className="start-hero-content">

                    {/* city + temperature */}
                    <div className="weather-chip">
                        {weatherLoading && <span>Checking the weather...</span>}

                        {!weatherLoading && weather && (
                            <span>
                                {getWeatherEmoji(weather.condition)} {weather.temperature}°C · {weather.weatherLabel} · 📍 {weather.city}
                            </span>
                        )}

                        {!weatherLoading && weatherError && <span>{weatherError}</span>}

                        <button
                            type="button"
                            className="change-city-button"
                            onClick={() => setIsEditingCity(!isEditingCity)}
                        >
                            Change city
                        </button>
                    </div>

                    {/* small form to change the city */}
                    {isEditingCity && (
                        <form className="city-form" onSubmit={handleCitySubmit}>
                            <input
                                type="text"
                                value={cityInput}
                                onChange={(event) => setCityInput(event.target.value)}
                                placeholder="Your city"
                                autoFocus
                            />
                            <button type="submit">OK</button>
                        </form>
                    )}

                    <h1>Where are you heading today?</h1>

                    {weather && <p className="heads-up">{weather.headsUpText}</p>}
                </div>
            </section>

            {/* ===== 2. FORM (hidden while results are shown) ===== */}
            {!result && (
                <section className="start-form">

                    {/* destination */}
                    <div className="start-card">
                        <h2>📍 Where to?</h2>

                        <div className="place-buttons">
                            {PLACES.map((place) => {
                                // selected button gets the "active" class
                                let className = "place-button";
                                if (selectedPlace === place) {
                                    className = "place-button active";
                                }
                                return (
                                    <button
                                        key={place}
                                        type="button"
                                        className={className}
                                        onClick={() => handlePlaceClick(place)}
                                    >
                                        {place}
                                    </button>
                                );
                            })}
                        </div>

                        <input
                            className="start-input"
                            type="text"
                            placeholder="Somewhere else? Type here"
                            value={customPlace}
                            onChange={handleCustomPlaceChange}
                        />
                    </div>

                    {/* style keywords */}
                    <div className="start-card">
                        <h2>✨ Anything else I should know?</h2>
                        <p>Give me some keywords about the colour, style or material of the day.</p>

                        <input
                            className="start-input"
                            type="text"
                            placeholder="e.g. casual, black, oversized, comfy..."
                            value={preferences}
                            onChange={(event) => setPreferences(event.target.value)}
                        />
                    </div>

                    {formError && <p className="error-message">{formError}</p>}
                    {error && <p className="error-message">{error}</p>}

                    {/* "No items" hint links to the wardrobe */}
                    {error && error.includes("wardrobe") && (
                        <p className="start-hint">
                            <Link to="/wardrobe">Go to your wardrobe →</Link>
                        </p>
                    )}

                    <button
                        type="button"
                        className="generate-button"
                        onClick={handleGenerate}
                        disabled={isLoading}
                    >
                        {isLoading && "Generating your outfits..."}
                        {!isLoading && "Generate my outfits"}
                    </button>
                </section>
            )}

            {/* ===== 3. LOADING ===== */}
            {isLoading && (
                <section className="start-loading">
                    <div className="spinner"></div>
                    <p>Mixing and matching your wardrobe...</p>
                </section>
            )}

            {/* ===== 4. RESULTS ===== */}
            {result && !isLoading && (
                <section className="start-results">

                    <div className="results-header">
                        <div>
                            <h2>Your outfits for {result.destination}</h2>
                            {result.preferences && <p>Style: {result.preferences}</p>}
                        </div>

                        {/* shows when the backend used rules instead of Claude (no API key) */}
                        {result.source === "rules" && (
                            <span className="source-badge">Basic suggestions (AI not connected)</span>
                        )}
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <div className="outfit-grid">
                        {result.outfitItems.map((outfit) => {
                            let isChosen = false;
                            if (chosen && chosen.id === outfit.id) {
                                isChosen = true;
                            }

                            let cardClass = "outfit-item-card";
                            if (isChosen) {
                                cardClass = "outfit-item-card is-chosen";
                            }

                            let buttonText = "Choose this outfit for today";
                            if (choosingId === outfit.id) {
                                buttonText = "Saving...";
                            }
                            if (isChosen) {
                                buttonText = "Chosen for today ✓";
                            }

                            let chosenNote = "";
                            if (isChosen && chosen.isNew) {
                                chosenNote = "Saved to your history. First time wearing it!";
                            }
                            if (isChosen && !chosen.isNew) {
                                chosenNote = `Already in your history. You've worn it ${chosen.count} times now.`;
                            }

                            return (
                                <article className={cardClass} key={outfit.id}>

                                    {/* the 2-3 pieces */}
                                    <div className="outfit-pieces">
                                        {outfit.items.map((item) => (
                                            <div className="outfit-piece" key={item.id}>
                                                {item.image && <img src={item.image} alt={item.name} />}
                                                {!item.image && <span className="piece-emoji">{getItemEmoji(item)}</span>}
                                                <small>{item.name}</small>
                                            </div>
                                        ))}
                                    </div>

                                    <h3>{outfit.name}</h3>
                                    <p>{outfit.reason}</p>

                                    <button
                                        type="button"
                                        className="save-button"
                                        onClick={() => handleChoose(outfit)}
                                        disabled={Boolean(chosen) || choosingId !== ""}
                                    >
                                        {buttonText}
                                    </button>

                                    {chosenNote && <p className="chosen-note">{chosenNote}</p>}
                                </article>
                            );
                        })}
                    </div>

                    <div className="results-actions">
                        <button type="button" className="regenerate-button" onClick={handleRegenerate}>
                            ↻ Not feeling it? Regenerate
                        </button>
                        <button type="button" className="back-button" onClick={handleReset}>
                            ← Change my answers
                        </button>
                    </div>
                </section>
            )}

        </main>
    );
}

export default StartPage;
