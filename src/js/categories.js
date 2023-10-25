// import * as main from '../main';
import { onClick } from './exercises';

let activeFilter = 'Body parts'; // Initialize with a default value

function setLimit() {
  const isLargeScreen = window.matchMedia('(min-width: 768px)').matches;
  return isLargeScreen ? 12 : 9;
}

async function searchImages(filter, page = 1) {
  const limit = setLimit();

  const buttons = document.querySelectorAll('.filter');
  buttons.forEach(button => button.classList.remove('active'));

  const activeButton = document.getElementById(filter.toLowerCase() + 'Button');

  if (activeButton) {
    activeButton.classList.add('active');
    activeFilter = filter; // Update the active filter
  } /*else {
    console.error(`Button for filter "${filter}" not found.`);
  }*/

  try {
    const apiUrl = `https://your-energy.b.goit.study/api/filters?filter=${filter}&page=${page}&limit=${limit}`;
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();
      const imageFilterGallery = document.getElementById('imageFilterGallery');
      imageFilterGallery.innerHTML = '';

      //console.log('Data from the server:', data);

      if (data.results.length > 0) {
        data.results.forEach(imageData => {
          const imageCard = document.createElement('div');
          imageCard.classList.add('image-card');
          imageCard.addEventListener('click', onClick);

          const image = document.createElement('img');
          image.src = imageData.imgURL;
          image.alt = imageData.name;
          image.classList.add('image');

          const nameText = document.createElement('p');
          nameText.textContent = `${imageData.name}`;
          nameText.classList.add('nameText');
          imageCard.dataset.name = imageData.name;

          const filterText = document.createElement('p');
          filterText.textContent = `${imageData.filter}`;
          filterText.classList.add('filterText');
          imageCard.dataset.category = dataSlicer(imageData.filter);

          imageCard.appendChild(image);
          imageCard.appendChild(nameText);
          imageCard.appendChild(filterText);

          imageFilterGallery.appendChild(imageCard);
        });
      } else {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent =
          'Nothing was found for this query. Please try again.';
        imageFilterGallery.appendChild(noResultsMessage);
      }
      /* пагінація*/
      const paginationContainer = document.getElementById('pagination');
      paginationContainer.innerHTML = '';

      if (data.totalPages > 1) {
        for (let i = 1; i <= data.totalPages; i++) {
          const pageButton = document.createElement('button');
          pageButton.textContent = i;
          pageButton.addEventListener('click', () => {
            searchImages(filter, i);
          });
          if (i === page) {
            pageButton.classList.add('active');
          }

          paginationContainer.appendChild(pageButton);
        }
      }
      /*------------*/
    } else {
      console.error('Error fetching images from the API');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

const bodyPartsButton = document.getElementById('bodyPartsButton');
const musclesButton = document.getElementById('musclesButton');
const equipmentButton = document.getElementById('equipmentButton');

bodyPartsButton.addEventListener('click', function () {
  searchImages('Body parts');
  bodyPartsButton.classList.add('active');
});

musclesButton.addEventListener('click', function () {
  searchImages('Muscles');
  musclesButton.classList.add('active');
});

equipmentButton.addEventListener('click', function () {
  searchImages('Equipment');
  equipmentButton.classList.add('active');
});
function dataSlicer(dataStr) {
  return dataStr === 'Body parts'
    ? dataStr.replace(/\s/g, '').toLowerCase().slice(0, -1)
    : dataStr.replace(/\s/g, '').toLowerCase();
}
window.addEventListener('load', () => {
  searchImages('Body parts');
  bodyPartsButton.classList.add('active');
});
