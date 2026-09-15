import { geocodeCity, getCurrentWeather } from "../services/weatherService.js";
import weatherCodeMap from "../utils/weatherCodeMap.js";

async function handleGetWeather(req, res) {
    const city = req.query.city;
    if (!city) { // city is a reuired query param, if the user forgot to include the city, -> stop 
        res.status(400).json({ error: "missing required query param: city"});
        return;
    }
    try {
        const location = await geocodeCity(city); // turn the city name into coordinates
        const weather = await getCurrentWeather(location.latitude, location.longitude); // use coordinate to get weather 
        const category = weatherCodeMap.getWeatherCategory(weather.weatherCode); //convert raw weather code to simpler category
        const headsUp = weatherCodeMap.getHeadsUpMessage(category); // get the headsup phrase for that category
        const label = weatherCodeMap.getWeatherLabel(weather.weatherCode); // get the label for the raw code
        const roundedTemp = Math.round(weather.temperature); // round the temp to a whole number
        
        res.status(200).json({
            city: location.name,
            country: location.country,
            temperature: roundedTemp,
            unit: "C",
            condition: category, // for example, "rainy", fe usese this to pick the background
            headline: "Where are you heading today?",
            headsUpText: `A little heads-up, ${headsUp}, it is ${roundedTemp}°C.`,
            weatherLabel: label, 
        });
    } catch (error) {
        console.error("weather request failed:", error);  //this is wherer we landed if geocodeCity or getCurrentWeather threw an error earlier, -> send back a 500 server error
        res.status(500).json({ error: error.message});
    }
}
export { handleGetWeather}; 