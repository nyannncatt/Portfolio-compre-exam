// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Add animation to project cards on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Hide navbar when scrolling down, show when scrolling up
let lastScrollTop = 0;
let scrollThreshold = 100; // Hide nav after scrolling 100px

function handleNavbarVisibility() {
    const nav = document.querySelector('nav');
    const scrollY = window.scrollY;
    
    if (!nav) return;
    
    // Always show nav at the top of the page
    if (scrollY < scrollThreshold) {
        nav.classList.remove('nav-hidden');
        return;
    }
    
    // Hide nav when scrolling down, show when scrolling up
    if (scrollY > lastScrollTop) {
        // Scrolling down
        nav.classList.add('nav-hidden');
    } else {
        // Scrolling up
        nav.classList.remove('nav-hidden');
    }
    
    lastScrollTop = scrollY <= 0 ? 0 : scrollY;
}

window.addEventListener('scroll', handleNavbarVisibility, { passive: true });
document.addEventListener('DOMContentLoaded', handleNavbarVisibility); 