const display = document.getElementById('display');
const btnStart = document.getElementById('button-start');
const btnStop = document.getElementById('button-small_break');
const btnBreak = document.getElementById('button-big_break');
const btnSound = document.getElementById('button-sound');
const btnDarkMode = document.getElementById('button-dark_mode');
const app = document.getElementById('app');
const audio = document.getElementById('audio');
const audioClock = document.getElementById('clock');

let active = false;
let mainTime = 1500;
let time;

// methods 

changeBackgroundColor = () => {
    if (active) {
        btnStart.classList.add('buttonActive');
        btnStop.classList.remove('buttonActive');

    } else {
        btnStart.classList.remove('buttonActive');
        btnStop.classList.add('buttonActive');
    };
}

countdown = () => {
    if (active == false) {
        time = setInterval(countdownSeconds, 1000);
        active = !active;
        changeBackgroundColor();
    } else {
        null
    }
};

countdownSeconds = () => {
    mainTime--;
    const minutes = (Math.floor(mainTime / 60) % 60) < 10 ?
        '0' + Math.floor(mainTime / 60) % 60 :
        Math.floor(mainTime / 60) % 60;
    const seconds = (mainTime % 60) < 10 ?
        '0' + mainTime % 60 :
        mainTime % 60;
    const convertedTime = `${minutes} : ${seconds}`;
    display.innerHTML = convertedTime;

    if (mainTime < 0) {
        clearInterval(time);
        active = false;
        display.innerText = "koniec czasu"
        mainTime = 1500;
        audio.pause();
        audioClock.play();
        btnStart.classList.remove('buttonActive');
        btnStop.classList.add('buttonActive');
        btnBreak.classList.remove('buttonActive');
        btnSound.classList.remove('buttonActive');
    }
}

stopCountdown = () => {
    clearInterval(time);
    active = false;
    changeBackgroundColor();
    audio.pause();
    btnSound.classList.remove('buttonActive');

}

handleDarkMode = () => {
    app.classList.toggle('dark-mode');
    if (app.classList.value == 'app dark-mode') {
        btnDarkMode.innerText = 'light mode';
        btnDarkMode.classList.toggle('buttonActive');
    } else {
        btnDarkMode.innerText = 'dark mode'
        btnDarkMode.classList.toggle('buttonActive');
    }
}

handleBreak = () => {
    mainTime = 300;
    countdown();
    btnBreak.classList.add('buttonActive');
}

handleAudio = () => {
    audio.controls = true;
    audio.loop = true;
    audio.play();
    btnSound.classList.toggle('buttonActive');
    btnStop.classList.remove('buttonActive');
}

// listeners

btnStart.addEventListener('click', countdown);
btnStop.addEventListener('click', stopCountdown);
btnDarkMode.addEventListener('click', handleDarkMode);
btnBreak.addEventListener('click', handleBreak);
btnSound.addEventListener('click', handleAudio);
