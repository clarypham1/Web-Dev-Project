import { useState, useEffect } from "react";

// Fetches today's weather for a city from our backend: GET /api/weather?city=...
// Returns { weather, isLoading, error }
// weather.condition ("sunny", "rainy" ...) decides which photo the Start page shows.
export default function useWeather(city) {
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 1. no city yet -> nothing to fetch
        if (!city) {
            return;
        }

        // 2. ignore the answer if the city changed before it arrived
        let cancelled = false;

        const getWeather = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
                const data = await response.json();

                if (cancelled) {
                    return;
                }

                if (!response.ok) {
                    setError(data.error);
                    setWeather(null);
                    setIsLoading(false);
                    return;
                }

                setWeather(data);
                setIsLoading(false);
            } catch (err) {
                if (cancelled) {
                    return;
                }
                setError("Could not load the weather");
                setIsLoading(false);
            }
        };

        getWeather();

        // cleanup: runs when city changes or the page closes
        return () => {
            cancelled = true;
        };
    }, [city]);

    return { weather, isLoading, error };
}
