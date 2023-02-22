const buttons = document.querySelectorAll(".timer__button");
const displayTimeLeft = document.querySelector(".display__time-left");
const displayEndTime = document.querySelector(".display__end-time");

let countdown;

buttons.forEach(function (button) {
  button.addEventListener("click", startTimer);
});

// start timer
function startTimer(e) {
  const seconds = Number(e.target.dataset.time);

  timer(seconds);
}

function timer(seconds) {
  clearInterval(countdown); //clear any existing timer

  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  showTimeLeft(min, sec);
  showEndTime(seconds);

  // set timer
  countdown = setInterval(function () {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;

    seconds--;

    document.title = `${min}:${sec < 10 ? "0" : ""}${sec}`;
    displayTimeLeft.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;

    // clear countdown if seconds < 0
    if (seconds < 0) {
      clearInterval(countdown);
    }
  }, 500);
}

// show timeLeft before starting countdown
function showTimeLeft(min, sec) {
  document.title = `${min}:${sec < 10 ? "0" : ""}${sec}`;
  displayTimeLeft.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

// show endTime
function showEndTime(seconds) {
  const currentHr = new Date().getHours();
  const currentMin = new Date().getMinutes();

  const second = currentHr * 60 * 60 + currentMin * 60 + Number(seconds);

  const hr = Math.floor(second / 3600);
  const min = Math.floor((second % 3600) / 60);

  displayEndTime.innerHTML = `Be Back At ${hr}:${min < 10 ? "0" : ""}${min}`;
}

// customForm input timer
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const secs = Number(this.minutes.value * 60);
  const min = Math.floor(secs / 60);
  const sec = secs % min;
  this.reset();
  displayTimeLeft.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
  timer(secs);
});
