// import * as main from '../main';
import axios from 'axios';
import Notiflix from 'notiflix';
Notiflix.Notify.init();
document
  .querySelector('#subscriptionForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.querySelector('#email');
    const email = emailInput.value;

    if (!checkValidity(email)) {
      Notiflix.Notify.failure('Будь ласка, введіть коректну електронну пошту');
    } else {
      axios
        .post('https://your-energy.b.goit.study/api/subscription', {
          email: email,
        })
        .then(function (response) {
          Notiflix.Notify.success('Ваш запит успішно відправлено');
          emailInput.value = '';
        })
        .catch(function (error) {
          Notiflix.Notify.failure('Помилка відправки запиту');
          emailInput.value = '';
        });
    }
  });
function checkValidity(email) {
  const emailRegex = /[a-zA-Z0-9._\%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  return emailRegex.test(email);
}
