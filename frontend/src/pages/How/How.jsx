
import "./How.css";
import ClosisLogo from "../../assets/closis-logo-peach.png";

function How() {
    
    return (
        <main className="how">

            <section className="how-introduction">
                <h1>How Closis works</h1>

                <p>
                    Closis helps you generate outfits from your own digital wardrobe based on where you are going, your perferences, and weather.
                </p>

            </section>

            <section className="how-steps">

                <span className="how-logo">
                    <img src={ClosisLogo} alt="Closis logo"/>
                </span>

                <div className="how-step">
                    <h2> 1. Create an account</h2>

                    <p>
                        Sign up for a Closis account using your Email address and log in to start using your digital wardrobe.
                    </p>

                </div>

                <div className="how-step">
                    <h2> 2. Add the Category and your Clothes</h2>

                    <p>
                        Create the category such as hoodies, shirt, pant, etc..Upload your clothes and accessories to your digital wardrobe. You can add information such as category, color, brand, and details.
                    </p>

                </div>

                <div className="how-step">
                    <h2> 3. Choose your destination</h2>

                    <p>
                        Tell Closis where your are going. You can choose places such as school, work, the gym, or a cafe.
                    </p>


                </div>

                <div className="how-step">
                    <h2> 4. Add your preferences</h2>

                    <p>
                        Add keywords such as your perferred color, style, or material.
                    </p>

                </div>

                <div className="how-step">
                    <h2> 5. Discover outfits</h2>

                    <p>
                        Closis uses your wardrobe, perferences, destination and weather informaion to help suggest outfits.
                    </p>

                </div>

                <div className="how-step">
                    <h2> 6. Save your favourites</h2>

                    <p>
                        save outfits you like and check your outfit history later.
                    </p>

                </div>


            </section>
        </main>
    );
}

export default How;
