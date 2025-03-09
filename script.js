// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Simple form validation
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageInput = this.querySelector('textarea');
        
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            alert('Please fill in all fields');
            return;
        }
        
        
        alert('Form submitted successfully! (This is just a demo)');
        this.reset();
    });
}

// Add animation to the CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        const aboutSection = document.querySelector('#about');
        window.scrollTo({
            top: aboutSection.offsetTop - 70,
            behavior: 'smooth'
        });
    });
}


// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Handle tariff button click
const tariffButton = document.querySelector('.tariff-btn a');
if (tariffButton) {
    tariffButton.addEventListener('click', function(e) {
        // If it's an internal link with hash, use smooth scroll
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }
        
    });
}
// Gallery horizontal scroll navigation
const galleryContainer = document.querySelector('.gallery-scroll-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (galleryContainer && prevBtn && nextBtn) {
    // Calculate the scroll distance (width of one card + gap)
    const scrollDistance = 320; 
    
    prevBtn.addEventListener('click', () => {
        // Pause the animation temporarily
        galleryContainer.style.animationPlayState = 'paused';
        
        galleryContainer.scrollBy({
            left: -scrollDistance,
            behavior: 'smooth'
        });
        
        // Resume animation after scrolling completes
        setTimeout(() => {
            galleryContainer.style.animationPlayState = 'running';
        }, 500);
    });
    
    nextBtn.addEventListener('click', () => {
        // Pause the animation temporarily
        galleryContainer.style.animationPlayState = 'paused';
        
        galleryContainer.scrollBy({
            left: scrollDistance,
            behavior: 'smooth'
        });
        
        // Resume animation after scrolling completes
        setTimeout(() => {
            galleryContainer.style.animationPlayState = 'running';
        }, 500);
    });
}

// Infinite Gallery Scroll
document.addEventListener('DOMContentLoaded', function() {
    const scrollContainer = document.getElementById('gallery-scroll');
    if (scrollContainer) {
        const cards = scrollContainer.querySelectorAll('.gallery-card');
        
        // Clone cards to create the infinite effect
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            scrollContainer.appendChild(clone);
        });
        
        
        scrollContainer.style.animation = 'scroll 30s linear infinite';
        
        // Pause animation on hover
        scrollContainer.addEventListener('mouseenter', () => {
            scrollContainer.style.animationPlayState = 'paused';
        });
        
        // Resume animation when mouse leaves
        scrollContainer.addEventListener('mouseleave', () => {
            scrollContainer.style.animationPlayState = 'running';
        });
    }
});

// Guest counter functionality
document.addEventListener('DOMContentLoaded', function() {
    const counterContainers = document.querySelectorAll('.counter-container');
    
    counterContainers.forEach(container => {
        const minusBtn = container.querySelector('.minus-btn');
        const plusBtn = container.querySelector('.plus-btn');
        const input = container.querySelector('input');
        const min = parseInt(input.getAttribute('min'));
        const max = parseInt(input.getAttribute('max'));
        
        minusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            if (value > min) {
                input.value = value - 1;
            }
        });
        
        plusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            if (value < max) {
                input.value = value + 1;
            }
        });
    });
});

// Check Availability Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const availabilityForm = document.querySelector('.date-selection-form');
    
    if (availabilityForm) {
        availabilityForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Get form values
            const checkInDate = document.getElementById('check-in').value;
            const checkOutDate = document.getElementById('check-out').value;
            const adults = document.getElementById('adults').value;
            const children = document.getElementById('children').value;
            
            // Validate dates
            if (!checkInDate || !checkOutDate) {
                alert('Please select both check-in and check-out dates.');
                return;
            }
            
            // Convert to Date objects for comparison
            const checkIn = new Date(checkInDate);
            const checkOut = new Date(checkOutDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time part for proper comparison
            
            // Validate check-in date is not in the past
            if (checkIn < today) {
                alert('Check-in date cannot be in the past.');
                return;
            }
            
            // Validate check-out date is after check-in date
            if (checkOut <= checkIn) {
                alert('Check-out date must be after check-in date.');
                return;
            }
            
            // Calculate stay duration
            const timeDiff = checkOut.getTime() - checkIn.getTime();
            const nightsStay = Math.ceil(timeDiff / (1000 * 3600 * 24));
            
            // Show confirmation with stay details
            const confirmMessage = `Checking availability for:
- Check-in: ${formatDate(checkIn)}
- Check-out: ${formatDate(checkOut)}
- Duration: ${nightsStay} night${nightsStay > 1 ? 's' : ''}
- Guests: ${adults} adult${adults > 1 ? 's' : ''}, ${children} child${children != 1 ? 'ren' : ''}

Redirecting to available rooms...`;
            
            alert(confirmMessage);
            
            // Scroll to room section
            const roomSection = document.querySelector('.room-showcase');
            if (roomSection) {
                roomSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            
            document.querySelectorAll('.room-card').forEach(card => {
                card.style.animation = 'pulse 1s';
            });
        });
    }
    
    // Helper function to format date
    function formatDate(date) {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
});

// Add a pulse animation for room cards
const style = document.createElement('style');
style.textContent = `
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.03); }
    100% { transform: scale(1); }
}`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    
    const reviewsContainer = document.querySelector('.reviews-container');
    if (reviewsContainer) {
        const cards = reviewsContainer.querySelectorAll('.review-card');
        
        // Apply the animation
        reviewsContainer.style.animation = 'reviewScroll 30s linear infinite';
        
        // Pause animation on hover
        reviewsContainer.addEventListener('mouseenter', () => {
            reviewsContainer.style.animationPlayState = 'paused';
        });
        
        // Resume animation when mouse leaves
        reviewsContainer.addEventListener('mouseleave', () => {
            reviewsContainer.style.animationPlayState = 'running';
        });
    }
});