let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const timeDisplay = document.getElementById('time');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps').querySelector('ul');

startPauseButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startPauseButton.innerHTML = '<i class="fas fa-play"></i> Start';
    } else {
        isRunning = true;
        startPauseButton.innerHTML = '<i class="fas fa-pause"></i> Pause';
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00';
    startPauseButton.innerHTML = '<i class="fas fa-play"></i> Start';
    lapsContainer.innerHTML = '';
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = timeDisplay.textContent;
        lapsContainer.appendChild(lapTime);
    }
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    const time = new Date(elapsedTime);
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, '0');
    timeDisplay.textContent = `${minutes}:${seconds}:${milliseconds}`;
}
