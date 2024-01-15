// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen(selectedDates, dateStr, instance) {
    instance.clear(); 
  },
  onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];
    const now = new Date();

    if (userSelectedDate <= now) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      document.querySelector('[data-start]').disabled = true;
    } else {
      iziToast.hide();
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

const datePicker = flatpickr('#datetime-picker', options);

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

document.querySelector('[data-start]').addEventListener('click', function () {
  timerInterval = setInterval(updateTimer, 1000);
  this.disabled = true;
});
