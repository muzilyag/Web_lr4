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

function animationCardPulseUp(card: HTMLElement): void {
    card.classList.add('card-pulse');
}

function animationCardPulseStop(card: HTMLElement): void {
    card.classList.remove('card-pulse');
}

function playCardClickPop(card: HTMLElement): void {
    card.classList.remove('card-pulse');
    card.classList.remove('card-click-pop');
    void (card as any).offsetWidth;
    card.classList.add('card-click-pop');
    setTimeout(() => {
        card.classList.remove('card-click-pop');
    }, 800);
}

function blinkGradientButton(button: HTMLElement): void {
    button.classList.add("blink-shine");
    setTimeout(() => {
        button.classList.remove('blink-shine');
    }, 1500);
}