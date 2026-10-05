import { getWeatherForCity } from "../services/weatherService.js";

// GET /api/weather?city=Helsinki

const handleGetWeather = async (req, res) => {
  const city = req.query.city;

  // city is required
  if (!city) {
    return res.status(400).json({ error: "Missing required query param: city" });
  }

  try {
    const weather = await getWeatherForCity(city);
    res.status(200).json(weather);
  } catch (error) {
    // unknown city -> 404, anything else (Open-Meteo down) -> 502
    if (error.message.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }
    res.status(502).json({ error: "Could not get the weather right now" });
  }
};

export { handleGetWeather };
