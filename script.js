// DOM Elements
const ctaButton = document.getElementById('ctaButton');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');
const tooltip = document.getElementById('tooltip');

// Ripple Effect Function
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = button.querySelector('.ripple');
    
    // Get click position relative to button
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Position ripple
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    // Trigger ripple animation
    button.classList.remove('ripple-effect');
    void button.offsetWidth; // Force reflow
    button.classList.add('ripple-effect');
    
    // Remove class after animation
    setTimeout(() => {
        button.classList.remove('ripple-effect');
    }, 600);
}

// Show Modal Function
function showModal() {
    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add confetti effect (optional enhancement)
    createConfetti();
}

// Close Modal Function
function closeModal() {
    successModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Confetti Effect (Optional Visual Enhancement)
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        // Animate confetti falling
        const duration = Math.random() * 3 + 2;
        const xMovement = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            { 
                transform: 'translateY(0) translateX(0) rotate(0deg)',
                opacity: 1
            },
            { 
                transform: `translateY(${window.innerHeight}px) translateX(${xMovement}px) rotate(${Math.random() * 360}deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// Event Listeners
ctaButton.addEventListener('click', function(event) {
    createRipple(event);
    
    // Show modal after ripple animation
    setTimeout(() => {
        showModal();
    }, 300);
});

closeModalBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
successModal.addEventListener('click', function(event) {
    if (event.target === successModal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && successModal.classList.contains('active')) {
        closeModal();
    }
});

// Tooltip positioning on mobile
function adjustTooltipPosition() {
    if (window.innerWidth < 768) {
        tooltip.style.bottom = '130%';
    }
}

window.addEventListener('resize', adjustTooltipPosition);
adjustTooltipPosition();

// Smooth scroll behavior
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

// Add loading state to button (optional)
function setButtonLoading(isLoading) {
    if (isLoading) {
        ctaButton.disabled = true;
        ctaButton.style.opacity = '0.7';
        ctaButton.style.cursor = 'not-allowed';
    } else {
        ctaButton.disabled = false;
        ctaButton.style.opacity = '1';
        ctaButton.style.cursor = 'pointer';
    }
}

// Performance optimization: Debounce resize events
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        adjustTooltipPosition();
    }, 250);
});

// Log analytics (placeholder for actual analytics integration)
function logEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // Here you can integrate with Google Analytics, Mixpanel, etc.
    // Example: gtag('event', eventName, eventData);
}

// Track button clicks
ctaButton.addEventListener('click', function() {
    logEvent('cta_button_click', {
        button_text: 'Coba Sekarang',
        timestamp: new Date().toISOString()
    });
});

// Track modal views
function trackModalView() {
    logEvent('modal_view', {
        modal_type: 'success',
        timestamp: new Date().toISOString()
    });
}

// Initialize
console.log('CTA Landing Page initialized successfully!');