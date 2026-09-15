// we chose open-meteo for the free sources
function getWeatherCategory(code) {
    if (code === 0 || code === 1) { // wmo weather interpretation codes
        return "sunny";
    }
    if (code === 2 || code === 3) {
        return "cloudy";
    }
    if (code === 45 || code === 48) {
        return "foggy";
    }
    if (code >= 51 && code <= 67) {
        return "rainy";
    }
    if (code >= 80 && code <= 82) {
        return "rainy";
    }
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
        return "snowy";
    }
    if (code >= 95 && code <= 99) {
        return "stormy";
    }
    return "cloudy"; // fallback for any codes not covered above
}

function getHeadsUpMessage(category) {   // the heads-up phrase/text that we used in the FE message
    const messages = {
        sunny: "it's bright and sunny!",
        cloudy: "it's a bit cloudy",
        rainy: "it's rainy!",
        snowy: "it's snowy!",
        stormy: "there's a storm coming!",
        foggy: "it's foggy out there",
    };
    const message = messages[category];
    if (!message) {
        return "the wweather is a bit unpredictable!";
    }
    return message;
}

function getWeatherLabel(code) { // label for the weather code
    const labels = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Drizzle: Light",
        53: "Drizzle: Moderate",
        55: "Drizzle: Dense intensity",
        56: "Freezing Drizzle: Light",
        57: "Freezing Drizzle: Dense intensity",
        61: "Rain: Slight",
        63: "Rain: Moderate",
        65: "Rain: Heavy intensity",
        66: "Freezing Rain: Light",
        67: "Freezing Rain: Heavy intensity",
        71: "Snow fall: Slight",
        73: "Snow fall: Moderate",
        75: "Snow fall: Heavy intensity",
        77: "Snow grains",
        80: "Rain showers: Slight",
        81: "Rain showers: Moderate",
        82: "Rain showers: Violent",
        85: "Snow showers slight",
        86: "Snow showers heavy",
        95: "Thunderstorm: Slight or moderate",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail",
    };
    return labels[code] || "Unknown weather code";
    }

export default {getWeatherCategory,
                getHeadsUpMessage, 
                getWeatherLabel
};