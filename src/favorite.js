import '/js/header';
import * as modal from './js/modal';

const quoteData = localStorage.getItem('quoteData');
let quote = '';
let author = '';
let savedDate = '';

if (quoteData) {
  const {
    quote: savedQuote,
    author: savedAuthor,
    date,
  } = JSON.parse(quoteData);
  quote = savedQuote;
  author = savedAuthor;
  savedDate = date;
}

const currentDate = new Date().toLocaleDateString();
const shouldFetchQuote = currentDate !== savedDate;

if (shouldFetchQuote) {
  fetch('https://your-energy.b.goit.study/api/quote')
    .then(response => response.json())
    .then(data => {
      quote = data.quote;
      author = data.author;
      savedDate = currentDate;

      localStorage.setItem(
        'quoteData',
        JSON.stringify({ quote, author, date: savedDate })
      );

      displayQuote(quote, author);
    })
    .catch(error => {
      console.error('Error', error);
    });
} else {
  displayQuote(quote, author);
}

function displayQuote(quote, author) {
  const quoteElement = document.querySelector('.fav-quote');
  const authorElement = document.querySelector('.fav-quotes-author');
  quoteElement.textContent = quote;
  authorElement.textContent = author;
}

let cardsPerPage = 8;
let loadMoreButton;

const screenWidth = window.innerWidth;
if (screenWidth >= 768 && screenWidth < 1280) {
  cardsPerPage = 10;
} else if (screenWidth >= 1280) {
  cardsPerPage = 6;
}

function displayFavoriteCards() {
  const favoritesContainer = document.querySelector('.favorites-container');
  const favText = document.querySelector('.fav-text');

  favoritesContainer.innerHTML = '';

  let cardCount = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      try {
        const cardData = JSON.parse(localStorage[key]);

        if (cardData && cardData._id) {
          const cardMarkup = createCardMarkup(cardData);
          favoritesContainer.insertAdjacentHTML('beforeend', cardMarkup);
          cardCount++;

          if (cardCount >= cardsPerPage) {
            break;
          }
        }
      } catch (error) {
        // console.error 'Error parsing JSON data for key:', key, error);
      }
    }
  }

  const loadMoreButton = document.getElementById('load-more-button');
  loadMoreButton.addEventListener('click', loadMoreCards);

  if (cardCount < cardsPerPage) {
    loadMoreButton.style.display = 'none';
  } else {
    loadMoreButton.style.display = 'block';
  }

  if (cardCount > 0) {
    favText.style.display = 'none';
  } else {
    favText.style.display = 'block';
  }
}

const openButtons = document.querySelectorAll('[data-modal-open]');
openButtons.forEach(openModalBtnItem => {
  openModalBtnItem.addEventListener('click', openModal);
});

function createCardMarkup({
  name,
  burnedCalories,
  bodyPart,
  target,
  _id,
}) {
  const cardMarkup = `
    <li class="fav-exercises-item" data-exercise-id="${_id}">
      <div class="fav-exercises-header">
        <div class="fav-exercises-meta-container">
          <p class="fav-exercises-meta">WORKOUT</p>
          <svg width="16" height="16" class="favorites-icon-trash" data-card-id="${_id}">
            <use href="./img/sprite.svg#icon-trash"></use>
          </svg>
        </div>
        <div class="fav-btn-container">
          <button type="button" data-modal-open class="fav-exercises-btn open-modal-btn">Start</button>
          <svg width="16" height="16" class="favorites-icon-arrow">
            <use id="favorites-icon-arrow" href="./img/sprite.svg#icon-arrow-right"></use>
          </svg>
        </div>
      </div>
      <div class="fav-exercises-name-container">
        <span class="fav-exercises-name-span">
          <svg width="24" height="24" class="fav-exercises-name-svg">
            <use href="../img/sprite.svg#icon-running-circled"></use>
          </svg>
        </span>
        <p class="fav-exercises-name">
          ${name}
        </p>
      </div>
      <ul class="fav-exercises-descr-list">
        <li class="fav-exercises-descr-item">
          <span class="fav-exercises-descr-span">
            Burned calories:
          </span>
          ${burnedCalories} / 3 min
        </li>
        <li class="fav-exercises-descr-item">
          <span class="fav-exercises-descr-span">
            Body part:
          </span>
          ${bodyPart}
        </li>
        <li class="fav-exercises-descr-item">
          <span class="fav-exercises-descr-span">
            Target:
          </span>
          ${target}
        </li>
      </ul>
    </li>`;

  return cardMarkup;
}

const removeFavBtns = document.querySelectorAll('.favorites-icon-trash');
removeFavBtns.forEach(removeFavBtn => {
  removeFavBtn.addEventListener('click', onRemoveFavBtn);
});

function onRemoveFavBtn(event) {
  const cardId = event.currentTarget.getAttribute('data-card-id');
  localStorage.removeItem(cardId);
  displayFavoriteCards();
}

function loadMoreCards() {
  const currentCardCount = document.querySelectorAll(
    '.fav-exercises-item'
  ).length;

  let cardsToLoad = cardsPerPage;

  if (screenWidth >= 768 && screenWidth < 1280) {
    cardsToLoad = 10;
  } else if (screenWidth >= 1280) {
    cardsToLoad = 6;
  }

  const startIndex = currentCardCount;
  const endIndex = startIndex + cardsToLoad;

  for (let i = startIndex; i < endIndex && i < localStorage.length; i++) {
    const key = `exercise_${i}`;
    const cardData = JSON.parse(localStorage.getItem(key));

    if (cardData && cardData._id) {
      const cardMarkup = createCardMarkup(cardData);
      const favoritesContainer = document.querySelector('.favorites-container');
      favoritesContainer.insertAdjacentHTML('beforeend', cardMarkup);
    }

    if (startIndex + cardsToLoad >= localStorage.length) {
      loadMoreButton.style.display = 'none';
    }
  }
}

loadMoreButton = document.getElementById('load-more-button');
loadMoreButton.addEventListener('click', loadMoreCards);

displayFavoriteCards();
