
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Profile.css";

function Profile({ setIsLoggedIn }) {

    const [profileMenu, setProfileMenu] = useState(false);

    const [confirmation, setConfirmation] = useState(null);

    const navigate = useNavigate();

    const handleProfileClick = () => {
        setProfileMenu(!profileMenu);

        setConfirmation(null); // close confirmation when opening/ closing profile menu
    };

    // click the log out button
    const handleLogoutClick = () => {
        console.log("logout button clicked");

        setProfileMenu(false);

        setConfirmation("logout");
    };

    // click the delete account button

    const handleDeleteAccountClick = () => {
        console.log("delete account button clicked");
        
        setProfileMenu(false);

        setConfirmation("delete");

    };

    // cancel click

    const handleCancel = () => {
        setConfirmation(null);
    };

    //confirm log out
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn"); //remove login information

        setIsLoggedIn(false); //change react authentication state

        setConfirmation(null);

        navigate("/login"); // go to login page
    };

    // confirm delete account

    const handleDeleteAccount = () => {

        localStorage.removeItem("isLoggedIn"); // remove the login information

        setIsLoggedIn(false);

        setConfirmation(null);

        navigate("/"); // go to the home page
    };

    return (
        <div className="profile">

            {/* profile button */}
            <button
                className="profile-button"
                onClick={handleProfileClick}>

                👤 Profile

            </button>

            {profileMenu && (
                <div className="profile-dropdown">

                    {/* log out button */}
                    <button onClick={handleLogoutClick}>
                        Log Out
                    </button>

                    {/* delete account button */}
                    <button onClick={handleDeleteAccountClick}>
                        Delete Account
                    </button>
                </div>
            )}

            {/* log out confirmation popup */}

            {confirmation === "logout" && (

                <div className="confirmation-overlay">

                    <div className="confirmation-box">

                        <p>
                            Are you sure to log out?
                        </p>

                        <button onClick={handleCancel}>

                            Cancel

                        </button>

                        <button onClick={handleLogout}>

                            Log Out

                        </button>

                    </div>

                </div>

            )}

            {/* delete account confirmation */}

            {confirmation === "delete" && (

                <div className="confirmation-overlay">

                    <div className="confirmation-box">

                        <p>
                            Are you sure to delete your account?
                        </p>

                        <button onClick={handleCancel}>

                            Cancel

                        </button>

                        <button onClick={handleDeleteAccount}>

                            Delete Account

                        </button>

                    </div>

                </div>

            )
            }




        </div >
    );
}

export default Profile;