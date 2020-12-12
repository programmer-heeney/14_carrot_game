import Field from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel',
    levelUp: 'levelUp'
})

export class GameBuilder {
    withGameFinalLevel(level) {
        this.gameFinalLevel = level;
        return this;
    }
    withGameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }

    withCarrotCount(num) {
        this.carrotCount = num;
        return this;
    }

    withBugCount(num) {
        this.bugCount = num;
        return this;
    }

    build() {
        return new Game(
            this.gameFinalLevel,
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        )
    }
}

class Game {
    constructor(gameFinalLevel, gameDuration, carrotCount, bugCount) {
        this.gameFinalLevel = gameFinalLevel;
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.level = 1;

        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameLevel = document.querySelector('.game__level');
        this.gameBtn = document.querySelector('.game__button');
        this.gameBtn.addEventListener('click', () => {
            if (this.started) {
                this.stop(Reason.cancel);
            } else {
                this.start();
            }
        })
        this.started = false;
        this.score = 0;
        this.timer = undefined;
        this.carrotBlinkingIntervalAppear = undefined;
        this.carrotBlinkingIntervaldisAppear = undefined;

        this.gameField = new Field(this.carrotCount, this.bugCount);
        this.gameField.setClickListener(this.onItemClick);

    }

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }

    start() {
        this.started = true;
        this.init();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBGM();
    }

    stop(reason) {
        this.started = false;
        this.hideGameButton();
        this.stopGameTimer();
        sound.stopBGM();
        this.onGameStop && this.onGameStop(reason);
    }

    onItemClick = (item) => {
        if (!this.started) {
            return;
        }
        if (item === 'carrot') {
            this.score++;
            this.updateScoreBoard();
            if (this.level === 2) {
                this.gameLevel2();
            }
            if (this.score === this.carrotCount) {
                if (this.level === this.gameFinalLevel) {
                    this.level = 1;
                    this.stop(Reason.win)
                } else {
                    this.level++;
                    this.stop(Reason.levelUp);
                }
            }
        } else if (item === 'bug') {
            this.stop(Reason.lose);
        }
    }

    showStopButton() {
        const icon = this.gameBtn.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
    }

    hideGameButton() {
        this.gameBtn.style.visibility = 'hidden';
    }

    showTimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible'
    }

    startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(() => {
            if (remainingTimeSec <= 0) {
                clearInterval(this.timer);
                this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }
    stopGameTimer() {
        clearInterval(this.timer);
        clearInterval(this.carrotBlinkingIntervalAppear);
        clearInterval(this.carrotBlinkingIntervalDisppear);
    }
    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerText = `${minutes}:${seconds}`;
    }
    init() {
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        this.gameLevel.innerText = `LEVEL${this.level}`;
        this.gameField.init();
    }
    updateScoreBoard() {
        this.gameScore.innerText = this.carrotCount - this.score;
    }
    gameLevel2() {
        const carrots = document.querySelectorAll('.carrot');
        this.carrotBlinkingIntervaldisAppear = setInterval(() => {
            if (!this.started || this.level !== 2) {
                clearInterval(this.carrotBlinkingIntervalDisAppear);
                carrots.forEach((carrot) => {
                    carrot.style.visibility = 'visible'
                })
                return;
            }
            carrots.forEach((carrot) => {
                carrot.style.visibility = 'hidden'
            })
        }, 1000);
        this.carrotBlinkingIntervalAppear = setInterval(() => {
            if (!this.started || this.level !== 2) {
                clearInterval(this.carrotBlinkingIntervalAppear);
                return;
            }
            carrots.forEach((carrot) => {
                carrot.style.visibility = 'visible'
            })
        }, 2000);
    }
}