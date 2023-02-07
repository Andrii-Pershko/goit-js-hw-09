const refs = {
    start: document.querySelector("[data-start]"),
    stop: document.querySelector("[data-stop]"),
    body: document.querySelector("body"),
    timerId: null,
}

refs.stop.disabled = true;

refs.start.addEventListener('click', onPressStart);
refs.stop.addEventListener('click', onPressStop)

function onPressStart() {

    refs.body.style.backgroundColor = getRandomHexColor();
    const timerid = setInterval(editBackgroundColor, 1000);

    refs.stop.disabled = false;
    this.disabled = true;
    refs.timerId = timerid;
}

function onPressStop() {

    refs.start.disabled = false;
    refs.stop.disabled = true;

    clearInterval(refs.timerId);
}

function editBackgroundColor() {
    refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}