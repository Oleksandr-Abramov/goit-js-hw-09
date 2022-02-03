import '../css/common.css';
const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let interval = null;
refs.stopBtn.disabled = true;

const timer = {
  start() {
    interval = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  },
  stop() {
    clearInterval(interval);
  },
};

refs.startBtn.addEventListener('click', () => {
  timer.start();
  btnAct(true, false);
});
refs.stopBtn.addEventListener('click', () => {
  timer.stop();
  btnAct(false, true);
});

function btnAct(start, stop) {
  refs.startBtn.disabled = start;
  refs.stopBtn.disabled = stop;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
