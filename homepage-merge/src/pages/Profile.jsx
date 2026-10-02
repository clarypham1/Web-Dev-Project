

import "./Profile.css";
import useProfile from "./hooks/useProfile";

const Profile = ({ setIsAuthenticated}) => {

    const {
        profileMenu,
        confirmation,
        handleProfileClick,
        handleLogoutClick,
        handleDeleteAccountClick,
        handleCancel,
        handleLogout,
        handleDeleteAccount
    } = useProfile(setIsAuthenticated, "/api/users/profile");

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
};

export default Profile;