const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search"; // open-meteo's geocoding endponit, it takes a city name and returns coordinates
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast"; // send it latitude and it returns temp, weather code

//  !!! This part is aided by AI
async function geocodeCity(cityName) { //convert a city name to latitude/longtitude coordinate
    const url = `${GEOCODE_URL}?name=${encodeURIComponent(cityName)}&count=1`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Geocoding request failed");//if the request failed, stop here
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) { // 
        throw new Error(`City "${cityName}" not found`); 
    }

    const place = data.results[0]; //take the first match from the results array
    //console.log("Geocoding result:", place); // tets

    return { //return only things that we need 
        name: place.name,
        country: place.country,
        latitude: place.latitude,
        longitude: place.longitude,
    };
}

//fetch current temp + weather code 
async function getCurrentWeather(latitude, longitude) {
    const params = new URLSearchParams({
        latitude,
        longitude,
        current: "temperature_2m,weather_code",
        timezone: "auto",
    });

    const url = `${FORECAST_URL}?${params.toString()}`;
    //console.log("Requesting URL:", url); /7test
    const response = await fetch(url);

    if (!response.ok) {
        //const errorBody = await response.text(); // test
        //console.log("Status:", response.status); // tets
        //console.log("Open-Meteo error body:", errorBody); //test
        throw new Error("Weather request failed");
    }

    const data = await response.json();

    return {
        temperature: data.current.temperature_2m,
        weatherCode: data.current.weather_code,
    };
}

export { geocodeCity, getCurrentWeather };