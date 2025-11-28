function toggleFiltersMenu(): void {
    const dropdown: HTMLElement | null = document.getElementById('filtersDropdown');
    if (dropdown) {
        dropdown.classList.toggle('filters__dropdown--show');
    }
}

function closeFiltersMenu(): void {
    const dropdown: HTMLElement | null = document.getElementById('filtersDropdown');
    if (dropdown) {
        dropdown.classList.remove('filters__dropdown--show');
    }
}

document.addEventListener('click', (event: MouseEvent) => {
    const dropdown: HTMLElement | null = document.getElementById('filtersDropdown');
    const filtersButton: HTMLElement | null = document.querySelector('.filters__button');
    
    if (dropdown && filtersButton && 
        !dropdown.contains(event.target as Node) && 
        !filtersButton.contains(event.target as Node)) {
        closeFiltersMenu();
    }
});

document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        closeFiltersMenu();
    }
});