const date_timeElem = document.querySelector('#date_time');
const buttonElem = document.querySelector('button');
const containerElem = document.querySelector('.container');
const secondsElem = document.querySelector('#seconds');

// setting an event listner 
buttonElem.addEventListener('click', setalerm);


// global things 
const myAudio = new Audio('./audio/alerm.mp3');
myAudio.loop = true;



function setalerm() {
    const messageElem = document.querySelector('.message');
    messageElem.innerText = ``;
    const TimeInMM = new Date().getTime();
    const currentTime = parseInt(TimeInMM / 1000);
    const futuredate = new Date(date_timeElem.value);
    const futureTime = parseInt(futuredate.getTime() / 1000);
    if (futureTime > currentTime) {
        localStorage.setItem('Alerm', futureTime);

    }
    else {
        messageElem.innerText = `You can't set alerm in past`;
        messageElem.style.backgroundColor = 'red';
    }

}

function alerm() {
    const alermTime = localStorage.getItem('Alerm');
    const TimeInMM = new Date().getTime();
    const currentTime = parseInt(TimeInMM / 1000);

    if (alermTime == currentTime) {

        myAudio.play();
        containerElem.style.backgroundImage = `url(./audio/background.gif)`;
        stopalerm();

    }

    let secondsLeft = (parseInt(alermTime) - currentTime);
    if (secondsLeft <= 0) {
        secondsLeft = 0;
    }
    secondsElem.innerHTML = secondsLeft;
}



setInterval(() => {
    alerm();
}, 1000);


function stopalerm() {
    addEventListener('click', () => {

        myAudio.pause();
        containerElem.style.backgroundImage = `unset`;

    })
}