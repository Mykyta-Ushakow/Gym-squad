// import * as main from '../main';
import axios from 'axios';
document
  .querySelector('#subscriptionForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.querySelector('#footer-email');
    const email = emailInput.value;

    if (!checkValidity(email)) {
      alert('Будь ласка, введіть коректну електронну пошту');
    } else {
      axios
        .post('https://your-energy.b.goit.study/api/subscription', {
          email: email,
        })
        .then(function (response) {
          alert('Ваш запит успішно відправлено');
          emailInput.value = '';
        })
        .catch(function (error) {
          alert('Помилка відправки запиту');
          emailInput.value = '';
        });
    }
  });
function checkValidity(email) {
  const emailRegex = /[a-zA-Z0-9._\%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  return emailRegex.test(email);
}
