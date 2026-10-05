
// Uses Open-Meteo: free, no API key needed.
import weatherCodeMap from "../utils/weatherCodeMap.js";

const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search"; // city name -> coordinates
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast"; // coordinates -> temperature + weather code

async function geocodeCity(cityName) {
  const url = `${GEOCODE_URL}?name=${encodeURIComponent(cityName)}&count=1`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Geocoding request failed");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error(`City "${cityName}" not found`);
  }

  // take the first match and return only what we need
  const place = data.results[0];
  return {
    name: place.name,
    country: place.country,
    latitude: place.latitude,
    longitude: place.longitude,
  };
}


async function getCurrentWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: "temperature_2m,weather_code",
    timezone: "auto",
  });

  const response = await fetch(`${FORECAST_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Weather request failed");
  }

  const data = await response.json();
  return {
    temperature: data.current.temperature_2m,
    weatherCode: data.current.weather_code,
  };
}


//    city -> { city, country, temperature, condition, weatherLabel, headsUpText, ... }
async function getWeatherForCity(cityName) {
  const location = await geocodeCity(cityName);
  const weather = await getCurrentWeather(location.latitude, location.longitude);

  // raw code -> simple category ("sunny", "rainy" ...). The FE picks the photo from this.
  const condition = weatherCodeMap.getWeatherCategory(weather.weatherCode);
  const headsUp = weatherCodeMap.getHeadsUpMessage(condition);
  const label = weatherCodeMap.getWeatherLabel(weather.weatherCode);
  const roundedTemp = Math.round(weather.temperature);

  return {
    city: location.name,
    country: location.country,
    temperature: roundedTemp,
    unit: "C",
    condition: condition,
    weatherLabel: label,
    headline: "Where are you heading today?",
    headsUpText: `A little heads-up, ${headsUp}, it is ${roundedTemp}°C.`,
  };
}

export { geocodeCity, getCurrentWeather, getWeatherForCity };
