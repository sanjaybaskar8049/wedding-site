// Wedding Date - May 27, 2026
const weddingDate = new Date('May 27, 2026 09:00:00').getTime();

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM elements
    document.getElementById('days').textContent = days > 0 ? days : 0;
    document.getElementById('hours').textContent = hours > 0 ? hours : 0;
    document.getElementById('minutes').textContent = minutes > 0 ? minutes : 0;
    document.getElementById('seconds').textContent = seconds > 0 ? seconds : 0;

    // If countdown is finished
    if (distance < 0) {
        const completionText = currentLang === 'ta' ? 'திருமண நாள் வந்துவிட்டது! 🎉' : 'The Big Day is Here! 🎉';
        document.getElementById('countdown').innerHTML = `<p class="countdown-complete">${completionText}</p>`;
    }
}

// Run countdown immediately and then every second
updateCountdown();
setInterval(updateCountdown, 1000);

// ==========================================
// FLORAL PETALS ANIMATION (One-time on page load)
// ==========================================
const petalsContainer = document.getElementById('petals-container');
// Fewer petals on mobile for better performance on low-end devices
const petalCount = window.innerWidth < 480 ? 20 : (window.innerWidth < 768 ? 30 : 50);

function createPetal(index) {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    // Random properties for small realistic petals
    const startX = Math.random() * window.innerWidth;
    const baseSize = Math.random() * 6 + 8; // 8-14px width
    const heightRatio = 1.4 + Math.random() * 0.4; // 1.4-1.8 ratio for petal shape
    const duration = Math.random() * 3 + 4; // 4-7 seconds
    const delay = Math.random() * 1.5; // Stagger the start
    const swayAmount = Math.random() * 60 - 30; // -30 to 30px sway
    
    petal.style.cssText = `
        left: ${startX}px;
        width: ${baseSize}px;
        height: ${baseSize * heightRatio}px;
        opacity: 0;
    `;
    
    petalsContainer.appendChild(petal);
    
    // Add gentle floating animation like real petals
    const animation = petal.animate([
        { transform: 'translateY(-10px) translateX(0) rotate(0deg) scale(1)', opacity: 0 },
        { transform: `translateY(10vh) translateX(${swayAmount * 0.3}px) rotate(30deg) scale(0.98)`, opacity: 0.9 },
        { transform: `translateY(30vh) translateX(${-swayAmount * 0.5}px) rotate(70deg) scale(0.95)`, opacity: 0.85 },
        { transform: `translateY(50vh) translateX(${swayAmount * 0.7}px) rotate(110deg) scale(0.9)`, opacity: 0.75 },
        { transform: `translateY(70vh) translateX(${-swayAmount * 0.4}px) rotate(150deg) scale(0.85)`, opacity: 0.5 },
        { transform: 'translateY(100vh) translateX(0) rotate(200deg) scale(0.7)', opacity: 0 }
    ], {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: 'ease-in-out',
        fill: 'forwards'
    });
    
    // Remove petal after animation completes
    animation.onfinish = () => {
        petal.remove();
    };
}

// One-time petal shower on page load
function petalShower() {
    for (let i = 0; i < petalCount; i++) {
        setTimeout(() => createPetal(i), i * 50); // Stagger creation for natural effect
    }
    
    // Remove container after all petals have fallen (cleanup)
    setTimeout(() => {
        petalsContainer.style.display = 'none';
    }, 10000);
}

// Start petal shower when page loads
petalShower();

// ==========================================
// LANGUAGE TOGGLE (English/Tamil)
// ==========================================
let currentLang = 'en';
const langToggle = document.getElementById('lang-toggle');
const langText = langToggle.querySelector('.lang-text');

function translatePage(lang) {
    const elements = document.querySelectorAll('[data-en][data-ta]');
    
    elements.forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            // Handle elements with innerHTML (like venue address with <br>)
            if (text.includes('<br>') || text.includes('<')) {
                el.innerHTML = text;
            } else {
                el.textContent = text;
            }
        }
    });
    
    // Toggle Tamil mode class for font changes
    if (lang === 'ta') {
        document.body.classList.add('tamil-mode');
    } else {
        document.body.classList.remove('tamil-mode');
    }
    
    // Update toggle button text
    langText.textContent = lang === 'en' ? 'தமிழ்' : 'English';
    
    // Save preference
    localStorage.setItem('wedding-lang', lang);
    currentLang = lang;
}

langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'ta' : 'en';
    translatePage(newLang);
});

// Check for saved language preference
const savedLang = localStorage.getItem('wedding-lang');
if (savedLang) {
    translatePage(savedLang);
}

// ==========================================
// SMOOTH SCROLL & NAVIGATION
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to sections
document.querySelectorAll('section > .container').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Parallax effect for hero section (disabled on mobile for performance)
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
}

// Number animation for countdown (initial load)
function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 1000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
