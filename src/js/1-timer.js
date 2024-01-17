// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";




const startButton = document.querySelector('[data-start]');
let timerActive = false;
let timerInterval;

const input = document.querySelector('#datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];
    const now = new Date();

    if (userSelectedDate <= now || isNaN(userSelectedDate)) {
      iziToast.error({
        // title: 'Помилка',
        message: 'Please choose a valid future date before starting the timer.',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

const datePicker = flatpickr(input, options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimer() {
  const now = new Date();
  const userSelectedDate = datePicker.selectedDates[0];
  const timeDiff = userSelectedDate - now;

  if (timeDiff <= 0) {
    clearInterval(timerInterval);
    iziToast.success({
      // title: 'Успіх',
      message: 'The timer has reached zero!',
    });
    startButton.disabled = true;
    timerActive = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDiff);
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
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

  return { days, hours, minutes, seconds };
}

startButton.addEventListener('click', function () {
  const userSelectedDate = datePicker.selectedDates[0];

  if (userSelectedDate && !timerActive) {
    timerInterval = setInterval(updateTimer, 1000);
    this.disabled = true;
    timerActive = true;
  } else if (!userSelectedDate) {
    iziToast.error({
      // title: 'Помилка',
      message: 'Please choose a valid future date before starting the timer.',
    });
  } else {
    console.log('Timer is already active.');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const userSelectedDate = datePicker.selectedDates[0];
  if (userSelectedDate && !timerActive) {
    startButton.disabled = false;
    updateTimer(); 
  } else {
    startButton.disabled = true;
  }
});





// const startButton = document.querySelector('[data-start]');
// let timerActive = false;
// let timerInterval;

// const input = document.querySelector('#datetime-picker');
// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     const userSelectedDate = selectedDates[0];
//     const now = new Date();

//     if (userSelectedDate <= now || isNaN(userSelectedDate)) {
//       iziToast.error({
//         title: 'Помилка',
//         message: 'Будь ласка, виберіть дату та час у майбутньому',
//       });
//       startButton.disabled = true;
//     } else {
//       startButton.disabled = false;
//     }
//   },
// };

// const datePicker = flatpickr(input, options);

// function addLeadingZero(value) {
//   return value.toString().padStart(2, '0');
// }

// function updateTimer() {
//   const now = new Date();
//   const userSelectedDate = datePicker.selectedDates[0];
//   const timeDiff = userSelectedDate - now;

//   if (timeDiff <= 0) {
//     clearInterval(timerInterval);
//     iziToast.success({
//       title: 'Успіх',
//       message: 'Таймер досяг нуля!',
//     });
//     startButton.disabled = true;
//     timerActive = false;
//     return;
//   }

//   const { days, hours, minutes, seconds } = convertMs(timeDiff);
//   document.querySelector('[data-days]').textContent = addLeadingZero(days);
//   document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
//   document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
//   document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
// }

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// startButton.addEventListener('click', function () {
//   const userSelectedDate = datePicker.selectedDates[0];

//   if (userSelectedDate && !timerActive) {
//     timerInterval = setInterval(updateTimer, 1000);
//     this.disabled = true;
//     timerActive = true;
//   } else if (!userSelectedDate) {
//     iziToast.error({
//       title: 'Помилка',
//       message: 'Будь ласка, виберіть дійсну дату у майбутньому перед запуском таймера.',
//     });
//   } else {
//     console.log('Таймер вже активний.');
//   }
// });

// document.addEventListener('DOMContentLoaded', function () {
//   const userSelectedDate = datePicker.selectedDates[0];
//   if (userSelectedDate && !timerActive) {
//     startButton.disabled = false;
//   } else {
//     startButton.disabled = true;
//   }
// });






// const startButton = document.querySelector('[data-start]');
// let timerActive = false;
// let timerInterval;

// const input = document.querySelector('#datetime-picker');
// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     const userSelectedDate = selectedDates[0];
//     const now = new Date();

//     if (userSelectedDate <= now || isNaN(userSelectedDate)) {
//       alert('Please choose a valid date and time in the future');
//       startButton.disabled = true;
//     } else {
//       startButton.disabled = false;
//     }
//   },
// };

// const datePicker = flatpickr(input, options);

// function updateTimer() {
//   const now = new Date();
//   const userSelectedDate = datePicker.selectedDates[0];
//   const timeDiff = userSelectedDate - now;

//   if (timeDiff <= 0) {
//     clearInterval(timerInterval);
//     alert('Timer reached zero!');
//     startButton.disabled = true;
//     timerActive = false;
//     return;
//   }

//   // Update the timer display here
// }

// startButton.addEventListener('click', function () {
//   const userSelectedDate = datePicker.selectedDates[0];

//   if (userSelectedDate && !timerActive) {
//     timerInterval = setInterval(updateTimer, 1000);
//     this.disabled = true;
//     timerActive = true;
//   } else if (!userSelectedDate) {
//     alert('Please choose a valid future date before starting the timer.');
//   } else {
//     console.log('Timer is already active.');
//   }
// });

// document.addEventListener('DOMContentLoaded', function () {
//   const userSelectedDate = datePicker.selectedDates[0];
//   if (userSelectedDate && !timerActive) {
//     startButton.disabled = false;
//   } else {
//     startButton.disabled = true;
//   }
// });
