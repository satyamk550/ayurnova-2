// scripts/auth.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    // --- Utility Functions ---

    // Function to handle redirection based on stored role
    function redirectToDashboard(role) {
        let dashboard = 'index.html'; // Default
        switch (role) {
            case 'patient':
                dashboard = 'patient-dashboard.html';
                break;
            case 'doctor':
                dashboard = 'doctor-dashboard.html';
                break;
            case 'government':
                dashboard = 'government-dashboard.html';
                break;
        }
        window.location.href = dashboard;
    }

    // Function to check and apply redirection if a role is already set
    function checkAuthAndRedirect() {
        const role = localStorage.getItem('userRole');
        // Only redirect if a role is present and we're on the auth pages
        if (role && (window.location.pathname.endsWith('login.html') || window.location.pathname.endsWith('signup.html'))) {
            redirectToDashboard(role);
        }
    }

    // Function to handle Logout (made globally available)
    window.logout = function() {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        // Clear chat history for the user upon logout
        sessionStorage.removeItem('chatMessages'); 
        window.location.href = 'index.html';
    };

    // --- Login Logic ---
    if (loginForm) {
        checkAuthAndRedirect(); // Check if already logged in

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const messageElement = document.getElementById('login-message');

            // ⚠️ Demo Logic: Simulate a successful login with a role-based redirection.
            let role = null;
            let userName = 'User';

            if (email.toLowerCase().startsWith('patient') && password === 'password') {
                role = 'patient';
                userName = 'Priya Sharma';
            } else if (email.toLowerCase().startsWith('doctor') && password === 'password') {
                role = 'doctor';
                userName = 'Dr. Rohan Kumar';
            } else if (email.toLowerCase().startsWith('govt') && password === 'password') {
                role = 'government';
                userName = 'Auditor General';
            } else {
                messageElement.textContent = 'Invalid credentials or demo user not recognized.';
                messageElement.classList.remove('hidden', 'text-[#2e7d32]');
                messageElement.classList.add('text-red-500');
                return;
            }

            // Success: Store role and redirect
            localStorage.setItem('userRole', role);
            localStorage.setItem('userName', userName);
            messageElement.textContent = 'Login successful! Redirecting...';
            messageElement.classList.remove('text-red-500', 'hidden');
            messageElement.classList.add('text-[#2e7d32]');
            
            setTimeout(() => {
                redirectToDashboard(role);
            }, 500);
        });
    }

    // --- Signup Logic ---
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('full-name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            const messageElement = document.getElementById('signup-message');

            // Basic Validation
            if (!fullName || !email || !password || !role) {
                messageElement.textContent = 'Please fill out all fields.';
                messageElement.classList.remove('hidden', 'text-[#2e7d32]');
                messageElement.classList.add('text-red-500');
                return;
            }
            if (password.length < 8) {
                messageElement.textContent = 'Password must be at least 8 characters.';
                messageElement.classList.remove('hidden', 'text-[#2e7d32]');
                messageElement.classList.add('text-red-500');
                return;
            }
            
            // Success: Store role and redirect
            localStorage.setItem('userRole', role);
            localStorage.setItem('userName', fullName); 
            
            messageElement.textContent = 'Signup successful! Redirecting to your dashboard...';
            messageElement.classList.remove('text-red-500', 'hidden');
            messageElement.classList.add('text-[#2e7d32]');
            
            setTimeout(() => {
                redirectToDashboard(role);
            }, 500);
        });
    }
});