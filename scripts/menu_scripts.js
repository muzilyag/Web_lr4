"use strict";
function toggleFiltersMenu() {
    const dropdown = document.getElementById('filtersDropdown');
    if (dropdown) {
        dropdown.classList.toggle('filters__dropdown--show');
    }
}
function closeFiltersMenu() {
    const dropdown = document.getElementById('filtersDropdown');
    if (dropdown) {
        dropdown.classList.remove('filters__dropdown--show');
    }
}
document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('filtersDropdown');
    const filtersButton = document.querySelector('.filters__button');
    if (dropdown && filtersButton &&
        !dropdown.contains(event.target) &&
        !filtersButton.contains(event.target)) {
        closeFiltersMenu();
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeFiltersMenu();
    }
});
