
import Profile from "../../pages/Profile/Profile.jsx";
import Navbar from "../Navbar/Navbar.jsx";

function Header({isLoggedIn, setIsLoggedIn}){

    return (
        <header className="header">

            <h1>Closis</h1>
            
            <Navbar />

            {isLoggedIn && 
            (<Profile setIsLoggedIn={setIsLoggedIn} />)}

            <hr />
            
        </header>
    );

}

export default Header;