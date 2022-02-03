import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import '../css/common.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
};
// refs.input.addEventListener('click', e => console.log(e));
// console.log(refs.input);
 
let endOfTime = null;
let interval = null;
const timer = {
  start() {
    interval = setInterval(() => {
      refs.input.disabled = true;
      const currentTime = Date.now();

      if (Math.floor(currentTime / 1000) === Math.floor(endOfTime / 1000)) {
        return this.stop();
      }

      const interval = endOfTime - currentTime;
      const counting = convertMs(interval);
      parsTime(counting);
    }, 1000);
  },
  stop() {
    clearInterval(interval);
    refs.input.disabled = false;
  },
};

const parsTime = ({ days, hours, minutes, seconds }) => {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
};

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    endOfTime = selectedDates[0].getTime();
    if (endOfTime <= Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

refs.startBtn.addEventListener('click', () => {
  timer.start();
  refs.startBtn.disabled = true;
});
