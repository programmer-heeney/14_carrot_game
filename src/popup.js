'use strict'
export default class PopUp {
    constructor() {
        this.popUp = document.querySelector('.pop-up');
        this.popUpText = document.querySelector('.pop-up__text');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');
        this.popUpRefresh.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
        })
        this.field = document.querySelector('.game__field');
    }
    setClickListener = (onClick) => {
        this.onClick = onClick;
    }

    showWithText(text) {
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-up--hide');
    }

    hide() {
        this.popUp.classList.add('pop-up--hide')
    }
}