
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar () {
    return (
        <nav className = "navbar">

            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/wardrobe">Wardrobe</NavLink>
            <NavLink to="/how">How</NavLink>
            <NavLink to="/history">History</NavLink>
            <NavLink to="/our-Story">Our story</NavLink>
            <NavLink to="/contact">Contact us</NavLink>

        </nav>
    );
}

export default Navbar;
