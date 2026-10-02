
import { Link } from "react-router-dom";

function HomePage ({ isAuthenticated }) {
    
    return (

        <main className="home-page">

            <section className="home-section">
                <div className="home-content">

                    {/* big brand title on top of the closet photo */}
                    <h1>CLOSIS</h1>

                    {/* logged in -> start, guest -> login */}
                    <Link to= {isAuthenticated ? "/start" : "/login"} >

                        <button>
                            Let's begin!
                        </button>
                    </Link>

                </div>

            </section>

            <section className="what-is-closis-section">
                <h2>What is Closis?</h2>

                <p>
                    Closis is your digital wardrobe and personal outfit assistant. 
                    Discover outfit ideas based on your wardrobe, personal style, destination, and weather.
                </p>

                <div className="closis-features">

                    <div className="feature-card">
                        <h3>
                            👗 Your Wardrobe
                        </h3>

                        <p>
                            Keep your clothes and accessories organised in one digital wardrobe.
                        </p>

                    </div>

                    <div className = "feature-card">
                        <h3> 🎨 Your Style</h3>

                        <p>
                            Tell Closis about your preferred colors, styles, and materials.
                        </p>

                    </div>

                    <div className = "feature-card">
                        <h3> 🌤️ Your Weather </h3>

                        <p>
                            Closis considers the weather when helping you choose an outfit.
                        </p>

                    </div>

                </div>

            </section>

            <section className = "why-closis-section">
                <h2>Why use Closis? </h2>

                <div className = "benefits">

                    <div className = "benefit-card">

                        <h3> ⏰ Save Time </h3>

                        <p>
                            Spend less time deciding what to wear and more time focusing on your day.
                        </p>

                    </div>

                    <div className = "benefit-card">
                        <h3> 👗 🪎 Use What you own</h3>

                        <p>
                            Make better use of the clothes and accessories already in your wardrobe.
                        </p>

                    </div>

                    <div className = "benefit-card">
                        <h3> 🌤️ Dress for the Weather </h3>

                        <p>
                            Get outfit ideas that take the day's weather into consideration.
                        </p>

                    </div>

                    <div className = "benefit-card">

                        <h3> ✨ Make It Personal </h3>

                        <p>
                            Get suggestions based on your own style and preferences.
                        </p>

                    </div>

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