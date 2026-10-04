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
            morning. 
            We created Closis to make this everyday decision easier and more personal.
          </p>

          <h2>The Idea Behind Closis</h2>
          <p>
            Many of us have clothes we love but still struggle to decide how to combine them. We wanted to created a way to make better use of the clothes and accessories people already own. 
          </p>
          <p>
            With Closis, you can create your own digital wardrobe and keep your clothes organised in one place.
          </p>

          <h2>More Than a Digital Wardrobe</h2>
          <p>
            Closis is designed to be your personal outfit assistant.
          </p>

          <p>
            It considers your wardrobe, personal preferences, destination, and weather to help suggest outfits that fit your day. Instead of giving you general outfit ideas, Closis uses information about your own wardrobe and style.
          </p>

          <h2>Our Goal</h2>
          <p>
            Our goal is to make getting dressed simpler, more personal, and more enjoyable.
          </p>

          <p>
            We want to help you save times, discover new ways to wear the clothes you already own, and feel more confident in your everyday outfits.
          </p>
          <p>
            <strong>Your wardrobe. Yur style. Your day.</strong>
          </p>
        </div>
      </section>
    </main>
  );
}

export default OurStoryPage;
