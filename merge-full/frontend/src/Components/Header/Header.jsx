
import Profile from "../../pages/Profile/Profile.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import { Link } from "react-router-dom";
import ClosisLogo from "../../assets/closis-logo-peach.png";

function Header({ isAuthenticated, setIsAuthenticated }) {

    return (
        <header className="header">

            <div className="header-columns">

                <Link to="/" className="logo-link" aria-label="Closis home">
                    <img
                        src={ClosisLogo}
                        alt="Closis logo"
                        className="closis-logo"
                    />
                </Link>
                <Navbar />

                {isAuthenticated ? (
                    <Profile setIsAuthenticated={setIsAuthenticated} />
                ) : (
                    <div className="auth-links">
                        <Link to="/login">Log in</Link>
                        <Link to="/signup">Sign up</Link>
                    </div>
                )}

            </div>

            <hr />

        </header>
    );
}

export default Header;
