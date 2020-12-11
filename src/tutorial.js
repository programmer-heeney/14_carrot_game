import * as sound from './sound.js';

const game = document.querySelector('.game');
const gameStart = document.querySelector('.game__start')
const gameHeader = document.querySelector('.game__header')

window.onload = function howToPlay() {
    game.classList.add('how-to-play');
    hide();

    gameStart.addEventListener('mouseover', () => {
        sound.playCarrot();
    })

    gameStart.addEventListener('click', () => {
        game.classList.remove('how-to-play');
        show();
        gameStart.remove();
    })
}

function hide() {
    gameHeader.classList.add('game__header--hide');
}

function show() {
    gameHeader.classList.remove('game__header--hide');
}