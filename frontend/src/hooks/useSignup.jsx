
import { useState } from "react";

export default function useSignup (url) {
    const [error, setError] = useState (null);
    const [isLoading, setIsLoading] = useState (false);

    const signup = async (credentials) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch (url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials),

            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                setIsLoading(false);
                return null;
            }

            localStorage.setItem("user", JSON.stringify(data));
            setIsLoading(false);
            return data;
        }   catch (err) {
            setError(err.message);
            setIsLoading(false);
            return null;
        }
    };
    return {signup, isLoading, error};
}