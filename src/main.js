// Kütüphane importları ve stilleri
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Kendi yazdığımız modüllerin importları
import { fetchImages } from "./pixabay-api.js";
import { createGalleryMarkup } from "./render-functions.js";

// DOM elementlerini seçme
const form = document.querySelector("#search-form");
const gallery = document.querySelector("#gallery");
const loader = document.querySelector("#loader");

// SimpleLightbox instance'ını bir kez dışarıda başlatıyoruz
let lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
});

form.addEventListener("submit", handleSearch);

function handleSearch(event) {
    event.preventDefault();

    // Kullanıcının girdiği terimi al ve sağındaki solundaki boşlukları temizle
    const searchWord = event.currentTarget.elements.searchQuery.value.trim();

    // Boş arama kontrolü
    if (searchWord === "") {
        iziToast.warning({
            title: "Uyarı",
            message: "Lütfen bir arama terimi girin!",
            position: "topRight"
        });
        return;
    }

    // Yeni arama başlamadan önce eski galeriyi temizle
    gallery.innerHTML = "";

    // Yükleme göstergesini aktif et (hidden sınıfını kaldır)
    loader.classList.remove("hidden");

    // API isteğini başlat
    fetchImages(searchWord)
        .then(data => {
            // Eğer gelen veri boş bir diziyse (görsel bulunamadıysa)
            if (data.hits.length === 0) {
                iziToast.error({
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: "topRight"
                });
                return;
            }

            // Arayüz kartlarını oluştur ve galeriye ekle
            const markup = createGalleryMarkup(data.hits);
            gallery.innerHTML = markup;

            // SimpleLightbox'ı yeni öğeler için tazele (refresh)
            lightbox.refresh();
        })
        .catch(error => {
            console.error(error);
            iziToast.error({
                title: "Hata",
                message: "Bir şeyler ters gitti, lütfen daha sonra tekrar deneyin.",
                position: "topRight"
            });
        })
        .finally(() => {
            // İstek başarılı veya başarısız bittiğinde loader'ı tekrar gizle
            loader.classList.add("hidden");
            form.reset(); // Form kutusunu temizle
        });
}