"use strict";
function animationBlinkNavButton(clickedButton) {
    const buttons = document.querySelectorAll(".header__button");
    buttons.forEach((button) => {
        button.classList.remove("blink");
    });
    const buttonsArray = Array.from(buttons);
    const clickedIndex = buttonsArray.indexOf(clickedButton);
    for (let i = 0; i < buttonsArray.length; i++) {
        const distance = Math.abs(i - clickedIndex);
        const delay = distance * 200;
        setTimeout(() => {
            buttonsArray[i].classList.add("blink");
            setTimeout(() => {
                buttonsArray[i].classList.remove("blink");
            }, 500);
        }, delay);
    }
}
function animationRotateBrand() {
    const logo = document.querySelector(".brand__logo");
    if (logo) {
        logo.classList.remove("rotate");
        void logo.offsetWidth;
        logo.classList.add("rotate");
    }
}
function animationRainbowText() {
    const text = document.querySelector(".subheader__title");
    if (text) {
        if (text.classList.contains("rainbow")) {
            text.classList.remove("rainbow");
        }
        else {
            text.classList.add("rainbow");
        }
    }
}
function animationCardPulseUp(element) {
    element.classList.add('card-pulse');
}
function animationCardPulseStop(element) {
    element.classList.remove('card-pulse');
}
function playCardClickPop(element) {
    element.classList.remove('card-pulse');
    element.classList.remove('card-click-pop');
    void element.offsetWidth;
    element.classList.add('card-click-pop');
    setTimeout(() => {
        element.classList.remove('card-click-pop');
    }, 800);
}
function blinkGradientButton(element) {
    element.classList.add("blink-shine");
    setTimeout(() => {
        element.classList.remove('blink-shine');
    }, 1500);
}
