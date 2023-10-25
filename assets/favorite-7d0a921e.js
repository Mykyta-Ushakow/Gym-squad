import"./modal-fb76c29f.js";const f=localStorage.getItem("quoteData");let i="",l="",u="";if(f){const{quote:e,author:t,date:a}=JSON.parse(f);i=e,l=t,u=a}const g=new Date().toLocaleDateString(),S=g!==u;S?fetch("https://your-energy.b.goit.study/api/quote").then(e=>e.json()).then(e=>{i=e.quote,l=e.author,u=g,localStorage.setItem("quoteData",JSON.stringify({quote:i,author:l,date:u})),p(i,l)}).catch(e=>{console.error("Error",e)}):p(i,l);function p(e,t){const a=document.querySelector(".fav-quote"),r=document.querySelector(".fav-quotes-author");a.textContent=e,r.textContent=t}let d=8,v;const n=window.innerWidth;n>=768&&n<1280?d=10:n>=1280&&(d=6);function m(){const e=document.querySelector(".favorites-container"),t=document.querySelector(".fav-text");e.innerHTML="";let a=0;for(let s in localStorage)if(localStorage.hasOwnProperty(s))try{const o=JSON.parse(localStorage[s]);if(o&&o._id){const c=h(o);if(e.insertAdjacentHTML("beforeend",c),a++,a>=d)break}}catch{}const r=document.getElementById("load-more-button");r.addEventListener("click",y),a<d?r.style.display="none":r.style.display="block",a>0?t.style.display="none":t.style.display="block"}const q=document.querySelectorAll("[data-modal-open]");q.forEach(e=>{e.addEventListener("click",openModal)});function h({name:e,burnedCalories:t,bodyPart:a,target:r,_id:s}){return`
    <li class="fav-exercises-item" data-exercise-id="${s}">
      <div class="fav-exercises-header">
        <div class="fav-exercises-meta-container">
          <p class="fav-exercises-meta">WORKOUT</p>
          <svg width="16" height="16" class="favorites-icon-trash" data-card-id="${s}">
            <use href="./img/sprite.svg#icon-trash"></use>
          </svg>
        </div>
        <div class="fav-btn-container">
          <button type="button" data-modal-open class="fav-exercises-btn open-modal-btn">Start</button>
          <svg width="16" height="16" class="favorites-icon-arrow">
            <use id="favorites-icon-arrow" href="./img/sprite.svg#icon-arrow-right"></use>
          </svg>
        </div>
      </div>
      <div class="fav-exercises-name-container">
        <span class="fav-exercises-name-span">
          <svg width="24" height="24" class="fav-exercises-name-svg">
            <use href="../img/sprite.svg#icon-running-circled"></use>
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
          ${r}
        </li>
      </ul>
    </li>`}const b=document.querySelectorAll(".favorites-icon-trash");b.forEach(e=>{e.addEventListener("click",k)});function k(e){const t=e.currentTarget.getAttribute("data-card-id");localStorage.removeItem(t),m()}function y(){const e=document.querySelectorAll(".fav-exercises-item").length;let t=d;n>=768&&n<1280?t=10:n>=1280&&(t=6);const a=e,r=a+t;for(let s=a;s<r&&s<localStorage.length;s++){const o=`exercise_${s}`,c=JSON.parse(localStorage.getItem(o));if(c&&c._id){const x=h(c);document.querySelector(".favorites-container").insertAdjacentHTML("beforeend",x)}a+t>=localStorage.length&&(v.style.display="none")}}v=document.getElementById("load-more-button");v.addEventListener("click",y);m();
