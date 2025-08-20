// =====================
// ANIMATIONS & INTERACTIONS
// =====================

document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after content loads
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);

    // Mobile Navigation Toggle
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarContent = document.getElementById('navbarContent');
    
    if (navbarToggle && navbarContent) {
        navbarToggle.addEventListener('click', function() {
            navbarToggle.classList.toggle('active');
            navbarContent.classList.toggle('active');
        });
    }

    // Scroll Reveal Animations
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScroll = () => {
        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    };

    // Initial check for elements in view
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // Smooth scroll for anchor links
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

    // Enhanced hover effects for cards
    const listingCards = document.querySelectorAll('.listing-card');
    
    listingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 0 30px rgba(109, 40, 217, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Filter hover effects
    const filters = document.querySelectorAll('.filter');
    
    filters.forEach(filter => {
        filter.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 0 20px rgba(109, 40, 217, 0.3)';
        });
        
        filter.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Search bar focus effects
    const searchInput = document.querySelector('.search-input');
    const searchContainer = document.querySelector('.search-container');
    
    if (searchInput && searchContainer) {
        searchInput.addEventListener('focus', function() {
            searchContainer.style.borderColor = 'var(--accent-purple)';
            searchContainer.style.boxShadow = '0 0 20px rgba(109, 40, 217, 0.3)';
            searchContainer.style.transform = 'translateY(-2px)';
        });
        
        searchInput.addEventListener('blur', function() {
            searchContainer.style.borderColor = 'var(--border-color)';
            searchContainer.style.boxShadow = 'none';
            searchContainer.style.transform = 'translateY(0)';
        });
    }

    // Profile dropdown enhancements
    const profileDropdowns = document.querySelectorAll('.profile-dropdown');
    
    profileDropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.profile-trigger');
        const menu = dropdown.querySelector('.profile-menu');
        
        if (trigger && menu) {
            trigger.addEventListener('click', function(e) {
                e.stopPropagation();
                menu.style.opacity = menu.style.opacity === '1' ? '0' : '1';
                menu.style.visibility = menu.style.visibility === 'visible' ? 'hidden' : 'visible';
                menu.style.transform = menu.style.transform === 'translateY(0px)' ? 'translateY(-10px)' : 'translateY(0px)';
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.profile-dropdown')) {
            const menus = document.querySelectorAll('.profile-menu');
            menus.forEach(menu => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
            });
        }
    });

    // Parallax effect for background blobs
    const blobs = document.querySelectorAll('.gradient-blob');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 0.1;
            blob.style.transform = `translateY(${rate * speed}px)`;
        });
    });

    // Typing effect for headings (optional enhancement)
    const headings = document.querySelectorAll('h1, h2, h3');
    
    headings.forEach(heading => {
        if (heading.textContent.length > 0) {
            heading.style.opacity = '0';
            heading.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                heading.style.transition = 'all 0.6s ease';
                heading.style.opacity = '1';
                heading.style.transform = 'translateY(0)';
            }, 300);
        }
    });

    // Smooth page transitions
    const links = document.querySelectorAll('a[href^="/"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href !== window.location.href) {
                e.preventDefault();
                
                // Add fade out effect
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = this.href;
                }, 300);
            }
        });
    });

    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateAnimations() {
        revealOnScroll();
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // Add CSS classes for animation triggers
    document.body.classList.add('animations-ready');
    
    // Initialize any additional animations after a short delay
    setTimeout(() => {
        document.body.classList.add('fully-loaded');
    }, 2000);
});

// =====================
// UTILITY FUNCTIONS
// =====================

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Smooth easing functions
const easing = {
    easeInOut: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeOut: t => t * (2 - t),
    easeIn: t => t * t
};

// Export for use in other scripts
window.AnimationUtils = {
    debounce,
    throttle,
    easing
};
