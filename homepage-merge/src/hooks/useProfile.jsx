
import { useState } from "react";

export default function useProfile(setIsAuthenticated, deleteUrl) {
    const [profileMenu, setProfileMenu] = useState(false);
    const [confirmation, setConfirmation] = useState(null);

    const handleProfileClick = () => {
        setProfileMenu((currentValue) => !currentValue);
    };

    const handleLogoutClick = () => {
        console.log("logout button clicked");

        setProfileMenu(false);

        setConfirmation("logout");
    };

    const handleDeleteAccountClick = () => {
        console.log("delete account button clicked");

        setProfileMenu(false);

        setConfirmation("delete");

    };

    const handleCancel = () => {
        setConfirmation(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("user"); //remove login information

        setConfirmation(null);
        setIsAuthenticated(false); //change react authentication state
        window.location.replace("/");

    };

    const handleDeleteAccount = async () => {

        const user = JSON.parse (localStorage.getItem("user"));

        if (!user || !user.token) {
            return;
        }

        try {

            const response = await fetch(deleteUrl, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(data.error);
                return;
            }

            localStorage.removeItem("isLoggedIn"); // remove the login information
            setConfirmation(null);
            setIsAuthenticated(false);
            window.location.replace("/");
        }   catch (error) {
            console.error ("Delete account failed: ", error);
        }

    };

    return {
        profileMenu,
        confirmation,
        handleProfileClick,
        handleLogoutClick,
        handleDeleteAccountClick,
        handleCancel,
        handleLogout,
        handleDeleteAccount
    };
}