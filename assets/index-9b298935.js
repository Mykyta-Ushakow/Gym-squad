import{O as L,a as T}from"./modal-fb76c29f.js";const v=localStorage.getItem("quoteData");let h="",f="",y="";if(v){const{quote:e,author:t,date:n}=JSON.parse(v);h=e,f=t,y=n}const B=new Date().toLocaleDateString(),w=B!==y;w?fetch("https://your-energy.b.goit.study/api/quote").then(e=>e.json()).then(e=>{h=e.quote,f=e.author,y=B,localStorage.setItem("quoteData",JSON.stringify({quote:h,author:f,date:y})),x(h,f)}).catch(e=>{console.error("Error",e)}):x(h,f);function x(e,t){const n=document.querySelector(".quote"),o=document.querySelector(".author");n.textContent=e,o.textContent=t}const P=Object.freeze({BASE_URL:"https://your-energy.b.goit.study/api",EXERCISE_ENDPOINT:"/exercises",RATING_ENDPOINT:"/rating",FILTERS_ENDPOINT:"/filters",QUOTE_ENDPOINT:"/quote",SUBSCR_EDPOINT:"/subscription"}),{BASE_URL:b,EXERCISE_ENDPOINT:M}=P;function $(){return window.matchMedia("(min-width: 768px)").matches?10:8}function A(e){const t=e.currentTarget;S(t.dataset.category,t.dataset.name).then(n=>{const o=document.querySelector(".filter-gallery");o.innerHTML=q(n.results),document.querySelectorAll(".exercises-btn").forEach(s=>s.addEventListener("click",L)),C(n,t.dataset.category,t.dataset.name)}).catch(console.log)}async function S(e,t,n=1){const o=new URLSearchParams({[e]:t,limit:$(),page:n}),l=`${b}${M}?${o}`;return(await T.get(l)).data}function q(e){return`<ul class="exercises-list">${e.map(O).join("")}</ul>`}function O({rating:e,name:t,burnedCalories:n,bodyPart:o,target:l,_id:s}){return`<li class="exercises-item">
			<div class="exercises-header">
				<div class="exercises-meta-container">
					<p class="exercises-meta">WORKOUT</p>
					<div class="raiting-wrap">
						<p class="exercises-rating">
						${e.toFixed(1)}
						</p>
						<svg width="18" height="18" class="exercises-svg">
							<use href="../src/img/sprite.svg#icon-star"></use>
						</svg>
					</div>
				</div>
				<button type="button" class="exercises-btn"
				data-exercise-id="${s}" data-modal-exercise="open">
					Start
					<svg width="16" height="16" class="exercises-btn-svg">
						<use href="../src/img/sprite.svg#icon-arrow-right"></use>
					</svg>
				</button>
			</div>
			<div class="exercises-name-container">
				<span class="exercises-name-span">
				<svg width="20" height="20" class="exercises-name-svg">
					<use href="../src/img/sprite.svg#icon-running-circled"></use>
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
						${l}	
						</span>
					</li>
				</ul>
		</li>`}function C(e,t,n){const o=document.getElementById("pagination");if(o.innerHTML="",e.totalPages>1){const l=e.page,s=e.totalPages;let d=[];if(s<=7)d=Array.from({length:s},(a,r)=>r+1);else{const a=l,r=2;a<=r+1?d=[1,2,3,4,"...",s]:a>=s-r?d=[1,"...",s-3,s-2,s-1,s]:d=[1,"...",a-1,a,a+1,"...",s]}d.forEach(a=>{const r=document.createElement("button");r.textContent=a==="..."?"...":a,r.dataset.pageNumber=a==="..."?null:a,a===l&&r.classList.add("active"),a!=="..."?r.addEventListener("click",c=>{const i=parseInt(a);S(t,n,i).then(g=>{const p=document.querySelector(".filter-gallery");p.innerHTML=q(g.results),document.querySelectorAll(".exercises-btn").forEach(I=>I.addEventListener("click",L))});const u=o.querySelector("button.active");u&&u.classList.remove("active"),c.currentTarget.classList.add("active"),C({totalPages:s,page:i},t,n)}):r.disabled=!0,o.appendChild(r)})}}function R(){return window.matchMedia("(min-width: 768px)").matches?12:9}async function E(e,t=1){const n=R();document.querySelectorAll(".filter").forEach(s=>s.classList.remove("active"));const l=document.getElementById(e.toLowerCase()+"Button");l&&l.classList.add("active");try{const s=`https://your-energy.b.goit.study/api/filters?filter=${e}&page=${t}&limit=${n}`,d=await fetch(s);if(d.ok){const m=await d.json(),a=document.getElementById("imageFilterGallery");if(a.innerHTML="",m.results.length>0)m.results.forEach(c=>{const i=document.createElement("div");i.classList.add("image-card"),i.addEventListener("click",A);const u=document.createElement("img");u.src=c.imgURL,u.alt=c.name,u.classList.add("image");const g=document.createElement("p");g.textContent=`${c.name}`,g.classList.add("nameText"),i.dataset.name=c.name;const p=document.createElement("p");p.textContent=`${c.filter}`,p.classList.add("filterText"),i.dataset.category=N(c.filter),i.appendChild(u),i.appendChild(g),i.appendChild(p),a.appendChild(i)});else{const c=document.createElement("p");c.textContent="Nothing was found for this query. Please try again.",a.appendChild(c)}const r=document.getElementById("pagination");if(r.innerHTML="",m.totalPages>1)for(let c=1;c<=m.totalPages;c++){const i=document.createElement("button");i.textContent=c,i.addEventListener("click",()=>{E(e,c)}),c===t&&i.classList.add("active"),r.appendChild(i)}}else console.error("Error fetching images from the API")}catch(s){console.error("An error occurred:",s)}}const k=document.getElementById("bodyPartsButton"),_=document.getElementById("musclesButton"),D=document.getElementById("equipmentButton");k.addEventListener("click",function(){E("Body parts")});_.addEventListener("click",function(){E("Muscles")});D.addEventListener("click",function(){E("Equipment")});window.addEventListener("load",()=>{E("Body parts")});function N(e){return e==="Body parts"?e.replace(/\s/g,"").toLowerCase().slice(0,-1):e.replace(/\s/g,"").toLowerCase()}document.querySelector("#subscriptionForm").addEventListener("submit",function(e){e.preventDefault();const t=document.querySelector("#footer-email"),n=t.value;U(n)?main.axios.post("https://your-energy.b.goit.study/api/subscription",{email:n}).then(function(o){alert("Ваш запит успішно відправлено"),t.value=""}).catch(function(o){alert("Помилка відправки запиту"),t.value=""}):alert("Будь ласка, введіть коректну електронну пошту")});function U(e){return/[a-zA-Z0-9._\%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(e)}
