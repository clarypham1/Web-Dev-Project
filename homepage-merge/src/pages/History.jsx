import { useState, useEffect } from "react";
import "./History.css";
// FIX: hooks folder is one level up from pages
import useHistory from "../hooks/useHistory";

const History = () => {

    const [selectedOutfit, setSelectedOutfit] = useState(null);
    const { getHistory,
        outfitHistory,
        isLoading,
        error } = useHistory("/api/outfits/history");

    useEffect(() => {
        getHistory();
    }, []);


    return (
        <main className="history-page">

            <h2>History</h2>
            {error && <p className="error-message">{error}</p>}

            {selectedOutfit ? (

                <div className="outfit-detail">

                    <h1>{selectedOutfit.name}</h1>

                    <img
                        src={selectedOutfit.image}
                        alt={selectedOutfit.name}
                    />

                    <p>Weather: {selectedOutfit.weather}</p>
                    <p>Destination: {selectedOutfit.destination}</p>
                    <p>Style: {selectedOutfit.style}</p>

                    <button onClick={() => setSelectedOutfit(null)}>
                        ← Back to History
                    </button>

                </div>

            ) : (

                <div className="history-list">
                    {!isLoading && outfitHistory.length === 0 && (
                        <p className="empty-history">There is no outfit history yet.</p>
                    )}

                    {outfitHistory.map((outfit) => (

                        // FIX: MongoDB documents use _id, so fall back to it for the key
                        <div className="outfit-card" key={outfit._id || outfit.id}>

                            <img
                                src={outfit.image}
                                alt={outfit.name}
                                onClick={() => setSelectedOutfit(outfit)}
                            />

                            <button
                                onClick={() => setSelectedOutfit(outfit)}
                            >
                                {outfit.name}
                            </button>

                            <div className="usage-info">

                                <span className="usage-tag">
                                    {outfit.usageCount === 0
                                        ? "Never used"
                                        : `${outfit.usageCount} ${outfit.usageCount === 1 ? "time" : "times"}`
                                    }
                                </span>

                                {outfit.usageCount >= 10 && (
                                    <span className="popular-tag">
                                        ⭐ Popular item
                                    </span>
                                )}

                            </div>

                            <p>{outfit.weather}</p>

                        </div>
                    ))}

                </div>
            )}

        </main>
    );
};

export default History;