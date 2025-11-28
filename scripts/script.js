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
// Снежок падает
let snowInterval = null;
const snowflakes = [];
const accumulatedSnow = [];
function toggleSnow(button) {
    blinkGradientButton(button);
    if (snowInterval) {
        stopSnow();
        clearAccumulatedSnow();
    }
    else {
        snowInterval = window.setInterval(createSnowflake, 50);
    }
}
function stopSnow() {
    if (snowInterval) {
        clearInterval(snowInterval);
        snowInterval = null;
    }
    const flakesToRemove = [];
    snowflakes.forEach(flake => {
        let isAccumulated = false;
        for (let i = 0; i < accumulatedSnow.length; i++) {
            if (accumulatedSnow[i] === flake) {
                isAccumulated = true;
                break;
            }
        }
        if (flake.parentNode && !isAccumulated) {
            flake.parentNode.removeChild(flake);
            flakesToRemove.push(flake);
        }
    });
    flakesToRemove.forEach(flake => {
        const index = snowflakes.indexOf(flake);
        if (index > -1) {
            snowflakes.splice(index, 1);
        }
    });
}
function createSnowflake() {
    const snowflake = document.createElement('div');
    const types = ['snowflake', 'snowflake-dot', 'snowflake-star'];
    const colors = ['#507AEC', '#1A3C99', '#9CB4F6', '#5971B1', '#7C9CF6'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    snowflake.className = `snowflake ${randomType}`;
    snowflake.style.color = randomColor;
    const left = Math.random() * window.innerWidth;
    snowflake.style.left = `${left}px`;
    const duration = 5 + Math.random() * 10;
    const delay = Math.random() * 5;
    const size = 12 + Math.random() * 12;
    snowflake.style.animationDuration = `${duration}s`;
    snowflake.style.animationDelay = `${delay}s`;
    snowflake.style.fontSize = `${size}px`;
    if (Math.random() > 0.7) {
        snowflake.style.animationName = 'fall, blink';
    }
    else {
        snowflake.style.animationName = 'fall';
    }
    document.body.appendChild(snowflake);
    snowflakes.push(snowflake);
    setTimeout(() => {
        if (snowflake.parentNode) {
            snowflake.style.animation = 'none';
            snowflake.style.transform = 'none';
            snowflake.style.top = 'auto';
            snowflake.style.bottom = '0';
            const randomOffset = (Math.random() - 0.5) * 20;
            snowflake.style.left = `${parseFloat(snowflake.style.left) + randomOffset}px`;
            accumulatedSnow.push(snowflake);
            const index = snowflakes.indexOf(snowflake);
            if (index > -1) {
                snowflakes.splice(index, 1);
            }
        }
    }, (duration + delay) * 1000);
}
function clearAccumulatedSnow() {
    if (accumulatedSnow.length === 0)
        return;
    startSnowPlow();
}
function startSnowPlow() {
    const snowPlow = document.getElementById('snowPlow');
    if (!snowPlow)
        return;
    snowPlow.classList.add('active');
    setTimeout(() => {
        clearSnowWithPlow();
    }, 100);
    setTimeout(() => {
        snowPlow.classList.remove('active');
    }, 3000);
}
function clearSnowWithPlow() {
    if (accumulatedSnow.length === 0)
        return;
    const plowSpeed = 2000;
    const plowWidth = 250;
    const getSnowCollectionArea = (currentLeft) => {
        return {
            start: currentLeft - plowWidth * 0.3,
            end: currentLeft + plowWidth * 0.8
        };
    };
    const collectSnowAtPosition = (progress) => {
        const currentLeft = -200 + (window.innerWidth + 400) * progress;
        const collectionArea = getSnowCollectionArea(currentLeft);
        accumulatedSnow.forEach((flake, index) => {
            const flakeLeft = parseFloat(flake.style.left);
            if (flakeLeft >= collectionArea.start && flakeLeft <= collectionArea.end &&
                !flake.classList.contains('collected')) {
                setTimeout(() => {
                    flake.classList.add('collected');
                    setTimeout(() => {
                        if (flake.parentNode) {
                            flake.parentNode.removeChild(flake);
                        }
                    }, 1000);
                }, index * 20);
            }
        });
    };
    const collectionInterval = setInterval(() => {
        const snowPlow = document.getElementById('snowPlow');
        if (!snowPlow) {
            clearInterval(collectionInterval);
            return;
        }
        const rect = snowPlow.getBoundingClientRect();
        const progress = (rect.left + 200) / (window.innerWidth + 400);
        if (progress >= 0 && progress <= 1) {
            collectSnowAtPosition(progress);
        }
    }, 100);
    clearInterval(collectionInterval);
    setTimeout(() => {
        accumulatedSnow.forEach(flake => {
            if (flake.parentNode) {
                flake.parentNode.removeChild(flake);
            }
        });
        accumulatedSnow.length = 0;
    }, plowSpeed);
}
