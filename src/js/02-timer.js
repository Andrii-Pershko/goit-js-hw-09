//start
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
    btnStart: document.querySelector('[data-start]'),
    elDay: document.querySelector('[data-days]'),
    elHours: document.querySelector('[data-hours]'),
    elMinutes: document.querySelector('[data-minutes]'),
    elSeconds: document.querySelector('[data-seconds]'),

}
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (new Date() > selectDate.selectedDates[0]) {
            Notify.failure('Please choose a date in the future');
        } else {
            targetTime = selectedDates[0];
            refs.btnStart.disabled = false;
        }
    },
};
const selectDate = flatpickr("#datetime-picker", options);

refs.btnStart.disabled = true;

refs.btnStart.addEventListener('click', countdown);

// const curentDate = new Date();
let targetTime = null;


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = padStart(Math.floor(ms / day));
    // Remaining hours
    const hours = padStart(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = padStart(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = padStart(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function countdown() {
    refs.btnStart.disabled = true;
    // console.log(targetTime - curentDate);
    const timerId = setInterval(() => {

        const formatingDate = convertMs(targetTime - new Date());
        const { days, hours, minutes, seconds } = formatingDate;
        if (days === '00' && hours === '00' && minutes === '00' && seconds === '00') {
            clearInterval(timerId);
        }

        refs.elDay.textContent = `${days}`;
        refs.elHours.textContent = `${hours}`;
        refs.elMinutes.textContent = `${minutes}`;
        refs.elSeconds.textContent = `${seconds}`;

    }, 1000);

};

function padStart(number) {
    number = String(number);
    if (number.length < 2) {
        return `0${number}`;
    }
    return number;
}
