document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Review slider
    const reviewCards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;
    
    function showReview(index) {
        reviewCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        reviewCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showReview(index));
    });
    
    prevBtn.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = reviewCards.length - 1;
        showReview(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= reviewCards.length) newIndex = 0;
        showReview(newIndex);
    });
    
    // Auto slide change
    let slideInterval = setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= reviewCards.length) newIndex = 0;
        showReview(newIndex);
    }, 5000);
    
    // Pause auto slide on hover
    const slider = document.querySelector('.reviews-slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            let newIndex = currentIndex + 1;
            if (newIndex >= reviewCards.length) newIndex = 0;
            showReview(newIndex);
        }, 5000);
    });
    
    // Process steps animation
    const steps = document.querySelectorAll('.step');
    
    function checkSteps() {
        const triggerBottom = window.innerHeight / 5 * 4;
        
        steps.forEach(step => {
            const stepTop = step.getBoundingClientRect().top;
            
            if (stepTop < triggerBottom) {
                step.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkSteps);
    checkSteps(); // Check on load
    
    // Form submission
    const contactForm = document.getElementById('appointment-form');
    const successModal = document.getElementById('success-modal');
    const closeModal = document.querySelector('.close-modal');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        // For this example, we'll just show the success modal
        successModal.classList.add('active');
        
        // Reset form
        this.reset();
    });
    
    closeModal.addEventListener('click', function() {
        successModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
    
    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('src');
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});