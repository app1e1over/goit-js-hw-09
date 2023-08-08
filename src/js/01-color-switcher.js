import Notiflix from "notiflix";

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
let intervalId;
const colorHexDisplay=document.querySelector("#color-hex")
function changeCol() {
  var col = getRandomHexColor().toUpperCase();
  colorHexDisplay.innerHTML = col;
  document.body.style.backgroundColor = col;
}
colorHexDisplay.addEventListener("click",()=>{
  navigator.clipboard.writeText(colorHexDisplay.innerHTML);
  Notiflix.Notify.success("Color was successfully copied to clipboard!")
})
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