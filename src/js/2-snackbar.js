import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const isActive = form.elements.state.value === 'fulfilled';

  createPromise(delay, isActive)
    .then(delay => {
      iziToast.success({
        title: 'OK',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
      });
    });

  form.reset();
});

function createPromise(delay, isActive) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (isActive) {
        res(delay);
      } else {
        rej(delay);
      }
    }, delay);
  });
}
