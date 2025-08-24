class AuthApp {
    constructor() {
        this.currentUser = null;
        this.userAddress = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkExistingSession();
        this.checkWalletConnection();
    }

    setupEventListeners() {
        // Form switching
        const showSignup = document.getElementById('show-signup');
        const showLogin = document.getElementById('show-login');
        
        if (showSignup) {
            showSignup.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSignupForm();
            });
        }
        
        if (showLogin) {
            showLogin.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLoginForm();
            });
        }

        // Form submissions
        const loginForm = document.getElementById('login-form-element');
        const signupForm = document.getElementById('signup-form-element');
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }

        // Registration
        const premiumCheckbox = document.getElementById('premium-checkbox');
        if (premiumCheckbox) {
            premiumCheckbox.addEventListener('change', () => this.updateTotalFee());
        }
        
        const payRegisterBtn = document.getElementById('pay-register-btn');
        if (payRegisterBtn) {
            payRegisterBtn.addEventListener('click', () => this.processRegistration());
        }
        
        const skipRegistration = document.getElementById('skip-registration');
        if (skipRegistration) {
            skipRegistration.addEventListener('click', () => this.skipRegistration());
        }

        // Wallet connection
        const connectWallet = document.getElementById('connect-wallet');
        if (connectWallet) {
            connectWallet.addEventListener('click', () => this.connectWallet());
        }
    }

    showLoginForm() {
        document.getElementById('signup-form').classList.remove('active');
        document.getElementById('login-form').classList.add('active');
        document.getElementById('registration-screen').classList.remove('active');
    }

    showSignupForm() {
        document.getElementById('login-form').classList.remove('active');
        document.getElementById('signup-form').classList.add('active');
        document.getElementById('registration-screen').classList.remove('active');
    }

    showRegistrationScreen() {
        document.getElementById('login-form').classList.remove('active');
        document.getElementById('signup-form').classList.remove('active');
        document.getElementById('registration-screen').classList.add('active');
        
        // Update fee display based on user role
        if (this.currentUser) {
            const baseFee = this.currentUser.role === 'job-host' ? 100 : 50;
            document.getElementById('base-fee').textContent = `${baseFee} BBE`;
            this.updateTotalFee();
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('bbeUsers') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) {
                this.showNotification('Invalid email or password', 'error');
                return;
            }

            // Set current user
            this.currentUser = user;
            localStorage.setItem('bbeCurrentUser', JSON.stringify(user));

            this.showNotification('Login successful!', 'success');
            
            // Check if user needs to complete registration
            if (!user.registered) {
                setTimeout(() => {
                    this.showRegistrationScreen();
                }, 1500);
            } else {
                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    window.location.href = 'dashboard';
                }, 1500);
            }

        } catch (error) {
            console.error('Login error:', error);
            this.showNotification('Login failed. Please try again.', 'error');
        }
    }

    async handleSignup(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const roleInput = document.querySelector('input[name="user-role"]:checked');

        if (!roleInput) {
            this.showNotification('Please select a role', 'error');
            return;
        }

        const role = roleInput.value;

        try {
            // Get existing users
            const users = JSON.parse(localStorage.getItem('bbeUsers') || '[]');

            // Check if email already exists
            if (users.some(u => u.email === email)) {
                this.showNotification('Email already registered', 'error');
                return;
            }

            // Create new user
            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                password, // In production, this would be hashed
                role,
                registered: false,
                hasPremium: false,
                registrationFee: 0,
                memberSince: new Date().toISOString(),
                bio: '',
                skills: '',
                completedJobs: 0,
                totalEarnings: 0
            };

            // Save user
            users.push(newUser);
            localStorage.setItem('bbeUsers', JSON.stringify(users));

            // Set current user
            this.currentUser = newUser;
            localStorage.setItem('bbeCurrentUser', JSON.stringify(newUser));

            this.showNotification('Account created successfully!', 'success');
            
            // Show registration screen
            setTimeout(() => {
                this.showRegistrationScreen();
            }, 1000);

        } catch (error) {
            console.error('Signup error:', error);
            this.showNotification('Registration failed. Please try again.', 'error');
        }
    }

    updateTotalFee() {
        if (!this.currentUser) return;
        
        const baseFee = this.currentUser.role === 'job-host' ? 100 : 50;
        const premiumFee = document.getElementById('premium-checkbox').checked ? 100 : 0;
        const totalFee = baseFee + premiumFee;
        
        document.getElementById('total-fee').textContent = `${totalFee} BBE`;
    }

    async processRegistration() {
        if (!this.currentUser) {
            this.showNotification('No user session found', 'error');
            return;
        }

        const baseFee = this.currentUser.role === 'job-host' ? 100 : 50;
        const premiumSelected = document.getElementById('premium-checkbox').checked;
        const totalFee = baseFee + (premiumSelected ? 100 : 0);

        // Mock balance check
        const currentBalance = 1000; // Mock balance
        
        if (currentBalance < totalFee) {
            this.showNotification('Insufficient BBE balance', 'error');
            return;
        }

        try {
            // Update user data
            this.currentUser.registered = true;
            this.currentUser.hasPremium = premiumSelected;
            this.currentUser.registrationFee = totalFee;

            // Save updated user data
            const users = JSON.parse(localStorage.getItem('bbeUsers') || '[]');
            const userIndex = users.findIndex(u => u.id === this.currentUser.id);
            if (userIndex !== -1) {
                users[userIndex] = this.currentUser;
                localStorage.setItem('bbeUsers', JSON.stringify(users));
            }
            localStorage.setItem('bbeCurrentUser', JSON.stringify(this.currentUser));

            this.showNotification('Registration completed successfully!', 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard';
            }, 2000);

        } catch (error) {
            console.error('Registration error:', error);
            this.showNotification('Registration failed. Please try again.', 'error');
        }
    }

    skipRegistration() {
        if (!this.currentUser) {
            this.showNotification('No user session found', 'error');
            return;
        }

        // Update user with limited access
        this.currentUser.registered = false;
        this.currentUser.hasPremium = false;
        this.currentUser.registrationFee = 0;

        // Save updated user data
        const users = JSON.parse(localStorage.getItem('bbeUsers') || '[]');
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = this.currentUser;
            localStorage.setItem('bbeUsers', JSON.stringify(users));
        }
        localStorage.setItem('bbeCurrentUser', JSON.stringify(this.currentUser));

        this.showNotification('Registration skipped. Limited features available.', 'warning');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard';
        }, 2000);
    }

    async connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ 
                    method: 'eth_requestAccounts' 
                });
                
                if (accounts.length > 0) {
                    this.userAddress = accounts[0];
                    this.updateWalletDisplay();
                    this.showNotification('Wallet connected successfully!', 'success');
                } else {
                    this.showNotification('No accounts found', 'error');
                }
            } catch (error) {
                console.error('Wallet connection error:', error);
                if (error.code === 4001) {
                    this.showNotification('Wallet connection rejected', 'error');
                } else {
                    this.showNotification('Failed to connect wallet', 'error');
                }
            }
        } else {
            this.showNotification('MetaMask not detected. Please install MetaMask.', 'error');
        }
    }

    updateWalletDisplay() {
        const walletAddressElement = document.getElementById('wallet-address');
        const connectWalletBtn = document.getElementById('connect-wallet');
        const bbeBalanceElement = document.getElementById('bbe-balance');
        
        if (this.userAddress) {
            const shortAddress = `${this.userAddress.slice(0, 6)}...${this.userAddress.slice(-4)}`;
            if (walletAddressElement) {
                walletAddressElement.textContent = shortAddress;
            }
            if (connectWalletBtn) {
                connectWalletBtn.innerHTML = '<i class="fas fa-check"></i> Connected';
                connectWalletBtn.disabled = true;
                connectWalletBtn.classList.add('btn-success');
            }
            if (bbeBalanceElement) {
                bbeBalanceElement.textContent = '1000 BBE'; // Mock balance
            }
        }
    }

    async checkWalletConnection() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    this.userAddress = accounts[0];
                    this.updateWalletDisplay();
                }
            } catch (error) {
                console.error('Error checking wallet connection:', error);
            }
        }
    }

    checkExistingSession() {
        try {
            const savedUser = localStorage.getItem('bbeCurrentUser');
            if (savedUser) {
                this.currentUser = JSON.parse(savedUser);
                // If user is already registered, redirect to dashboard
                if (this.currentUser.registered) {
                    window.location.href = 'dashboard';
                } else {
                    // Show registration screen for unregistered users
                    this.showRegistrationScreen();
                }
            }
        } catch (error) {
            console.error('Error checking session:', error);
            localStorage.removeItem('bbeCurrentUser');
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const icon = notification.querySelector('.notification-icon');
        const messageElement = notification.querySelector('.notification-message');
        
        // Set icon based on type
        let iconClass = 'fas fa-check-circle';
        if (type === 'error') {
            iconClass = 'fas fa-exclamation-circle';
        } else if (type === 'warning') {
            iconClass = 'fas fa-exclamation-triangle';
        }
        
        icon.className = `notification-icon ${iconClass}`;
        messageElement.textContent = message;
        
        // Set notification type class
        notification.className = `notification ${type}`;
        
        // Show notification
        notification.classList.add('show');
        
        // Hide after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthApp();
});

// Add success button style
const style = document.createElement('style');
style.textContent = `
    .btn-success {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
        color: white !important;
        cursor: default !important;
    }
    
    .btn-success:hover {
        transform: none !important;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3) !important;
    }
`;
document.head.appendChild(style);