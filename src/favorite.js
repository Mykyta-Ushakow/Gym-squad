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
