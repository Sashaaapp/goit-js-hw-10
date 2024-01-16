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
let autoStartTimer = false;
const input = document.querySelector('#datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];
    const now = new Date();

    if (userSelectedDate <= now) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
  onOpen(selectedDates, dateStr, instance) {
    // Додаємо слухача для очищення таймера при відкритті меню вибору
    clearTimerData();
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
      title: 'Success',
      message: 'Timer reached zero!',
    });
    startButton.disabled = false;
    input.disabled = false;
    timerActive = false;
    autoStartTimer = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDiff);
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
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

let timerInterval;

startButton.addEventListener('click', function () {
  const userSelectedDate = datePicker.selectedDates[0];

  if (userSelectedDate && !timerActive) {
    timerInterval = setInterval(updateTimer, 1000);
    this.disabled = true;
    timerActive = true;
  } else if (!userSelectedDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a valid future date before starting the timer.',
    });
  } else {
    console.log('Timer is already active.');
  }
});

input.addEventListener('change', function () {
  autoStartTimer = true;
});

document.addEventListener('DOMContentLoaded', function () {
  if (autoStartTimer) {
    const userSelectedDate = datePicker.selectedDates[0];
    if (userSelectedDate && !timerActive) {
      timerInterval = setInterval(updateTimer, 1000);
      startButton.disabled = true;
      timerActive = true;
    }
  }
});

// Функція для очищення даних таймера
function clearTimerData() {
  document.querySelector('[data-days]').textContent = '00';
  document.querySelector('[data-hours]').textContent = '00';
  document.querySelector('[data-minutes]').textContent = '00';
  document.querySelector('[data-seconds]').textContent = '00';
  clearInterval(timerInterval);
  startButton.disabled = false;
  input.disabled = false;
  timerActive = false;
  autoStartTimer = false;
}