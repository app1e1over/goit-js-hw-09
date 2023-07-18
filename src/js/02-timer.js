import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    date = new Date(selectedDates[0]);
    clearInterval(intervalId);
    toZero();
    if (Date.now() > date) {
      Notiflix.Notify.failure("Please choose a date in the future");
      if (!startButton.hasAttribute('disabled')) {
        startButton.setAttribute('disabled', '');
        startButton.removeEventListener('click', begin);
      }
    } else {
      startButton.removeAttribute('disabled');
      startButton.addEventListener('click', begin);
    }
  },
};
const s = new flatpickr('input#datetime-picker', options);

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const startButton = document.querySelector('[data-start]');
startButton.setAttribute('disabled', '');

let date;
let intervalId;
function begin() {
  update();
  intervalId = setInterval(update, 1000);
}
function toZero() {
  secondsEl.textContent = '00';
  minutesEl.textContent = '00';
  hoursEl.textContent = '00';
  daysEl.textContent = '00';
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value){
  if(value<10){
    value = value.toString().padStart(2,"0");
  }
  return value;
}
function update() {
  let res = convertMs(date-Date.now());
  secondsEl.textContent = addLeadingZero(res.seconds);
  minutesEl.textContent = addLeadingZero(res.minutes);
  hoursEl.textContent = addLeadingZero(res.hours);
  daysEl.textContent = addLeadingZero(res.days);
}
