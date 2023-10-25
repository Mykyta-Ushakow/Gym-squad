import '/js/header';
import { OpenModal } from '/js/modal';
import svgSprite from '/img/sprite.svg';

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

let favoriteCards = [];
let currentPage = 1;
let cardsPerPage = 8;

function updateCardsPerPage() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    cardsPerPage = 8;
  } else if (screenWidth >= 768 && screenWidth < 1280) {
    cardsPerPage = 10;
  } else if (screenWidth >= 1280) {
    cardsPerPage = 6;
  }

  displayFavoriteCards(currentPage);
}

window.addEventListener('resize', updateCardsPerPage);

updateCardsPerPage();

function loadFavoriteCards() {
  favoriteCards = Object.values(localStorage)
    .map(item => {
      try {
        return JSON.parse(item);
      } catch (error) {
        // console.error('Error parsing JSON data:', error);
        return null;
      }
    })
    .filter(cardData => cardData && cardData._id);
}

function removeExercise(exerciseId) {
  localStorage.removeItem(exerciseId);
}

function createCardMarkup({ name, burnedCalories, bodyPart, target, _id }) {
  const cardMarkup = `
    <li class="fav-exercises-item">
      <div class="fav-exercises-header">
        <div class="fav-exercises-meta-container">
          <p class="fav-exercises-meta">WORKOUT</p>
          <button type="button" class="favorites-btn-trash">
            <svg width="16" height="16" data-card-id="${_id}">
              <use href="${svgSprite}#icon-trash"></use>
            </svg>
          </button>
        </div>
        <div class="fav-btn-container">
          <button type="button" data-modal-open class="fav-exercises-btn open-modal-btn" data-exercise-id="${_id}">Start
          <svg width="16" height="16" class="favorites-icon-arrow">
            <use id="favorites-icon-arrow" href="${svgSprite}#icon-arrow-right"></use>
          </svg></button>
        </div>
      </div>
      <div class="fav-exercises-name-container">
        <span class="fav-exercises-name-span">
          <svg width="24" height="24" class="fav-exercises-name-svg">
            <use href="${svgSprite}#icon-running-circled"></use>
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

function displayFavoriteCards(page) {
  const favoritesContainer = document.querySelector('.favorites-container');
  favoritesContainer.innerHTML = '';

  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const cardsToDisplay = favoriteCards.slice(startIndex, endIndex);

  if (cardsToDisplay.length === 0) {
    const favText = document.querySelector('.fav-text');
    favText.style.display = 'block';
  } else {
    const favText = document.querySelector('.fav-text');
    favText.style.display = 'none';
  }

  cardsToDisplay.forEach(cardData => {
    const cardMarkup = createCardMarkup(cardData);
    favoritesContainer.insertAdjacentHTML('beforeend', cardMarkup);

    const openModalBtn = favoritesContainer.querySelector(
      `[data-exercise-id="${cardData._id}"]`
    );
    openModalBtn.addEventListener('click', event => {
      if (event.target.closest('.open-modal-btn')) {
        OpenModal(event);
      }
    });

    const deleteButton = favoritesContainer.querySelector(
      `[data-card-id="${cardData._id}"]`
    );
    deleteButton.addEventListener('click', event => {
      event.stopPropagation();
      removeExercise(cardData._id);
      const listItem = deleteButton.closest('.fav-exercises-item');
      if (listItem) {
        listItem.remove();
      }
    });
  });
}

function handlePagination(data, currentPage) {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(favoriteCards.length / cardsPerPage);
  const maxButtons = 7;

  let pagesToDisplay = [];

  if (totalPages <= maxButtons) {
    pagesToDisplay = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    const neighbors = 2;

    if (currentPage <= neighbors + 1) {
      pagesToDisplay = [1, 2, 3, 4, '...', totalPages];
    } else if (currentPage >= totalPages - neighbors) {
      pagesToDisplay = [
        1,
        '...',
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      pagesToDisplay = [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
      ];
    }
  }

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
        displayFavoriteCards(page);
      });
    } else {
      pageButton.disabled = true;
    }

    paginationContainer.appendChild(pageButton);
  });
}

function initialize() {
  loadFavoriteCards();
  displayFavoriteCards(currentPage);
  handlePagination(
    {
      totalPages: Math.ceil(favoriteCards.length / cardsPerPage),
      page: currentPage,
    },
    currentPage
  );
}

initialize();
