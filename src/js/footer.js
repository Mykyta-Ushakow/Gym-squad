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
      Notiflix.Notify.failure('Please enter a valid email address');
    } else {
      axios
        .post('https://your-energy.b.goit.study/api/subscription', {
          email: email,
        })
        .then(function (response) {
          Notiflix.Notify.success('Your request has been successfull');
          emailInput.value = '';
        })
        .catch(function (error) {
          Notiflix.Notify.failure('Request error');
          emailInput.value = '';
        });
    }
  });
function checkValidity(email) {
  const emailRegex = /[a-zA-Z0-9._\%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  return emailRegex.test(email);
}
