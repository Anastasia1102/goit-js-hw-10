import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';

const btnStart = document.querySelector("[data-start]");
const timerInput = document.getElementById("datetime-picker");


let userSelectedDate = null;


// бібліотека flatpickr( вибір дати)
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
//використання бібліотеки iziToast(виводить повідомнення)
      iziToast.error({
        position: 'topRight',
          message: 'Please choose a date in the future',
           backgroundColor: 'red',
      });
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
      timerInput.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};

flatpickr(timerInput, options);

document.addEventListener('DOMContentLoaded', () => {
  btnStart.disabled = true;
});
btnStart.addEventListener("click", startTimer);

function startTimer() {
  btnStart.disabled = true;
  timerInput.disabled = true;
  const timerInterval = setInterval(() => {
    const remainingTime = calculateTimeLeft(userSelectedDate);
    updateTimer(remainingTime);
    if (remainingTime.total <= 0) {
       // clearInterval() Скасування інтервалу
      clearInterval(timerInterval);
      iziToast.success({
        position: 'topRight',
          message: 'Time is up',
          backgroundColor:'green'
      });
    }
  }, 1000);
}

function calculateTimeLeft(endDate) {
  const difference = endDate - new Date();
  const timeLeft = convertMs(difference);
  return timeLeft;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  const nonNegativeDays = Math.max(0, days);
  const nonNegativeHours = Math.max(0, hours);
  const nonNegativeMinutes = Math.max(0, minutes);
  const nonNegativeSeconds = Math.max(0, seconds);

return {
    days: nonNegativeDays,
    hours: nonNegativeHours,
    minutes: nonNegativeMinutes,
    seconds: nonNegativeSeconds,
    total: ms
  };

}

function updateTimer({ days, hours, minutes, seconds }) {
  document.querySelector("[data-days]").textContent = addLeadingZero(days);
  document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
  document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
  document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
}
// якщо воно містить менше двох символів, на початку числа додаємо 0.
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}


