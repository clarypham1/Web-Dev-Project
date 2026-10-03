import React, { useEffect } from "react";
import "./OurStoryPage.css";

function OurStoryPage() {
  useEffect(() => {
    const elements = document.querySelectorAll(".story-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="story-page">
      <section className="story-section story-reveal">
        <div className="story-content">
          <h2>How It All Started</h2>
          <p>
            Have you ever stood in front of your wardrobe,
            wondering what to wear?
          </p>
          <p>
            We believe choosing an outfit shouldn't be the hardest part of your
            morning. That's why we created AI Outfit App — a personal styling
            assistant designed to help you make the most of the clothes you
            already own.
          </p>
        </div>
      </section>
    </main>
  );
}

export default OurStoryPage;
