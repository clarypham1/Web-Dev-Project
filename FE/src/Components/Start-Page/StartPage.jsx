
import "./StartPage.css";

function StartPage() {
    return (
        <main className="start-page">

            <section className="weather-section">
                <h1>Where are you heading today?</h1>

            </section>

            <section className = "destination-section">

                <div className="destination-buttons">

                    <button>School</button>
                    <button>Work </button>
                    <button>Gym</button>
                    <button>Cafe</button>
                </div>

                <input type="text" placeholder="Somewhere else? Type here"/>

            </section>

            <section className="style-section">
                <h2>Is there anything else that I should know?</h2>

                <p>
                    Please give me some keywords about your color, style or material of the day.
                </p>

                <input type="text" placeholder="Type here"/>

            </section>

            <button className ="discover-button">
                Discover

            </button>

            <section className="outfit-section">

                <h2>Generating your outfits.....</h2>

                <p>
                    Your outfit suggestions will appear here.
                </p>

                <button>
                    Click here to see →
                </button>

            </section>

        </main>
    );
}

export default StartPage;