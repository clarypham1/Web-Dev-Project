

import { useState } from "react";

export default function useForgotPassword(url) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const forgotPassword = async (email) => {
        setIsLoading(true);
        setError(null);
        setMessage(null);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                setIsLoading(false);
                return null;
            }

            setMessage(data.message);
            setIsLoading(false);

            return data;

        } catch (error) {
            setError(error.message);
            setIsLoading(false);
            return null;
        }
    };

    return {
        forgotPassword,
        isLoading,
        error,
        message
    };
}