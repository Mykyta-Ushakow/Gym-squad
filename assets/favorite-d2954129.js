import{s as h}from"./sprite-6ccbe8c9.js";const g=localStorage.getItem("quoteData");let l="",d="",f="";if(g){const{quote:e,author:t,date:n}=JSON.parse(g);l=e,d=t,f=n}const m=new Date().toLocaleDateString(),b=m!==f;b?fetch("https://your-energy.b.goit.study/api/quote").then(e=>e.json()).then(e=>{l=e.quote,d=e.author,f=m,localStorage.setItem("quoteData",JSON.stringify({quote:l,author:d,date:f})),x(l,d)}).catch(e=>{console.error("Error",e)}):x(l,d);function x(e,t){const n=document.querySelector(".fav-quote"),s=document.querySelector(".fav-quotes-author");n.textContent=e,s.textContent=t}let v=[],u=1,c=8;function y(){const e=window.innerWidth;e<768?c=8:e>=768&&e<1280?c=10:e>=1280&&(c=6),p(u)}window.addEventListener("resize",y);y();function S(){v=Object.values(localStorage).map(e=>{try{return JSON.parse(e)}catch{return null}}).filter(e=>e&&e._id)}function w({name:e,burnedCalories:t,bodyPart:n,target:s,_id:r}){return`
    <li class="fav-exercises-item" data-exercise-id="${r}">
      <div class="fav-exercises-header">
        <div class="fav-exercises-meta-container">
          <p class="fav-exercises-meta">WORKOUT</p>
          <button type="button" class="favorites-btn-trash">
            <svg width="16" height="16" data-card-id="${r}">
              <use href="${h}#icon-trash"></use>
            </svg>
          </button>
        </div>
        <div class="fav-btn-container">
          <button type="button" data-modal-open class="fav-exercises-btn open-modal-btn">Start</button>
          <svg width="16" height="16" class="favorites-icon-arrow">
            <use id="favorites-icon-arrow" href="${h}#icon-arrow-right"></use>
          </svg>
        </div>
      </div>
      <div class="fav-exercises-name-container">
        <span class="fav-exercises-name-span">
          <svg width="24" height="24" class="fav-exercises-name-svg">
            <use href="${h}#icon-running-circled"></use>
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
    </li>`}function p(e){const t=document.querySelector(".favorites-container");t.innerHTML="";const n=(e-1)*c,s=n+c,r=v.slice(n,s);if(r.length===0){const a=document.querySelector(".fav-text");a.style.display="block"}else{const a=document.querySelector(".fav-text");a.style.display="none"}r.forEach(a=>{const o=w(a);t.insertAdjacentHTML("beforeend",o)})}function C(e,t){const n=document.getElementById("pagination");n.innerHTML="";const s=Math.ceil(v.length/c),r=7;let a=[];s<=r?a=Array.from({length:s},(o,i)=>i+1):t<=2+1?a=[1,2,3,4,"...",s]:t>=s-2?a=[1,"...",s-3,s-2,s-1,s]:a=[1,"...",t-1,t,t+1,"...",s],a.forEach(o=>{const i=document.createElement("button");i.textContent=o==="..."?"...":o,i.dataset.pageNumber=o==="..."?null:o,o===t&&i.classList.add("active"),o!=="..."?i.addEventListener("click",M=>{const q=parseInt(o);p(q)}):i.disabled=!0,n.appendChild(i)})}function E(){S(),p(u),C({totalPages:Math.ceil(v.length/c),page:u},u)}E();
