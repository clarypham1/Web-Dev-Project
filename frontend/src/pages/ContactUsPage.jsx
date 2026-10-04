import React, { useEffect, useState } from "react";
import "./ContactUsPage.css";

function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const elements = document.querySelectorAll(".contact-reveal");
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

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setFeedback("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFeedback("Please complete all fields.");
      return;
    }

    console.log("Contact form preview:", formData);
    setFeedback("Your form is valid! This is a demo, so no message has been sent yet.");
  }

  return (
    <main className="contact-page">
      <section className="contact-section">
        <form className="contact-form contact-reveal" onSubmit={handleSubmit}>
          <h1>Send Us a Message</h1>

          <label htmlFor="contact-name">Your Name *</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label htmlFor="contact-email">Email Address *</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            required
          />

          <label htmlFor="contact-message">Your Message *</label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us what's on your mind..."
            rows="5"
            required
          />

          <button type="submit" className="contact-submit-button">
            Send Message
          </button>

          {feedback && (
            <p className="contact-feedback" role="status">
              {feedback}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

export default ContactUsPage;
