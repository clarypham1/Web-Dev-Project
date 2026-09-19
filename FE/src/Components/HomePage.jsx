
import {Link} from "react-router-dom";
// import "./Homepage.css";

function HomePage () {
    
    return (

        <main className = "home-page">

            <h1> Welcome to Closis...</h1>

            <p> Your digital wardrobe and personal outfit assistant</p>

            <Link to="/login">

                <button>
                    Start
                </button>
            </Link>

        </main>

    );
}

export default HomePage;