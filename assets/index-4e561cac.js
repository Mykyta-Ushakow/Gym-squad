import{O as B,a as w,s as v}from"./modal-f544a12d.js";const x=localStorage.getItem("quoteData");let h="",f="",y="";if(x){const{quote:e,author:t,date:n}=JSON.parse(x);h=e,f=t,y=n}const S=new Date().toLocaleDateString(),P=S!==y;P?fetch("https://your-energy.b.goit.study/api/quote").then(e=>e.json()).then(e=>{h=e.quote,f=e.author,y=S,localStorage.setItem("quoteData",JSON.stringify({quote:h,author:f,date:y})),L(h,f)}).catch(e=>{console.error("Error",e)}):L(h,f);function L(e,t){const n=document.querySelector(".quote"),i=document.querySelector(".author");n.textContent=e,i.textContent=t}const b=Object.freeze({BASE_URL:"https://your-energy.b.goit.study/api",EXERCISE_ENDPOINT:"/exercises",RATING_ENDPOINT:"/rating",FILTERS_ENDPOINT:"/filters",QUOTE_ENDPOINT:"/quote",SUBSCR_EDPOINT:"/subscription"}),{BASE_URL:$,EXERCISE_ENDPOINT:M}=b;function A(){return window.matchMedia("(min-width: 768px)").matches?10:8}function O(e){const t=e.currentTarget;q(t.dataset.category,t.dataset.name).then(n=>{const i=document.querySelector(".filter-gallery");i.innerHTML=C(n.results),document.querySelectorAll(".exercises-btn").forEach(s=>s.addEventListener("click",B)),I(n,t.dataset.category,t.dataset.name)}).catch(console.log)}async function q(e,t,n=1){const i=new URLSearchParams({[e]:t,limit:A(),page:n}),l=`${$}${M}?${i}`;return(await w.get(l)).data}function C(e){return`<ul class="exercises-list">${e.map(R).join("")}</ul>`}function R({rating:e,name:t,burnedCalories:n,bodyPart:i,target:l,_id:s}){return`<li class="exercises-item">
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
						${i}
						</span>
					</li>
					<li class="exercises-descr-item">
						Target:	
						<span class="exercises-descr-span">
						${l}	
						</span>
					</li>
				</ul>
		</li>`}function I(e,t,n){const i=document.getElementById("pagination");if(i.innerHTML="",e.totalPages>1){const l=e.page,s=e.totalPages;let d=[];if(s<=7)d=Array.from({length:s},(a,r)=>r+1);else{const a=l,r=2;a<=r+1?d=[1,2,3,4,"...",s]:a>=s-r?d=[1,"...",s-3,s-2,s-1,s]:d=[1,"...",a-1,a,a+1,"...",s]}d.forEach(a=>{const r=document.createElement("button");r.textContent=a==="..."?"...":a,r.dataset.pageNumber=a==="..."?null:a,a===l&&r.classList.add("active"),a!=="..."?r.addEventListener("click",c=>{const o=parseInt(a);q(t,n,o).then(p=>{const g=document.querySelector(".filter-gallery");g.innerHTML=C(p.results),document.querySelectorAll(".exercises-btn").forEach(T=>T.addEventListener("click",B))});const u=i.querySelector("button.active");u&&u.classList.remove("active"),c.currentTarget.classList.add("active"),I({totalPages:s,page:o},t,n)}):r.disabled=!0,i.appendChild(r)})}}function k(){return window.matchMedia("(min-width: 768px)").matches?12:9}async function E(e,t=1){const n=k();document.querySelectorAll(".filter").forEach(s=>s.classList.remove("active"));const l=document.getElementById(e.toLowerCase()+"Button");l&&l.classList.add("active");try{const s=`https://your-energy.b.goit.study/api/filters?filter=${e}&page=${t}&limit=${n}`,d=await fetch(s);if(d.ok){const m=await d.json(),a=document.getElementById("imageFilterGallery");if(a.innerHTML="",m.results.length>0)m.results.forEach(c=>{const o=document.createElement("div");o.classList.add("image-card"),o.addEventListener("click",O);const u=document.createElement("img");u.src=c.imgURL,u.alt=c.name,u.classList.add("image");const p=document.createElement("p");p.textContent=`${c.name}`,p.classList.add("nameText"),o.dataset.name=c.name;const g=document.createElement("p");g.textContent=`${c.filter}`,g.classList.add("filterText"),o.dataset.category=U(c.filter),o.appendChild(u),o.appendChild(p),o.appendChild(g),a.appendChild(o)});else{const c=document.createElement("p");c.textContent="Nothing was found for this query. Please try again.",a.appendChild(c)}const r=document.getElementById("pagination");if(r.innerHTML="",m.totalPages>1)for(let c=1;c<=m.totalPages;c++){const o=document.createElement("button");o.textContent=c,o.addEventListener("click",()=>{E(e,c)}),c===t&&o.classList.add("active"),r.appendChild(o)}}else console.error("Error fetching images from the API")}catch(s){console.error("An error occurred:",s)}}const _=document.getElementById("bodyPartsButton"),D=document.getElementById("musclesButton"),N=document.getElementById("equipmentButton");_.addEventListener("click",function(){E("Body parts")});D.addEventListener("click",function(){E("Muscles")});N.addEventListener("click",function(){E("Equipment")});window.addEventListener("load",()=>{E("Body parts")});function U(e){return e==="Body parts"?e.replace(/\s/g,"").toLowerCase().slice(0,-1):e.replace(/\s/g,"").toLowerCase()}document.querySelector("#subscriptionForm").addEventListener("submit",function(e){e.preventDefault();const t=document.querySelector("#footer-email"),n=t.value;F(n)?main.axios.post("https://your-energy.b.goit.study/api/subscription",{email:n}).then(function(i){alert("Ваш запит успішно відправлено"),t.value=""}).catch(function(i){alert("Помилка відправки запиту"),t.value=""}):alert("Будь ласка, введіть коректну електронну пошту")});function F(e){return/[a-zA-Z0-9._\%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(e)}
