import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./History.css";
import useHistory from "../../hooks/useHistory";

const CARD_COLORS = ["#ffe27a", "#a9d4ff", "#ffb3d9", "#b8efc4"];

function CountUp({ value }) {
    const [shown, setShown] = useState(0);

    useEffect(() => {
        if (value === 0) {
            return;
        }
        let current = 0;
        const step = Math.max(1, Math.ceil(value / 20));
        const timer = setInterval(() => {
            current = current + step;
            if (current >= value) {
                current = value;
                clearInterval(timer);
            }
            setShown(current);
        }, 40);
        return () => clearInterval(timer);
    }, [value]);

    if (value === 0) {
        return <>0</>;
    }
    return <>{shown}</>;
}

function OutfitDoodle({ color }) {
    return (
        <svg className="history-doodle" viewBox="0 0 120 120" aria-hidden="true">
            <path d="M44 22 L22 34 L30 52 L38 48 L38 98 L82 98 L82 48 L90 52 L98 34 L76 22 Q60 34 44 22 Z" fill={color} stroke="#2b1a07" strokeWidth="4" strokeLinejoin="round" />
            <circle cx="52" cy="62" r="3.5" fill="#2b1a07" />
            <circle cx="68" cy="62" r="3.5" fill="#2b1a07" />
            <path d="M54 72 q6 6 12 0" fill="none" stroke="#2b1a07" strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}

function formatDate(value) {
    const date = new Date(value);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function getUsageText(count) {
    if (count === 0) {
        return "Never worn yet";
    }
    if (count === 1) {
        return "Worn 1 time";
    }
    return `Worn ${count} times`;
}

const History = () => {

    const [selectedOutfit, setSelectedOutfit] = useState(null);
    const { getHistory,
        outfitHistory,
        isLoading,
        error } = useHistory("/api/outfits/history");

    useEffect(() => {
        getHistory();
    }, []);

    let totalWorn = 0;
    let mostWorn = null;
    for (const outfit of outfitHistory) {
        totalWorn = totalWorn + (outfit.usageCount || 0);
        if (!mostWorn || (outfit.usageCount || 0) > (mostWorn.usageCount || 0)) {
            mostWorn = outfit;
        }
    }

    let favouriteName = "-";
    if (mostWorn && mostWorn.usageCount > 0) {
        favouriteName = mostWorn.name;
    }

    return (
        <main className="history-page">

            <section className="history-header">
                <h1>Outfit diary</h1>
                <p className="history-caption">Every look you saved, pinned on the line</p>
            </section>

            <section className="history-stats" aria-label="Your outfit stats">
                <div className="history-stat">
                    <span className="history-stat-number"><CountUp value={outfitHistory.length} /></span>
                    <span className="history-stat-label">Saved outfits</span>
                </div>
                <div className="history-stat">
                    <span className="history-stat-number"><CountUp value={totalWorn} /></span>
                    <span className="history-stat-label">Times worn</span>
                </div>
                <div className="history-stat history-stat-wide">
                    <span className="history-stat-name">{favouriteName}</span>
                    <span className="history-stat-label">Most loved look</span>
                </div>
            </section>

            {error && <p className="error-message">{error}</p>}

            {isLoading && (
                <div className="history-loading">
                    <span></span><span></span><span></span>
                </div>
            )}

            {selectedOutfit ? (

                <div className="outfit-detail">

                    <div className="outfit-detail-photo">

                        <div className="outfit-detail-items">
                            {selectedOutfit.items &&
                                selectedOutfit.items.map((item, itemIndex) => (
                                    <div
                                        className="outfit-detail-item"
                                        key={item.itemId || itemIndex}
                                    >
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                            />
                                        ) : (
                                            <div className="outfit-detail-no-image">
                                                No image
                                            </div>
                                        )}

                                        <span>{item.name}</span>
                                    </div>
                                ))}
                        </div>

                        {selectedOutfit.usageCount >= 10 && (
                            <span className="popular-tag">Popular!</span>
                        )}

                    </div>

                    <div className="outfit-detail-info">
                        <h2>{selectedOutfit.name}</h2>

                        <ul className="outfit-detail-facts">
                            <li><span>Weather</span>{selectedOutfit.weather || "Not saved"}</li>
                            <li><span>Destination</span>{selectedOutfit.destination || "Not saved"}</li>
                            <li><span>Style</span>{selectedOutfit.style || "Not saved"}</li>
                            <li><span>Worn</span>{getUsageText(selectedOutfit.usageCount || 0)}</li>
                            {selectedOutfit.lastWornAt && (
                                <li><span>Last worn</span>{formatDate(selectedOutfit.lastWornAt)}</li>
                            )}
                        </ul>

                        <button onClick={() => setSelectedOutfit(null)}>
                            ← Back to history
                        </button>
                    </div>

                </div>

            ) : (

                <>
                    {!isLoading && outfitHistory.length === 0 && (
                        <div className="empty-history">
                            <svg className="empty-hanger" viewBox="0 0 160 110" aria-hidden="true">
                                <path d="M80 20 c0 -12 14 -12 14 0 c0 8 -8 10 -14 18 L14 92 h132 L80 38" fill="none" stroke="#2b1a07" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p>There is no outfit history yet.</p>
                            <Link to="/start">
                                <button>Create my first outfit</button>
                            </Link>
                        </div>
                    )}

                    <div className="history-list">
                        {outfitHistory.map((outfit, index) => (

                            <div
                                className="outfit-card"
                                key={outfit.id}
                                style={{
                                    "--card-delay": `${index * 0.1}s`,
                                    "--card-tilt": `${(index % 2 === 0 ? -1 : 1) * (1 + (index % 3))}deg`,
                                }}
                            >
                                <span className="outfit-pin" aria-hidden="true"></span>

                                <div
                                    className="outfit-photo"
                                    onClick={() => setSelectedOutfit(outfit)}
                                >
                                    {outfit.items && outfit.items.length > 0 ? (
                                        <div className="outfit-items-preview">
                                            {outfit.items.map((item, itemIndex) => (
                                                <img
                                                    key={item.itemId || itemIndex}
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="outfit-item-image"
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <OutfitDoodle
                                            color={CARD_COLORS[index % CARD_COLORS.length]}
                                        />
                                    )}
                                </div>

                                <button
                                    onClick={() => setSelectedOutfit(outfit)}
                                >
                                    {outfit.name}
                                </button>

                                <div className="usage-info">

                                    <span className="usage-tag">
                                        {getUsageText(outfit.usageCount || 0)}
                                    </span>

                                    {outfit.usageCount >= 10 && (
                                        <span className="popular-tag">
                                            Popular!
                                        </span>
                                    )}

                                </div>

                                <p>{outfit.weather}</p>
                                {outfit.lastWornAt && (
                                    <p className="last-worn">Last worn {formatDate(outfit.lastWornAt)}</p>
                                )}

                            </div>

                        ))}
                    </div>
                </>

            )}

        </main>

    );
};

export default History;