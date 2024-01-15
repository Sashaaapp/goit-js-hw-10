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
    onClose(selectedDates) {
      const userSelectedDate = selectedDates[0];
      const currentDate = new Date();
  
      if (userSelectedDate < currentDate) {
        document.querySelector('button[data-start]').disabled = true;
        iziToast.error({ title: 'Error', message: 'Please choose a date in the future', position: 'topRight',
    });
      } else {
        document.querySelector('button[data-start]').disabled = false;
      }
    },
  };
  
  flatpickr("#datetime-picker", options);
  
  let countdownInterval;
  
  function startCountdown(targetDate) {
    countdownInterval = setInterval(() => {
      const currentDate = new Date();
      const timeDifference = targetDate - currentDate;
  
      if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        updateTimerDisplay(0, 0, 0, 0);
        iziToast.success({ title: 'Countdown Finished', message: 'The countdown has reached the end.' });
        document.querySelector('button[data-start]').disabled = false;
      } else {
        const { days, hours, minutes, seconds } = convertMs(timeDifference);
        updateTimerDisplay(days, hours, minutes, seconds);
      }
    }, 1000);
  }
  
  function updateTimerDisplay(days, hours, minutes, seconds) {
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
  }
  
  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }
  
  // function convertMs(ms) {
  //   const second = 1000;
  //   const minute = second * 60;
  //   const hour = minute * 60;
  //   const day = hour * 24;
  
  //   const days = Math.floor(ms / day);
  //   const hours = Math.floor((ms % day) / hour);
  //   const minutes = Math.floor((ms % hour) / minute);
  //   const seconds = Math.floor(((ms % day) % hour % minute) / second);
  
  //   return { days, hours, minutes, seconds };
  // }


  function convertMs(ms) {
    const second = 1000;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor((ms % hour) / minute);
    const seconds = Math.floor(((ms % day) % hour % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  
  
  document.querySelector('button[data-start]').addEventListener('click', () => {
    const userSelectedDate = flatpickr('#datetime-picker').selectedDates[0];
    document.querySelector('button[data-start]').disabled = true;
    startCountdown(userSelectedDate);
  });