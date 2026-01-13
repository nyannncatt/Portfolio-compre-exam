// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const nav = document.querySelector('nav');
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // Set flag to prevent hiding during navigation
        isNavigating = true;
        // Keep nav visible when clicking navigation links
        if (nav) {
            nav.classList.remove('nav-hidden');
        }
        
        if (targetElement) {
            // Add extra offset for specific sections
            let offset = 0;
            if (targetId === '#about') {
                offset = 80;
            } else if (targetId === '#personal-projects') {
                offset = 100;
            }
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        
        // Keep nav visible for a short time after navigation, then allow hiding again
        setTimeout(() => {
            if (nav) {
                nav.classList.remove('nav-hidden');
            }
            // Reset flag after navigation completes
            setTimeout(() => {
                isNavigating = false;
            }, 1000);
        }, 500);
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
let isNavigating = false; // Flag to prevent hiding during navigation

function handleNavbarVisibility() {
    const nav = document.querySelector('nav');
    const scrollY = window.scrollY;
    
    if (!nav) return;
    
    // Don't hide nav if user just clicked a navigation link
    if (isNavigating) {
        nav.classList.remove('nav-hidden');
        return;
    }
    
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

// Education cards sequential flip animation when section is visible
const educationSection = document.getElementById('education');
const educationCards = document.querySelectorAll('.education-card.college-card-flip');
let hasAnimated = false;

const educationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            // Add flip-animate class to each card sequentially
            educationCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('flip-animate');
                    // Remove animation class after animation completes to restore hover functionality
                    setTimeout(() => {
                        card.classList.remove('flip-animate');
                    }, 3500 + (index * 1000)); // Remove after animation completes (3.5s animation + delay)
                }, index * 1000); // 1 second delay between each card
            });
        }
    });
}, {
    threshold: 0.3 // Trigger when 30% of section is visible
});

if (educationSection) {
    educationObserver.observe(educationSection);
}

// About section info cards animation when section is visible
const aboutSection = document.getElementById('about');
const infoItems = document.querySelectorAll('.info-item');
let aboutHasAnimated = false;

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !aboutHasAnimated) {
            aboutHasAnimated = true;
            // Add animate class to each info item sequentially
            infoItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 100); // 0.1 second delay between each card
            });
        }
    });
}, {
    threshold: 0.2 // Trigger when 20% of section is visible
});

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Education cards fade-in animation when section is visible
const allEducationCards = document.querySelectorAll('.education-card');
let educationHasAnimated = false;

const educationFadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !educationHasAnimated) {
            educationHasAnimated = true;
            // Add animate class to each education card sequentially
            allEducationCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 150); // 0.15 second delay between each card
            });
        }
    });
}, {
    threshold: 0.2 // Trigger when 20% of section is visible
});

if (educationSection && allEducationCards.length > 0) {
    educationFadeObserver.observe(educationSection);
}

// Personal Projects/School Projects cards animation when section is visible
const personalProjectsHeading = document.getElementById('personal-projects');
const internshipCards = document.querySelectorAll('.internship-card');
let personalProjectsHasAnimated = false;

const personalProjectsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !personalProjectsHasAnimated) {
            personalProjectsHasAnimated = true;
            // Add animate class to each internship card sequentially
            internshipCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 150); // 0.15 second delay between each card
            });
        }
    });
}, {
    threshold: 0.1 // Trigger when 10% of heading is visible
});

if (personalProjectsHeading) {
    personalProjectsObserver.observe(personalProjectsHeading);
}

// Work Experience cards animation when section is visible
const projectsSection = document.getElementById('projects');
const projectCards = document.querySelectorAll('.project-card');
let projectsHasAnimated = false;

const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !projectsHasAnimated) {
            projectsHasAnimated = true;
            // Add animate class to each project card sequentially
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 150); // 0.15 second delay between each card
            });
        }
    });
}, {
    threshold: 0.2 // Trigger when 20% of section is visible
});

if (projectsSection) {
    projectsObserver.observe(projectsSection);
}

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    document.body.style.setProperty('--scroll-progress', scrolled + '%');
    
    // Update the progress bar
    const progressBar = document.querySelector('body::before');
    if (progressBar) {
        document.body.style.setProperty('--scroll-width', scrolled + '%');
    }
});

// Update scroll progress on load
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        body::before {
            width: var(--scroll-width, 0%);
        }
    `;
    document.head.appendChild(style);
    
    // Initial scroll calculation
    const updateProgress = () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        document.documentElement.style.setProperty('--scroll-width', scrolled + '%');
    };
    
    window.addEventListener('scroll', updateProgress);
    updateProgress();
}); 