// import * as main from '../main';
import axios from 'axios';
import Notiflix from 'notiflix';

document
  .querySelector('#subscriptionForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.querySelector('#footer-email');
    const email = emailInput.value;

    if (!checkValidity(email)) {
      Notiflix.Notify.Failure('Будь ласка, введіть коректну електронну пошту');
      options;
    } else {
      axios
        .post('https://your-energy.b.goit.study/api/subscription', {
          email: email,
        })
        .then(function (response) {
          Notiflix.Notify.Success('Ваш запит успішно відправлено');
          emailInput.value = '';
          options;
        })
        .catch(function (error) {
          Notiflix.Notify.Failure('Помилка відправки запиту');
          emailInput.value = '';
          options;
        });
    }
  });
function checkValidity(email) {
  const emailRegex = /[a-zA-Z0-9._\%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  return emailRegex.test(email);
}
