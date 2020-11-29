'use strict';


// 사운드 삽입
let soundAlert = new Audio('./sound/alert.wav');
let soundBGM = new Audio('./sound/bg.mp3');
let soundBug = new Audio('./sound/bug_pull.mp3');
let soundCarrot = new Audio('./sound/carrot_pull.mp3')
let soundWin = new Audio('./sound/game_win.mp3')

// 버튼을 누르면 게임 시작
const playBtn = document.querySelector('.play-btn');
const timer = document.querySelector('.timer');
let timerId;
let time;
let initialCarrotNum = 3;
let carrotNum = initialCarrotNum;
playBtn.addEventListener('click', event => {
    gameStart(event);
})
// 게임 시작
function gameStart(event) {
    soundBGM.play();
    changeBtnIcon(event);
}
// 버튼이 플레이에서 스탑 아이콘으로 변경
function changeBtnIcon(event) {
    const targetClass = event.target.classList
    if (targetClass.contains('fa-stop') || targetClass.contains('stop')) {
        lostMessage();
    }
    else {
        changeToStopIcon();
        time = 9;
        timer.innerText = `0:10`
        displayCarrotNum(carrotNum);
        for (let i = 0; i < carrotNum; i++) {
            setItems();
        }
        startTimer();
    }
}
function changeToPlayIcon() {
    playBtn.innerHTML = `<i class="fas fa-play"></i>`
    playBtn.classList.remove('stop')
}
function changeToStopIcon() {
    playBtn.innerHTML = `<i class="fas fa-stop"></i>`
    playBtn.classList.add('stop')
}
// 게임이 시작되면 버그와 캐럿 랜덤 배치
const items = document.querySelector('.items')
function setItems() {
    const carrot = createCarrot();
    const bug = createBug();
    items.appendChild(carrot);
    items.appendChild(bug);
}

function createCarrot() {
    const carrot = document.createElement('div');
    carrot.setAttribute('class', 'carrot')
    carrot.setAttribute('data-id', 0);
    let random = (Math.random() * (330 - 200)) + 200;
    carrot.style.top = `${random}px`;
    random = Math.random() * 540;
    carrot.style.left = `${random}px`;
    return carrot
}

function createBug() {
    const bug = document.createElement('div');
    bug.setAttribute('class', 'bug');
    bug.setAttribute('data-id', 1);
    let random = (Math.random() * (330 - 200)) + 200;
    bug.style.top = `${random}px`;
    random = Math.random() * 540;
    bug.style.left = `${random}px`;
    return bug
}
// 캐럿카운터 넘버를 화면에 표시된 캐럿 수만큼 변경
function displayCarrotNum(carrotNum) {
    const carrotCounter = document.querySelector('.carrot-counter');
    carrotCounter.innerText = carrotNum;
}
// 타이머는 0:10 으로 변경
function startTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
    }
    if (playBtn.classList.contains('stop')) {
        timerId = setInterval(setTimer, 1000);
    }
}
function setTimer() {
    if (time <= 0) {
        clearInterval(timerId);
        timer.innerText = `00:00`;
        changeToPlayIcon();
    }
    else {
        timer.innerText = `0:${time}`;
    }
    time--
}

// 캐럿 누르면 삭제
items.addEventListener('click', event => {
    const dataId = event.target.dataset.id;
    //carrot
    if (dataId === '0') {
        soundCarrot.play();
        event.target.remove();
        carrotNum--;
        displayCarrotNum(carrotNum);
        wonMessage();
    }
    //bug
    if (dataId === '1') {
        soundBug.play();
        lostMessage();
    }
})
// 벌레를 누르면 YOU LOST 메시지 팝업
const messages = document.querySelector('.messages');
const message = document.createElement('div');
function lostMessage() {
    soundBGM.pause();
    soundAlert.play();
    messages.classList.add('mask');
    const message = messageContainer();
    playBtn.style.display = 'none';
    message.innerHTML = `
    <button class='replay-btn' data-key=0><i class="fas fa-redo" data-key=0></i></button>
    <span class='message-text'>YOU LOST💩</span>`
    clearInterval(timerId);
}
// 시간내 못하면 YOU LOST 메시지 팝업
// 시간내 성공하면 YOU WON 메시지 팝업
function wonMessage() {
    if (carrotNum === 0) {
        soundBGM.pause();
        soundWin.play();
        messages.classList.add('mask');
        const message = messageContainer();
        playBtn.style.display = 'none';
        message.innerHTML = `
        <button class='replay-btn' data-key=0><i class="fas fa-redo" data-key=0></i></button>
        <span class='message-text'>YOU WON🎉</span>`
        clearInterval(timerId);
    }
}

function messageContainer() {
    message.setAttribute('class', 'message-container');
    messages.appendChild(message);
    return message;
}

// 리플레이 버튼 누르면 게임 스타트
message.addEventListener('click', event => {
    soundWin.pause();
    soundWin.currentTime = 0;
    soundAlert.pause();
    soundAlert.currentTime = 0;
    messages.classList.remove('mask');
    const dataId = event.target.dataset.key;
    if (dataId) {
        playBtn.style.display = 'inline'
        message.remove();
        items.innerHTML = ``;
        carrotNum = initialCarrotNum;
        gameStart(event);
    }
})
