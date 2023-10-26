import{O as S,a as B,s as f,N as v}from"./modal-db83b566.js";const $=localStorage.getItem("quoteData");let g="",y="",x="";if($){const{quote:e,author:t,date:s}=JSON.parse($);g=e,y=t,x=s}const k=new Date().toLocaleDateString(),D=k!==x;D?fetch("https://your-energy.b.goit.study/api/quote").then(e=>e.json()).then(e=>{g=e.quote,y=e.author,x=k,localStorage.setItem("quoteData",JSON.stringify({quote:g,author:y,date:x})),P(g,y)}).catch(e=>{console.error("Error",e)}):P(g,y);function P(e,t){const s=document.querySelector(".quote"),c=document.querySelector(".author");s.textContent=e,c.textContent=t}const F=Object.freeze({BASE_URL:"https://your-energy.b.goit.study/api",EXERCISE_ENDPOINT:"/exercises",RATING_ENDPOINT:"/rating",FILTERS_ENDPOINT:"/filters",QUOTE_ENDPOINT:"/quote",SUBSCR_EDPOINT:"/subscription"}),{BASE_URL:M,EXERCISE_ENDPOINT:N}=F;function R(){return window.matchMedia("(min-width: 768px)").matches?10:8}document.querySelector("#bodyPartsButton").addEventListener("click",b);document.querySelector("#musclesButton").addEventListener("click",b);document.querySelector("#equipmentButton").addEventListener("click",b);function b(){const e=document.getElementById("exerciseResult");e.textContent=""}function _(e){const t=e.currentTarget,s=t.dataset.category,c=t.dataset.name,l=document.getElementById("exerciseResult");A(s,c).then(n=>{const u=n.results[0].bodyPart;l.innerHTML=`<span class="divider">/</span>${u}`;const m=document.querySelector(".filter-gallery");m.innerHTML=q(n.results),document.querySelectorAll(".exercises-btn").forEach(p=>p.addEventListener("click",S));const a=document.querySelector(".search-container"),o=U(s,c);a&&o&&a.insertAdjacentHTML("afterbegin",o);const i=a.querySelector(".search-form");i&&i.addEventListener("submit",Q);const d=a.querySelector(".search-input");d&&d.addEventListener("input",H);const h=a.querySelector(".clear-search-button");h&&h.addEventListener("click",j),I(n,t.dataset.category,t.dataset.name)}).catch(console.log)}async function A(e,t,s=1){const c=new URLSearchParams({[e]:t,limit:R(),page:s}),l=`${M}${N}?${c}`;return(await B.get(l)).data}function U(e,t){return`
    <form class="search-form" data-category="${e}" data-name="${t}">
      <input type="text" class="search-input" name="search-input" placeholder="Search">
      <button type="submit" class="search-button">
        <svg class="search-svg" width="18" height="18">
          <use href="${f}#icon-search"></use>
        </svg>
      </button>
      <button type="button" class="clear-search-button" style="display: none">
        <svg class="search-svg" width="18" height="18">
          <use href="${f}#icon-close"></use>
        </svg>
      </button>
    </form>
  `}function H(e){const t=e.target,s=t.parentNode.querySelector(".clear-search-button"),c=t.parentNode.querySelector(".search-button");t.value.trim()!==""?(s.style.display="block",c.style.display="none"):(s.style.display="none",c.style.display="block")}function j(e){const t=e.currentTarget,s=t.closest(".search-form");if(s){const c=s.querySelector(".search-input");c.value="",t.style.display="none";const l=s.querySelector(".search-button");l.style.display="block"}}function q(e){return`<ul class="exercises-list">${e.map(z).join("")}</ul>`}function z({rating:e,name:t,burnedCalories:s,bodyPart:c,target:l,_id:n}){return`<li class="exercises-item">
			<div class="exercises-header">
				<div class="exercises-meta-container">
					<p class="exercises-meta">WORKOUT</p>
					<div class="raiting-wrap">
						<p class="exercises-rating">
						${e.toFixed(1)}
						</p>
						<svg width="18" height="18" class="exercises-svg">
							<use href="${f}#icon-star"></use>
						</svg>
					</div>
				</div>
				<button type="button" class="exercises-btn"
				data-exercise-id="${n}" data-modal-exercise="open">
					Start
					<svg width="16" height="16" class="exercises-btn-svg">
						<use href="${f}#icon-arrow-right"></use>
					</svg>
				</button>
			</div>
			<div class="exercises-name-container">
				<span class="exercises-name-span">
				<svg width="20" height="20" class="exercises-name-svg">
					<use href="${f}#icon-running-circled"></use>
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
						${s} / 3 min
						</span>
					</li>
					<li class="exercises-descr-item">
						Body part:
						<span class="exercises-descr-span">
						${c}
						</span>
					</li>
					<li class="exercises-descr-item">
						Target:	
						<span class="exercises-descr-span">
						${l}	
						</span>
					</li>
				</ul>
		</li>`}function I(e,t,s){const c=document.getElementById("pagination");if(c.innerHTML="",e.totalPages>1){const l=e.page,n=e.totalPages;let u=[];if(n<=7)u=Array.from({length:n},(r,a)=>a+1);else{const r=l,a=2;r<=a+1?u=[1,2,3,4,"...",n]:r>=n-a?u=[1,"...",n-3,n-2,n-1,n]:u=[1,"...",r-1,r,r+1,"...",n]}u.forEach(r=>{const a=document.createElement("button");a.textContent=r==="..."?"...":r,a.dataset.pageNumber=r==="..."?null:r,r===l&&a.classList.add("active"),r!=="..."?a.addEventListener("click",o=>{const i=parseInt(r);A(t,s,i).then(h=>{const p=document.querySelector(".filter-gallery");p.innerHTML=q(h.results),document.querySelectorAll(".exercises-btn").forEach(O=>O.addEventListener("click",S))});const d=c.querySelector("button.active");d&&d.classList.remove("active"),o.currentTarget.classList.add("active"),I({totalPages:n,page:i},t,s)}):a.disabled=!0,c.appendChild(a)})}}function T(){const e=document.querySelector(".search-form");e&&e.remove()}function Q(e){e.preventDefault();const t=e.currentTarget.dataset.category,s=e.currentTarget.dataset.name,l=e.currentTarget.querySelector(".search-input").value;l&&G(t,s,l,1)}async function G(e,t,s,c){const l=R();try{const n=`${M}${N}?${e}=${t}&keyword=${s}&page=${c}&limit=${l}`,u=await B.get(n);if(u.data.results.length>0){const m=document.querySelector(".filter-gallery");m.innerHTML=q(u.data.results),document.querySelectorAll(".exercises-btn").forEach(a=>a.addEventListener("click",S)),I(u.data,e,t)}else v.Report.info("No results found","","Ok")}catch(n){console.error("Error fetching exercises:",n)}}function Z(){return window.matchMedia("(min-width: 768px)").matches?12:9}async function E(e,t=1){const s=Z();document.querySelectorAll(".filter").forEach(n=>n.classList.remove("active"));const l=document.getElementById(e.toLowerCase()+"Button");l&&l.classList.add("active");try{const n=`https://your-energy.b.goit.study/api/filters?filter=${e}&page=${t}&limit=${s}`,u=await fetch(n);if(u.ok){const m=await u.json(),r=document.getElementById("imageFilterGallery");if(r.innerHTML="",m.results.length>0)m.results.forEach(o=>{const i=document.createElement("div");i.classList.add("image-card"),i.addEventListener("click",_);const d=document.createElement("img");d.src=o.imgURL,d.alt=o.name,d.classList.add("image");const h=document.createElement("p");h.textContent=`${o.name}`,h.classList.add("nameText"),i.dataset.name=o.name;const p=document.createElement("p");p.textContent=`${o.filter}`,p.classList.add("filterText"),i.dataset.category=J(o.filter),i.appendChild(d),i.appendChild(h),i.appendChild(p),r.appendChild(i)});else{const o=document.createElement("p");o.textContent="Nothing was found for this query. Please try again.",r.appendChild(o)}const a=document.getElementById("pagination");if(a.innerHTML="",m.totalPages>1)for(let o=1;o<=m.totalPages;o++){const i=document.createElement("button");i.textContent=o,i.addEventListener("click",()=>{E(e,o)}),o===t&&i.classList.add("active"),a.appendChild(i)}}else console.error("Error fetching images from the API")}catch(n){console.error("An error occurred:",n)}}const L=document.getElementById("bodyPartsButton"),C=document.getElementById("musclesButton"),w=document.getElementById("equipmentButton");L.addEventListener("click",function(){T(),E("Body parts"),L.classList.add("active")});C.addEventListener("click",function(){T(),E("Muscles"),C.classList.add("active")});w.addEventListener("click",function(){T(),E("Equipment"),w.classList.add("active")});function J(e){return e==="Body parts"?e.replace(/\s/g,"").toLowerCase().slice(0,-1):e.replace(/\s/g,"").toLowerCase()}window.addEventListener("load",()=>{E("Body parts"),L.classList.add("active")});v.Notify.init();document.querySelector("#subscriptionForm").addEventListener("submit",function(e){e.preventDefault();const t=document.querySelector("#email"),s=t.value;X(s)?B.post("https://your-energy.b.goit.study/api/subscription",{email:s}).then(function(c){v.Notify.success("Ваш запит успішно відправлено"),t.value=""}).catch(function(c){v.Notify.failure("Помилка відправки запиту"),t.value=""}):v.Notify.failure("Будь ласка, введіть коректну електронну пошту")});function X(e){return/[a-zA-Z0-9._\%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(e)}
