import{a as f,S as m,i as n}from"./assets/vendor-DQsIucmA.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const p="54451252-acf2605b3a5875783ea2964a1",g="https://pixabay.com/api/";function h(o){const r={key:p,q:o,image_type:"photo",orientation:"horizontal",safesearch:"true"};return f.get(g,{params:r}).then(i=>i.data)}const c=document.querySelector(".gallery"),l=document.querySelector(".loader"),y=new m(".gallery a",{captionsData:"alt",captionDelay:250});function b(o){const r=o.map(({webformatURL:i,largeImageURL:s,tags:e,likes:t,views:a,comments:u,downloads:d})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${s}">
          <img class="gallery-image" src="${i}" alt="${e}" />
        </a>
        <div class="image-info">
          <div class="info-item"><b>Likes</b><span>${t}</span></div>
          <div class="info-item"><b>Views</b><span>${a}</span></div>
          <div class="info-item"><b>Comments</b><span>${u}</span></div>
          <div class="info-item"><b>Downloads</b><span>${d}</span></div>
        </div>
      </li>
    `).join("");c.insertAdjacentHTML("beforeend",r),y.refresh()}function v(){c.innerHTML=""}function L(){l.classList.add("is-visible")}function S(){l.classList.remove("is-visible")}const P=document.querySelector(".form");P.addEventListener("submit",o=>{o.preventDefault();const r=o.currentTarget,i=r.elements["search-text"].value.trim();if(i===""){n.warning({message:"Search field cannot be empty!",position:"topRight"});return}v(),L(),h(i).then(s=>{if(s.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}b(s.hits)}).catch(s=>{n.error({message:"An error occurred while fetching images. Please try again later.",position:"topRight"})}).finally(()=>{S(),r.reset()})});
//# sourceMappingURL=index.js.map
