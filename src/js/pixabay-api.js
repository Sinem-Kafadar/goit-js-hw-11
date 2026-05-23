// Api key ve base url'yi tanımlıyoruz
const API_KEY = "55935956-ece2cee4535cd5803e1c6407f";
const BASE_URL = "https://pixabay.com/api/";

export function fetchImages(query) {
    // İstenen zorunlu parametreleri URLSearchParams ile güvenli bir şekilde hazırla
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true"
    });

    // fetch fonksiyonunu return ederek söz (promise) yapısını main.js'e taşıyoruz
    return fetch(`${BASE_URL}?${searchParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ağ hatası oluştu!");
            }
            return response.json();
        });
}