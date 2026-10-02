// Weather photo for each condition the backend can return.
//
// HOW TO ADD YOUR OWN PHOTOS:
// 1. put the images in src/assets/weather/ (e.g. sunny.jpg)
// 2. import them here, e.g.  import sunnyPhoto from "../assets/weather/sunny.jpg";
// 3. put the import in the list below instead of null, e.g.  sunny: sunnyPhoto,
//
// While a value is null, the Start page shows a matching colour gradient instead.

const weatherPhotos = {
    sunny: null,
    cloudy: null,
    rainy: null,
    snowy: null,
    stormy: null,
    foggy: null,
};

// returns the photo for a condition, or null if there is none yet
export function getWeatherPhoto(condition) {
    if (weatherPhotos[condition]) {
        return weatherPhotos[condition];
    }
    return null;
}

// emoji shown next to the temperature
export function getWeatherEmoji(condition) {
    const emojis = {
        sunny: "☀️",
        cloudy: "☁️",
        rainy: "🌧️",
        snowy: "❄️",
        stormy: "⛈️",
        foggy: "🌫️",
    };
    if (emojis[condition]) {
        return emojis[condition];
    }
    return "🌤️";
}
