import { useState } from "react";
import "./History.css";
import Outfit1 from "../../assets/outfit1.jpeg";
import Outfit2 from "../../assets/outfit2.webp";

const History = () => {

    const [selectedOutfit, setSelectedOutfit] = useState(null);

    const outfitHistory = [
        {
            id: 1,
            name: "Casual Outfit",
            image: Outfit1,
            weather: "12 degree C, Cloudy",
            destination: "Center",
            style: "Casual"
        },

        {
            id: 2,
            name: "Coffee Date Outfit",
            image: Outfit2,
            weather: "18 degree C, Sunny",
            destination: "Cafe",
            style: "Comfortable"
        },
        {
            id: 3,
            name: "Coffee Date Outfit",
            image: Outfit2,
            weather: "18 degree C, Sunny",
            destination: "Cafe",
            style: "Comfortable"
        },
        {
            id: 4,
            name: "Casual Outfit",
            image: Outfit1,
            weather: "12 degree C, Cloudy",
            destination: "Center",
            style: "Casual"
        }
    ];

    return (
        <main className="history-page">

            <h2>History</h2>

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

                    {outfitHistory.length === 0 ? (

                        <p className="empty-history">
                            There is no outfit history yet.
                        </p>

                    ) : (

                        outfitHistory.map((outfit) => (

                            <div className="outfit-card" key={outfit.id}>

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

                                <p>{outfit.weather}</p>

                            </div>

                        ))

                    )}

                </div>

            )}

        </main>
    );
};

export default History;