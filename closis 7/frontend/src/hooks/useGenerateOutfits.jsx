import { useState } from "react";

// helper: read the logged-in user's token
const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
        return null;
    }
    return user.token;
};

// helper: wardrobe items saved by the Wardrobe page (localStorage "wardrobeItems")
const getWardrobeItems = () => {
    try {
        const saved = JSON.parse(localStorage.getItem("wardrobeItems"));
        if (Array.isArray(saved)) {
            return saved;
        }
        return [];
    } catch {
        return [];
    }
};

// Generate / regenerate / save outfits for the Start page.
//   generate(request)  -> new outfits (forgets what was shown before)
//   regenerate()       -> new outfits that are different from all shown so far
//   saveOutfit(outfit) -> save one outfit to History
export default function useGenerateOutfits() {
    const [result, setResult] = useState(null); // last answer from the backend
    const [lastRequest, setLastRequest] = useState(null); // destination, preferences, weather
    const [shownCombos, setShownCombos] = useState([]); // every combo shown, e.g. [["1","3"], ["2","4","5"]]
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // the shared part of generate + regenerate
    const requestOutfits = async (request, previousOutfits) => {
        setIsLoading(true);
        setError(null);

        const token = getToken();
        if (!token) {
            setError("You must be logged in to generate outfits");
            setIsLoading(false);
            return null;
        }

        // 1. wardrobe from localStorage. Big base64 photos are not sent (the AI doesn't need them),
        //    we put them back on the results below.
        const wardrobe = getWardrobeItems();
        const itemsToSend = wardrobe.map((item) => {
            const copy = { ...item };
            if (typeof copy.image === "string" && copy.image.startsWith("data:")) {
                delete copy.image;
            }
            return copy;
        });

        try {
            // 2. ask the backend
            const response = await fetch("/api/outfits/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    destination: request.destination,
                    preferences: request.preferences,
                    weather: request.weather,
                    city: request.city,
                    items: itemsToSend,
                    previousOutfits: previousOutfits
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                setIsLoading(false);
                return null;
            }

            // 3. put the local photos back on each item (matched by id)
            const photoById = {};
            for (const item of wardrobe) {
                if (item.image) {
                    photoById[String(item.id)] = item.image;
                }
            }
            for (const outfit of data.outfitItems) {
                for (const item of outfit.items) {
                    if (!item.image && photoById[item.id]) {
                        item.image = photoById[item.id];
                    }
                }
            }

            // 4. remember what we showed, so regenerate can avoid it
            const newCombos = data.outfitItems.map((outfit) => outfit.itemIds);
            setShownCombos([...previousOutfits, ...newCombos]);
            setResult(data);
            setIsLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            return null;
        }
    };

    // first time: start fresh
    const generate = async (request) => {
        setLastRequest(request);
        return requestOutfits(request, []);
    };

    // "Regenerate": same request, but tell the backend what was already shown
    const regenerate = async () => {
        if (!lastRequest) {
            return null;
        }
        return requestOutfits(lastRequest, shownCombos);
    };

    // save one outfit to History (POST /api/outfits)
    const saveOutfit = async (outfit) => {
        const token = getToken();
        if (!token || !result) {
            return false;
        }

        // weather text shown on the History page, e.g. "12°C, rainy"
        let weatherText = "";
        if (result.weather) {
            weatherText = `${result.weather.temperature}°C, ${result.weather.condition}`;
        }

        // first item with a photo becomes the outfit picture
        let image = "";
        const itemWithPhoto = outfit.items.find((item) => item.image);
        if (itemWithPhoto) {
            image = itemWithPhoto.image;
        }

        try {
            const response = await fetch("/api/outfits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: outfit.name,
                    image: image,
                    weather: weatherText,
                    destination: result.destination,
                    style: result.preferences,
                    items: outfit.items
                })
            });
            return response.ok;
        } catch {
            return false;
        }
    };

    // back to the form
    const reset = () => {
        setResult(null);
        setShownCombos([]);
        setError(null);
    };

    return { result, isLoading, error, generate, regenerate, saveOutfit, reset };
}
