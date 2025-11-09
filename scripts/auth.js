document.addEventListener('DOMContentLoaded', () => {
	const loginForm = document.getElementById('login-form');
	const signupForm = document.getElementById('signup-form');

	// Read role from URL ?role=patient|doctor|government
	function getQueryParam(name) {
		try { return new URLSearchParams(window.location.search).get(name); } catch (e) { return null; }
	}
	const urlRole = getQueryParam('role');

	// If we landed on signup with role in URL, preselect it
	if (signupForm && urlRole) {
		const roleSelect = document.getElementById('role');
		if (roleSelect) {
			const opt = Array.from(roleSelect.options).find(o => o.value === urlRole);
			if (opt) roleSelect.value = urlRole;
		}
		const title = document.querySelector('h1') || document.querySelector('.page-title');
		if (title) {
			title.textContent = title.textContent.replace(/\s*$/, '') + ` — ${urlRole.charAt(0).toUpperCase() + urlRole.slice(1)}`;
		}
	}

	// If we landed on login with role in URL, update the signup link to carry the role and show info
	if (loginForm && urlRole) {
		const signupAnchor = document.querySelector('a[href*="signup.html"]');
		if (signupAnchor) signupAnchor.href = `signup.html?role=${encodeURIComponent(urlRole)}`;

		try {
			const info = document.createElement('p');
			info.className = 'text-sm text-gray-600 mb-4';
			info.textContent = `Logging in as ${urlRole.charAt(0).toUpperCase() + urlRole.slice(1)}.`;
			loginForm.parentNode.insertBefore(info, loginForm);
		} catch (e) {}
	}

	// Also update login link on signup page to carry role if present
	if (signupForm && urlRole) {
		const loginAnchor = document.querySelector('a[href*="login.html"]');
		if (loginAnchor) loginAnchor.href = `login.html?role=${encodeURIComponent(urlRole)}`;
	}

	// --- Utility Functions ---

	// Function to handle redirection based on stored role
	function redirectToDashboard(role) {
		let dashboard = 'landingpage.html'; // Default to landing if unknown
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
		if (role && (window.location.pathname.endsWith('login.html') || window.location.pathname.endsWith('signup.html'))) {
			redirectToDashboard(role);
		}
	}

	// Function to handle Logout (made globally available)
	window.logout = function() {
		try {
			localStorage.removeItem('userRole');
			localStorage.removeItem('userName');
			sessionStorage.removeItem('chatMessages');
		} catch (e) {}
		window.location.href = 'landingpage.html';
	};

	// --- Login Logic ---
	if (loginForm) {
		checkAuthAndRedirect();

		loginForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const email = document.getElementById('email').value;
			const password = document.getElementById('password').value;
			const messageElement = document.getElementById('login-message');

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
