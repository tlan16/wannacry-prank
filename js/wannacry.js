const wanadecryptor = document.getElementsByClassName('wanadecryptor')[0];
wanadecryptor.style.left = '30px';
wanadecryptor.style.top = '30px';

const launchFullScreen = (element) => {
   if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
};
launchFullScreen(document.documentElement);

let mouseDownX, mouseDownY;
const divMove = (e) => {
    if (e.type === 'touchmove') {
        wanadecryptor.style.left = `${parseInt(e.touches[0].clientX - mouseDownX)}px`;
        wanadecryptor.style.top = `${parseInt(e.touches[0].clientY - mouseDownY)}px`;
    } else {
        wanadecryptor.style.left = `${parseInt(e.clientX - mouseDownX)}px`;
        wanadecryptor.style.top = `${parseInt(e.clientY - mouseDownY)}px`;
    }
};

const wanadecryptorCaption = document.getElementsByClassName('wanadecryptor-caption-bar')[0];
wanadecryptorCaption.addEventListener('mousedown', (e) => {
    mouseDownX = e.clientX - parseInt(wanadecryptor.style.left ? wanadecryptor.style.left : 0);
    mouseDownY = e.clientY - parseInt(wanadecryptor.style.top ? wanadecryptor.style.top : 0);
    window.addEventListener('mousemove', divMove, true);
}, false);
window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', divMove, true);
}, false);
wanadecryptorCaption.addEventListener('touchstart', (e) => {
    mouseDownX = e.touches[0].clientX - parseInt(wanadecryptor.style.left ? wanadecryptor.style.left : 0);
    mouseDownY = e.touches[0].clientY - parseInt(wanadecryptor.style.top ? wanadecryptor.style.top : 0);
    window.addEventListener('touchmove', divMove, true);
}, false);
window.addEventListener('touchend', () => {
    window.removeEventListener('touchmove', divMove, true);
}, false);

document.getElementsByClassName('wanadecryptor-caption-close')[0].addEventListener('click', () => {
    wanadecryptor.style.display = 'none';
});
document.getElementsByClassName('wanadecryptor-caption-close')[0].addEventListener('touchstart', () => {
    wanadecryptor.style.display = 'none';
});

let lastClickTimestamp = 0;
document.getElementsByClassName('desktop-program')[0].addEventListener('click', () => {
    const t = Date.now();
    if (t - lastClickTimestamp < 300) {
        wanadecryptor.style.display = '';
    }
    lastClickTimestamp = t;
});

document.getElementsByClassName('desktop-program')[0].addEventListener('touchstart', () => {
    wanadecryptor.style.display = '';
});

document.getElementsByClassName('desktop')[0].addEventListener('click', () => {
    launchFullScreen(document.documentElement);
});

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};
let wanadecryptorStartTime = getCookie('wanadecryptor_start_time');
const wanadecryptorStartTime_Date = new Date(wanadecryptorStartTime);
const gap = Math.abs(Date.now() - wanadecryptorStartTime_Date.getTime());
const gap_threshold = 1 * 24 * 60 * 60 * 1000; // 1 days in milliseconds
if (wanadecryptorStartTime && gap < gap_threshold) {
    wanadecryptorStartTime = new Date(wanadecryptorStartTime);
} else {
    wanadecryptorStartTime = new Date();
    const expires = new Date(wanadecryptorStartTime.getTime() + 180 * 24 * 60 * 60 * 1000);
    document.cookie = `wanadecryptor_start_time=${wanadecryptorStartTime.toISOString()}; expires=${expires.toUTCString()}; path=/`;
}
document.getElementById('wanadecryptor-clock-date-3-days').textContent = (new Date(wanadecryptorStartTime.getTime() + 3 * 24 * 60 * 60 * 1000)).toLocaleString();
document.getElementById('wanadecryptor-clock-date-7-days').textContent = (new Date(wanadecryptorStartTime.getTime() + 7 * 24 * 60 * 60 * 1000)).toLocaleString();

const secondsToText = (seconds) => {
    let sign = '';
    if (seconds < 0) {
        sign = '-';
        seconds = -seconds;
    }
    let days = parseInt(seconds / 86400);
    seconds -= days * 86400;
    let hours = parseInt(seconds / 3600);
    seconds -= hours * 3600;
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    seconds = parseInt(seconds);
    if (days < 10) {
        days = '0' + days;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return sign + days + ':' + hours + ':' + minutes + ':' + seconds;
};

const wanadecryptorClockCountDown3Days = document.getElementById('wanadecryptor-clock-count-down-3-days');
const wanadecryptorClockCountDown7Days = document.getElementById('wanadecryptor-clock-count-down-7-days');
setInterval(() => {
    wanadecryptorClockCountDown3Days.textContent = secondsToText(3 * 86400 - parseInt((Date.now() - wanadecryptorStartTime) / 1000));
    wanadecryptorClockCountDown7Days.textContent = secondsToText(7 * 86400 - parseInt((Date.now() - wanadecryptorStartTime) / 1000));
}, 1000);
