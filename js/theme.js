/**
 * ABCRecordCore Theme Switcher
 * Handles theme toggle between light and dark modes
 */

document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply saved theme or use preferred color scheme
    if (savedTheme) {
        body.classList.add(`theme-${savedTheme}`);
        body.classList.remove(`theme-${savedTheme === 'dark' ? 'light' : 'dark'}`);
    } else if (prefersDark) {
        body.classList.add('theme-dark');
        body.classList.remove('theme-light');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('theme-dark')) {
            body.classList.remove('theme-dark');
            body.classList.add('theme-light');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('theme-light');
            body.classList.add('theme-dark');
            localStorage.setItem('theme', 'dark');
        }
    });
});
