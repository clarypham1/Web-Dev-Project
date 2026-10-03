
import React, { useState, useEffect } from "react";

import "./GeneratingPage.css";

import { buildMockRecommendation } from "../data/mockRecommendation.js";

function GeneratingPage({ request, onBack, onComplete }) {

  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {

    setError("");

    const timer = setTimeout(() => {

      try {

        // Read wardrobe data from localStorage
        const savedItems = localStorage.getItem("wardrobeItems");

        const wardrobeItems = savedItems
          ? JSON.parse(savedItems)
          : [];

        // Check wardrobe data
        if (!Array.isArray(wardrobeItems)) {
          throw new Error("Invalid wardrobe data.");
        }

        if (!request) {
          throw new Error("Missing outfit preferences.");
        }

        // Generate mock recommendation
        const result = buildMockRecommendation(
          request,
          wardrobeItems
        );

        // Send recommendation to parent component
        onComplete(result);

      } catch (err) {

        setError(
          err.message || "Something went wrong. Please try again."
        );

      }

    }, 1500);

    // Cleanup timer when component unmounts
    return () => clearTimeout(timer);

  }, [request, onComplete, attempt]);


  return (

    <main className="generating-page">

      <div className="generating-container">

        <h1>Creating your perfect outfit...</h1>

        {!error ? (

          <>
            <div className="loading-spinner"></div>

            <p>
              Finding the perfect combination for your day!
            </p>
          </>

        ) : (

          <div role="alert">

            <p>{error}</p>

            <button
              onClick={() => setAttempt((prev) => prev + 1)}
            >
              Retry
            </button>

          </div>

        )}

        <p>
          Occasion: {request?.occasion}
        </p>

        <p>
          Style: {request?.stylePreferences || "Surprise me!"}
        </p>

        <p className="demo-notice">
          Demo recommendation – AI integration coming soon.
        </p>

        <button onClick={onBack}>
          ← Go Back
        </button>

      </div>

    </main>
  );
}

export default GeneratingPage;
