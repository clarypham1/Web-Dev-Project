
import React from "react";
import "./ResultsPage.css";

function ResultsPage({ result, onBack }) {

  if (!result) {
    return (
      <main className="results-page">
        <h2>No outfit found.</h2>

        <button onClick={onBack}>
          Try Again
        </button>
      </main>
    );
  }

  return (
    <main className="results-page">

      <div className="results-container">

        <h1>Your Outfit Is Ready!</h1>

        <p>
          Here is your outfit recommendation.
        </p>

        {/* User preferences */}
        <div className="results-preferences">

          <p>
            <strong>Occasion:</strong> {result.occasion}
          </p>

          <p>
            <strong>Style:</strong>{" "}
            {result.stylePreferences || "Surprise me!"}
          </p>

        </div>

        {/* Recommended outfit */}
        <h2>{result.title}</h2>

        <div className="results-grid">

          {result.items.map((item) => (

            <div className="results-card" key={item.id}>

              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="results-image"
                />
              ) : (
                <div className="results-placeholder">
                  {item.icon || "👕"}
                </div>
              )}

              <h3>{item.name}</h3>

              <p>{item.category}</p>

              {item.color && (
                <p>Color: {item.color}</p>
              )}

            </div>

          ))}

        </div>

        {/* Explanation */}
        <div className="recommendation-reason">

          <h2>Why this outfit?</h2>

          <p>{result.reason}</p>

        </div>

        <button
          className="results-back-button"
          onClick={onBack}
        >
          ← Generate Another Outfit
        </button>

      </div>

    </main>
  );
}

export default ResultsPage;
