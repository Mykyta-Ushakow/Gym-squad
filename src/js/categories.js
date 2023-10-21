//import * as main from '../main';
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

          const image = document.createElement('img');
          image.src = imageData.imgURL;
          image.alt = imageData.name;
          image.classList.add('image');

          const filterText = document.createElement('p');
          filterText.textContent = `${imageData.filter}`;
          filterText.classList.add('filterText');

          const nameText = document.createElement('p');
          nameText.textContent = `${imageData.name}`;
          nameText.classList.add('nameText');

          imageCard.appendChild(image);
          imageCard.appendChild(filterText);
          imageCard.appendChild(nameText);

          imageFilterGallery.appendChild(imageCard);
        });
      } else {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent =
          'Nothing was found for this query. Please try again.';
        imageFilterGallery.appendChild(noResultsMessage);
      }
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
});

musclesButton.addEventListener('click', function () {
  searchImages('Muscles');
});

equipmentButton.addEventListener('click', function () {
  searchImages('Equipment');
});

window.addEventListener('load', () => {
  searchImages('Body parts');
});
