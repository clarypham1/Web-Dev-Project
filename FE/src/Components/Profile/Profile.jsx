
import { useState } from "react";
import "./Profile.css";

function Profile () {

    const [profileMenu, setProfileMenu] = useState(false);
    
    const handleProfileClick = () => {
        setProfileMenu(!profileMenu);
    };

    return (
        <div className = "profile">

            <button
                className="profile-button"
                onClick={handleProfileClick}>
                    👤 Profile
            </button>

            {profileMenu && (
                <div className = "profile-dropdown">

                    <button>
                        Log Out
                    </button>

                    <button>
                        Delete Account
                    </button>

                </div>
            )}

        </div>
    );

}

export default Profile;