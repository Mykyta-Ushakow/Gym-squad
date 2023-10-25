// import * as main from "../main";

export const API_PROPS = Object.freeze({
  BASE_URL: 'https://your-energy.b.goit.study/api',
  EXERCISE_ENDPOINT: '/exercises',
  RATING_ENDPOINT: '/rating',
  FILTERS_ENDPOINT: '/filters',
  QUOTE_ENDPOINT: '/quote',
  SUBSCR_EDPOINT: '/subscription',
});

import axios from 'axios';
import { OpenModal } from './modal';

const { BASE_URL, EXERCISE_ENDPOINT } = API_PROPS;

// const base_url = 'https://mykyta-ushakow.github.io/Gym-squad/';
// const svgPath = `${base_url}src/img/sprite.svg`;

let previousExercisePage = 1;

function setLimit() {
  const isLargeScreen = window.matchMedia('(min-width: 768px)').matches;
  return isLargeScreen ? 10 : 8;
}

export function onClick(event) {
  const card = event.currentTarget;

  // console.log(card.dataset.name, card.dataset.category);

  fetchExercises(card.dataset.category, card.dataset.name)
    .then(resp => {
      // Displaying the exercise cards
      // console.log(resp);
      const list = document.querySelector('.filter-gallery');
      list.innerHTML = createExercisesMarkup(resp.results);
      const startModalBtns = document.querySelectorAll('.exercises-btn');

      startModalBtns.forEach(el => el.addEventListener('click', OpenModal));

      // Pagination
      handleExercisePagination(resp, card.dataset.category, card.dataset.name);
    })
    .catch(console.log);
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

export function createExercisesMarkup(data) {
  return `<ul class="exercises-list">${data.map(createMarkup).join('')}</ul>`;
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
							<use href="../src/img/sprite.svg#icon-star"></use>
						</svg>
					</div>
				</div>
				<button type="button" class="exercises-btn"
				data-exercise-id="${_id}" data-modal-exercise="open">
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

function handleExercisePagination(data, category, filter) {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  if (data.totalPages > 1) {
    const currentPage = data.page;
    const totalPages = data.totalPages;

    let pagesToDisplay = [];
    const maxButtons = 7; // You want to display 7 buttons at most

    if (totalPages <= maxButtons) {
      // If there are fewer pages than the maximum allowed buttons, show all pages
      pagesToDisplay = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Determine which pages to display with active page and neighbors
      const activePage = currentPage;
      const neighbors = 2; // Number of neighbors to show on each side

      if (activePage <= neighbors + 1) {
        // If active page is close to the beginning
        pagesToDisplay = [1, 2, 3, 4, '...', totalPages];
      } else if (activePage >= totalPages - neighbors) {
        // If active page is close to the end
        pagesToDisplay = [
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        // Active page somewhere in the middle
        pagesToDisplay = [
          1,
          '...',
          activePage - 1,
          activePage,
          activePage + 1,
          '...',
          totalPages,
        ];
      }
    }

    // Create and add buttons for the pages to display
    pagesToDisplay.forEach(pageNumber => {
      const pageButton = document.createElement('button');
      pageButton.textContent = pageNumber === '...' ? '...' : pageNumber;
      pageButton.dataset.pageNumber = pageNumber === '...' ? null : pageNumber;

      if (pageNumber === currentPage) {
        pageButton.classList.add('active');
      }

      if (pageNumber !== '...') {
        pageButton.addEventListener('click', event => {
          const page = parseInt(pageNumber);
          fetchExercises(category, filter, page).then(resp => {
            const list = document.querySelector('.filter-gallery');
            list.innerHTML = createExercisesMarkup(resp.results);

            const startModalBtns = document.querySelectorAll('.exercises-btn');
            startModalBtns.forEach(el =>
              el.addEventListener('click', OpenModal)
            );
          });

          // Remove "active" class from the previous active button
          const previousActiveButton =
            paginationContainer.querySelector('button.active');
          if (previousActiveButton) {
            previousActiveButton.classList.remove('active');
          }

          event.currentTarget.classList.add('active');

          // Update pagination when the active page changes
          handleExercisePagination({ totalPages, page }, category, filter);
        });
      } else {
        // Disable the button with ellipsis
        pageButton.disabled = true;
      }

      paginationContainer.appendChild(pageButton);
    });
  }
}
