import React from "react";

function SiteFooter({ onHome, onWardrobe, onContact }) {
  return (
    <footer className="footer">
      <div className="footer-column">
        <h3>Discover</h3>
        <button type="button" onClick={onHome}>Home</button>
        <button type="button" onClick={onHome}>Your style</button>
        <button type="button" onClick={onHome}>Get outfit ideas</button>
      </div>
      <div className="footer-column">
        <h3>Join Us</h3>
        <p>Find inspiration and make getting dressed easier.</p>
        <button type="button" onClick={onWardrobe}>Explore your wardrobe</button>
      </div>
      <div className="footer-column">
        <h3>Contact Us</h3>
        <p>Questions or ideas? We’d love to hear from you.</p>
        <button type="button" onClick={onContact}>Get in touch</button>
      </div>
    </footer>
  );
}

export default SiteFooter;
