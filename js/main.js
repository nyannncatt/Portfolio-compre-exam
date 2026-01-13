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

// Hide navbar on mobile when on home section or at top, show when scrolling down
function handleMobileNavbarVisibility() {
    const nav = document.querySelector('nav');
    const homeSection = document.getElementById('home');
    const scrollY = window.scrollY;
    const isMobile = window.innerWidth <= 900;
    if (!nav || !homeSection) return;
    if (isMobile) {
        // Get the bottom of the home section
        const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
        if (scrollY < homeBottom - 80) {
            nav.style.display = 'none';
        } else {
            nav.style.display = '';
        }
    } else {
        nav.style.display = '';
    }
}
window.addEventListener('scroll', handleMobileNavbarVisibility);
window.addEventListener('resize', handleMobileNavbarVisibility);
document.addEventListener('DOMContentLoaded', handleMobileNavbarVisibility); 