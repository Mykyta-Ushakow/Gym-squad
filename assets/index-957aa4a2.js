import{O as S,a as B,s as y,N as v}from"./modal-f86969b1.js";const P=localStorage.getItem("quoteData");let p="",f="",L="";if(P){const{quote:e,author:t,date:s}=JSON.parse(P);p=e,f=t,L=s}const M=new Date().toLocaleDateString(),D=M!==L;D?fetch("https://your-energy.b.goit.study/api/quote").then(e=>e.json()).then(e=>{p=e.quote,f=e.author,L=M,localStorage.setItem("quoteData",JSON.stringify({quote:p,author:f,date:L})),$(p,f)}).catch(e=>{console.error("Error",e)}):$(p,f);function $(e,t){const s=document.querySelector(".quote"),c=document.querySelector(".author");s.textContent=e,c.textContent=t}const U=Object.freeze({BASE_URL:"https://your-energy.b.goit.study/api",EXERCISE_ENDPOINT:"/exercises",RATING_ENDPOINT:"/rating",FILTERS_ENDPOINT:"/filters",QUOTE_ENDPOINT:"/quote",SUBSCR_EDPOINT:"/subscription"}),{BASE_URL:R,EXERCISE_ENDPOINT:N}=U;function A(){return window.matchMedia("(min-width: 768px)").matches?10:8}document.querySelector("#bodyPartsButton").addEventListener("click",q);document.querySelector("#musclesButton").addEventListener("click",q);document.querySelector("#equipmentButton").addEventListener("click",q);function q(){const e=document.getElementById("exerciseResult");e.textContent=""}function H(e){const t=e.currentTarget,s=t.dataset.category,c=t.dataset.name,l=document.getElementById("exerciseResult");O(s,c).then(n=>{const u=n.results[0].bodyPart;l.innerHTML=`<span class="divider">/</span>${u}`;const m=document.querySelector(".filter-gallery");m.innerHTML=T(n.results),document.querySelectorAll(".exercises-btn").forEach(h=>h.addEventListener("click",S));const a=document.querySelector(".search-container"),g=j(s,c);a&&g&&a.insertAdjacentHTML("afterbegin",g);const r=a.querySelector(".search-form");r&&r.addEventListener("submit",Z);const o=a.querySelector(".search-input");o&&o.addEventListener("input",z);const d=a.querySelector(".clear-search-button");d&&d.addEventListener("click",Q),C(n,t.dataset.category,t.dataset.name)}).catch(console.log)}async function O(e,t,s=1){const c=new URLSearchParams({[e]:t,limit:A(),page:s}),l=`${R}${N}?${c}`;return(await B.get(l)).data}function j(e,t){return`
    <form class="search-form" data-category="${e}" data-name="${t}">
      <input type="text" class="search-input" name="search-input" placeholder="Search">
      <button type="submit" class="search-button">
        <svg class="search-svg" width="18" height="18">
          <use href="${y}#icon-search"></use>
        </svg>
      </button>
      <button type="button" class="clear-search-button" style="display: none">
        <svg class="search-svg" width="18" height="18">
          <use href="${y}#icon-close"></use>
        </svg>
      </button>
    </form>
  `}function z(e){const t=e.target,s=t.parentNode.querySelector(".clear-search-button"),c=t.parentNode.querySelector(".search-button");t.value.trim()!==""?(s.style.display="block",c.style.display="none"):(s.style.display="none",c.style.display="block")}function Q(e){const t=e.currentTarget,s=t.closest(".search-form");if(s){const c=s.querySelector(".search-input");c.value="",t.style.display="none";const l=s.querySelector(".search-button");l.style.display="block"}}function T(e){return`<ul class="exercises-list">${e.map(G).join("")}</ul>`}function G({rating:e,name:t,burnedCalories:s,bodyPart:c,target:l,_id:n}){return`<li class="exercises-item">
			<div class="exercises-header">
				<div class="exercises-meta-container">
					<p class="exercises-meta">WORKOUT</p>
					<div class="raiting-wrap">
						<p class="exercises-rating">
						${e.toFixed(1)}
						</p>
						<svg width="18" height="18" class="exercises-svg">
							<use href="${y}#icon-star"></use>
						</svg>
					</div>
				</div>
				<button type="button" class="exercises-btn"
				data-exercise-id="${n}" data-modal-exercise="open">
					Start
					<svg width="16" height="16" class="exercises-btn-svg">
						<use href="${y}#icon-arrow-right"></use>
					</svg>
				</button>
			</div>
			<div class="exercises-name-container">
				<span class="exercises-name-span">
				<svg width="20" height="20" class="exercises-name-svg">
					<use href="${y}#icon-running-circled"></use>
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
		</li>`}function C(e,t,s){const c=document.getElementById("pagination");if(c.innerHTML="",e.totalPages>1){const l=e.page,n=e.totalPages;let u=[];if(n<=7)u=Array.from({length:n},(i,a)=>a+1);else{const i=l,a=2;i<=a+1?u=[1,2,3,4,"...",n]:i>=n-a?u=[1,"...",n-3,n-2,n-1,n]:u=[1,"...",i-1,i,i+1,"...",n]}u.forEach(i=>{const a=document.createElement("button");a.textContent=i==="..."?"...":i,a.dataset.pageNumber=i==="..."?null:i,i===l&&a.classList.add("active"),i!=="..."?a.addEventListener("click",g=>{F();const r=parseInt(i);O(t,s,r).then(d=>{const h=document.querySelector(".filter-gallery");h.innerHTML=T(d.results),document.querySelectorAll(".exercises-btn").forEach(_=>_.addEventListener("click",S))});const o=c.querySelector("button.active");o&&o.classList.remove("active"),g.currentTarget.classList.add("active"),C({totalPages:n,page:r},t,s)}):a.disabled=!0,c.appendChild(a)})}}function I(){const e=document.querySelector(".search-form");e&&e.remove()}function Z(e){e.preventDefault();const t=e.currentTarget.dataset.category,s=e.currentTarget.dataset.name,l=e.currentTarget.querySelector(".search-input").value;l&&J(t,s,l,1)}async function J(e,t,s,c){const l=A();try{const n=`${R}${N}?${e}=${t}&keyword=${s}&page=${c}&limit=${l}`,u=await B.get(n);if(u.data.results.length>0){const m=document.querySelector(".filter-gallery");m.innerHTML=T(u.data.results),document.querySelectorAll(".exercises-btn").forEach(a=>a.addEventListener("click",S)),C(u.data,e,t)}else v.Report.info("No results found","","Ok",{titleFontSize:"24px",fontFamily:"Neue Montreal",backgroundColor:"rgba(36, 36, 36, 1)",info:{messageColor:"rgba(36, 36, 36, 1)",svgColor:"rgba(244, 244, 244, 1)",backOverlayColor:"rgba(4, 4, 4, 0.40);",titleColor:"rgba(244, 244, 244, 1)",buttonBackground:"rgba(244, 244, 244, 1)",buttonColor:"rgba(36, 36, 36, 1)"}})}catch(n){console.error("Error fetching exercises:",n)}}let X=1;function Y(){return window.matchMedia("(min-width: 768px)").matches?12:9}async function E(e,t=1){const s=Y();document.querySelectorAll(".filter").forEach(n=>n.classList.remove("active"));const l=document.getElementById(e.toLowerCase()+"Button");l&&l.classList.add("active");try{const n=`https://your-energy.b.goit.study/api/filters?filter=${e}&page=${t}&limit=${s}`,u=await fetch(n);if(u.ok){let g=function(r){X=r;const o=a.querySelectorAll("button");o.forEach(d=>d.classList.remove("active")),o[r-1].classList.add("active"),E(e,r)};const m=await u.json(),i=document.getElementById("imageFilterGallery");if(i.innerHTML="",m.results.length>0)m.results.forEach(r=>{const o=document.createElement("div");o.classList.add("image-card"),o.addEventListener("click",H);const d=document.createElement("img");d.src=r.imgURL,d.alt=r.name,d.classList.add("image");const h=document.createElement("p");h.textContent=`${r.name}`,h.classList.add("nameText"),o.dataset.name=r.name;const b=document.createElement("p");b.textContent=`${r.filter}`,b.classList.add("filterText"),o.dataset.category=K(r.filter),o.appendChild(d),o.appendChild(h),o.appendChild(b),i.appendChild(o)});else{const r=document.createElement("p");r.textContent="Nothing was found for this query. Please try again.",i.appendChild(r)}const a=document.getElementById("pagination");if(a.innerHTML="",m.totalPages>1)for(let r=1;r<=m.totalPages;r++){const o=document.createElement("button");o.textContent=r,o.addEventListener("click",()=>{g(r),F()}),r===t&&o.classList.add("active"),a.appendChild(o)}}else console.error("Error fetching images from the API")}catch(n){console.error("An error occurred:",n)}}const x=document.getElementById("bodyPartsButton"),w=document.getElementById("musclesButton"),k=document.getElementById("equipmentButton");x.addEventListener("click",function(){I(),E("Body parts"),x.classList.add("active")});w.addEventListener("click",function(){I(),E("Muscles"),w.classList.add("active")});k.addEventListener("click",function(){I(),E("Equipment"),k.classList.add("active")});function K(e){return e==="Body parts"?e.replace(/\s/g,"").toLowerCase().slice(0,-1):e.replace(/\s/g,"").toLowerCase()}window.addEventListener("load",()=>{E("Body parts"),x.classList.add("active")});function F(){const e=document.querySelector(".categories_title");if(e){const t=e.getBoundingClientRect().top+window.scrollY;window.scrollTo({top:t,behavior:"smooth"})}}v.Notify.init();document.querySelector("#subscriptionForm").addEventListener("submit",function(e){e.preventDefault();const t=document.querySelector("#email"),s=t.value;V(s)?B.post("https://your-energy.b.goit.study/api/subscription",{email:s}).then(function(c){v.Notify.success("Your request has been successfull"),t.value=""}).catch(function(c){v.Notify.failure("Request error"),t.value=""}):v.Notify.failure("Please enter a valid email address")});function V(e){return/[a-zA-Z0-9._\%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(e)}
