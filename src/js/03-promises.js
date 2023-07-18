import Notiflix from "notiflix";
const delayEl = document.querySelector('[name=delay]');
const stepEl = document.querySelector('[name=step]');
const amountEl = document.querySelector('[name=amount]');

document.querySelector('[type=submit]').addEventListener('click', e => {
  e.preventDefault();
  run();
});

function run() {
  let waited = Number(delayEl.value);
  let step = Number(stepEl.value);
  for (let i = 0; i < amountEl.value; i++) {
    createPromise(i + 1, waited + step * i).then(
      //чомусь воно не йшло, якщо я передавав позішон і ділей окремими змінними(воно бачило позішон, а ділей вважало андефайнд)
      (el) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${el.position} in ${el.delay}ms`)
      },
      (el) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${el.position} in ${el.delay}ms`)
      }
    );
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(position + ': ' + delay);
      
      if (shouldResolve) resolve({position, delay});
      else reject({position, delay});
    }, delay);
  });
}
