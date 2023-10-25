// import * as main from "../main";
import axios from 'axios';

// Liseners for backdrope
const modal = document.querySelector('.modal');
const modalBackdrope = document.querySelector('.modal-backdrop');
const closeBtn = document.querySelector('[data-modal-close]');
// API
const BASE_URL = `https://your-energy.b.goit.study/api/exercises/`;

const getExercises = async id => {
  const response = await axios.get(`${BASE_URL}${id}`);

  return response.data;
};

// Close modal window by clicking on backdrope, ESC or button
modalBackdrope.addEventListener('click', onModalBackdrope);
closeBtn.addEventListener('click', onCloseModalBtn);
document.addEventListener('keydown', closeModalByEsc);
function closeModalByEsc(event) {
  if (event.code === 'Escape') {
    modalBackdrope.classList.add('is-hidden');
    document.removeEventListener('keydown', closeModalByEsc);
    const containerMo = document.querySelector('.container-modal');
    containerMo.remove();
  }
}
function onModalBackdrope(event) {
  if (event.target === event.currentTarget) {
    modalBackdrope.classList.add('is-hidden');
    document.removeEventListener('keydown', closeModalByEsc);
    const containerMo = document.querySelector('.container-modal');
    containerMo.remove();
  }
}

function onCloseModalBtn(event) {
  if (event.target) {
    modalBackdrope.classList.add('is-hidden');
    document.removeEventListener('keydown', closeModalByEsc);
    const containerMo = document.querySelector('.container-modal');
    containerMo.remove();
  }
}
//let _id;
//_id = '64f389465ae26083f39b17a4';
// Open modal by clicking button Start
export function OpenModal(e) {
  const exerciseID = e.currentTarget.dataset.exerciseId;

  //

  getExercises(exerciseID).then(data => {
    modalBackdrope.classList.remove('is-hidden');

    if (!data) {
      alert('Error');

      return;
    }

    const {
      _id,
      name,
      rating,
      target,
      bodyPart,
      equipment,
      popularity,
      burnedCalories,
      time,
      description,
      gifUrl,
    } = data;

    modal.insertAdjacentHTML('beforeend', createModalReceiptMarkup());

    // ADD to fav
    const favBtn = document.querySelector('.modal-bnt-add-to-fav');
    const removeFavBtn = document.querySelector('.modal-bnt-remove-from-fav');

    favBtn.addEventListener('click', onFavBtn);
    removeFavBtn.addEventListener('click', onremoveFavBtn);

    checkLocal();
    function checkLocal() {
      if (localStorage.getItem(data._id) === null) {
        favBtn.classList.remove('btn-display');
        removeFavBtn.classList.add('btn-display');
      } else {
        favBtn.classList.add('btn-display');
        removeFavBtn.classList.remove('btn-display');
      }
    }
    function onFavBtn() {
      localStorage.setItem(data._id, JSON.stringify(data));
      checkLocal();
    }
    function onremoveFavBtn() {
      localStorage.removeItem(data._id);
      checkLocal();
      if (location.pathname === '/Gym-squad//favorite.html') {
        location.reload();
      }
    }

    // Fill stars by rating
    const notFillStar = document.querySelectorAll('.star-item>use');

    for (let i = 0; i < Math.floor(rating); i += 1) {
      notFillStar[i].style.fill = '#EEA10C';
    }

    //  Render Gift
    function renderGitf(gifUrl, name) {
      if (gifUrl) {
        return `<div class="container-for-desktop-img">
          <img
            src="${gifUrl}"
            alt="${name}"
            class="modal-gift"
          />
        </div>`;
      }
      return `<div class="container-for-desktop-img">
          <img
            src="#"
            alt="Not Found"
            class="modal-gift"
          />
        </div>`;
    }

    //   modal.insertAdjacentHTML('beforeend', renderGitf(gifUrl, name));

    // Render Starts

    function formatRating(rating) {
      if (Number.isInteger(rating)) {
        return rating + '.0';
      } else {
        return rating;
      }
    }

    function renderRating() {
      let starsMarkUp = '';
      const stars = `<li class="stars">
                <svg class="star-item" wigth="18" height="18">
                  <use href="./img/sprite.svg#icon-star"></use>
                </svg>
              </li>`;

      for (let i = 0; i < 5; i += 1) {
        starsMarkUp += stars;
      }

      return starsMarkUp;
    }

    // Render Short Information

    function renderInfo() {
      return `<div class="modal-short-info">
            <ul class="modal-short-info-list">
              <li class="modal-short-info-item">
                <p class="info-item">Target</p>
                <p>${target}</p>
              </li>
              <li class="modal-short-info-item">
                <p class="info-item">Body Part</p>
                <p>${bodyPart}</p>
              </li>
              <li class="modal-short-info-item">
                <p class="info-item">Equipment</p>
                <p>${equipment}</p>
              </li>
              <li class="modal-short-info-item">
                <p class="info-item">Popular</p>
                <p>${popularity}</p>
              </li>
              <li class="modal-short-info-item">
                <p class="info-item">Burned Calories</p>
                <p>${burnedCalories}/<span>${time} min</span></p>
              </li>
            </ul>
          </div>
          <p class="item-description">
           ${description}
          </p>`;
    }

    // Render MarkUp
    function createModalReceiptMarkup() {
      const markUp = ` <div class="container-modal" >
      <div class="container-for-desktop">
      ${renderGitf(gifUrl, name)}
      <div class="container-for-desktop-info">
          <h2 class="modal-title">${name}</h2>
          <div class="rating-information">
            <span class="stars-rating">${formatRating(rating)}</span>
            <ul class="stars-list">
            ${renderRating(rating)}
            </ul>
          </div>
          ${renderInfo()}
          </div>
      </div>
      <div class="modal-buttons">
        <button class="modal-bnt-add-to-fav" type="button">
          Add to favorites
          <svg width="18" height="18">
            <use href="./img/sprite.svg#icon-heart"></use>
          </svg>
        </button>
        <button class="modal-bnt-remove-from-fav btn-display" type="button">
          Remove from favorites
          <svg width="18" height="18">
            <use href="./img/sprite.svg#icon-heart"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>`;
      return markUp;
    }

    // Add to favorite
  });
}
