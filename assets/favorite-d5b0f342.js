import{O as E,s as m}from"./modal-299d40b9.js";const y=localStorage.getItem("quoteData");let u="",v="",h="";if(y){const{quote:e,author:t,date:n}=JSON.parse(y);u=e,v=t,h=n}const S=new Date().toLocaleDateString(),M=S!==h;M?fetch("https://your-energy.b.goit.study/api/quote").then(e=>e.json()).then(e=>{u=e.quote,v=e.author,h=S,localStorage.setItem("quoteData",JSON.stringify({quote:u,author:v,date:h})),q(u,v)}).catch(e=>{console.error("Error",e)}):q(u,v);function q(e,t){const n=document.querySelector(".fav-quote"),s=document.querySelector(".fav-quotes-author");n.textContent=e,s.textContent=t}let g=[],p=1,c=8;function b(){const e=window.innerWidth;e<768?c=8:e>=768&&e<1280?c=10:e>=1280&&(c=6),x(p)}window.addEventListener("resize",b);b();function w(){g=Object.values(localStorage).map(e=>{try{return JSON.parse(e)}catch{return null}}).filter(e=>e&&e._id)}function C(e){localStorage.removeItem(e)}function $({name:e,burnedCalories:t,bodyPart:n,target:s,_id:r}){return`
    <li class="fav-exercises-item">
      <div class="fav-exercises-header">
        <div class="fav-exercises-meta-container">
          <p class="fav-exercises-meta">WORKOUT</p>
          <button type="button" class="favorites-btn-trash">
            <svg width="16" height="16" data-card-id="${r}">
              <use href="${m}#icon-trash"></use>
            </svg>
          </button>
        </div>
        <div class="fav-btn-container">
          <button type="button" data-modal-open class="fav-exercises-btn open-modal-btn" data-exercise-id="${r}">Start
          <svg width="16" height="16" class="favorites-icon-arrow">
            <use id="favorites-icon-arrow" href="${m}#icon-arrow-right"></use>
          </svg></button>
        </div>
      </div>
      <div class="fav-exercises-name-container">
        <span class="fav-exercises-name-span">
          <svg width="24" height="24" class="fav-exercises-name-svg">
            <use href="${m}#icon-running-circled"></use>
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
    </li>`}function x(e){const t=document.querySelector(".favorites-container");t.innerHTML="";const n=(e-1)*c,s=n+c,r=g.slice(n,s);if(r.length===0){const a=document.querySelector(".fav-text");a.style.display="block"}else{const a=document.querySelector(".fav-text");a.style.display="none"}r.forEach(a=>{const o=$(a);t.insertAdjacentHTML("beforeend",o),t.querySelector(`[data-exercise-id="${a._id}"]`).addEventListener("click",d=>{d.target.closest(".open-modal-btn")&&E(d)});const l=t.querySelector(`[data-card-id="${a._id}"]`);l.addEventListener("click",d=>{d.stopPropagation(),C(a._id);const f=l.closest(".fav-exercises-item");f&&f.remove()})})}function L(e,t){const n=document.getElementById("pagination");n.innerHTML="";const s=Math.ceil(g.length/c),r=7;let a=[];s<=r?a=Array.from({length:s},(o,i)=>i+1):t<=2+1?a=[1,2,3,4,"...",s]:t>=s-2?a=[1,"...",s-3,s-2,s-1,s]:a=[1,"...",t-1,t,t+1,"...",s],a.forEach(o=>{const i=document.createElement("button");if(i.textContent=o==="..."?"...":o,i.dataset.pageNumber=o==="..."?null:o,o===t&&i.classList.add("active"),o!=="..."){i.addEventListener("click",d=>{const f=parseInt(o);x(f)});const l=n.querySelector("button.active");l&&l.classList.remove("active")}else i.disabled=!0;n.appendChild(i)})}function B(){w(),x(p),L({totalPages:Math.ceil(g.length/c),page:p},p)}B();
