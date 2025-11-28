function animationBlinkNavButton(clickedButton: HTMLElement): void {
    const buttons: NodeListOf<HTMLElement> = document.querySelectorAll(".header__button");

    buttons.forEach((button: HTMLElement) => {
        button.classList.remove("blink");
    });
    
    const buttonsArray: HTMLElement[] = Array.from(buttons);
    const clickedIndex: number = buttonsArray.indexOf(clickedButton);
    
    for (let i = 0; i < buttonsArray.length; i++) {
        const distance: number = Math.abs(i - clickedIndex);
        const delay: number = distance * 200;
        
        setTimeout(() => {
            buttonsArray[i].classList.add("blink");
            setTimeout(() => {
                buttonsArray[i].classList.remove("blink");
            }, 500);
        }, delay);
    }
}

function animationRotateBrand(): void {
    const logo: HTMLElement | null = document.querySelector(".brand__logo");
    if (logo) {
        logo.classList.remove("rotate");
        void (logo as any).offsetWidth;
        logo.classList.add("rotate");
    }
}

function animationRainbowText(): void {
    const text: HTMLElement | null = document.querySelector(".subheader__title");
    if (text) {
        if (text.classList.contains("rainbow")) {
            text.classList.remove("rainbow");
        } else {
            text.classList.add("rainbow");
        }
    }
}

function animationCardPulseUp(element: HTMLElement): void {
    element.classList.add('card-pulse');
}

function animationCardPulseStop(element: HTMLElement): void {
    element.classList.remove('card-pulse');
}

function playCardClickPop(element: HTMLElement): void {
    element.classList.remove('card-pulse');
    element.classList.remove('card-click-pop');
    void (element as any).offsetWidth;
    element.classList.add('card-click-pop');
    setTimeout(() => {
        element.classList.remove('card-click-pop');
    }, 800);
}

function blinkGradientButton(element: HTMLElement): void {
    element.classList.add("blink-shine");
    setTimeout(() => {
        element.classList.remove('blink-shine');
    }, 1500);
}