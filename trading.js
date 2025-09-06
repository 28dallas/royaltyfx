let chart;
let priceData = [];
let currentPrice = 1.0850;

// Initialize chart
function initChart() {
    const ctx = document.getElementById('tradingChart').getContext('2d');
    
    // Generate initial data
    generatePriceData();
    
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: priceData.map((_, i) => ''),
            datasets: [{
                label: 'EUR/USD',
                data: priceData,
                borderColor: '#4f9cf9',
                backgroundColor: 'rgba(79, 156, 249, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.1,
                pointRadius: 0,
                pointHoverRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    display: false,
                    grid: {
                        color: 'rgba(79, 156, 249, 0.1)'
                    }
                },
                y: {
                    display: true,
                    grid: {
                        color: 'rgba(79, 156, 249, 0.1)'
                    },
                    ticks: {
                        color: '#8b8d97',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            elements: {
                point: {
                    radius: 0
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Generate realistic price data
function generatePriceData() {
    priceData = [];
    let price = currentPrice;
    
    for (let i = 0; i < 50; i++) {
        // Simulate realistic forex price movement
        const change = (Math.random() - 0.5) * 0.002;
        price += change;
        priceData.push(parseFloat(price.toFixed(5)));
    }
    
    currentPrice = price;
}

// Update chart with new data point
function updateChart() {
    // Add new price point
    const change = (Math.random() - 0.5) * 0.001;
    currentPrice += change;
    
    priceData.push(parseFloat(currentPrice.toFixed(5)));
    
    // Keep only last 50 points
    if (priceData.length > 50) {
        priceData.shift();
    }
    
    // Update chart
    chart.data.datasets[0].data = priceData;
    chart.update('none');
}

// Execute trade
function executeTrade(type) {
    const investment = document.getElementById('investment').value;
    const duration = document.getElementById('duration').value;
    const pair = document.getElementById('currencyPair').value;
    
    alert(`${type} trade executed!\nPair: ${pair}\nInvestment: $${investment}\nDuration: ${duration}s\nCurrent Price: ${currentPrice.toFixed(5)}`);
}

// Change currency pair
function changeCurrencyPair() {
    const pair = document.getElementById('currencyPair').value;
    
    // Simulate different starting prices for different pairs
    switch(pair) {
        case 'EURUSD':
            currentPrice = 1.0850;
            break;
        case 'GBPUSD':
            currentPrice = 1.2650;
            break;
        case 'USDJPY':
            currentPrice = 149.50;
            break;
    }
    
    generatePriceData();
    chart.data.datasets[0].data = priceData;
    chart.data.datasets[0].label = pair;
    chart.update();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initChart();
    
    // Update chart every 2 seconds
    setInterval(updateChart, 2000);
    
    // Add currency pair change listener
    document.getElementById('currencyPair').addEventListener('change', changeCurrencyPair);
});