
import React, { useState } from "react";
import "./InfoPages.css";

function ContactUsPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [feedback, setFeedback] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setFeedback("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setFeedback("Please complete all fields.");
      return;
    }

    // Frontend demo only.
    // Replace with a backend API request later.
    console.log("Contact form preview:", formData);

    setFeedback(
      "Your form is valid! This is a demo, so no message has been sent yet."
    );
  }

  return (
    <main className="info-page">

      {/* HERO */}
      <section className="info-hero">

        <h1>Let's Connect!</h1>

        <p>
          Have a question, suggestion, or just want
          to say hello? We'd love to hear from you.
        </p>

      </section>

      <section className="contact-layout">

        {/* CONTACT INFORMATION */}
        <div className="contact-information">

          <h2>Get in Touch</h2>

          <p>
            Whether you have feedback about our app
            or simply want to connect, feel free
            to reach out.
          </p>

          <h3>📧 Email</h3>
          <p>Your team's email address</p>

          <h3>📍 Location</h3>
          <p>Finland</p>

          <h3>💬 Follow Us</h3>
          <p>
            Add your team's social media links here.
          </p>

        </div>

        {/* CONTACT FORM */}
        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <h2>Send Us a Message</h2>

          <label htmlFor="contact-name">
            Your Name *
          </label>

          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label htmlFor="contact-email">
            Email Address *
          </label>

          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            required
          />

          <label htmlFor="contact-subject">
            Subject *
          </label>

          <select
            id="contact-subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          >

            <option value="">Select a subject</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Feedback">Feedback</option>
            <option value="Technical Support">Technical Support</option>
            <option value="Other">Other</option>

          </select>

          <label htmlFor="contact-message">
            Your Message *
          </label>

          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us what's on your mind..."
            rows="5"
            required
          />

          <button
            type="submit"
            className="info-button"
          >
            Send Message →
          </button>

          {feedback && (
            <p role="status">{feedback}</p>
          )}

        </form>

      </section>

    </main>
  );
}

export default ContactUsPage;
