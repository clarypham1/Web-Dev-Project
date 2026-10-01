
import Profile from "../../pages/Profile/Profile.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import {Link} from "react-router-dom";
import ClosisLogo from "../../assets/Closis_Logo.jpeg";

function Header({isAuthenticated, setIsAuthenticated}) {

    return (
        <header className="header">

            {/* <h1>{ClosisLogo}</h1> */}
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