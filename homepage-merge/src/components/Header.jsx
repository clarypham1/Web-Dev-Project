import Profile from "./../pages/Profile.jsx";
import Navbar from "./Navbar.jsx";
import {Link} from "react-router-dom";
// FIX: assets is one level up from components, not two
import ClosisLogo from "../assets/Closis_Logo.jpeg";

function Header({isAuthenticated, setIsAuthenticated}) {

    return (
        <header className="header">

            <img
                src={ClosisLogo}
                alt="Closis logo"
                className="closis-logo"
            />
            
            <Navbar />

            {isAuthenticated ?  (
                <Profile setIsAuthenticated={setIsAuthenticated} />
            ) : (
                <div className = "auth-links">
                    <Link to= "/login">Log in</Link>
                    <Link to="/signup">Sign up</Link>
                </div>
            )}

            <hr />
            
        </header>
    );
}

export default Header;