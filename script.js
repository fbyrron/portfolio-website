// Particle background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw connections
    particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(0, 255, 136, ${0.2 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-item')) {
                const progress = entry.target.querySelector('.skill-progress');
                const percent = progress.getAttribute('data-progress');
                progress.style.setProperty('--progress', percent + '%');
            }
        }
    });
}, observerOptions);

// Smooth scroll
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

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    animateParticles();

    // Typewriter effect
    const text = "Hello! I Am Ernest Byrron Flores";
    const typewriterElement = document.getElementById('typewriter');
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < text.length) {
            const char = text.charAt(charIndex);
            
            // Add accent class to "Ernest Byrron Flores"
            if (charIndex === text.indexOf('Ernest Byrron Flores')) {
                typewriterElement.innerHTML += '<span class="name-accent">';
            }
            
            typewriterElement.innerHTML += char;
            
            if (charIndex === text.length - 1) { // End of text
                typewriterElement.innerHTML += '</span>';
            }
            
            charIndex++;
            setTimeout(typeWriter, 80); // Typing speed
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);

    const sections = document.querySelectorAll('section');
    const projectCards = document.querySelectorAll('.project-card');
    const skillItems = document.querySelectorAll('.skill-item');
    
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        card.classList.add('slide-up');
        observer.observe(card);
    });

    skillItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
        observer.observe(item);
    });

    // Initialize tech carousel
    initTechCarousel();
});

// Tech Stack Carousel
function initTechCarousel() {
    const carousel = document.querySelector('.tech-carousel');
    const categories = document.querySelectorAll('.tech-category');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!carousel || categories.length === 0) return;
    
    let currentIndex = 0;
    
    // Create dots
    categories.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.carousel-dot');
    
    function goToSlide(index) {
        currentIndex = index;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % categories.length;
        goToSlide(currentIndex);
    }
    
    // Auto-advance every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            // Swipe left
            currentIndex = (currentIndex + 1) % categories.length;
            goToSlide(currentIndex);
        }
        
        if (touchEndX - touchStartX > 50) {
            // Swipe right
            currentIndex = (currentIndex - 1 + categories.length) % categories.length;
            goToSlide(currentIndex);
        }
    }
}

// Cursor trail effect
let cursorTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

function drawCursorTrail() {
    const now = Date.now();
    cursorTrail = cursorTrail.filter(point => now - point.time < 500);
    
    cursorTrail.forEach((point, index) => {
        const age = now - point.time;
        const opacity = 1 - (age / 500);
        const size = 3 * opacity;
        
        ctx.fillStyle = `rgba(0, 136, 255, ${opacity * 0.3})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fill();
    });
    
    requestAnimationFrame(drawCursorTrail);
}

drawCursorTrail();
