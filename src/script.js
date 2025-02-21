const clockInp = document.querySelector(".time");
const clock = document.querySelector(".hou");
const dt = document.querySelector(".dt");
const stop = document.querySelector(".stop");
const icon = document.querySelector(".alaram-icon");
let audio = new Audio("../dist/assets/alarm_clock.mp3");
// default digital clock
setInterval(() => {
  const time = new Date();
  const currTime = time.toLocaleTimeString();
  clock.innerHTML = currTime;
}, 1000);

function convertTo12Hours(time) {
  let [hours, minutes] = time.split(":");
  let period = "AM";
  hours = parseInt(hours);
  if (hours > 12) {
    period = "PM";
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }
  let formattedHours = hours.toString().padStart(2, "0");
  return `${formattedHours}:${minutes} ${period}`;
}
window.onload = function () {
  const savedAlarm = localStorage.getItem("alarmTime");
  if (savedAlarm) {
    ringthealaram(savedAlarm);
  }
};
// time input
clockInp.addEventListener("change", () => {
  const time24 = clockInp.value;
  const time12 = convertTo12Hours(time24);

  dt.innerHTML = `<h2 class="text-bold text-white text-2xl py-5 uppercase">Please wait until ${time12}</h2>`;
  ringthealaram(time12);
});
function ringthealaram(time) {
  const alaram = setInterval(() => {
    console.log(time);

    const latTIme = new Date();
    const newTime = latTIme.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    localStorage.setItem("alarmTime", time);
    if (time === newTime) {
      console.log("Alarm ringing");
      dt.innerHTML = `<h2 class="text-bold text-white text-2xl py-5 uppercase">clock is ringing</h2>`;
      audio.play();
      icon.classList.add = `animate-ping`;
      clearInterval(alaram);
    }
  }, 1000);
}
stop.addEventListener("click", () => {
  clockInp.value = "00:00";
  dt.innerHTML = `<h2 class="text-bold text-white text-2xl py-5 uppercase">choose time again</h2>`;
  localStorage.removeItem("alarmTime");
  audio.pause();
});
