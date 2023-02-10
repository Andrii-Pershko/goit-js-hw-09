import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    elForm: document.querySelector('.form'),
}

refs.elForm.addEventListener('submit', e => {
    e.preventDefault();
    const {
        elements: { delay, step, amount }
    } = e.currentTarget;

    const Ndelay = Number(delay.value);
    let Nstep = Ndelay;
    const Namount = Number(amount.value);

    for (let i = 1; i <= Namount; i++) {

        createPromise(i, Nstep)
            .then(({ position, delay }) => {
                Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });
        Nstep += Number(step.value)

    }




});

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay })
            }
            reject({ position, delay });
        }, delay)
    })
}