/**
 * InForce - Premium Smartphone Parts Shop
 * Main JavaScript
 */

document.addEventListener("DOMContentLoaded", function() {
    // --- Initialization and Helper Functions ---
    
    // Remove loading overlay when the page is loaded
    setTimeout(() => {
        const loadingOverlay = document.querySelector('.loading-overlay');
        loadingOverlay.classList.add('hidden');
    }, 1000);
    
    // Helper for getting elements by id
    const el = (id) => document.getElementById(id);
    
    // Helper for getting multiple elements by selector
    const elAll = (selector) => document.querySelectorAll(selector);
    
    // Helper for adding event listeners
    const on = (element, event, callback) => {
        if (element) {
            element.addEventListener(event, callback);
        }
    };
    
    // --- Elements Refs ---
    const header = el('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = elAll('.nav-link');
    const scrollToTop = document.querySelector('.scroll-to-top');
    
    // --- Navigation Functionality ---
    
    // Toggle mobile menu
    if (menuToggle) {
        on(menuToggle, 'click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        on(link, 'click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            scrollToTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            scrollToTop.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    on(scrollToTop, 'click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // --- Smooth Scrolling For Internal Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                
                // Calculate the position
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --- Animation on Scroll ---
    const animateElements = document.querySelectorAll('.fade-in, .fade-left, .fade-right, .fade-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // --- Initialize Category Filtering ---
    const initializeFilters = () => {
        const categoryButtons = document.querySelectorAll('.category-btn');
        
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Let the ConfigLoader handle the actual filtering
                if (window.configLoader) {
                    const category = button.getAttribute('data-category');
                    window.configLoader.filterProducts(category);
                }
            });
        });
    };
    
    // Initialize filters once the categories are loaded
    const checkAndInitFilters = () => {
        if (document.querySelectorAll('.category-btn:not(.skeleton)').length > 0) {
            initializeFilters();
        } else {
            setTimeout(checkAndInitFilters, 100);
        }
    };
    
    checkAndInitFilters();
    
    // --- Interactive elements for cards ---
    const addHoverEffects = () => {
        // Service cards interactive effects
        const serviceCards = document.querySelectorAll('.service-card:not(.skeleton)');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = 'var(--hover-shadow)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'var(--card-shadow)';
            });
        });
        
        // Product cards interactive effects
        const productCards = document.querySelectorAll('.product-card:not(.skeleton)');
        
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
                card.style.boxShadow = 'var(--hover-shadow)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'var(--card-shadow)';
            });
        });
    };
    
    // Check and add effects when content is loaded
    const checkAndAddEffects = () => {
        if (document.querySelectorAll('.service-card:not(.skeleton)').length > 0 && 
            document.querySelectorAll('.product-card:not(.skeleton)').length > 0) {
            addHoverEffects();
        } else {
            setTimeout(checkAndAddEffects, 100);
        }
    };
    
    checkAndAddEffects();
    
    // Set current year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});