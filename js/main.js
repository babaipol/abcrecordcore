/**
 * ABCRecordCore Main JavaScript
 * Handles interactivity for the website
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.style.display = mobileMenuToggle.classList.contains('active') ? 'block' : 'none';
            document.body.style.overflow = mobileMenuToggle.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Pricing Toggle
    const pricingToggle = document.getElementById('pricingToggle');
    
    if (pricingToggle) {
        pricingToggle.addEventListener('change', () => {
            document.body.classList.toggle('pricing-annual', pricingToggle.checked);
        });
    }
    
    // Testimonial Slider
    const testimonialTrack = document.querySelector('.testimonials-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.dot');
    const prevButton = document.getElementById('testimonialPrev');
    const nextButton = document.getElementById('testimonialNext');
    
    if (testimonialTrack && testimonialCards.length && prevButton && nextButton) {
        let currentSlide = 0;
        const slideCount = testimonialCards.length;
        
        // Set initial width based on number of slides
        testimonialTrack.style.width = `${slideCount * 100}%`;
        testimonialCards.forEach(card => {
            card.style.width = `${100 / slideCount}%`;
        });
        
        // Function to update slide position
        const updateSlidePosition = () => {
            testimonialTrack.style.transform = `translateX(-${currentSlide * (100 / slideCount)}%)`;
            
            // Update dots
            testimonialDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        };
        
        // Event listeners for prev/next buttons
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateSlidePosition();
        });
        
        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlidePosition();
        });
        
        // Event listeners for dots
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlidePosition();
            });
        });
        
        // Auto-advance slides every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlidePosition();
        }, 5000);
    }
    
    // Cookie Consent
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieSettings = document.getElementById('cookieSettings');
    
    if (cookieBanner && cookieAccept) {
        // Check if user has already accepted cookies
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        
        if (!cookiesAccepted) {
            // Show cookie banner with a slight delay
            setTimeout(() => {
                cookieBanner.style.display = 'block';
                
                // Animate in
                cookieBanner.style.opacity = '0';
                cookieBanner.style.transform = 'translateY(20px)';
                cookieBanner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                setTimeout(() => {
                    cookieBanner.style.opacity = '1';
                    cookieBanner.style.transform = 'translateY(0)';
                }, 50);
            }, 2000);
        }
        
        // Accept all cookies
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            
            // Animate out
            cookieBanner.style.opacity = '0';
            cookieBanner.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 300);
        });
        
        // Cookie settings (could open a modal in a real implementation)
        if (cookieSettings) {
            cookieSettings.addEventListener('click', () => {
                // In a real implementation, this would open a modal with cookie settings
                alert('Cookie settings would open here in a real implementation.');
            });
        }
    }
    
    // Animated counter for metrics
    const animateCounter = () => {
        const counters = document.querySelectorAll('.metric-value');
        
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-value'));
            const suffix = counter.textContent.replace(/[0-9.]/g, '');
            let count = 0;
            const duration = 2000; // 2 seconds
            const frameRate = 30; // frames per second
            const increment = target / (duration / 1000 * frameRate);
            
            const updateCounter = () => {
                count += increment;
                if (count < target) {
                    counter.textContent = Math.ceil(count) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            
            updateCounter();
        });
    };
    
    // Intersection Observer for scroll animations
    const observeElements = () => {
        const elements = document.querySelectorAll('.feature-card, .pricing-card, .hero-content, .section-header');
        
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                    
                    // If this is a section with counters, animate them
                    if (entry.target.classList.contains('hero-content')) {
                        animateCounter();
                    }
                }
            });
        }, options);
        
        elements.forEach(element => {
            observer.observe(element);
            
            // Add initial state for animation
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Create a CSS rule for animated elements
        const style = document.createElement('style');
        style.textContent = `
            .animated {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    };
    
    // Initialize animations
    observeElements();
    
    // Smooth scroll for anchor links
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId !== '#') {
                    e.preventDefault();
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    };
    
    initSmoothScroll();
    
    // Header scroll behavior
    const header = document.querySelector('.main-header');
    
    if (header) {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add shadow and change background opacity on scroll
            if (scrollTop > 50) {
                header.style.boxShadow = 'var(--shadow-md)';
                header.style.backdropFilter = 'blur(12px)';
                header.style.backgroundColor = scrollTop > 300 ? 
                    'var(--color-bg-primary)' : 'var(--glass-bg)';
            } else {
                header.style.boxShadow = 'none';
                header.style.backdropFilter = 'blur(8px)';
                header.style.backgroundColor = 'var(--glass-bg)';
            }
            
            // Hide header on scroll down, show on scroll up
            if (scrollTop > lastScrollTop && scrollTop > 300) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
});
