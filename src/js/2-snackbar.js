import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const promiseForm = document.querySelector('.form');
const submitBtn = document.querySelector('button');



promiseForm.addEventListener('submit', onSubmit)

function onSubmit(event) {
    event.preventDefault();
    // Отримуємо значення поля delay і state
  const delay = promiseForm.elements.delay.value;
    const radioBtn = promiseForm.elements.state.value;
    //очищення вибору
    event.target.reset();
    // Створення проміса з вказаною затримкою (delay)
    const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioBtn === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
    });
    // обробкf результату проміса
promise.then(value => {
      iziToast.success({
        position: 'topRight',
          message: `${value}`,
          backgroundColor: '#59A10D',
          messageColor:'#FFFFFF',
      });
    })
    .catch(error => {
      iziToast.error({
        position: 'topRight',
          message: `${error}`,
          backgroundColor: '#EF4040',
        messageColor:'#FFFFFF',
      });
    });
};