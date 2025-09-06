function showLogin() {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('registerForm').classList.remove('active');
    document.querySelectorAll('.tab-btn')[0].classList.add('active');
    document.querySelectorAll('.tab-btn')[1].classList.remove('active');
}

function showRegister() {
    document.getElementById('registerForm').classList.add('active');
    document.getElementById('loginForm').classList.remove('active');
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
    document.querySelectorAll('.tab-btn')[0].classList.remove('active');
}

function handleLogin(event) {
    event.preventDefault();
    localStorage.setItem('userLoggedIn', 'true');
    window.location.href = 'app.html';
}

function handleRegister(event) {
    event.preventDefault();
    localStorage.setItem('userLoggedIn', 'true');
    window.location.href = 'app.html';
}