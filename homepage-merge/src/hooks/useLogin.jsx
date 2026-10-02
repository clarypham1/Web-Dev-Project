
import { useState } from "react";

export default function useLogin (url) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (credentials) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials ),
            });

            const user = await response.json();

            if (!response.ok) {
                setError(user.error);
                setIsLoading(false);
                return null;
            }

            localStorage.setItem("user", JSON.stringify(user));
            setIsLoading(false);
            return user;
            }catch (err) {
            setError(err.message);
            setIsLoading(false);
            return null;
            }
        };

    return { login, isLoading, error };
};