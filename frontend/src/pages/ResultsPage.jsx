import React from "react";
import "./ResultsPage.css";
import "./Animations.css";
import useScrollReveal from "../hooks/useScrollReveal";

function ResultsPage({ result, onBack }) {
  useScrollReveal();

  return (
    <div className="results-screen">
      <main className="results-page">
        {result ? (
          <div className="results-container">
            <section className="results-panel scroll-reveal">
              <h1>Your Outfit is ready.</h1>

              <div className="results-grid">
                {(result.items || []).slice(0, 2).map((item) => (
                  <article className="results-card soft-card" key={item.id}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="results-image"
                      />
                    ) : (
                      <div className="results-placeholder" aria-hidden="true">
                        {item.icon || "👕"}
                      </div>
                    )}
                    <h2>{item.name}</h2>
                    <p className="results-category">{item.category}</p>
                    {item.color && <p className="results-color">Color: {item.color}</p>}
                  </article>
                ))}
              </div>
            </section>

            <section className="recommendation-reason scroll-reveal">
              <p>{result.reason}</p>
            </section>

            <button
              className="generate-button results-back-button"
              type="button"
              onClick={onBack}
            >
              Generate another Outfit
            </button>
          </div>
        ) : (
          <section className="results-panel results-empty">
            <h1>No outfit found.</h1>
            <button className="generate-button" type="button" onClick={onBack}>
              Try again
            </button>
          </section>
        )}
      </main>

    </div>
  );
}

export default ResultsPage;
