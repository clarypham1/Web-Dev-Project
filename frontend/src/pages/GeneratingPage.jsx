import React, { useState, useEffect } from "react";
import "./Animations.css";
import "./GeneratingPage.css";
import { buildMockRecommendation } from "../data/mockRecommendation.js";
import { defaultItems } from "./Wardrobe.jsx";

function GeneratingPage({ request, onBack, onComplete }) {
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setError("");

    const timer = setTimeout(() => {
      try {
        const savedItems = localStorage.getItem("wardrobeItems");
        const wardrobeItems = savedItems ? JSON.parse(savedItems) : defaultItems;

        if (!Array.isArray(wardrobeItems)) {
          throw new Error("Invalid wardrobe data.");
        }

        if (!request) {
          throw new Error("Missing outfit preferences.");
        }

        const result = buildMockRecommendation(request, wardrobeItems);
        onComplete(result);
      } catch (err) {
        setError(err.message || "Something went wrong. Please try again.");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [request, onComplete, attempt]);

  return (
    <div className="generating-screen">
      <main className="generating-page">
        <section className="generating-container" aria-live="polite">
          <h1>Generating your outfit.</h1>

          {!error ? (
            <>
              <div className="spinner-float" aria-hidden="true">
                <div className="loading-spinner"></div>
              </div>
              <p className="generating-message">
                Finding the perfect combination for your day!
              </p>
            </>
          ) : (
            <div className="generating-error" role="alert">
              <p>{error}</p>
              <button
                className="generate-button"
                type="button"
                onClick={() => setAttempt((prev) => prev + 1)}
              >
                Retry
              </button>
            </div>
          )}

          <button
            className="generate-button generating-back-button"
            type="button"
            onClick={onBack}
          >
            Go back
          </button>
        </section>
      </main>

    </div>
  );
}

export default GeneratingPage;
