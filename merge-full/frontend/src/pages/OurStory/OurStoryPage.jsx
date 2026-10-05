import { useEffect } from "react";
import "./OurStoryPage.css";

const INK = "#2b1a07";

function ConfusedScene() {
    return (
        <svg viewBox="0 0 220 200" className="story-art art-confused">
            <rect x="60" y="40" width="100" height="140" rx="16" fill="#ffb380" stroke={INK} strokeWidth="3.5" />
            <path d="M110 48 V172" stroke={INK} strokeWidth="2.5" />
            <circle cx="102" cy="116" r="4" fill={INK} />
            <circle cx="118" cy="116" r="4" fill={INK} />
            <ellipse cx="90" cy="86" rx="5" ry="7" fill={INK} />
            <ellipse cx="130" cy="86" rx="5" ry="7" fill={INK} />
            <path d="M98 104 q12 -8 24 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
            <g className="art-question art-question-1">
                <text x="28" y="60">?</text>
            </g>
            <g className="art-question art-question-2">
                <text x="172" y="44">?</text>
            </g>
            <g className="art-question art-question-3">
                <text x="182" y="120">?</text>
            </g>
        </svg>
    );
}

function IdeaScene() {
    return (
        <svg viewBox="0 0 220 200" className="story-art art-idea">
            <g className="art-rays">
                <path d="M110 14 v18 M48 40 l13 13 M172 40 l-13 13 M28 100 h18 M174 100 h18" stroke={INK} strokeWidth="4" strokeLinecap="round" />
            </g>
            <path className="art-bulb" d="M110 50 a44 44 0 0 1 26 80 v14 h-52 v-14 a44 44 0 0 1 26 -80 z" fill="#ffe27a" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
            <rect x="86" y="146" width="48" height="12" rx="4" fill="#bebcbb" stroke={INK} strokeWidth="3" />
            <rect x="92" y="160" width="36" height="12" rx="4" fill="#bebcbb" stroke={INK} strokeWidth="3" />
            <circle cx="98" cy="96" r="4" fill={INK} />
            <circle cx="122" cy="96" r="4" fill={INK} />
            <path d="M100 110 q10 10 20 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}

function PhoneScene() {
    return (
        <svg viewBox="0 0 220 200" className="story-art art-phone">
            <rect x="62" y="14" width="96" height="176" rx="18" fill="#fff" stroke={INK} strokeWidth="3.5" />
            <rect x="94" y="22" width="32" height="6" rx="3" fill={INK} />
            <g className="art-card art-card-1">
                <rect x="74" y="40" width="72" height="40" rx="8" fill="#a9d4ff" stroke={INK} strokeWidth="2.5" />
                <path d="M92 50 l-8 5 l3 6 l3 -1 v12 h16 v-12 l3 1 l3 -6 l-8 -5 q-6 4 -12 0 z" fill="#fff" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
                <rect x="118" y="54" width="20" height="5" rx="2" fill={INK} />
            </g>
            <g className="art-card art-card-2">
                <rect x="74" y="88" width="72" height="40" rx="8" fill="#ffb3d9" stroke={INK} strokeWidth="2.5" />
                <path d="M90 98 h12 l3 24 h-7 l-2 -14 l-2 14 h-7 z" fill="#fff" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
                <rect x="118" y="102" width="20" height="5" rx="2" fill={INK} />
            </g>
            <g className="art-card art-card-3">
                <rect x="74" y="136" width="72" height="40" rx="8" fill="#b8efc4" stroke={INK} strokeWidth="2.5" />
                <path d="M84 166 q0 -14 10 -14 l4 6 h10 q8 0 8 8 z" fill="#fff" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
                <rect x="118" y="150" width="20" height="5" rx="2" fill={INK} />
            </g>
            <path className="art-spark" d="M184 50 l5 -14 l5 14 l14 5 l-14 5 l-5 14 l-5 -14 l-14 -5 z" fill="#22c55e" stroke={INK} strokeWidth="2" />
        </svg>
    );
}

function GoalScene() {
    return (
        <svg viewBox="0 0 220 200" className="story-art art-goal">
            <path d="M20 180 q90 -60 180 0 z" fill="#b8efc4" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M110 150 V40" stroke={INK} strokeWidth="4" strokeLinecap="round" />
            <path className="art-flag" d="M112 42 q24 -10 48 0 q-10 14 0 28 q-24 -10 -48 0 z" fill="#ff6f1e" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
            <g className="art-stars">
                <path d="M44 70 l4 -12 l4 12 l12 4 l-12 4 l-4 12 l-4 -12 l-12 -4 z" fill="#ffe27a" stroke={INK} strokeWidth="2" />
                <path d="M182 104 l3 -9 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3 z" fill="#a9d4ff" stroke={INK} strokeWidth="2" />
                <path d="M70 120 l3 -8 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 z" fill="#ffb3d9" stroke={INK} strokeWidth="2" />
            </g>
        </svg>
    );
}

const CHAPTERS = [
    {
        title: "How it all started",
        color: "#ffe27a",
        Art: ConfusedScene,
        paragraphs: [
            "Have you ever stood in front of your wardrobe, wondering what to wear?",
            "We believe choosing an outfit shouldn't be the hardest part of your morning. We created Closis to make this everyday decision easier and more personal.",
        ],
    },
    {
        title: "The idea behind Closis",
        color: "#a9d4ff",
        Art: IdeaScene,
        paragraphs: [
            "Many of us have clothes we love but still struggle to decide how to combine them. We wanted to create a way to make better use of the clothes and accessories people already own.",
            "With Closis, you can create your own digital wardrobe and keep your clothes organised in one place.",
        ],
    },
    {
        title: "More than a digital wardrobe",
        color: "#ffb3d9",
        Art: PhoneScene,
        paragraphs: [
            "Closis is designed to be your personal outfit assistant.",
            "It considers your wardrobe, personal preferences, destination, and weather to help suggest outfits that fit your day. Instead of giving you general outfit ideas, Closis uses information about your own wardrobe and style.",
        ],
    },
    {
        title: "Our goal",
        color: "#b8efc4",
        Art: GoalScene,
        paragraphs: [
            "Our goal is to make getting dressed simpler, more personal, and more enjoyable.",
            "We want to help you save time, discover new ways to wear the clothes you already own, and feel more confident in your everyday outfits.",
        ],
    },
];

const CLOSING_WORDS = ["Your wardrobe.", "Your style.", "Your day."];

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
      { threshold: 0.2 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="story-page">
      <section className="story-hero">
        <h1>Our story</h1>
        <p className="story-hero-caption">One messy wardrobe, one big idea</p>
      </section>

      <section className="story-path">
        {CHAPTERS.map((chapter, index) => {
          const Art = chapter.Art;
          return (
            <article
              className="story-chapter story-reveal"
              key={chapter.title}
              style={{ "--chapter-color": chapter.color }}
            >
              <span className="story-number">{index + 1}</span>

              <div className="story-panel">
                <Art />
              </div>

              <div className="story-bubble">
                <h2>{chapter.title}</h2>
                {chapter.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <section className="story-closing story-reveal">
        {CLOSING_WORDS.map((word, index) => (
          <span className="story-closing-word" key={word} style={{ "--word-delay": `${index * 0.35}s` }}>
            {word}
          </span>
        ))}
      </section>

    </main>
  );
}

export default OurStoryPage;
