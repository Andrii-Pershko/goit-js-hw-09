import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    elForm: document.querySelector('.form'),
}

refs.elForm.addEventListener('submit', e => {
    e.preventDefault();
    const { delay, step, amount } = e.currentTarget;

    const nDelay = Number(delay.value);
    let nStep = nDelay;
    const nAmount = Number(amount.value);

    for (let i = 1; i <= nAmount; i++) {

        createPromise(i, nStep)
            .then(({ position, delay }) => {
                Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });
        nStep += Number(step.value)

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
