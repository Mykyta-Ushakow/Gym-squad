import{O as S,a as b,s as y,N as E}from"./modal-300d4c5b.js";const I=localStorage.getItem("quoteData");let g="",f="",x="";if(I){const{quote:e,author:t,date:s}=JSON.parse(I);g=e,f=t,x=s}const P=new Date().toLocaleDateString(),R=P!==x;R?fetch("https://your-energy.b.goit.study/api/quote").then(e=>e.json()).then(e=>{g=e.quote,f=e.author,x=P,localStorage.setItem("quoteData",JSON.stringify({quote:g,author:f,date:x})),$(g,f)}).catch(e=>{console.error("Error",e)}):$(g,f);function $(e,t){const s=document.querySelector(".quote"),a=document.querySelector(".author");s.textContent=e,a.textContent=t}const D=Object.freeze({BASE_URL:"https://your-energy.b.goit.study/api",EXERCISE_ENDPOINT:"/exercises",RATING_ENDPOINT:"/rating",FILTERS_ENDPOINT:"/filters",QUOTE_ENDPOINT:"/quote",SUBSCR_EDPOINT:"/subscription"}),{BASE_URL:M,EXERCISE_ENDPOINT:k}=D;function N(){return window.matchMedia("(min-width: 768px)").matches?10:8}function F(e){const t=e.currentTarget,s=t.dataset.category,a=t.dataset.name;A(s,a).then(o=>{const n=document.querySelector(".filter-gallery");n.innerHTML=B(o.results),document.querySelectorAll(".exercises-btn").forEach(m=>m.addEventListener("click",S));const u=document.querySelector(".search-container"),c=_(s,a);u&&c&&u.insertAdjacentHTML("afterbegin",c);const i=u.querySelector(".search-form");i&&i.addEventListener("submit",z);const r=u.querySelector(".search-input");r&&r.addEventListener("input",U);const l=u.querySelector(".clear-search-button");l&&l.addEventListener("click",H),q(o,t.dataset.category,t.dataset.name)}).catch(console.log)}async function A(e,t,s=1){const a=new URLSearchParams({[e]:t,limit:N(),page:s}),o=`${M}${k}?${a}`;return(await b.get(o)).data}function _(e,t){return`
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
  `}function U(e){const t=e.target,s=t.parentNode.querySelector(".clear-search-button"),a=t.parentNode.querySelector(".search-button");t.value.trim()!==""?(s.style.display="block",a.style.display="none"):(s.style.display="none",a.style.display="block")}function H(e){const t=e.currentTarget,s=t.closest(".search-form");if(s){const a=s.querySelector(".search-input");a.value="",t.style.display="none";const o=s.querySelector(".search-button");o.style.display="block"}}function B(e){return`<ul class="exercises-list">${e.map(j).join("")}</ul>`}function j({rating:e,name:t,burnedCalories:s,bodyPart:a,target:o,_id:n}){return`<li class="exercises-item">
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
						${a}
						</span>
					</li>
					<li class="exercises-descr-item">
						Target:	
						<span class="exercises-descr-span">
						${o}	
						</span>
					</li>
				</ul>
		</li>`}function q(e,t,s){const a=document.getElementById("pagination");if(a.innerHTML="",e.totalPages>1){const o=e.page,n=e.totalPages;let d=[];if(n<=7)d=Array.from({length:n},(c,i)=>i+1);else{const c=o,i=2;c<=i+1?d=[1,2,3,4,"...",n]:c>=n-i?d=[1,"...",n-3,n-2,n-1,n]:d=[1,"...",c-1,c,c+1,"...",n]}d.forEach(c=>{const i=document.createElement("button");i.textContent=c==="..."?"...":c,i.dataset.pageNumber=c==="..."?null:c,c===o&&i.classList.add("active"),c!=="..."?i.addEventListener("click",r=>{const l=parseInt(c);A(t,s,l).then(h=>{const p=document.querySelector(".filter-gallery");p.innerHTML=B(h.results),document.querySelectorAll(".exercises-btn").forEach(O=>O.addEventListener("click",S))});const m=a.querySelector("button.active");m&&m.classList.remove("active"),r.currentTarget.classList.add("active"),q({totalPages:n,page:l},t,s)}):i.disabled=!0,a.appendChild(i)})}}function T(){const e=document.querySelector(".search-form");e&&e.remove()}function z(e){e.preventDefault();const t=e.currentTarget.dataset.category,s=e.currentTarget.dataset.name,o=e.currentTarget.querySelector(".search-input").value;o&&Q(t,s,o,1)}async function Q(e,t,s,a){const o=N();try{const n=`${M}${k}?${e}=${t}&keyword=${s}&page=${a}&limit=${o}`,d=await b.get(n);if(console.log(d),d.data.results.length>0){const u=document.querySelector(".filter-gallery");u.innerHTML=B(d.data.results),document.querySelectorAll(".exercises-btn").forEach(i=>i.addEventListener("click",S)),q(d.data,e,t)}else{const u=document.querySelector(".filter-gallery");u.innerHTML="<p>No results found.</p>"}}catch(n){console.error("Error fetching exercises:",n)}}function G(){return window.matchMedia("(min-width: 768px)").matches?12:9}async function v(e,t=1){const s=G();document.querySelectorAll(".filter").forEach(n=>n.classList.remove("active"));const o=document.getElementById(e.toLowerCase()+"Button");o&&o.classList.add("active");try{const n=`https://your-energy.b.goit.study/api/filters?filter=${e}&page=${t}&limit=${s}`,d=await fetch(n);if(d.ok){const u=await d.json(),c=document.getElementById("imageFilterGallery");if(c.innerHTML="",u.results.length>0)u.results.forEach(r=>{const l=document.createElement("div");l.classList.add("image-card"),l.addEventListener("click",F);const m=document.createElement("img");m.src=r.imgURL,m.alt=r.name,m.classList.add("image");const h=document.createElement("p");h.textContent=`${r.name}`,h.classList.add("nameText"),l.dataset.name=r.name;const p=document.createElement("p");p.textContent=`${r.filter}`,p.classList.add("filterText"),l.dataset.category=Z(r.filter),l.appendChild(m),l.appendChild(h),l.appendChild(p),c.appendChild(l)});else{const r=document.createElement("p");r.textContent="Nothing was found for this query. Please try again.",c.appendChild(r)}const i=document.getElementById("pagination");if(i.innerHTML="",u.totalPages>1)for(let r=1;r<=u.totalPages;r++){const l=document.createElement("button");l.textContent=r,l.addEventListener("click",()=>{v(e,r)}),r===t&&l.classList.add("active"),i.appendChild(l)}}else console.error("Error fetching images from the API")}catch(n){console.error("An error occurred:",n)}}const L=document.getElementById("bodyPartsButton"),w=document.getElementById("musclesButton"),C=document.getElementById("equipmentButton");L.addEventListener("click",function(){T(),v("Body parts"),L.classList.add("active")});w.addEventListener("click",function(){T(),v("Muscles"),w.classList.add("active")});C.addEventListener("click",function(){T(),v("Equipment"),C.classList.add("active")});function Z(e){return e==="Body parts"?e.replace(/\s/g,"").toLowerCase().slice(0,-1):e.replace(/\s/g,"").toLowerCase()}window.addEventListener("load",()=>{v("Body parts"),L.classList.add("active")});E.Notify.init();document.querySelector("#subscriptionForm").addEventListener("submit",function(e){e.preventDefault();const t=document.querySelector("#email"),s=t.value;J(s)?b.post("https://your-energy.b.goit.study/api/subscription",{email:s}).then(function(a){E.Notify.success("Ваш запит успішно відправлено"),t.value=""}).catch(function(a){E.Notify.failure("Помилка відправки запиту"),t.value=""}):E.Notify.failure("Будь ласка, введіть коректну електронну пошту")});function J(e){return/[a-zA-Z0-9._\%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(e)}
