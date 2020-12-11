'use strict';

import PopUp from './popup.js';
import * as  tutorial from './tutorial.js';
import * as sound from './sound.js';

import { GameBuilder, Reason } from './game.js';

const CARROT_COUNT = 10;
const BUG_COUNT = 10;

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
    .withGameDuration(10)
    .withCarrotCount(10)
    .withBugCount(10)
    .build();
gameFinishBanner.setClickListener(() => {
    // soundWin.pause();
    // soundWin.currentTime = 0;
    // soundAlert.pause();
    // soundAlert.currentTime = 0;

    // gameButton.style.visibility = 'visible';
    // items.innerHTML = ``;

    // if (level === 1) {
    //     levelContainer.innerText = `LEVEL1`;
    // }
    // if (level === 2) {
    //     levelContainer.innerText = `LEVEL2`;
    // }
    // carrotNum = initialCarrotNum;
    game.start();
})

game.setGameStopListener(reason => {
    let message;
    switch (reason) {
        case Reason.cancel:
            sound.playAlert();
            message = 'READY❓';
            break;
        case Reason.win:
            sound.playWin();
            message = 'YOU WON🎉';
            break;
        case Reason.lose:
            sound.playBug();
            message = 'YOU LOST💩';
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
})






// // 캐럿 누르면 삭제
// let initialLevel = 1;
// let level = initialLevel;
// let carrotBlinkingIntervalAppear;
// let carrotBlinkingIntervalDisappear;

// // 벌레를 누르면 YOU LOST 메시지 팝업
// function lostMessage() {
//     sound.stopBGM();
//     sound.playAlert();
//     gameFinishBanner.showWithText('YOU LOST💩')
// }
// // 시간내 성공하면 YOU WON 메시지 팝업
// function wonMessage() {
//     if (carrotNum === 0) {
//         sound.stopBGM()
//         sound.playWin();
//         if (level === 1) {
//             popUpLevel2();
//         }
//         if (level === 2) {
//             gameFinishBanner.showWithText('YOU WON🎉')
//             level = 0;
//         }
//         level++;
//     }
// }
// // 레벨2
// function popUpLevel2() {
//     gameFinishBanner.showWithText('NEXT LEVEL2💨')
// }
