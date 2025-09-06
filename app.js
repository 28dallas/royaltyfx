// Check authentication
if (!localStorage.getItem('userLoggedIn')) {
    window.location.href = 'auth.html';
}

let chart;
let currentPrice = 1.08506;
let priceHistory = [];
let activeTrades = [];

// Initialize Chart.js
function initChart() {
    const ctx = document.getElementById('tradingChart').getContext('2d');
    
    // Generate initial price history
    generateInitialData();
    
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: priceHistory.map((_, i) => ''),
            datasets: [{
                label: 'Price',
                data: priceHistory,
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
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return `Price: ${context.parsed.y.toFixed(5)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: false
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
                        },
                        callback: function(value) {
                            return value.toFixed(5);
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Generate initial price data
function generateInitialData() {
    priceHistory = [];
    let price = currentPrice;
    
    for (let i = 0; i < 50; i++) {
        const change = (Math.random() - 0.5) * 0.001;
        price += change;
        priceHistory.push(parseFloat(price.toFixed(5)));
    }
    
    currentPrice = price;
    updatePriceDisplay();
}

// Update chart with new price
function updateChart() {
    const change = (Math.random() - 0.5) * 0.0005;
    currentPrice += change;
    currentPrice = parseFloat(currentPrice.toFixed(5));
    
    priceHistory.push(currentPrice);
    
    // Keep only last 50 points
    if (priceHistory.length > 50) {
        priceHistory.shift();
    }
    
    chart.data.datasets[0].data = priceHistory;
    chart.update('none');
    
    updatePriceDisplay();
    updateActiveTrades();
}

// Update price display
function updatePriceDisplay() {
    document.getElementById('currentPrice').textContent = currentPrice.toFixed(5);
}

// Change currency pair
function changeCurrencyPair() {
    const pair = document.getElementById('currencyPair').value;
    
    switch(pair) {
        case 'EURUSD':
            currentPrice = 1.08506;
            break;
        case 'GBPUSD':
            currentPrice = 1.26450;
            break;
        case 'USDJPY':
            currentPrice = 149.250;
            break;
        case 'BTCUSD':
            currentPrice = 43250.00;
            break;
    }
    
    generateInitialData();
    chart.data.datasets[0].data = priceHistory;
    chart.update();
}

// Investment amount controls
function changeAmount(delta) {
    const input = document.getElementById('investment');
    let value = parseInt(input.value) + delta;
    if (value < 1) value = 1;
    if (value > 1000) value = 1000;
    input.value = value;
}

function setAmount(amount) {
    document.getElementById('investment').value = amount;
}

// Execute trade
function executeTrade(type) {
    const investment = document.getElementById('investment').value;
    const duration = document.getElementById('duration').value;
    const pair = document.getElementById('currencyPair').value;
    
    const trade = {
        id: Date.now(),
        type: type,
        pair: pair,
        investment: parseFloat(investment),
        duration: parseInt(duration),
        entryPrice: currentPrice,
        startTime: Date.now(),
        status: 'active'
    };
    
    activeTrades.push(trade);
    updateTradesList();
    
    // Set timer to close trade
    setTimeout(() => {
        closeTrade(trade.id);
    }, duration * 1000);
}

// Close trade and determine result
function closeTrade(tradeId) {
    const trade = activeTrades.find(t => t.id === tradeId);
    if (!trade || trade.status !== 'active') return;
    
    const exitPrice = currentPrice;
    const priceChange = exitPrice - trade.entryPrice;
    
    let isWin = false;
    if (trade.type === 'BUY' && priceChange > 0) isWin = true;
    if (trade.type === 'SELL' && priceChange < 0) isWin = true;
    
    trade.status = isWin ? 'win' : 'loss';
    trade.exitPrice = exitPrice;
    trade.payout = isWin ? trade.investment * 1.85 : 0;
    
    updateTradesList();
    
    // Update balance (simulation)
    const balanceElement = document.querySelector('.amount');
    const currentBalance = parseFloat(balanceElement.textContent.replace('$', '').replace(',', ''));
    const newBalance = currentBalance - trade.investment + trade.payout;
    balanceElement.textContent = `$${newBalance.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    
    // Remove trade after 10 seconds
    setTimeout(() => {
        activeTrades = activeTrades.filter(t => t.id !== tradeId);
        updateTradesList();
    }, 10000);
}

// Update active trades display
function updateActiveTrades() {
    activeTrades.forEach(trade => {
        if (trade.status === 'active') {
            const timeLeft = Math.max(0, trade.duration - Math.floor((Date.now() - trade.startTime) / 1000));
            trade.timeLeft = timeLeft;
        }
    });
    updateTradesList();
}

// Update trades list UI
function updateTradesList() {
    const tradesList = document.getElementById('tradesList');
    
    if (activeTrades.length === 0) {
        tradesList.innerHTML = '<p class="no-trades">No active trades</p>';
        return;
    }
    
    tradesList.innerHTML = activeTrades.map(trade => `
        <div class="trade-item">
            <div class="trade-info">
                <div class="trade-pair">${trade.pair} ${trade.type}</div>
                <div class="trade-details">
                    $${trade.investment} • Entry: ${trade.entryPrice.toFixed(5)}
                    ${trade.status === 'active' ? `• ${trade.timeLeft}s left` : ''}
                    ${trade.exitPrice ? `• Exit: ${trade.exitPrice.toFixed(5)}` : ''}
                </div>
            </div>
            <div class="trade-status ${trade.status}">
                ${trade.status === 'active' ? 'ACTIVE' : 
                  trade.status === 'win' ? `WIN +$${(trade.payout - trade.investment).toFixed(2)}` : 
                  `LOSS -$${trade.investment.toFixed(2)}`}
            </div>
        </div>
    `).join('');
}

// Logout function
function logout() {
    localStorage.removeItem('userLoggedIn');
    window.location.href = 'index.html';
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initChart();
    
    // Update chart every 2 seconds
    setInterval(updateChart, 2000);
    
    // Update active trades every second
    setInterval(updateActiveTrades, 1000);
});