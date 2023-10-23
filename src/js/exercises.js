import * as main from "../main";

export const API_PROPS = Object.freeze({
    BASE_URL: 'https://your-energy.b.goit.study/api',
    EXERCISE_ENDPOINT: '/exercises',
    RATING_ENDPOINT: '/rating',
    FILTERS_ENDPOINT: '/filters',
    QUOTE_ENDPOINT: '/quote',
    SUBSCR_EDPOINT: '/subscription'
});

import axios from 'axios';

const { BASE_URL, EXERCISE_ENDPOINT } = API_PROPS;

let limit = 8;

export async function fetchExercises(category, bodyPart, page = 1) {
  const params = new URLSearchParams({
    [category]: bodyPart,

    limit,
    page,
  });

  const categoriesUrl = `${BASE_URL}${EXERCISE_ENDPOINT}?${params}`;
  const response = await axios.get(categoriesUrl);

  return response.data;
}

export async function fetchAllExercises(
  category,
  bodyPart,
  perPage,
  totalPages
) {
  const params = new URLSearchParams({
    [category]: bodyPart,
    limit: perPage * totalPages,
  });

  const categoriesUrl = `${BASE_URL}${EXERCISE_ENDPOINT}?${params}`;
  const response = await axios.get(categoriesUrl);

  return response.data.results;
}

export function createExercisesMarkup(data) {
  return `<ul class="exercises-list">${data.map(createMarkup).join('')}</ul>
	<ul class="exer-pagination-list"></ul>`;
}

function createMarkup({ rating, name, burnedCalories, bodyPart, target, _id }) {
  return `<li class="exercises-item" data-exercise-id="${_id}">
			<div class="exercises-header">
				<div class="exercises-meta-container">
					<p class="exercises-meta">WORKOUT</p>
					<p class="exercises-rating">
						${rating.toFixed(1)}
						<svg width="18" height="18" class="exercises-svg">
							<use href="../img/sprite.svg#icon-star"></use>
						</svg>
					</p>
				</div>
				<button type="button" class="exercises-btn" data-modal-exercise="open">
					Start
					<svg width="16" height="16" class="exercises-btn-svg">
						<use href="../img/sprite.svg#icon-arrow-up"></use>
					</svg>
				</button>
			</div>
			<div class="exercises-name-container">
				<span class="exercises-name-span">
				<svg width="20" height="20" class="exercises-name-svg">
					<use href="../img/sprite.svg#icon-running-figure"></use>
				</svg>
				</span>
				<p class="exercises-name">
					${name}
				</p>
			</div>
			<div class="exercises-descr-container">
				<ul class="exercises-descr-list">
					<li class="exercises-descr-item">
						<span class="exercises-descr-span">Burned calories:</span>
						${burnedCalories} / 3 min
					</li>
					<li class="exercises-descr-item">
						<span class="exercises-descr-span">Body part:</span>
						${bodyPart}
					</li>
					<li class="exercises-descr-item">
						<span class="exercises-descr-span">Target:</span>
						${target}
					</li>
				</ul>
			</div>
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


