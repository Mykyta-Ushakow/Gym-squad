import{O as L,a as S,s as f,N as v}from"./modal-299d40b9.js";const T=localStorage.getItem("quoteData");let g="",y="",x="";if(T){const{quote:e,author:t,date:s}=JSON.parse(T);g=e,y=t,x=s}const w=new Date().toLocaleDateString(),F=w!==x;F?fetch("https://your-energy.b.goit.study/api/quote").then(e=>e.json()).then(e=>{g=e.quote,y=e.author,x=w,localStorage.setItem("quoteData",JSON.stringify({quote:g,author:y,date:x})),$(g,y)}).catch(e=>{console.error("Error",e)}):$(g,y);function $(e,t){const s=document.querySelector(".quote"),r=document.querySelector(".author");s.textContent=e,r.textContent=t}const D=Object.freeze({BASE_URL:"https://your-energy.b.goit.study/api",EXERCISE_ENDPOINT:"/exercises",RATING_ENDPOINT:"/rating",FILTERS_ENDPOINT:"/filters",QUOTE_ENDPOINT:"/quote",SUBSCR_EDPOINT:"/subscription"}),{BASE_URL:M,EXERCISE_ENDPOINT:N}=D;function R(){return window.matchMedia("(min-width: 768px)").matches?10:8}document.querySelector("#bodyPartsButton").addEventListener("click",B);document.querySelector("#musclesButton").addEventListener("click",B);document.querySelector("#equipmentButton").addEventListener("click",B);function B(){const e=document.getElementById("exerciseResult");e.textContent=""}function _(e){const t=e.currentTarget,s=t.dataset.category,r=t.dataset.name,l=document.getElementById("exerciseResult");A(s,r).then(n=>{const u=n.results[0].bodyPart;l.innerHTML=`<span class="divider">/</span>${u}`;const m=document.querySelector(".filter-gallery");m.innerHTML=q(n.results),document.querySelectorAll(".exercises-btn").forEach(p=>p.addEventListener("click",L));const a=document.querySelector(".search-container"),o=U(s,r);a&&o&&a.insertAdjacentHTML("afterbegin",o);const i=a.querySelector(".search-form");i&&i.addEventListener("submit",Q);const d=a.querySelector(".search-input");d&&d.addEventListener("input",H);const h=a.querySelector(".clear-search-button");h&&h.addEventListener("click",j),I(n,t.dataset.category,t.dataset.name)}).catch(console.log)}async function A(e,t,s=1){const r=new URLSearchParams({[e]:t,limit:R(),page:s}),l=`${M}${N}?${r}`;return(await S.get(l)).data}function U(e,t){return`
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
  `}function H(e){const t=e.target,s=t.parentNode.querySelector(".clear-search-button"),r=t.parentNode.querySelector(".search-button");t.value.trim()!==""?(s.style.display="block",r.style.display="none"):(s.style.display="none",r.style.display="block")}function j(e){const t=e.currentTarget,s=t.closest(".search-form");if(s){const r=s.querySelector(".search-input");r.value="",t.style.display="none";const l=s.querySelector(".search-button");l.style.display="block"}}function q(e){return`<ul class="exercises-list">${e.map(z).join("")}</ul>`}function z({rating:e,name:t,burnedCalories:s,bodyPart:r,target:l,_id:n}){return`<li class="exercises-item">
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
						${r}
						</span>
					</li>
					<li class="exercises-descr-item">
						Target:	
						<span class="exercises-descr-span">
						${l}	
						</span>
					</li>
				</ul>
		</li>`}function I(e,t,s){const r=document.getElementById("pagination");if(r.innerHTML="",e.totalPages>1){const l=e.page,n=e.totalPages;let u=[];if(n<=7)u=Array.from({length:n},(c,a)=>a+1);else{const c=l,a=2;c<=a+1?u=[1,2,3,4,"...",n]:c>=n-a?u=[1,"...",n-3,n-2,n-1,n]:u=[1,"...",c-1,c,c+1,"...",n]}u.forEach(c=>{const a=document.createElement("button");a.textContent=c==="..."?"...":c,a.dataset.pageNumber=c==="..."?null:c,c===l&&a.classList.add("active"),c!=="..."?a.addEventListener("click",o=>{const i=parseInt(c);A(t,s,i).then(h=>{const p=document.querySelector(".filter-gallery");p.innerHTML=q(h.results),document.querySelectorAll(".exercises-btn").forEach(O=>O.addEventListener("click",L))});const d=r.querySelector("button.active");d&&d.classList.remove("active"),o.currentTarget.classList.add("active"),I({totalPages:n,page:i},t,s)}):a.disabled=!0,r.appendChild(a)})}}function C(){const e=document.querySelector(".search-form");e&&e.remove()}function Q(e){e.preventDefault();const t=e.currentTarget.dataset.category,s=e.currentTarget.dataset.name,l=e.currentTarget.querySelector(".search-input").value;l&&G(t,s,l,1)}async function G(e,t,s,r){const l=R();try{const n=`${M}${N}?${e}=${t}&keyword=${s}&page=${r}&limit=${l}`,u=await S.get(n);if(u.data.results.length>0){const m=document.querySelector(".filter-gallery");m.innerHTML=q(u.data.results),document.querySelectorAll(".exercises-btn").forEach(a=>a.addEventListener("click",L)),I(u.data,e,t)}else v.Report.info("No results found","","Ok",{titleFontSize:"24px",fontFamily:"Neue Montreal",backgroundColor:"rgba(36, 36, 36, 1)",info:{messageColor:"rgba(36, 36, 36, 1)",svgColor:"rgba(244, 244, 244, 1)",backOverlayColor:"rgba(4, 4, 4, 0.40);",titleColor:"rgba(244, 244, 244, 1)",buttonBackground:"rgba(244, 244, 244, 1)",buttonColor:"rgba(36, 36, 36, 1)"}})}catch(n){console.error("Error fetching exercises:",n)}}function Z(){return window.matchMedia("(min-width: 768px)").matches?12:9}async function E(e,t=1){const s=Z();document.querySelectorAll(".filter").forEach(n=>n.classList.remove("active"));const l=document.getElementById(e.toLowerCase()+"Button");l&&l.classList.add("active");try{const n=`https://your-energy.b.goit.study/api/filters?filter=${e}&page=${t}&limit=${s}`,u=await fetch(n);if(u.ok){const m=await u.json(),c=document.getElementById("imageFilterGallery");if(c.innerHTML="",m.results.length>0)m.results.forEach(o=>{const i=document.createElement("div");i.classList.add("image-card"),i.addEventListener("click",_);const d=document.createElement("img");d.src=o.imgURL,d.alt=o.name,d.classList.add("image");const h=document.createElement("p");h.textContent=`${o.name}`,h.classList.add("nameText"),i.dataset.name=o.name;const p=document.createElement("p");p.textContent=`${o.filter}`,p.classList.add("filterText"),i.dataset.category=J(o.filter),i.appendChild(d),i.appendChild(h),i.appendChild(p),c.appendChild(i)});else{const o=document.createElement("p");o.textContent="Nothing was found for this query. Please try again.",c.appendChild(o)}const a=document.getElementById("pagination");if(a.innerHTML="",m.totalPages>1)for(let o=1;o<=m.totalPages;o++){const i=document.createElement("button");i.textContent=o,i.addEventListener("click",()=>{E(e,o)}),o===t&&i.classList.add("active"),a.appendChild(i)}}else console.error("Error fetching images from the API")}catch(n){console.error("An error occurred:",n)}}const b=document.getElementById("bodyPartsButton"),k=document.getElementById("musclesButton"),P=document.getElementById("equipmentButton");b.addEventListener("click",function(){C(),E("Body parts"),b.classList.add("active")});k.addEventListener("click",function(){C(),E("Muscles"),k.classList.add("active")});P.addEventListener("click",function(){C(),E("Equipment"),P.classList.add("active")});function J(e){return e==="Body parts"?e.replace(/\s/g,"").toLowerCase().slice(0,-1):e.replace(/\s/g,"").toLowerCase()}window.addEventListener("load",()=>{E("Body parts"),b.classList.add("active")});v.Notify.init();document.querySelector("#subscriptionForm").addEventListener("submit",function(e){e.preventDefault();const t=document.querySelector("#email"),s=t.value;X(s)?S.post("https://your-energy.b.goit.study/api/subscription",{email:s}).then(function(r){v.Notify.success("Ваш запит успішно відправлено"),t.value=""}).catch(function(r){v.Notify.failure("Помилка відправки запиту"),t.value=""}):v.Notify.failure("Будь ласка, введіть коректну електронну пошту")});function X(e){return/[a-zA-Z0-9._\%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(e)}
