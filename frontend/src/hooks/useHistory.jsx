
import { useState, useEffect } from "react";

export default function useHistory (url) {
    const [outfitHistory, setoutfitHistory] = useState ([]);
    const [error, setError] = useState (null);
    const [isLoading, setIsLoading] = useState (false);

    const getHistory = async () => {
        setIsLoading(true);
        setError(null);

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.token) {
            setError ("You must be logged in to see your history");
            setIsLoading(false);
            return null;
        }

        try {

            const response = await fetch (url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                setError (data.error);
                setIsLoading(false);
                return null;
            }

            setoutfitHistory(data);
            setIsLoading(false);

            return data;
        }catch (err) {
            setError(err.message);
            setIsLoading(false);

            return null;
        }
    };

    return {
        getHistory,
        outfitHistory,
        isLoading,
        error
    };
}