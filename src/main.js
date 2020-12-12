'use strict';

import PopUp from './popup.js';
import * as  tutorial from './tutorial.js';
import * as sound from './sound.js';

import { GameBuilder, Reason } from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
    .withGameFinalLevel(2)
    .withGameDuration(10)
    .withCarrotCount(5)
    .withBugCount(2)
    .build();
gameFinishBanner.setClickListener(() => {
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
        case Reason.levelUp:
            sound.playWin();
            message = 'NEXT LEVEL2💨';
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
})