// Theme Toggle Utility
class ThemeManager {
    constructor() {
        this.themeName = 'light';
        this.themeKey = 'suite-theme-preference';
        this.init();
    }

    init() {
        // Check for saved preference or system preference
        const saved = localStorage.getItem(this.themeKey);
        
        if (saved) {
            this.themeName = saved;
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.themeName = 'dark';
        }

        this.apply();
        this.setupListeners();
    }

    apply() {
        const html = document.documentElement;
        
        if (this.themeName === 'dark') {
            html.setAttribute('data-theme', 'dark');
            this.updateToggleIcon('☀️');
        } else {
            html.removeAttribute('data-theme');
            this.updateToggleIcon('🌙');
        }

        localStorage.setItem(this.themeKey, this.themeName);
    }

    toggle() {
        this.themeName = this.themeName === 'light' ? 'dark' : 'light';
        this.apply();
    }

    updateToggleIcon(icon) {
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.querySelector('.theme-icon').textContent = icon;
        }
    }

    setupListeners() {
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggle());
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                this.themeName = e.matches ? 'dark' : 'light';
                this.apply();
            });
        }
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});
