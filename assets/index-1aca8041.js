import{O as S,a as B,s as v,N as E}from"./modal-1e9a751a.js";const b=localStorage.getItem("quoteData");let p="",f="",x="";if(b){const{quote:e,author:t,date:n}=JSON.parse(b);p=e,f=t,x=n}const P=new Date().toLocaleDateString(),R=P!==x;R?fetch("https://your-energy.b.goit.study/api/quote").then(e=>e.json()).then(e=>{p=e.quote,f=e.author,x=P,localStorage.setItem("quoteData",JSON.stringify({quote:p,author:f,date:x})),I(p,f)}).catch(e=>{console.error("Error",e)}):I(p,f);function I(e,t){const n=document.querySelector(".quote"),o=document.querySelector(".author");n.textContent=e,o.textContent=t}const D=Object.freeze({BASE_URL:"https://your-energy.b.goit.study/api",EXERCISE_ENDPOINT:"/exercises",RATING_ENDPOINT:"/rating",FILTERS_ENDPOINT:"/filters",QUOTE_ENDPOINT:"/quote",SUBSCR_EDPOINT:"/subscription"}),{BASE_URL:M,EXERCISE_ENDPOINT:A}=D;function k(){return window.matchMedia("(min-width: 768px)").matches?10:8}function _(e){const t=e.currentTarget,n=t.dataset.category,o=t.dataset.name;N(n,o).then(i=>{const s=document.querySelector(".filter-gallery");s.innerHTML=q(i.results),document.querySelectorAll(".exercises-btn").forEach(r=>r.addEventListener("click",S));const d=document.querySelector(".search-container"),a=F(n,o);d&&a&&d.insertAdjacentHTML("afterbegin",a);const c=d.querySelector(".search-form");c&&c.addEventListener("submit",H),T(i,t.dataset.category,t.dataset.name)}).catch(console.log)}async function N(e,t,n=1){const o=new URLSearchParams({[e]:t,limit:k(),page:n}),i=`${M}${A}?${o}`;return(await B.get(i)).data}function F(e,t){return`
    <form class="search-form" data-category="${e}" data-name="${t}">
      <input type="text" class="search-input" name="search-input" placeholder="Search">
      <button type="submit" class="search-button">
        <svg class="search-svg" width="18" height="18">
          <use href="${v}#icon-search"></use>
        </svg>
      </button>
    </form>
  `}function q(e){return`<ul class="exercises-list">${e.map(U).join("")}</ul>`}function U({rating:e,name:t,burnedCalories:n,bodyPart:o,target:i,_id:s}){return`<li class="exercises-item">
			<div class="exercises-header">
				<div class="exercises-meta-container">
					<p class="exercises-meta">WORKOUT</p>
					<div class="raiting-wrap">
						<p class="exercises-rating">
						${e.toFixed(1)}
						</p>
						<svg width="18" height="18" class="exercises-svg">
							<use href="${v}#icon-star"></use>
						</svg>
					</div>
				</div>
				<button type="button" class="exercises-btn"
				data-exercise-id="${s}" data-modal-exercise="open">
					Start
					<svg width="16" height="16" class="exercises-btn-svg">
						<use href="${v}#icon-arrow-right"></use>
					</svg>
				</button>
			</div>
			<div class="exercises-name-container">
				<span class="exercises-name-span">
				<svg width="20" height="20" class="exercises-name-svg">
					<use href="${v}#icon-running-circled"></use>
				</svg>
				</span>
				<p class="exercises-name">
					${t}
				</p>
			</div>
				<ul class="exercises-descr-list">
					<li class="exercises-descr-item">
						Burned calories:
						<span class="exercises-descr-span">
						${n} / 3 min
						</span>
					</li>
					<li class="exercises-descr-item">
						Body part:
						<span class="exercises-descr-span">
						${o}
						</span>
					</li>
					<li class="exercises-descr-item">
						Target:	
						<span class="exercises-descr-span">
						${i}	
						</span>
					</li>
				</ul>
		</li>`}function T(e,t,n){const o=document.getElementById("pagination");if(o.innerHTML="",e.totalPages>1){const i=e.page,s=e.totalPages;let u=[];if(s<=7)u=Array.from({length:s},(a,c)=>c+1);else{const a=i,c=2;a<=c+1?u=[1,2,3,4,"...",s]:a>=s-c?u=[1,"...",s-3,s-2,s-1,s]:u=[1,"...",a-1,a,a+1,"...",s]}u.forEach(a=>{const c=document.createElement("button");c.textContent=a==="..."?"...":a,c.dataset.pageNumber=a==="..."?null:a,a===i&&c.classList.add("active"),a!=="..."?c.addEventListener("click",r=>{const l=parseInt(a);N(t,n,l).then(g=>{const h=document.querySelector(".filter-gallery");h.innerHTML=q(g.results),document.querySelectorAll(".exercises-btn").forEach(O=>O.addEventListener("click",S))});const m=o.querySelector("button.active");m&&m.classList.remove("active"),r.currentTarget.classList.add("active"),T({totalPages:s,page:l},t,n)}):c.disabled=!0,o.appendChild(c)})}}function $(){const e=document.querySelector(".search-form");e&&e.remove()}function H(e){e.preventDefault();const t=e.currentTarget.dataset.category,n=e.currentTarget.dataset.name,i=e.currentTarget.querySelector(".search-input").value;i&&j(t,n,i,1)}async function j(e,t,n,o){const i=k();try{const s=`${M}${A}?${e}=${t}&keyword=${n}&page=${o}&limit=${i}`,u=await B.get(s);if(console.log(u),u.data.results.length>0){const d=document.querySelector(".filter-gallery");d.innerHTML=q(u.data.results),document.querySelectorAll(".exercises-btn").forEach(c=>c.addEventListener("click",S)),T(u.data,e,t)}else{const d=document.querySelector(".filter-gallery");d.innerHTML="<p>No results found.</p>"}}catch(s){console.error("Error fetching exercises:",s)}}function z(){return window.matchMedia("(min-width: 768px)").matches?12:9}async function y(e,t=1){const n=z();document.querySelectorAll(".filter").forEach(s=>s.classList.remove("active"));const i=document.getElementById(e.toLowerCase()+"Button");i&&i.classList.add("active");try{const s=`https://your-energy.b.goit.study/api/filters?filter=${e}&page=${t}&limit=${n}`,u=await fetch(s);if(u.ok){const d=await u.json(),a=document.getElementById("imageFilterGallery");if(a.innerHTML="",d.results.length>0)d.results.forEach(r=>{const l=document.createElement("div");l.classList.add("image-card"),l.addEventListener("click",_);const m=document.createElement("img");m.src=r.imgURL,m.alt=r.name,m.classList.add("image");const g=document.createElement("p");g.textContent=`${r.name}`,g.classList.add("nameText"),l.dataset.name=r.name;const h=document.createElement("p");h.textContent=`${r.filter}`,h.classList.add("filterText"),l.dataset.category=Q(r.filter),l.appendChild(m),l.appendChild(g),l.appendChild(h),a.appendChild(l)});else{const r=document.createElement("p");r.textContent="Nothing was found for this query. Please try again.",a.appendChild(r)}const c=document.getElementById("pagination");if(c.innerHTML="",d.totalPages>1)for(let r=1;r<=d.totalPages;r++){const l=document.createElement("button");l.textContent=r,l.addEventListener("click",()=>{y(e,r)}),r===t&&l.classList.add("active"),c.appendChild(l)}}else console.error("Error fetching images from the API")}catch(s){console.error("An error occurred:",s)}}const L=document.getElementById("bodyPartsButton"),w=document.getElementById("musclesButton"),C=document.getElementById("equipmentButton");L.addEventListener("click",function(){$(),y("Body parts"),L.classList.add("active")});w.addEventListener("click",function(){$(),y("Muscles"),w.classList.add("active")});C.addEventListener("click",function(){$(),y("Equipment"),C.classList.add("active")});function Q(e){return e==="Body parts"?e.replace(/\s/g,"").toLowerCase().slice(0,-1):e.replace(/\s/g,"").toLowerCase()}window.addEventListener("load",()=>{y("Body parts"),L.classList.add("active")});E.Notify.init();document.querySelector("#subscriptionForm").addEventListener("submit",function(e){e.preventDefault();const t=document.querySelector("#email"),n=t.value;G(n)?B.post("https://your-energy.b.goit.study/api/subscription",{email:n}).then(function(o){E.Notify.success("Ваш запит успішно відправлено"),t.value=""}).catch(function(o){E.Notify.failure("Помилка відправки запиту"),t.value=""}):E.Notify.failure("Будь ласка, введіть коректну електронну пошту")});function G(e){return/[a-zA-Z0-9._\%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(e)}
