'use strict';

// 버튼을 누르면 게임 시작
const playBtn = document.querySelector('.play-btn');
const timer = document.querySelector('.timer');
let timerId;
let time;
playBtn.addEventListener('click', event => {
    changeBtnIcon(event)
    if (timerId !== null) {
        clearInterval(timerId);
    }
    if (playBtn.classList.contains('stop')) {
        timerId = setInterval(setTimer, 1000);
    }
})
// 버튼이 플레이에서 스탑 아이콘으로 변경
function changeBtnIcon(event) {
    const targetClass = event.target.classList
    if (targetClass.contains('fa-stop') || targetClass.contains('stop')) {
        changeToPlayIcon();
        timer.innerText = `00:00`;
        time = 0;
    }
    else {
        changeToStopIcon();
        time = 10;
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
// 캐럿카운터 넘버를 화면에 표시된 캐럿 수만큼 변경
// 타이머는 0:10 으로 변경
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
// 벌레를 누르면 YOU LOST 메시지 팝업
// 시간내 못하면 YOU LOST 메시지 팝업
// 시간내 성공하면 YOU WIN 메시지 팝업