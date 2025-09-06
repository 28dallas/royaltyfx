if (!localStorage.getItem('userLoggedIn')) {
    window.location.href = 'auth.html';
}

function drawChart() {
    const canvas = document.getElementById('chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Generate realistic EUR/USD price data
    const points = 150;
    const data = [];
    let price = 1.08506;
    
    for (let i = 0; i < points; i++) {
        price += (Math.random() - 0.52) * 0.001;
        data.push(price);
    }
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(79, 156, 249, 0.1)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 12; i++) {
        const x = (width / 12) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    for (let i = 0; i <= 8; i++) {
        const y = (height / 8) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    // Draw filled area chart
    ctx.strokeStyle = '#4f9cf9';
    ctx.fillStyle = 'rgba(79, 156, 249, 0.3)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const minPrice = Math.min(...data);
    const maxPrice = Math.max(...data);
    const priceRange = maxPrice - minPrice || 0.001;
    
    // Start from bottom left
    ctx.moveTo(0, height);
    
    data.forEach((price, index) => {
        const x = (width / (points - 1)) * index;
        const y = height - ((price - minPrice) / priceRange) * height * 0.8 - height * 0.1;
        
        if (index === 0) {
            ctx.lineTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    // Close the path to bottom right
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();
    
    // Draw the line on top
    ctx.beginPath();
    data.forEach((price, index) => {
        const x = (width / (points - 1)) * index;
        const y = height - ((price - minPrice) / priceRange) * height * 0.8 - height * 0.1;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Add current price dot
    const lastX = width - (width / (points - 1));
    const lastY = height - ((data[data.length - 1] - minPrice) / priceRange) * height * 0.8 - height * 0.1;
    
    ctx.fillStyle = '#4f9cf9';
    ctx.beginPath();
    ctx.arc(lastX, lastY, 6, 0, 2 * Math.PI);
    ctx.fill();
}

let timeLeft = 5;
function updateTimer() {
    const timerElement = document.querySelector('.timer');
    if (timerElement) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}<br><span>deal duration</span>`;
        
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            timeLeft = 5;
        }
    }
}

function executeTrade(type) {
    alert(`${type} trade executed for $1`);
}

document.addEventListener('DOMContentLoaded', () => {
    drawChart();
    
    setInterval(drawChart, 2000);
    setInterval(updateTimer, 1000);
    
    document.querySelector('.sell-btn').addEventListener('click', () => executeTrade('SELL'));
    document.querySelector('.buy-btn').addEventListener('click', () => executeTrade('BUY'));
});