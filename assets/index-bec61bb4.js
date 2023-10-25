import{O as C,a as I,s as y}from"./modal-74d9eba9.js";const L=localStorage.getItem("quoteData");let h="",f="",E="";if(L){const{quote:e,author:t,date:n}=JSON.parse(L);h=e,f=t,E=n}const T=new Date().toLocaleDateString(),M=T!==E;M?fetch("https://your-energy.b.goit.study/api/quote").then(e=>e.json()).then(e=>{h=e.quote,f=e.author,E=T,localStorage.setItem("quoteData",JSON.stringify({quote:h,author:f,date:E})),B(h,f)}).catch(e=>{console.error("Error",e)}):B(h,f);function B(e,t){const n=document.querySelector(".quote"),o=document.querySelector(".author");n.textContent=e,o.textContent=t}const A=Object.freeze({BASE_URL:"https://your-energy.b.goit.study/api",EXERCISE_ENDPOINT:"/exercises",RATING_ENDPOINT:"/rating",FILTERS_ENDPOINT:"/filters",QUOTE_ENDPOINT:"/quote",SUBSCR_EDPOINT:"/subscription"}),{BASE_URL:O,EXERCISE_ENDPOINT:R}=A;function k(){return window.matchMedia("(min-width: 768px)").matches?10:8}function _(e){const t=e.currentTarget;w(t.dataset.category,t.dataset.name).then(n=>{const o=document.querySelector(".filter-gallery");o.innerHTML=P(n.results),document.querySelectorAll(".exercises-btn").forEach(s=>s.addEventListener("click",C)),b(n,t.dataset.category,t.dataset.name)}).catch(console.log)}async function w(e,t,n=1){const o=new URLSearchParams({[e]:t,limit:k(),page:n}),l=`${O}${R}?${o}`;return(await I.get(l)).data}function P(e){return`<ul class="exercises-list">${e.map(D).join("")}</ul>`}function D({rating:e,name:t,burnedCalories:n,bodyPart:o,target:l,_id:s}){return`<li class="exercises-item">
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
				data-exercise-id="${s}" data-modal-exercise="open">
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
		</li>`}function b(e,t,n){const o=document.getElementById("pagination");if(o.innerHTML="",e.totalPages>1){const l=e.page,s=e.totalPages;let d=[];if(s<=7)d=Array.from({length:s},(a,r)=>r+1);else{const a=l,r=2;a<=r+1?d=[1,2,3,4,"...",s]:a>=s-r?d=[1,"...",s-3,s-2,s-1,s]:d=[1,"...",a-1,a,a+1,"...",s]}d.forEach(a=>{const r=document.createElement("button");r.textContent=a==="..."?"...":a,r.dataset.pageNumber=a==="..."?null:a,a===l&&r.classList.add("active"),a!=="..."?r.addEventListener("click",c=>{const i=parseInt(a);w(t,n,i).then(p=>{const g=document.querySelector(".filter-gallery");g.innerHTML=P(p.results),document.querySelectorAll(".exercises-btn").forEach($=>$.addEventListener("click",C))});const u=o.querySelector("button.active");u&&u.classList.remove("active"),c.currentTarget.classList.add("active"),b({totalPages:s,page:i},t,n)}):r.disabled=!0,o.appendChild(r)})}}function N(){return window.matchMedia("(min-width: 768px)").matches?12:9}async function v(e,t=1){const n=N();document.querySelectorAll(".filter").forEach(s=>s.classList.remove("active"));const l=document.getElementById(e.toLowerCase()+"Button");l&&l.classList.add("active");try{const s=`https://your-energy.b.goit.study/api/filters?filter=${e}&page=${t}&limit=${n}`,d=await fetch(s);if(d.ok){const m=await d.json(),a=document.getElementById("imageFilterGallery");if(a.innerHTML="",m.results.length>0)m.results.forEach(c=>{const i=document.createElement("div");i.classList.add("image-card"),i.addEventListener("click",_);const u=document.createElement("img");u.src=c.imgURL,u.alt=c.name,u.classList.add("image");const p=document.createElement("p");p.textContent=`${c.name}`,p.classList.add("nameText"),i.dataset.name=c.name;const g=document.createElement("p");g.textContent=`${c.filter}`,g.classList.add("filterText"),i.dataset.category=U(c.filter),i.appendChild(u),i.appendChild(p),i.appendChild(g),a.appendChild(i)});else{const c=document.createElement("p");c.textContent="Nothing was found for this query. Please try again.",a.appendChild(c)}const r=document.getElementById("pagination");if(r.innerHTML="",m.totalPages>1)for(let c=1;c<=m.totalPages;c++){const i=document.createElement("button");i.textContent=c,i.addEventListener("click",()=>{v(e,c)}),c===t&&i.classList.add("active"),r.appendChild(i)}}else console.error("Error fetching images from the API")}catch(s){console.error("An error occurred:",s)}}const x=document.getElementById("bodyPartsButton"),S=document.getElementById("musclesButton"),q=document.getElementById("equipmentButton");x.addEventListener("click",function(){v("Body parts"),x.classList.add("active")});S.addEventListener("click",function(){v("Muscles"),S.classList.add("active")});q.addEventListener("click",function(){v("Equipment"),q.classList.add("active")});function U(e){return e==="Body parts"?e.replace(/\s/g,"").toLowerCase().slice(0,-1):e.replace(/\s/g,"").toLowerCase()}window.addEventListener("load",()=>{v("Body parts"),x.classList.add("active")});document.querySelector("#subscriptionForm").addEventListener("submit",function(e){e.preventDefault();const t=document.querySelector("#footer-email"),n=t.value;F(n)?I.post("https://your-energy.b.goit.study/api/subscription",{email:n}).then(function(o){alert("Ваш запит успішно відправлено"),t.value=""}).catch(function(o){alert("Помилка відправки запиту"),t.value=""}):alert("Будь ласка, введіть коректну електронну пошту")});function F(e){return/[a-zA-Z0-9._\%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(e)}
