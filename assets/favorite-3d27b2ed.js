import{O as b,s as m}from"./modal-e56d21d0.js";const x=localStorage.getItem("quoteData");let u="",f="",g="";if(x){const{quote:e,author:t,date:a}=JSON.parse(x);u=e,f=t,g=a}const S=new Date().toLocaleDateString(),C=S!==g;C?fetch("https://your-energy.b.goit.study/api/quote").then(e=>e.json()).then(e=>{u=e.quote,f=e.author,g=S,localStorage.setItem("quoteData",JSON.stringify({quote:u,author:f,date:g})),q(u,f)}).catch(e=>{console.error("Error",e)}):q(u,f);function q(e,t){const a=document.querySelector(".fav-quote"),s=document.querySelector(".fav-quotes-author");a.textContent=e,s.textContent=t}let v=[],h=1,c=8;function w(){const e=window.innerWidth;e<768?c=8:e>=768&&e<1280?(c=10,E()):e>=1280&&(c=v.length,M()),y(h)}window.addEventListener("resize",w);function E(){const e=document.getElementById("pagination");e.style.display="block";const t=document.querySelector(".favorites-container");t.style.maxHeight="auto",t.style.overflowY="hidden"}function M(){const e=document.getElementById("pagination");e.style.display="none";const t=document.querySelector(".favorites-container");t.style.maxHeight="487px",t.style.overflowY="scroll"}function B(){v=Object.values(localStorage).map(e=>{try{return JSON.parse(e)}catch{return null}}).filter(e=>e&&e._id)}function $(e){localStorage.removeItem(e)}function I({name:e,burnedCalories:t,bodyPart:a,target:s,_id:r}){return`
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
          ${a}
        </li>
        <li class="fav-exercises-descr-item">
          <span class="fav-exercises-descr-span">
            Target:
          </span>
          ${s}
        </li>
      </ul>
    </li>`}function y(e){const t=document.querySelector(".favorites-container");t.innerHTML="";const a=(e-1)*c,s=a+c,r=v.slice(a,s);if(r.length===0){const n=document.querySelector(".fav-text");n.style.display="block"}else{const n=document.querySelector(".fav-text");n.style.display="none"}r.forEach(n=>{const o=I(n);t.insertAdjacentHTML("beforeend",o),t.querySelector(`[data-exercise-id="${n._id}"]`).addEventListener("click",d=>{d.target.closest(".open-modal-btn")&&b(d)});const l=t.querySelector(`[data-card-id="${n._id}"]`);l.addEventListener("click",d=>{d.stopPropagation(),$(n._id);const p=l.closest(".fav-exercises-item");p&&p.remove()})})}function L(e,t){const a=document.getElementById("pagination");a.innerHTML="";const s=Math.ceil(v.length/c),r=7;let n=[];s<=r?n=Array.from({length:s},(o,i)=>i+1):t<=2+1?n=[1,2,3,4,"...",s]:t>=s-2?n=[1,"...",s-3,s-2,s-1,s]:n=[1,"...",t-1,t,t+1,"...",s],n.forEach(o=>{const i=document.createElement("button");if(i.textContent=o==="..."?"...":o,i.dataset.pageNumber=o==="..."?null:o,o===t&&i.classList.add("active"),o!=="..."){i.addEventListener("click",d=>{const p=parseInt(o);y(p)});const l=a.querySelector("button.active");l&&l.classList.remove("active")}else i.disabled=!0;a.appendChild(i)})}function k(){B(),y(h),L({totalPages:Math.ceil(v.length/c),page:h},h)}k();
