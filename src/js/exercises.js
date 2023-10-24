// import * as main from "../main";

export const API_PROPS = Object.freeze({
    BASE_URL: 'https://your-energy.b.goit.study/api',
    EXERCISE_ENDPOINT: '/exercises',
    RATING_ENDPOINT: '/rating',
    FILTERS_ENDPOINT: '/filters',
    QUOTE_ENDPOINT: '/quote',
    SUBSCR_EDPOINT: '/subscription'
});

import axios from 'axios';
import { OpenModal } from './modal'

const { BASE_URL, EXERCISE_ENDPOINT } = API_PROPS;

// let limit = 8;

function setLimit() {
	const isLargeScreen = window.matchMedia('(min-width: 768px)').matches;
	return isLargeScreen ? 10 : 8;
  }

export function onClick(event) {
	const card = event.currentTarget;

	// console.log(card.dataset.name, card.dataset.category);

	fetchExercises(card.dataset.category, card.dataset.name)
	.then(resp => {
		// console.log(resp);
		const list = document.querySelector('.filter-gallery');
		list.innerHTML = createExercisesMarkup(resp.results);
		const startModalBtns = document.querySelectorAll(".exercises-btn");
		startModalBtns.forEach(el => el.addEventListener("click", OpenModal));
	});
}

export async function fetchExercises(category, filter, page = 1) {
  const params = new URLSearchParams({
    [category]: filter,

    limit: setLimit(),
    page,
  });

  const categoriesUrl = `${BASE_URL}${EXERCISE_ENDPOINT}?${params}`;

  const response = await axios.get(categoriesUrl);

//   return response;
  return response.data;
}

export async function fetchAllExercises(
  category,
  filter,
  perPage,
  totalPages
) {
  const params = new URLSearchParams({
    [category]: filter,
    limit: perPage * totalPages,
  });

  const categoriesUrl = `${BASE_URL}${EXERCISE_ENDPOINT}?${params}`;
  const response = await axios.get(categoriesUrl);

  return response.data.results;
}

export function createExercisesMarkup(data) {
  return `<ul class="exercises-list">${data.map(createMarkup).join('')}</ul>`
	// <ul class="exer-pagination-list"></ul>`;
}

function createMarkup({ rating, name, burnedCalories, bodyPart, target, _id }) {
  return `<li class="exercises-item">
			<div class="exercises-header">
				<div class="exercises-meta-container">
					<p class="exercises-meta">WORKOUT</p>
					<div class="raiting-wrap">
						<p class="exercises-rating">
						${rating.toFixed(1)}
						</p>
						<svg width="18" height="18" class="exercises-svg">
							<use href="../img/sprite.svg#icon-star"></use>
						</svg>
					</div>
				</div>
				<button type="button" class="exercises-btn"
				data-exercise-id="${_id}" data-modal-exercise="open">
					Start
					<svg width="16" height="16" class="exercises-btn-svg">
						<use href="../img/sprite.svg#icon-arrow-right"></use>
					</svg>
				</button>
			</div>
			<div class="exercises-name-container">
				<span class="exercises-name-span">
				<svg width="20" height="20" class="exercises-name-svg">
					<use href="../img/sprite.svg#icon-running-circled"></use>
				</svg>
				</span>
				<p class="exercises-name">
					${name}
				</p>
			</div>
				<ul class="exercises-descr-list">
					<li class="exercises-descr-item">
						Burned calories:
						<span class="exercises-descr-span">
						${burnedCalories} / 3 min
						</span>
					</li>
					<li class="exercises-descr-item">
						Body part:
						<span class="exercises-descr-span">
						${bodyPart}
						</span>
					</li>
					<li class="exercises-descr-item">
						Target:	
						<span class="exercises-descr-span">
						${target}	
						</span>
					</li>
				</ul>
		</li>`;
}
export function createExercisesPaginationBtnsMarkup(
  firstBtn = 1,
  secondBtn = 2,
  thirdBtn = 3
) {
  return `
			<li class="cat-pagination-item">
				<button type="button" class="cat-pagination-btn" data-id="1">${firstBtn}</button>
			</li>
			<li class="cat-pagination-item">
				<button type="button" class="cat-pagination-btn" data-id="2">${secondBtn}</button>
			</li>
			<li class="cat-pagination-item">
				<button type="button" class="cat-pagination-btn" data-id="3">${thirdBtn}</button>
			</li>
		`;
}


