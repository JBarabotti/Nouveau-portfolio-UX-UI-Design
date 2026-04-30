// Preloader
const startTime = Date.now();
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        const elapsedTime = Date.now() - startTime;
        const minPreloadTime = 2500;
        const delay = Math.max(0, minPreloadTime - elapsedTime);
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.add('loaded');
            setTimeout(type, 500);
        }, delay);
    } else {
        document.body.classList.add('loaded');
        setTimeout(type, 1000);
    }
});

// Dark/Light Theme Toggle
const themeBtn = document.querySelector(".theme");

const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon-moon">
  <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z"/>
</svg>`;

const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-sun">
  <circle cx="12" cy="12" r="5"></circle>
  <line x1="12" y1="1" x2="12" y2="3"></line>
  <line x1="12" y1="21" x2="12" y2="23"></line>
  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
  <line x1="1" y1="12" x2="3" y2="12"></line>
  <line x1="21" y1="12" x2="23" y2="12"></line>
  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
</svg>`;

// Check local storage for theme
let currentTheme = localStorage.getItem("theme") || "dark";
if (currentTheme === "light") {
    document.body.classList.add("light-mode");
    if(themeBtn) themeBtn.innerHTML = sunIcon;
}

if(themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            themeBtn.innerHTML = sunIcon;
        } else {
            localStorage.setItem("theme", "dark");
            themeBtn.innerHTML = moonIcon;
        }
    });
}

// Initialize the page
document.addEventListener("DOMContentLoaded", function() {
    // Mobile Burger Menu
    const burgerMenu = document.querySelector(".burger-menu");
    const navMenu = document.querySelector("nav ul");

    burgerMenu.addEventListener("click", function() {
        navMenu.classList.toggle("active");
        burgerMenu.querySelector("i").classList.toggle("fa-bars");
        burgerMenu.querySelector("i").classList.toggle("fa-times");
    });

    // Close menu when clicking on a link (for mobile)
    document.querySelectorAll("nav ul a:not(.lang-menu a)").forEach(link => {
        link.addEventListener("click", function() {
            navMenu.classList.remove("active");
            burgerMenu.querySelector("i").classList.add("fa-bars");
            burgerMenu.querySelector("i").classList.remove("fa-times");
        });
    });

    // Language Dropdown Toggle
    const langBtn = document.querySelector(".lang");
    const langMenu = document.querySelector(".lang-menu");

    if (langBtn && langMenu) {
        langBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            langMenu.classList.toggle("active");
            
            const chevron = langBtn.querySelector(".chevron");
            if (chevron) {
                if (langMenu.classList.contains("active")) {
                    chevron.style.transform = "rotate(180deg)";
                } else {
                    chevron.style.transform = "rotate(0deg)";
                }
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", function(e) {
            if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
                langMenu.classList.remove("active");
                const chevron = langBtn.querySelector(".chevron");
                if (chevron) chevron.style.transform = "rotate(0deg)";
            }
        });

        // Handle language selection (visual update for now)
        const langLinks = langMenu.querySelectorAll("a");
        const updatedLangBtn = langBtn.querySelector("span");
        langLinks.forEach(link => {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                
                langMenu.classList.remove("active");
                if (updatedLangBtn) updatedLangBtn.classList.remove("active");
                const chevron = langBtn.querySelector(".chevron");
                if (chevron) chevron.style.transform = "rotate(0deg)";
            });
        });
    }
});

// Text typing effect
const text = [
    "Développeur Front-end",
    "UI/UX Designer",
    "Développeur Web",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 150;

function type() {
    const currentText = text[textIndex];
    const typingElement = document.querySelector(".typing-text");

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = 1500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % text.length;
        typingDelay = 500;
    }

    setTimeout(type, typingDelay);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: "smooth"
            });
        }
    });
});