const lightModeText = document.getElementById('light-mode-text');
const lightModeIcon = document.getElementById('light-mode-icon');
const lightModeBtn = document.getElementById('light-mode-btn');
const htmlTag = document.documentElement;

function updateModeUI() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
        htmlTag.classList.remove('dark');
        lightModeText.innerText = 'Light Mode';
        lightModeIcon.innerText = 'light_mode';
    } else {
        htmlTag.classList.add('dark');
        lightModeText.innerText = 'Dark Mode';
        lightModeIcon.innerText = 'dark_mode';
    }
}

lightModeBtn.addEventListener('click', () => {
    htmlTag.classList.toggle('dark');
    console.log("switching modes")
    updateModeUI();

    // Store the dark mode setting in localStorage
    localStorage.setItem('darkMode', htmlTag.classList.contains('dark'));
});

// Call updateModeUI on page load
window.addEventListener('DOMContentLoaded', updateModeUI);