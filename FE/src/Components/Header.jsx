
import {Link} from "react-router-dom";
import Profile from "./Profile/Profile.jsx";

function Header({isLoggedIn}){

    return (
        <header className="header">
            <h1>Closis</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/" >Home</Link>
                    </li>
                    <li>
                        <Link to="/wardrobe" >Wardrobe</Link>
                    </li>
                    <li>
                        <Link to="/How" >How</Link>
                    </li>
                    <li>
                        <Link to="/History" >History</Link>
                    </li>
                    <li>
                        <Link to="/Our Story" >Our Story</Link>
                    </li>
                    <li>
                        <Link to="/About us" >About us</Link>
                    </li>
                </ul>
            </nav>
            {isLoggedIn && <Profile />}
            <hr />
        </header>
    );

}

export default Header;