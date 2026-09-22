
import {Link} from "react-router-dom";
import "./Navbar.css";

function Navbar () {
    return (
        <nav className = "navbar">

            <Link to="/">Home</Link>
            <Link to="/wardrobe">Wardrobe</Link>
            <Link to="/how"> How </Link>
            <Link to="/history"> History </Link>
            <Link to="/our-Story"> Our Story</Link>
            <Link to="/about-us"> About us</Link>

        </nav>
    );
}

export default Navbar;