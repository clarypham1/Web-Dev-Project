
import React from "react";
import "./InfoPages.css";

function OurStoryPage({ onGetStarted }) {
  return (
    <main className="info-page">

      {/* HERO */}
      <section className="info-hero">
        <h1>Our Story</h1>
        <p>
          Every great day starts with the right outfit.
        </p>
      </section>

      {/* ABOUT US */}
      <section className="info-section">
        <h2>How It All Started</h2>

        <p>
          Have you ever stood in front of your wardrobe,
          wondering what to wear?
        </p>

        <p>
          We believe choosing an outfit shouldn't be
          the hardest part of your morning.
          That's why we created AI Outfit App —
          a personal styling assistant designed to
          help you make the most of the clothes
          you already own.
        </p>
      </section>

      {/* OUR MISSION */}
      <section className="info-section light-section">
        <h2>Our Mission</h2>

        <p>
          Our mission is to make personal styling
          simple and accessible by combining
          technology, creativity, and everyday
          practicality.
        </p>

        <div className="info-features">

          <article className="info-card">
            <h3>👗 Your Wardrobe</h3>
            <p>
              Keep your favorite clothing organized
              in one place.
            </p>
          </article>

          <article className="info-card">
            <h3>☀️ Smart Styling</h3>
            <p>
              Discover outfits based on weather,
              occasions, and personal preferences.
            </p>
          </article>

          <article className="info-card">
            <h3>✨ Your Style</h3>
            <p>
              Explore outfit combinations that
              reflect your personality.
            </p>
          </article>

        </div>
      </section>

      {/* TEAM */}
      <section className="info-section">
        <h2>Meet Our Team</h2>

        <p>
          We are a team of students passionate about
          technology, fashion, and creating
          meaningful digital experiences.
        </p>

        <div className="team-grid">

          {[
            { name: "Team Member 1", role: "Frontend Developer" },
            { name: "Team Member 2", role: "Backend Developer" },
            { name: "Team Member 3", role: "AI Developer" }
          ].map((member) => (

            <article className="team-card" key={member.name}>
              <div className="team-avatar">👤</div>

              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>

          ))}

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="info-section light-section">
        <h2>Ready to Find Your Outfit?</h2>

        <p>
          Let us make getting dressed a little easier.
        </p>

        <button
          type="button"
          className="info-button"
          onClick={onGetStarted}
        >
          Get Started →
        </button>
      </section>

    </main>
  );
}

export default OurStoryPage;
