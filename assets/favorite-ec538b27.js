import{O as E,s as g}from"./sprite-c6c6f23f.js";const y=localStorage.getItem("quoteData");let d="",u="",v="";if(y){const{quote:e,author:t,date:n}=JSON.parse(y);d=e,u=t,v=n}const S=new Date().toLocaleDateString(),M=S!==v;M?fetch("https://your-energy.b.goit.study/api/quote").then(e=>e.json()).then(e=>{d=e.quote,u=e.author,v=S,localStorage.setItem("quoteData",JSON.stringify({quote:d,author:u,date:v})),q(d,u)}).catch(e=>{console.error("Error",e)}):q(d,u);function q(e,t){const n=document.querySelector(".fav-quote"),s=document.querySelector(".fav-quotes-author");n.textContent=e,s.textContent=t}let p=[],f=1,c=8;function b(){const e=window.innerWidth;e<768?c=8:e>=768&&e<1280?c=10:e>=1280&&(c=6),m(f)}window.addEventListener("resize",b);b();function w(){p=Object.values(localStorage).map(e=>{try{return JSON.parse(e)}catch{return null}}).filter(e=>e&&e._id)}function C(e){localStorage.removeItem(e)}function $({name:e,burnedCalories:t,bodyPart:n,target:s,_id:r}){return`
    <li class="fav-exercises-item">
      <div class="fav-exercises-header">
        <div class="fav-exercises-meta-container">
          <p class="fav-exercises-meta">WORKOUT</p>
          <button type="button" class="favorites-btn-trash">
            <svg width="16" height="16" data-card-id="${r}">
              <use href="${g}#icon-trash"></use>
            </svg>
          </button>
        </div>
        <div class="fav-btn-container">
          <button type="button" data-modal-open class="fav-exercises-btn open-modal-btn" data-exercise-id="${r}">Start
          <svg width="16" height="16" class="favorites-icon-arrow">
            <use id="favorites-icon-arrow" href="${g}#icon-arrow-right"></use>
          </svg></button>
        </div>
      </div>
      <div class="fav-exercises-name-container">
        <span class="fav-exercises-name-span">
          <svg width="24" height="24" class="fav-exercises-name-svg">
            <use href="${g}#icon-running-circled"></use>
          </svg>
        </span>
        <p class="fav-exercises-name">
          ${e}
        </p>
      </div>
      <ul class="fav-exercises-descr-list">
        <li class="fav-exercises-descr-item">
          <span class="fav-exercises-descr-span">
            Burned calories:
          </span>
          ${t} / 3 min
        </li>
        <li class="fav-exercises-descr-item">
          <span class="fav-exercises-descr-span">
            Body part:
          </span>
          ${n}
        </li>
        <li class="fav-exercises-descr-item">
          <span class="fav-exercises-descr-span">
            Target:
          </span>
          ${s}
        </li>
      </ul>
    </li>`}function m(e){const t=document.querySelector(".favorites-container");t.innerHTML="";const n=(e-1)*c,s=n+c,r=p.slice(n,s);if(r.length===0){const a=document.querySelector(".fav-text");a.style.display="block"}else{const a=document.querySelector(".fav-text");a.style.display="none"}r.forEach(a=>{const o=$(a);t.insertAdjacentHTML("beforeend",o),t.querySelector(`[data-exercise-id="${a._id}"]`).addEventListener("click",l=>{l.target.closest(".open-modal-btn")&&E(l)});const h=t.querySelector(`[data-card-id="${a._id}"]`);h.addEventListener("click",l=>{l.stopPropagation(),C(a._id);const x=h.closest(".fav-exercises-item");x&&x.remove()})})}function L(e,t){const n=document.getElementById("pagination");n.innerHTML="";const s=Math.ceil(p.length/c),r=7;let a=[];s<=r?a=Array.from({length:s},(o,i)=>i+1):t<=2+1?a=[1,2,3,4,"...",s]:t>=s-2?a=[1,"...",s-3,s-2,s-1,s]:a=[1,"...",t-1,t,t+1,"...",s],a.forEach(o=>{const i=document.createElement("button");i.textContent=o==="..."?"...":o,i.dataset.pageNumber=o==="..."?null:o,o===t&&i.classList.add("active"),o!=="..."?i.addEventListener("click",h=>{const l=parseInt(o);m(l)}):i.disabled=!0,n.appendChild(i)})}function T(){w(),m(f),L({totalPages:Math.ceil(p.length/c),page:f},f)}T();
