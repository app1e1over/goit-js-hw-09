function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
let intervalId;
function changeCol() {
  document.body.style.backgroundColor = getRandomHexColor();
}
const startBut = document.querySelector('[data-start]');
startBut.addEventListener('click', () => {
  intervalId = setInterval(changeCol, 1000);
  toggle();
});
const stopBut = document.querySelector('[data-stop]');
stopBut.addEventListener('click', () => {
  clearInterval(intervalId);
  toggle();
});
let mode = false;
function toggle() {
    if(mode){
        stopBut.removeAttribute('disabled', '');
        startBut.setAttribute('disabled', '');
    }else{
        stopBut.setAttribute('disabled', '');
        startBut.removeAttribute('disabled', '');
    }
    mode=!mode;
}
toggle();