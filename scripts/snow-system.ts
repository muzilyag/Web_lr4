let snowInterval: number | null = null;
const snowflakes: HTMLElement[] = [];
const accumulatedSnow: HTMLElement[] = [];

function toggleSnow(button: HTMLElement): void {
    blinkGradientButton(button);
    if (snowInterval) {
        stopSnow();
        clearAccumulatedSnow();
    } else {
        snowInterval = window.setInterval(createSnowflake, 100);
    }
}

function stopSnow(): void {
    if (snowInterval) {
        clearInterval(snowInterval);
        snowInterval = null;
    }
    const flakesToRemove: HTMLElement[] = [];
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

function createSnowflake(): void {
    const snowflake: HTMLDivElement = document.createElement('div');
    const types: string[] = ['snowflake', 'snowflake-dot', 'snowflake-star'];
    const colors: string[] = ['#507AEC', '#1A3C99', '#9CB4F6', '#5971B1', '#7C9CF6'];
    const randomType: string = types[Math.floor(Math.random() * types.length)];
    const randomColor: string = colors[Math.floor(Math.random() * colors.length)];
    
    snowflake.className = `snowflake ${randomType}`;
    snowflake.style.color = randomColor;

    const left: number = Math.random() * window.innerWidth;
    snowflake.style.left = `${left}px`;
    
    const duration: number = 5 + Math.random() * 10;
    const delay: number = Math.random() * 5;
    const size: number = 12 + Math.random() * 12;
    
    snowflake.style.animationDuration = `${duration}s`;
    snowflake.style.animationDelay = `${delay}s`;
    snowflake.style.fontSize = `${size}px`;
    
    if (Math.random() > 0.7) {
        snowflake.style.animationName = 'fall, blink';
    } else {
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
            
            const randomOffset: number = (Math.random() - 0.5) * 20;
            snowflake.style.left = `${parseFloat(snowflake.style.left) + randomOffset}px`;
            
            accumulatedSnow.push(snowflake);
            
            const index: number = snowflakes.indexOf(snowflake);
            if (index > -1) {
                snowflakes.splice(index, 1);
            }
        }
    }, (duration + delay) * 1000);
}

function clearAccumulatedSnow(): void {
    if (accumulatedSnow.length === 0) 
        return;
    startSnowPlow();
}

function startSnowPlow(): void {
    const snowPlow: HTMLElement | null = document.getElementById('snowPlow');
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

function clearSnowWithPlow(): void {
    if (accumulatedSnow.length === 0) 
        return;
    
    const plowSpeed: number = 2000;
    const plowWidth: number = 250;
    
    const getSnowCollectionArea = (currentLeft: number) => {
        return {
            start: currentLeft - plowWidth * 0.3,
            end: currentLeft + plowWidth * 0.8
        };
    };
    
    const collectSnowAtPosition = (progress: number) => {
        const currentLeft: number = -200 + (window.innerWidth + 400) * progress;
        const collectionArea = getSnowCollectionArea(currentLeft);
        
        accumulatedSnow.forEach((flake, index) => {
            const flakeLeft: number = parseFloat(flake.style.left);
            
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
    
    const collectionInterval: number = setInterval(() => {
        const snowPlow = document.getElementById('snowPlow');
        if (!snowPlow) {
            clearInterval(collectionInterval);
            return;
        }
        
        const rect: DOMRect = snowPlow.getBoundingClientRect();
        const progress: number = (rect.left + 200) / (window.innerWidth + 400);
        
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