/* empty css                      */import{S as m,i as a}from"./assets/vendor-5ObWk2rO.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const d="55935956-ece2cee4535cd5803e1c6407f",p="https://pixabay.com/api/";function h(o){const i=new URLSearchParams({key:d,q:o,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`${p}?${i}`).then(t=>{if(!t.ok)throw new Error("Ağ hatası oluştu!");return t.json()})}function g(o){return o.map(({webformatURL:i,largeImageURL:t,tags:s,likes:e,views:r,comments:n,downloads:f})=>`
            <li class="gallery-item">
                <a class="gallery-link" href="${t}">
                    <img class="gallery-image" src="${i}" alt="${s}" title="${s}" />
                </a>
                <div class="info-box">
                    <p class="info-item"><b>Likes</b>${e}</p>
                    <p class="info-item"><b>Views</b>${r}</p>
                    <p class="info-item"><b>Comments</b>${n}</p>
                    <p class="info-item"><b>Downloads</b>${f}</p>
                </div>
            </li>
            `).join("")}const u=document.querySelector("#search-form"),c=document.querySelector("#gallery"),l=document.querySelector("#loader");let y=new m(".gallery a",{captionsData:"alt",captionDelay:250});u.addEventListener("submit",b);function b(o){o.preventDefault();const i=o.currentTarget.elements.searchQuery.value.trim();if(i===""){a.warning({title:"Uyarı",message:"Lütfen bir arama terimi girin!",position:"topRight"});return}c.innerHTML="",l.classList.remove("hidden"),h(i).then(t=>{if(t.hits.length===0){a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const s=g(t.hits);c.innerHTML=s,y.refresh()}).catch(t=>{console.error(t),a.error({title:"Hata",message:"Bir şeyler ters gitti, lütfen daha sonra tekrar deneyin.",position:"topRight"})}).finally(()=>{l.classList.add("hidden"),u.reset()})}
//# sourceMappingURL=index.js.map
