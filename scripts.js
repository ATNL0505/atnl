// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollAnimations();
    initializeContactForm();
    initializeSmoothScrolling();
    initializePageLoadAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link highlighting will be handled by the global scroll handler
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        const offsetTop = target.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .benefit-item, .service-category, .stat-item, .about-text, .contact-info');
    
    // Add scroll animation class to elements
    animatedElements.forEach(element => {
        element.classList.add('scroll-animate');
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Remove visible class when element goes out of view to allow re-animation
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Form validation
    contactForm.addEventListener('submit', function(e) {
        // Reset previous errors
        clearErrors();
        
        let isValid = true;

        // Validate name
        if (!validateName(nameInput.value.trim())) {
            showError('nameError', 'Please enter a valid full name (minimum 2 words)');
            isValid = false;
        }

        // Validate email
        if (!validateEmail(emailInput.value.trim())) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate message
        if (!validateMessage(messageInput.value.trim())) {
            showError('messageError', 'Please enter a message (minimum 10 characters)');
            isValid = false;
        }

        if (isValid) {
            // Prevent default and handle with AJAX to avoid redirect
            e.preventDefault();
            
            showLoadingState();
            
            // Submit form via AJAX to avoid redirect
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    handleFormSuccess();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                handleFormError();
            });
        } else {
            // Prevent form submission if validation fails
            e.preventDefault();
            return false;
        }
    });

    // Real-time validation
    nameInput.addEventListener('blur', function() {
        const nameError = document.getElementById('nameError');
        if (this.value.trim() && !validateName(this.value.trim())) {
            showError('nameError', 'Please enter a valid full name (minimum 2 words)');
        } else {
            nameError.textContent = '';
        }
    });

    emailInput.addEventListener('blur', function() {
        const emailError = document.getElementById('emailError');
        if (this.value.trim() && !validateEmail(this.value.trim())) {
            showError('emailError', 'Please enter a valid email address');
        } else {
            emailError.textContent = '';
        }
    });

    messageInput.addEventListener('blur', function() {
        const messageError = document.getElementById('messageError');
        if (this.value.trim() && !validateMessage(this.value.trim())) {
            showError('messageError', 'Please enter a message (minimum 10 characters)');
        } else {
            messageError.textContent = '';
        }
    });
}

// Validation functions
function validateName(name) {
    return name.length >= 2 && name.split(' ').length >= 2 && /^[a-zA-Z\s]+$/.test(name);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateMessage(message) {
    return message.length >= 10;
}

function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

function showLoadingState() {
    const submitButton = document.querySelector('.submit-button');
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
}

// Handle form submission success (called after Formspree redirect)
function handleFormSuccess() {
    const submitButton = document.querySelector('.submit-button');
    
    // Show success state
    submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
    submitButton.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
    
    // Show success message
    showSuccessMessage();
    
    // Reset form and button after delay
    setTimeout(() => {
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitButton.disabled = false;
        submitButton.style.background = '';
        document.getElementById('contactForm').reset();
    }, 3000);
}

function showSuccessMessage() {
    // Create success message element
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) existingMessage.remove();
    
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! We\'ll get back to you soon.';
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(successMessage, form);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.remove();
        }
    }, 5000);
}

// Handle form error
function handleFormError() {
    const submitButton = document.querySelector('.submit-button');
    
    // Show error state
    submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
    submitButton.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
    
    // Show error message
    showErrorMessage();
    
    // Reset button after delay
    setTimeout(() => {
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitButton.disabled = false;
        submitButton.style.background = '';
    }, 3000);
}

function showErrorMessage() {
    // Create error message element
    const existingMessage = document.querySelector('.error-message-form');
    if (existingMessage) existingMessage.remove();
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message-form';
    errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again.';
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(errorMessage, form);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (errorMessage.parentNode) {
            errorMessage.remove();
        }
    }, 5000);
}

// Check for success parameter in URL
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        setTimeout(() => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            handleFormSuccess();
        }, 500);
    }
});

function showSuccessMessage() {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
        <div style="
            background: #d4edda;
            color: #155724;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            border: 1px solid #c3e6cb;
        ">
            <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
            Thank you for your message! We will get back to you soon.
        </div>
    `;
    
    const form = document.getElementById('contactForm');
    form.appendChild(successMessage);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
let debouncedScrollHandler;

// Initialize debounced scroll handler after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Define updateActiveNavLink function globally
    window.updateActiveNavLink = function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        const navLinks = document.querySelectorAll('.nav-link');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    };

    // Create debounced handler
    debouncedScrollHandler = debounce(function() {
        window.updateActiveNavLink();
    }, 10);

    // Add scroll event listener
    window.addEventListener('scroll', debouncedScrollHandler);
});

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Page load animations
function initializePageLoadAnimations() {
    // Add slide-in-left class to text elements, but exclude hero title
    const textElements = document.querySelectorAll('h2, h3, p, .hero-subtitle, .section-header h2, .section-header p');
    textElements.forEach((element, index) => {
        element.classList.add('slide-in-left');
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// Preloader (if needed)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger text animations after page load
    setTimeout(() => {
        const textElements = document.querySelectorAll('.slide-in-left');
        textElements.forEach(element => {
            element.classList.add('slide-in-active');
        });
    }, 300);
});

// Add smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill for smooth scroll
    function smoothScrollTo(targetY, duration) {
        const startY = window.scrollY;
        const difference = targetY - startY;
        const startTime = performance.now();

        function step() {
            const progress = (performance.now() - startTime) / duration;
            const amount = easeInOutCubic(progress);
            window.scrollTo(0, startY + (difference * amount));
            
            if (progress < 0.99) {
                window.requestAnimationFrame(step);
            }
        }
        
        step();
    }

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    // Override scrollToSection for older browsers
    window.scrollToSection = function(sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
            const offsetTop = target.offsetTop - 70;
            smoothScrollTo(offsetTop, 800);
        }
    };
}
