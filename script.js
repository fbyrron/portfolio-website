// Theme toggle
function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
    } else {
        // Default to dark
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    
    // Trigger camera flash on avatar
    const flash = document.querySelector('.avatar-flash');
    if (flash) {
        flash.classList.remove('flash-active');
        void flash.offsetWidth; // force reflow
        flash.classList.add('flash-active');
        setTimeout(() => flash.classList.remove('flash-active'), 600);
    }
    
    // Swap theme slightly after flash peaks
    setTimeout(() => {
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    }, 80);
}

// Apply theme immediately to avoid flash
initTheme();

// View toggle (grid/list) for sub-pages
function setView(view) {
    const grid = document.querySelector('.project-grid');
    const buttons = document.querySelectorAll('.view-toggle-btn');
    
    if (!grid) return;
    
    // Remove preload style that may override
    const preload = document.getElementById('view-preload');
    if (preload) preload.remove();
    
    if (view === 'list') {
        grid.classList.add('list-view');
    } else {
        grid.classList.remove('list-view');
    }
    
    buttons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    localStorage.setItem('viewPreference', view);
}

// Restore saved view preference immediately to prevent flash
(function() {
    const saved = localStorage.getItem('viewPreference');
    if (saved === 'list') {
        // Add class before first paint via inline style injection
        const style = document.createElement('style');
        style.textContent = '.project-grid { grid-template-columns: 1fr !important; gap: 1rem; } .project-grid .project-card { flex-direction: row; align-items: center; }';
        document.head.appendChild(style);
        // Then properly set it once DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            setView('list');
            style.remove();
        });
    }
})();

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
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const color = isLight ? `rgba(0, 153, 77, ${this.opacity})` : `rgba(0, 255, 136, ${this.opacity})`;
        ctx.fillStyle = color;
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
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const color = isLight
                    ? `rgba(0, 153, 77, ${0.15 * (1 - distance / 100)})`
                    : `rgba(0, 255, 136, ${0.2 * (1 - distance / 100)})`;
                ctx.strokeStyle = color;
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

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                // Close with animation
                nav.classList.remove('active');
                nav.classList.add('closing');
                menuToggle.classList.remove('active');
                nav.addEventListener('animationend', function handler() {
                    nav.classList.remove('closing');
                    nav.removeEventListener('animationend', handler);
                });
            } else {
                // Open
                nav.classList.remove('closing');
                nav.classList.add('active');
                menuToggle.classList.add('active');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                nav.classList.add('closing');
                menuToggle.classList.remove('active');
                nav.addEventListener('animationend', function handler() {
                    nav.classList.remove('closing');
                    nav.removeEventListener('animationend', handler);
                });
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                nav.classList.add('closing');
                menuToggle.classList.remove('active');
                nav.addEventListener('animationend', function handler() {
                    nav.classList.remove('closing');
                    nav.removeEventListener('animationend', handler);
                });
            }
        });
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    animateParticles();
    initMobileMenu();

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
    
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    cursorTrail.forEach((point, index) => {
        const age = now - point.time;
        const opacity = 1 - (age / 500);
        const size = 3 * opacity;
        
        const color = isLight
            ? `rgba(0, 102, 204, ${opacity * 0.2})`
            : `rgba(0, 136, 255, ${opacity * 0.3})`;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fill();
    });
    
    requestAnimationFrame(drawCursorTrail);
}

drawCursorTrail();

// Project Modal
const projectData = {
    ecommunity: {
        title: "Ecommunity.ph",
        image: "assets/images/projects/ecommunity.jpg",
        description: "A mobile-based solid waste management system for Baliwag, aimed at empowering residents, local government, and businesses to engage in sustainable practices. Implemented modules for garbage collection schedules, junkshop transactions, and waste segregation, alongside an educational blogspot that enhanced awareness of solid waste management.",
        youtubeLink: "https://youtube.com/watch?v=MZWhS6y7qc0",
        technologies: ["Flutter", "Firebase", "Dart"]
    },
    project2: {
        title: "iNUvation Voting System",
        images: ["assets/images/projects/inuvation1.jpg", "assets/images/projects/inuvation2.jpg"],
        description: "A digital voting platform used by the students of National University – Baliwag to securely cast their votes for the iNUvation event. The system is deployed as both a web application for students and a desktop application for administrators, ensuring a convenient and user‑friendly voting experience. It also includes an admin panel that automatically tallies votes in real time and instantly determines the event winner.",
        technologies: ["React", "Flutter", "Dart", "Firebase", "C#", "HTML"]
    },
    project3: {
        title: "HydroGrowth",
        image: "assets/images/projects/hydrogrowth.jpg",
        description: "A real-time hydroponic farming monitoring app that connects directly to hardware sensors. The application displays essential environmental parameters such as pH value, water temperature, nutrient concentration, and water level. By providing live data and recommended ranges, the app helps users maintain healthy and sustainable hydroponic systems.",
        technologies: ["Java", "Firebase"]
    },
    project4: {
        title: "Medicine Vending Machine",
        images: ["assets/images/projects/medicine-vending1.jpg", "assets/images/projects/medicine-vending2.jpg"],
        description: "A kiosk‑based medicine vending system that allows users to order medicines through a touchscreen kiosk and pay using online payment methods via PayMongo. After a successful payment, the system sends the order details to the connected vending machine hardware, which automatically dispenses the selected medicine.",
        technologies: ["Flutter", "Dart", "Firebase"]
    },
    project5: {
        title: "Bldg126",
        image: "assets/images/projects/bldg126.jpg",
        description: "A minimalist, aesthetic website for a creative company that produces visual work and graphic design for content creators.",
        technologies: ["HTML", "CSS"]
    },
    project6: {
        title: "Merchandise POS",
        images: ["assets/images/projects/merchandise-pos1.jpg", "assets/images/projects/merchandise-pos2.jpg", "assets/images/projects/merchandise-pos3.jpg"],
        description: "A point‑of‑sale (POS) system that provides a complete solution for managing daily sales operations. It includes product management, QR code scanning, cart and checkout processing, cash‑on‑hand tracking, GCash integration, cash‑out monitoring, expense recording, and credit management. The system also features a detailed sales dashboard that organizes transactions by category and displays total income, modified items, and product‑level summaries, helping users efficiently track and manage their business.",
        technologies: ["Flutter", "Dart", "Firebase"]
    }
};

// Set modal transform-origin from clicked element
function setModalOrigin(modal, event) {
    const content = modal.querySelector('.modal-content');
    if (content && event && event.currentTarget) {
        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        content.style.transformOrigin = `${centerX}px ${centerY}px`;
        // Reset after animation
        setTimeout(() => {
            content.style.transformOrigin = 'center center';
        }, 500);
    }
}

// Build carousel HTML for modal images
function buildModalCarousel(images, title) {
    if (!images || images.length === 0) return '';
    if (images.length === 1) {
        return `<div class="project-modal-image" onclick="openFullscreen(this.querySelector('img').src)">
            <img src="${images[0]}" alt="${title}">
        </div>`;
    }
    const slides = images.map((img, i) => `
        <div class="carousel-slide" onclick="openFullscreen(this.querySelector('img').src)">
            <img src="${img}" alt="${title} - Image ${i + 1}">
        </div>
    `).join('');
    const dots = images.map((_, i) => `
        <div class="modal-carousel-dot${i === 0 ? ' active' : ''}" data-index="${i}"></div>
    `).join('');
    return `
        <div class="project-modal-images">
            <div class="modal-carousel" data-index="0">${slides}</div>
            <button class="carousel-arrow carousel-prev" onclick="carouselNav(this, -1)">&#8249;</button>
            <button class="carousel-arrow carousel-next" onclick="carouselNav(this, 1)">&#8250;</button>
            <div class="modal-carousel-dots">${dots}</div>
        </div>
    `;
}

// Fullscreen image viewer with swipe and arrows
let fullscreenImages = [];
let fullscreenIndex = 0;

function openFullscreen(src) {
    // Get all images from the current carousel
    const carousel = event.target.closest('.project-modal-images') || event.target.closest('.project-modal-image');
    if (carousel) {
        const imgs = carousel.querySelectorAll('img');
        fullscreenImages = Array.from(imgs).map(img => img.src);
        fullscreenIndex = fullscreenImages.indexOf(src);
        if (fullscreenIndex === -1) fullscreenIndex = 0;
    } else {
        fullscreenImages = [src];
        fullscreenIndex = 0;
    }
    
    let viewer = document.getElementById('fullscreen-viewer');
    if (!viewer) {
        viewer = document.createElement('div');
        viewer.id = 'fullscreen-viewer';
        viewer.className = 'fullscreen-viewer';
        viewer.innerHTML = `
            <button class="fs-close" onclick="closeFullscreen()">&times;</button>
            <button class="fs-arrow fs-prev" onclick="fullscreenNav(-1)">&#8249;</button>
            <img src="" alt="Fullscreen">
            <button class="fs-arrow fs-next" onclick="fullscreenNav(1)">&#8250;</button>
            <div class="fs-counter"></div>
        `;
        // Close on background click
        viewer.addEventListener('click', (e) => {
            if (e.target === viewer) closeFullscreen();
        });
        // Swipe support
        let startX = 0, diff = 0;
        viewer.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
        viewer.addEventListener('touchend', (e) => {
            diff = e.changedTouches[0].clientX - startX;
            if (diff > 60) fullscreenNav(-1);
            else if (diff < -60) fullscreenNav(1);
        });
        document.body.appendChild(viewer);
    }
    
    updateFullscreen(viewer);
    viewer.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateFullscreen(viewer) {
    if (!viewer) viewer = document.getElementById('fullscreen-viewer');
    const img = viewer.querySelector('img');
    const prev = viewer.querySelector('.fs-prev');
    const next = viewer.querySelector('.fs-next');
    const counter = viewer.querySelector('.fs-counter');
    
    img.src = fullscreenImages[fullscreenIndex];
    prev.style.display = fullscreenIndex === 0 ? 'none' : 'flex';
    next.style.display = fullscreenIndex === fullscreenImages.length - 1 ? 'none' : 'flex';
    counter.textContent = fullscreenImages.length > 1 ? `${fullscreenIndex + 1} / ${fullscreenImages.length}` : '';
}

function fullscreenNav(dir) {
    fullscreenIndex = Math.max(0, Math.min(fullscreenIndex + dir, fullscreenImages.length - 1));
    updateFullscreen();
}

function closeFullscreen() {
    const viewer = document.getElementById('fullscreen-viewer');
    if (viewer) {
        viewer.classList.remove('active');
        document.body.style.overflow = 'hidden'; // modal is still open
    }
}

// Close fullscreen with Escape (prevent modal from closing)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const viewer = document.getElementById('fullscreen-viewer');
        if (viewer && viewer.classList.contains('active')) {
            closeFullscreen();
            e.stopImmediatePropagation();
            return;
        }
    }
}, true);

// Initialize carousel swipe on a modal
function initModalCarousel(modal) {
    const carousel = modal.querySelector('.modal-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = modal.querySelectorAll('.modal-carousel-dot');
    const prevBtn = modal.querySelector('.carousel-prev');
    const nextBtn = modal.querySelector('.carousel-next');
    let currentIndex = 0;
    let startX = 0;
    let diff = 0;
    
    function updateArrows() {
        if (prevBtn) prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
        if (nextBtn) nextBtn.style.display = currentIndex === slides.length - 1 ? 'none' : 'flex';
    }
    
    function goTo(index) {
        currentIndex = Math.max(0, Math.min(index, slides.length - 1));
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        carousel.dataset.index = currentIndex;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
        updateArrows();
    }
    
    // Initial arrow state
    updateArrows();
    
    // Touch swipe
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        carousel.style.transition = 'none';
    });
    
    carousel.addEventListener('touchmove', (e) => {
        diff = e.touches[0].clientX - startX;
        const offset = -(currentIndex * 100) + (diff / carousel.offsetWidth * 100);
        carousel.style.transform = `translateX(${offset}%)`;
    });
    
    carousel.addEventListener('touchend', () => {
        carousel.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        if (diff > 50) goTo(currentIndex - 1);
        else if (diff < -50) goTo(currentIndex + 1);
        else goTo(currentIndex);
        diff = 0;
    });
    
    // Dot clicks
    dots.forEach(dot => {
        dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index)));
    });
}

// Carousel arrow navigation
function carouselNav(btn, direction) {
    const container = btn.closest('.project-modal-images');
    const carousel = container.querySelector('.modal-carousel');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = container.querySelectorAll('.modal-carousel-dot');
    const prevBtn = container.querySelector('.carousel-prev');
    const nextBtn = container.querySelector('.carousel-next');
    let current = parseInt(carousel.dataset.index || 0);
    
    current = Math.max(0, Math.min(current + direction, slides.length - 1));
    carousel.dataset.index = current;
    carousel.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    if (prevBtn) prevBtn.style.display = current === 0 ? 'none' : 'flex';
    if (nextBtn) nextBtn.style.display = current === slides.length - 1 ? 'none' : 'flex';
}

function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('project-modal-body');
    const project = projectData[projectId];
    
    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }

    // Morph from clicked card
    setModalOrigin(modal, window.event || event);
    
    // Build technologies HTML
    const techHTML = project.technologies
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');
    
    // Build YouTube link HTML if available
    const youtubeLinkHTML = project.youtubeLink
        ? `<div class="project-link">
               <p>View more about the app: <a href="${project.youtubeLink}" target="_blank" rel="noopener noreferrer">Watch on YouTube</a></p>
           </div>`
        : '';
    
    // Build images HTML - support both single image and multiple images
    let imagesHTML = '';
    if (project.images && project.images.length > 0) {
        imagesHTML = buildModalCarousel(project.images, project.title);
    } else if (project.image) {
        imagesHTML = buildModalCarousel([project.image], project.title);
    }
    
    modalBody.innerHTML = `
        <h2>${project.title}</h2>
        
        ${imagesHTML}
        
        <div class="project-modal-info">
            <h3>About This Project</h3>
            <p class="project-description">${project.description}</p>
            
            ${youtubeLinkHTML}
            
            <div class="project-technologies">
                <h4>Technologies Used</h4>
                <div class="tech-tags">
                    ${techHTML}
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    initModalCarousel(modal);
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('project-modal');
    if (e.target === modal) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

// Experience & Leadership Modal
const experienceData = {
    'infor-software': {
        title: "Software Engineer",
        company: "Infor",
        type: "Experience",
        image: "assets/images/experience/infor-software.jpg",
        description: "Working as a Software Engineer at Infor, a global leader in business cloud software specialized by industry.",
        duration: "",
        responsibilities: []
    },
    'infor-qa': {
        title: "QA Engineer Intern",
        company: "Infor",
        type: "Experience",
        image: "assets/images/experience/infor-qa.jpg",
        description: "Completed an internship as a QA Engineer at Infor, gaining hands-on experience in software quality assurance and testing.",
        duration: "",
        responsibilities: []
    },
    'freelance': {
        title: "Freelance Developer",
        company: "Self-Employed",
        type: "Experience",
        image: "assets/images/experience/freelance.jpg",
        description: "Working as a freelance developer, creating custom solutions for various clients.",
        duration: "",
        responsibilities: []
    },
    'aws-coo': {
        title: "Chief Operations Officer",
        company: "AWS Cloud Club NU Baliwag",
        type: "Leadership",
        image: "assets/images/experience/aws-cloud.jpg",
        description: "Led operations and strategic initiatives for the AWS Cloud Club at National University - Baliwag.",
        duration: "",
        responsibilities: []
    },
    'gdsc-cto': {
        title: "Chief Technology Officer",
        company: "Google Developer Student Club NU Baliwag",
        type: "Leadership",
        image: "assets/images/experience/gdsc-cto.jpg",
        description: "Served as Chief Technology Officer for the Google Developer Student Club at National University - Baliwag.",
        duration: "",
        responsibilities: []
    },
    'gdsc-lead': {
        title: "Software Development Lead",
        company: "Google Developer Student Club NU Baliwag",
        type: "Leadership",
        image: "assets/images/experience/gdsc-lead.jpg",
        description: "Led software development initiatives and mentored students in the Google Developer Student Club at National University - Baliwag.",
        duration: "",
        responsibilities: []
    }
};

function openExperienceModal(experienceId) {
    const modal = document.getElementById('experience-modal');
    const modalBody = document.getElementById('experience-modal-body');
    const experience = experienceData[experienceId];
    
    if (!experience) {
        console.error('Experience not found:', experienceId);
        return;
    }

    // Morph from clicked card
    setModalOrigin(modal, window.event || event);
    
    // Build responsibilities HTML if available
    const responsibilitiesHTML = experience.responsibilities && experience.responsibilities.length > 0
        ? `<div class="experience-responsibilities">
               <h4>Key Responsibilities</h4>
               <ul>
                   ${experience.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
               </ul>
           </div>`
        : '';
    
    // Build duration HTML if available
    const durationHTML = experience.duration
        ? `<p class="experience-duration">${experience.duration}</p>`
        : '';
    
    modalBody.innerHTML = `
        <h2>${experience.title}</h2>
        <h3 class="experience-company">${experience.company}</h3>
        ${durationHTML}
        <span class="experience-type-badge">${experience.type}</span>
        
        <div class="project-modal-image">
            <img src="${experience.image}" alt="${experience.title}">
        </div>
        
        <div class="project-modal-info">
            <h3>About This Role</h3>
            <p class="project-description">${experience.description}</p>
            
            ${responsibilitiesHTML}
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeExperienceModal() {
    const modal = document.getElementById('experience-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close experience modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('experience-modal');
    if (e.target === modal) {
        closeExperienceModal();
    }
});

// Close experience modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeExperienceModal();
    }
});

// Awards & Recognition Modal
const awardData = {
    'award1': {
        title: "Magna Cum Laude",
        images: ["assets/images/awards/magna1.jpg", "assets/images/awards/magna2.jpg"],
        description: "Graduated with Latin honors (Magna Cum Laude) in Bachelor of Science in Information Technology from National University – Baliwag."
    },
    'award2': {
        title: "AMY Innovation Awards 2024 – 2nd Place",
        images: ["assets/images/awards/amy1.jpg", "assets/images/awards/amy2.jpg"],
        description: "Achieved 2nd place in the 2024 Alfredo M. Yao (AMY) Innovation Awards, recognized by the Philippine Chamber of Commerce and Industry for impactful technological innovation."
    },
    'award3': {
        title: "Ecothon – Finalist",
        image: "assets/images/awards/ecothon.jpg",
        description: "An ASEAN-wide hackathon series aimed at fostering eco-entrepreneurship and contributing to the United Nations Sustainable Development Goal 12: Sustainable Consumption and Production (SCP)."
    },
    'award4': {
        title: "App Con 2023 – Finalist",
        images: ["assets/images/awards/appcon1.jpg", "assets/images/awards/appcon2.jpg", "assets/images/awards/appcon3.jpg"],
        description: "One of the Top 20 teams out of 222 participants in the AppCon 2023: An Invitational Application Development Contest, organized by OTIS Philippines."
    },
    'award5': {
        title: "AWS - Pointwest Gen AI Hackathon – Finalist",
        images: ["assets/images/awards/genai1.jpg", "assets/images/awards/genai2.jpg", "assets/images/awards/genai3.jpg", "assets/images/awards/genai4.jpg"],
        description: "A competition challenging students to build innovative Generative AI solutions addressing real-world organizational problems using AWS Cloud technologies."
    },
    'award6': {
        title: "3rd Golden Sphere Awards – Multiple Recognitions",
        images: ["assets/images/awards/golden-sphere-1.jpg", "assets/images/awards/golden-sphere-2.jpg"],
        description: "Honored at the 3rd Golden Sphere Awards at National University Baliwag, a ceremony celebrating outstanding student leaders.<br><br><ul><li>Executive Director's List Award – Rank 5</li><li>Excellent Effort Award</li><li>Commitment to Service Award (Nominee)</li><li>Outstanding Special Interest Organization</li></ul>"
    },
    'award7': {
        title: "University Academic Excellence Benefit Grantee",
        image: "assets/images/awards/university.jpg",
        description: "One of the grantees of the NU Scholarship, awarded to exceptional students at National University in recognition of academic excellence, leadership, and dedication to community development."
    },
    'award8': {
        title: "Best Capstone Project – BSIT NU Bulacan",
        images: ["assets/images/awards/best-capstone-1.jpg", "assets/images/awards/best-capstone-2.jpg"],
        description: "Recognized for having the Best Capstone Project in the BSIT program at National University – Bulacan, selected from all graduating groups in the batch."
    }
};

function openAwardModal(awardId) {
    const modal = document.getElementById('award-modal');
    const modalBody = document.getElementById('award-modal-body');
    const award = awardData[awardId];
    
    if (!award) {
        console.error('Award not found:', awardId);
        return;
    }

    // Morph from clicked card
    setModalOrigin(modal, window.event || event);
    
    // Build images HTML - support both single image and multiple images
    let imagesHTML = '';
    if (award.images && award.images.length > 0) {
        imagesHTML = buildModalCarousel(award.images, award.title);
    } else if (award.image) {
        imagesHTML = buildModalCarousel([award.image], award.title);
    }
    
    modalBody.innerHTML = `
        <h2>${award.title}</h2>
        
        ${imagesHTML}
        
        <div class="project-modal-info">
            <h3>About This Achievement</h3>
            <p class="project-description">${award.description}</p>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    initModalCarousel(modal);
}

function closeAwardModal() {
    const modal = document.getElementById('award-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close award modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('award-modal');
    if (e.target === modal) {
        closeAwardModal();
    }
});

// Close award modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAwardModal();
    }
});
