
import { useEffect, useState } from "react";

function Weather() {

    const weather = {
        city: "Espoo",
        country: "Finland",
        temperature: "12",
        unit: "°C",
        headsUpText: "Cloudy today, Don't forget your jacket!"
    };

    // const [weather, setWeather] = useState(null);

    // const [error, setError] = useState("");

    // useEffect(() => {
    //     async function fetchWeather() {

    //         try {
    //             const response = await fetch(
    //                 "http://localhost:4000/api/weather?city=Espoo"
    //             );

    //             if (!response.ok) {

    //                 throw new Error("Failed to get weather");
    //             }

    //             const data = await response.json();

    //             setWeather(data);
    //         } catch (error) {
    //             console.error("Weather error:", error);
    //             setError("Not load weather information")
    //         }
    //     }

    //     fetchWeather();

    // }, []);

    // if (error) {
    //     return <p>{error}</p>
    // }

    // if (!weather) {
    //     return <p>Loading weather info......</p>;
    // }

    return (
        <section className="weather-info">

            <h2> {weather.city}, {weather.country}</h2>

            <p>{weather.temperature} {weather.unit}</p>

            <p>{weather.headsUpText}</p>


        </section>
    );

}

export default Weather;