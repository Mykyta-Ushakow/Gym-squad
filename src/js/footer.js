import * as main from '../main';
import axios from '../main';
document
  .querySelector('subscriptionForm')
  .addEventListener('click', function (event) {
    event.preventDefault();

    const emailInput = document.querySelector('email');
    const email = emailInput.value;

    if (!emailInput.checkValidity()) {
      alert('Будь ласка, введіть коректну електронну пошту.');
    } else {
      axios
        .post('https://your-energy.b.goit.study/api/subscription', {
          email: email,
        })
        .then(function (response) {
          alert('Ваш запит успішно відправлено на сервер.');
        })
        .catch(function (error) {
          alert('Помилка відправки запиту на сервер.');
        });
    }
  });
