// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const delayInput = form.querySelector("[name='delay']");
    const stateInput = form.querySelector("[name='state']:checked");

    const delay = parseInt(delayInput.value);

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (stateInput.value === "fulfilled") {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });

    promise
      .then((delay) => {

        iziToast.success({

          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight'

        });
 
      })
      .catch((delay) => {

        iziToast.error({

          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight'

        });

      });
  });
});
