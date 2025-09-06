// Smooth scrolling for navigation links
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

// Trading chart animation
function drawChart() {
    const canvas = document.getElementById('chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Generate random price data
    const points = 50;
    const data = [];
    let price = 1.2000;
    
    for (let i = 0; i < points; i++) {
        price += (Math.random() - 0.5) * 0.01;
        data.push(price);
    }
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let i = 0; i <= 10; i++) {
        const x = (width / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    // Horizontal lines
    for (let i = 0; i <= 6; i++) {
        const y = (height / 6) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    // Draw price line
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const minPrice = Math.min(...data);
    const maxPrice = Math.max(...data);
    const priceRange = maxPrice - minPrice;
    
    data.forEach((price, index) => {
        const x = (width / (points - 1)) * index;
        const y = height - ((price - minPrice) / priceRange) * height;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Add price labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.fillText(`${data[data.length - 1].toFixed(4)}`, width - 60, 20);
    ctx.fillText('EUR/USD', 10, 20);
}

// Animate numbers counting up
function animateNumbers() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const isNumber = target.match(/[\d,]+/);
        
        if (isNumber) {
            const number = parseInt(target.replace(/[^\d]/g, ''));
            const prefix = target.replace(/[\d,]+/, '');
            const suffix = target.replace(/.*[\d,]+/, '');
            
            let current = 0;
            const increment = number / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }
                
                const formatted = Math.floor(current).toLocaleString();
                stat.textContent = prefix + formatted + suffix;
            }, 20);
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to elements
document.addEventListener('DOMContentLoaded', () => {
    // Draw chart
    drawChart();
    
    // Animate stats when hero section is visible
    const heroSection = document.querySelector('.hero');
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateNumbers, 500);
                heroObserver.unobserve(entry.target);
            }
        });
    });
    
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.feature-card, .account-card, .education-card, .instrument');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Mobile menu toggle (for future enhancement)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Form validation for registration/login (placeholder)
function validateForm(formType) {
    // This would contain actual form validation logic
    console.log(`${formType} form validation`);
    return true;
}

// Trading platform demo functions
function openDemoAccount() {
    alert('Demo account feature would redirect to registration page');
}

function startTrading() {
    alert('Live trading would redirect to platform login');
}

// Add event listeners for buttons
document.addEventListener('DOMContentLoaded', () => {
    // Register button clicks
    document.querySelectorAll('.btn-register, .btn-account').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'auth.html';
        });
    });
    
    // Login button clicks
    document.querySelectorAll('.btn-login').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'auth.html';
        });
    });
    
    // Demo account buttons
    document.querySelectorAll('.btn-secondary').forEach(btn => {
        btn.addEventListener('click', openDemoAccount);
    });
    
    // Start trading buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'auth.html';
        });
    });
});

// Real-time price updates simulation
function updatePrices() {
    const priceElements = document.querySelectorAll('.price-display');
    priceElements.forEach(element => {
        const currentPrice = parseFloat(element.textContent);
        const change = (Math.random() - 0.5) * 0.001;
        const newPrice = currentPrice + change;
        element.textContent = newPrice.toFixed(4);
        
        // Add color coding for price changes
        element.style.color = change > 0 ? '#28a745' : '#dc3545';
    });
}

// Update chart every 5 seconds
setInterval(() => {
    drawChart();
}, 5000);

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(30, 60, 114, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
        header.style.backdropFilter = 'none';
    }
});