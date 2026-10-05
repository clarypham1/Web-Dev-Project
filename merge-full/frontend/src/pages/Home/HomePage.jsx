import { Link } from "react-router-dom";
import useScrollReveal from "../../hooks/useScrollReveal";
import CartoonCloset from "../../Components/CartoonCloset/CartoonCloset.jsx";
import Stickers from "../../Components/Stickers/Stickers.jsx";

const HERO_STICKERS = [
    { kind: "bolt", top: "6%", left: "56%", size: 58, rotate: -12 },
    { kind: "heart", top: "70%", left: "90%", size: 66, rotate: 10 },
    { kind: "sparkle", top: "12%", left: "93%", size: 46, rotate: 8 },
    { kind: "ghost", top: "80%", left: "46%", size: 52, rotate: -8 },
];

const MARQUEE_WORDS = ["What do I wear today?", "Ask Closis", "Rainy? We got you", "Your clothes, new combos", "No more 'nothing to wear'"];

const FEATURES = [
    { title: "Your wardrobe", text: "Keep your clothes and accessories organised in one digital wardrobe." },
    { title: "Your style", text: "Tell Closis about your preferred colors, styles, and materials." },
    { title: "Your weather", text: "Closis considers the weather when helping you choose an outfit." },
];

const BENEFITS = [
    { title: "Save time", text: "Spend less time deciding what to wear and more time focusing on your day." },
    { title: "Use what you own", text: "Make better use of the clothes and accessories already in your wardrobe." },
    { title: "Dress for the weather", text: "Get outfit ideas that take the day's weather into consideration." },
    { title: "Make it personal", text: "Get suggestions based on your own style and preferences." },
];

const FAQS = [
    {
        question: "Do I need to buy new clothes?",
        answer: "Nope! Closis only uses the clothes you upload to your own wardrobe.",
    },
    {
        question: "How does Closis know the weather?",
        answer: "It checks today's weather for your city, so a rainy day gets a jacket and a hot day gets something light.",
    },
    {
        question: "What if I don't like the outfits?",
        answer: "Press regenerate and you get new combinations you haven't seen yet.",
    },
    {
        question: "How do I add clothes?",
        answer: "Go to your wardrobe, press Add Clothing and upload a photo. Closis suggests the name, type, colour, style and season for you.",
    },
];

function HomePage () {
    useScrollReveal();
    
    return (

        <main className="home-page">

            <section className="home-section">
                <div className="home-content">

                    <h1>Welcome to <span className="marker-word">Closis</span></h1>

                    <h2>Your wardrobe, your style, your day</h2>

                    <Link to="/start">

                        <button className="home-start-button">
                            Let's start
                        </button>
                    </Link>

                </div>

                <CartoonCloset />
                <Stickers stickers={HERO_STICKERS} />

            </section>

            <div className="home-marquee" aria-hidden="true">
                <div className="home-marquee-track">
                    {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, index) => (
                        <span key={index}>{word} ✶</span>
                    ))}
                </div>
            </div>

            <section className="what-is-closis-section">
                <h2>What is Closis?</h2>

                <p>
                    Closis is your digital wardrobe and personal outfit assistant.
                    Discover outfit ideas based on your wardrobe, personal style, destination, and weather.
                </p>

                <div className="tag-rail">
                    {FEATURES.map((feature, index) => (
                        <div className="tag-hang scroll-reveal" key={feature.title} style={{ "--tag-delay": `${index * 0.15}s` }}>
                            <div className="clothing-tag" tabIndex={0}>
                                <div className="tag-face tag-front">
                                    <span className="tag-hole" aria-hidden="true"></span>
                                    <span className="tag-number">No. 0{index + 1}</span>
                                    <h3>{feature.title}</h3>
                                    <span className="tag-hint">Hover or tap to flip</span>
                                </div>
                                <div className="tag-face tag-back">
                                    <span className="tag-hole" aria-hidden="true"></span>
                                    <p>{feature.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="why-closis-section">
                <div className="why-intro">
                    <h2>Why use Closis?</h2>
                    <p className="why-caption">Here is what you get, free of charge</p>
                </div>

                <div className="receipt-wrap scroll-reveal">
                    <div className="receipt-printer" aria-hidden="true">
                        <span className="receipt-light"></span>
                    </div>

                    <div className="receipt">
                        <div className="receipt-head">
                            <strong className="receipt-shop">Closis</strong>
                            <span>Your own closet, open 24/7</span>
                            <span className="receipt-dash" aria-hidden="true"></span>
                        </div>

                        <ul className="receipt-lines">
                            {BENEFITS.map((benefit, index) => (
                                <li className="receipt-line" key={benefit.title} style={{ "--line-delay": `${0.6 + index * 0.25}s` }}>
                                    <div className="receipt-row">
                                        <span className="receipt-qty">1x</span>
                                        <span className="receipt-item">{benefit.title}</span>
                                        <span className="receipt-dots" aria-hidden="true"></span>
                                        <span className="receipt-price">Free</span>
                                    </div>
                                    <p>{benefit.text}</p>
                                </li>
                            ))}
                        </ul>

                        <div className="receipt-total">
                            <span>Total</span>
                            <span className="receipt-total-value">A better morning</span>
                        </div>

                        <span className="receipt-stamp" aria-hidden="true">Paid with clothes you already own</span>

                        <div className="receipt-barcode" aria-hidden="true"></div>
                        <p className="receipt-thanks">Thank you for shopping your own closet!</p>
                    </div>
                </div>
            </section>

            <section className="faq-section">
                <h2>Questions? We've got answers</h2>

                <div className="faq-list">
                    {FAQS.map((faq) => (
                        <details className="faq-item scroll-reveal" key={faq.question}>
                            <summary>{faq.question}</summary>
                            <p>{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </section>

            <section className = "how-preview-section">
                <h2>How does Closis work? </h2>

                <p>
                    Learn how Closis works and how it can help you find outfits that fit your style and day.
                </p>

                <Link to="/how">
                    
                    <button>
                        Learn more
                    </button>

                </Link>

            </section>

        </main>

    );
}

export default HomePage;
