const lightModeText = document.getElementById('light-mode-text');
const lightModeIcon = document.getElementById('light-mode-icon');
const lightModeBtn = document.getElementById('light-mode-btn');
const htmlTag = document.documentElement;

function updateModeUI() {
    if (htmlTag.classList.contains('dark')) {
        lightModeText.innerText = 'Dark Mode';
        lightModeIcon.innerText = 'dark_mode';
    } else {
        lightModeText.innerText = 'Light Mode';
        lightModeIcon.innerText = 'light_mode';
    }
}

lightModeBtn.addEventListener('click', () => {
    htmlTag.classList.toggle('dark');
    updateModeUI();
});

// Check the initial state of the 'dark' class on page load
updateModeUI();