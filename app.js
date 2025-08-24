// BaseBridge App - Core JavaScript
// Web3 Integration for Base Testnet with Authentication

class BaseBridgeApp {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.userAddress = null;
        this.currentUser = null;
        this.bbeContract = null;
        this.jobContract = null;
        this.jobs = [];
        this.userApplications = [];
        this.currentScreen = 'auth';
        
        // Base Testnet Configuration
        this.baseTestnetConfig = {
            chainId: '0x14A34', // Base Sepolia testnet
            chainName: 'Base Sepolia',
            nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: ['https://sepolia.base.org'],
            blockExplorerUrls: ['https://sepolia-explorer.base.org']
        };
        
        // Contract addresses (these would be deployed contracts)
        this.contractAddresses = {
            BBE_TOKEN: '0x6b50B2d51bd440347675D01ca91F57F555A097e5', // Example address
            JOB_MANAGER: '0x1234567890123456789012345678901234567890' // Example address
        };
        
        this.init();
    }
    
    async init() {
        this.setupEventListeners();
        this.loadMockData();
        this.checkExistingSession();
        await this.checkWalletConnection();
    }
    
    setupEventListeners() {
        // Authentication
        document.getElementById('show-signup').addEventListener('click', () => this.showSignupForm());
        document.getElementById('show-login').addEventListener('click', () => this.showLoginForm());
        document.getElementById('login-form-element').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('signup-form-element').addEventListener('submit', (e) => this.handleSignup(e));
        document.getElementById('logout-btn').addEventListener('click', () => this.logout());
        
        // Registration
        const premiumCheckbox = document.getElementById('premium-checkbox');
        if (premiumCheckbox) {
            premiumCheckbox.addEventListener('change', () => this.updateTotalFee());
        }
        
        const skipRegistration = document.getElementById('skip-registration');
        if (skipRegistration) {
            skipRegistration.addEventListener('click', () => this.skipRegistration());
        }
        
        const payRegisterBtn = document.getElementById('pay-register-btn');
        if (payRegisterBtn) {
            payRegisterBtn.addEventListener('click', () => this.processRegistration());
        }
        
        // Legacy staking elements (if they exist)
        const stakeAmount = document.getElementById('stake-amount');
        if (stakeAmount) {
            stakeAmount.addEventListener('input', () => this.updateStakePreview());
        }
        
        const stakePeriod = document.getElementById('stake-period');
        if (stakePeriod) {
            stakePeriod.addEventListener('change', () => this.updateStakePreview());
        }
        
        const stakingForm = document.getElementById('staking-form-element');
        if (stakingForm) {
            stakingForm.addEventListener('submit', (e) => this.handleStaking(e));
        }
        
        const skipStaking = document.getElementById('skip-staking');
        if (skipStaking) {
            skipStaking.addEventListener('click', () => this.skipStaking());
        }
        
        // Profile management
        const editProfileBtn = document.getElementById('edit-profile-btn');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => this.openModal('profile-modal'));
        }
        
        const manageStakeBtn = document.getElementById('manage-stake-btn');
        if (manageStakeBtn) {
            manageStakeBtn.addEventListener('click', () => this.openModal('stake-modal'));
        }
        
        const profileForm = document.getElementById('profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => this.handleProfileUpdate(e));
        }
        
        // Wallet connection
        const connectWallet = document.getElementById('connect-wallet');
        if (connectWallet) {
            connectWallet.addEventListener('click', () => this.connectWallet());
        }
        
        // Job management
        const postJobBtn = document.getElementById('post-job-btn');
        if (postJobBtn) {
            postJobBtn.addEventListener('click', () => this.openPostJobModal());
        }
        
        const postJobForm = document.getElementById('post-job-form');
        if (postJobForm) {
            postJobForm.addEventListener('submit', (e) => this.handlePostJob(e));
        }
        
        const browseJobsBtn = document.getElementById('browse-jobs-btn');
        if (browseJobsBtn) {
            browseJobsBtn.addEventListener('click', () => this.browseJobs());
        }
        
        const myApplicationsBtn = document.getElementById('my-applications-btn');
        if (myApplicationsBtn) {
            myApplicationsBtn.addEventListener('click', () => this.showMyApplications());
        }
        
        const myJobsBtn = document.getElementById('my-jobs-btn');
        if (myJobsBtn) {
            myJobsBtn.addEventListener('click', () => this.showMyJobs());
        }
        
        const applyJobForm = document.getElementById('apply-job-form');
        if (applyJobForm) {
            applyJobForm.addEventListener('submit', (e) => this.handleApplyJob(e));
        }
    }
    
    async checkWalletConnection() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    await this.connectWallet();
                }
            } catch (error) {
                console.error('Error checking wallet connection:', error);
            }
        }
    }
    
    // Authentication Methods
    showLoginForm() {
        document.getElementById('signup-form').classList.add('hidden');
        document.getElementById('login-form').classList.remove('hidden');
    }
    
    showSignupForm() {
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('signup-form').classList.remove('hidden');
    }
    
    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        try {
            // In a real app, this would be an API call to authenticate
            // For demo purposes, we'll use localStorage
            const users = JSON.parse(localStorage.getItem('bbeUsers') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            
            if (!user) {
                alert('Invalid email or password');
                return;
            }
            
            // Set current user and save to session
            this.currentUser = user;
            localStorage.setItem('bbeCurrentUser', JSON.stringify(user));
            
            // Check if user is a job host and needs staking
            if (user.role === 'job-host' && !user.hasStaked) {
                this.showStakingScreen();
            } else {
                this.showMainApp();
            }
            
            console.log('User logged in:', user.name);
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    }
    
    async handleSignup(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const roleInput = document.querySelector('input[name="user-role"]:checked');
        
        if (!roleInput) {
            alert('Please select a role');
            return;
        }
        
        const role = roleInput.value;
        
        try {
            // In a real app, this would be an API call to register
            // For demo purposes, we'll use localStorage
            const users = JSON.parse(localStorage.getItem('bbeUsers') || '[]');
            
            // Check if email already exists
            if (users.some(u => u.email === email)) {
                alert('Email already registered');
                return;
            }
            
            // Create new user
            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                password, // In a real app, this would be hashed
                role,
                hasStaked: false,
                stakeAmount: 0,
                stakeUnlockDate: null,
                memberSince: new Date().toISOString(),
                bio: '',
                skills: ''
            };
            
            // Save user
            users.push(newUser);
            localStorage.setItem('bbeUsers', JSON.stringify(users));
            
            // Set current user and save to session
            this.currentUser = newUser;
            localStorage.setItem('bbeCurrentUser', JSON.stringify(newUser));
            
            // If job host, show staking screen
            if (role === 'job-host') {
                this.showStakingScreen();
            } else {
                this.showMainApp();
            }
            
            console.log('User registered:', newUser.name);
        } catch (error) {
            console.error('Signup error:', error);
            alert('Registration failed. Please try again.');
        }
    }
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('bbeCurrentUser');
        this.showAuthScreen();
        console.log('User logged out');
    }
    
    checkExistingSession() {
        try {
            const savedUser = localStorage.getItem('bbeCurrentUser');
            if (savedUser) {
                this.currentUser = JSON.parse(savedUser);
                
                // Check if user is a job host and needs staking
                if (this.currentUser.role === 'job-host' && !this.currentUser.hasStaked) {
                    this.showStakingScreen();
                } else {
                    this.showMainApp();
                }
                
                console.log('Session restored for:', this.currentUser.name);
            }
        } catch (error) {
            console.error('Error checking session:', error);
            // If there's an error, clear the session
            localStorage.removeItem('bbeCurrentUser');
        }
    }
    
    // Screen Management
    showAuthScreen() {
        document.getElementById('auth-screen').classList.remove('hidden');
        document.getElementById('staking-screen').classList.add('hidden');
        document.getElementById('main-app').classList.add('hidden');
        this.currentScreen = 'auth';
    }
    
    showStakingScreen() {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('staking-screen').classList.remove('hidden');
        document.getElementById('main-app').classList.add('hidden');
        this.currentScreen = 'staking';
        
        // Update staking balance display
        document.getElementById('staking-balance').textContent = '1000'; // Mock balance
    }
    
    showMainApp() {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('staking-screen').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        this.currentScreen = 'main';
        
        // Update UI based on user role
        this.updateUIForUserRole();
    }
    
    // Registration Methods
    selectRole(role) {
        this.currentUser.role = role;
        
        // Update UI based on role
        document.getElementById('role-selection').style.display = 'none';
        
        // Show registration/payment screen for both roles
        this.showRegistrationScreen(role);
        
        this.showNotification(`Selected role: ${role === 'job-host' ? 'Project Owner' : 'Jobber'}. Please complete registration.`, 'info');
    }
    
    showRegistrationScreen(role) {
        // Update registration fee based on role
        const registrationFee = role === 'job-host' ? 100 : 50;
        document.getElementById('registration-fee').textContent = `${registrationFee} BBE`;
        
        // Update fee description
        const feeDescription = role === 'job-host' ? 
            'One-time payment to register as a Project Owner' : 
            'One-time payment to register as a Jobber';
        document.querySelector('.fee-card p').textContent = feeDescription;
        
        // Show premium option only for jobbers
        const premiumOption = document.getElementById('premium-option');
        if (role === 'jobber') {
            premiumOption.style.display = 'block';
        } else {
            premiumOption.style.display = 'none';
        }
        
        // Update total fee
        this.updateTotalFee();
        
        // Show staking screen (now registration screen)
        this.showScreen('staking');
        
        // Update balance display
        document.getElementById('registration-balance').textContent = '1000'; // Mock balance
    }
    
    updateTotalFee() {
        const baseFee = this.currentUser.role === 'job-host' ? 100 : 50;
        const premiumFee = document.getElementById('premium-checkbox').checked ? 100 : 0;
        const total = baseFee + premiumFee;
        
        document.getElementById('total-fee').textContent = `${total} BBE`;
    }
    
    processRegistration() {
        const baseFee = this.currentUser.role === 'job-host' ? 100 : 50;
        const premiumSelected = document.getElementById('premium-checkbox').checked;
        const premiumFee = premiumSelected ? 100 : 0;
        const totalFee = baseFee + premiumFee;
        
        // Mock balance check
        const currentBalance = 1000;
        if (currentBalance < totalFee) {
            this.showNotification('Insufficient BBE balance for registration', 'error');
            return;
        }
        
        // Process payment (mock)
        this.showNotification('Processing payment...', 'info');
        
        setTimeout(() => {
            // Update user data
            this.currentUser.registered = true;
            this.currentUser.registrationFee = baseFee;
            this.currentUser.hasPremium = premiumSelected;
            this.currentUser.registrationDate = new Date().toISOString();
            
            // Save to localStorage
            localStorage.setItem('bbeUser', JSON.stringify(this.currentUser));
            
            // Show success and proceed to main app
            const roleText = this.currentUser.role === 'job-host' ? 'Project Owner' : 'Jobber';
            const premiumText = premiumSelected ? ' with Premium Badge' : '';
            
            this.showNotification(`Registration successful! Welcome ${roleText}${premiumText}`, 'success');
            
            // Go to main app
            this.showScreen('main');
            this.loadUserData();
        }, 2000);
    }
    
    skipRegistration() {
        // Allow user to skip registration but with limited features
        this.currentUser.registered = false;
        this.currentUser.hasPremium = false;
        
        // Save to localStorage
        localStorage.setItem('bbeUser', JSON.stringify(this.currentUser));
        
        this.showNotification('Registration skipped. Some features may be limited.', 'warning');
        
        // Go to main app
        this.showScreen('main');
        this.loadUserData();
    }
    
    // Staking Methods
    updateStakePreview() {
        const amount = parseFloat(document.getElementById('stake-amount').value) || 0;
        const periodSelect = document.getElementById('stake-period');
        const period = periodSelect.value ? parseInt(periodSelect.value) : 0;
        
        let bonusPercentage = 0;
        switch(period) {
            case 1: bonusPercentage = 5; break;
            case 3: bonusPercentage = 15; break;
            case 6: bonusPercentage = 35; break;
            case 12: bonusPercentage = 75; break;
        }
        
        const bonus = amount * (bonusPercentage / 100);
        const total = amount + bonus;
        
        document.getElementById('preview-amount').textContent = `${amount} BBE`;
        document.getElementById('preview-bonus').textContent = `${bonus} BBE (${bonusPercentage}%)`;
        document.getElementById('preview-total').textContent = `${total} BBE`;
    }
    
    async handleStaking(e) {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('stake-amount').value);
        const period = parseInt(document.getElementById('stake-period').value);
        
        if (isNaN(amount) || amount < 100) {
            alert('Please stake at least 100 BBE tokens');
            return;
        }
        
        if (isNaN(period) || period <= 0) {
            alert('Please select a staking period');
            return;
        }
        
        try {
            // In a real app, this would interact with a smart contract
            // For demo purposes, we'll update the user object
            
            // Calculate unlock date
            const unlockDate = new Date();
            unlockDate.setMonth(unlockDate.getMonth() + period);
            
            // Update user
            this.currentUser.hasStaked = true;
            this.currentUser.stakeAmount = amount;
            this.currentUser.stakeUnlockDate = unlockDate.toISOString();
            
            // Save updated user
            localStorage.setItem('bbeCurrentUser', JSON.stringify(this.currentUser));
            
            // Update users array
            const users = JSON.parse(localStorage.getItem('bbeUsers') || '[]');
            const userIndex = users.findIndex(u => u.id === this.currentUser.id);
            if (userIndex !== -1) {
                users[userIndex] = this.currentUser;
                localStorage.setItem('bbeUsers', JSON.stringify(users));
            }
            
            alert(`Successfully staked ${amount} BBE for ${period} month${period > 1 ? 's' : ''}`);
            this.showMainApp();
        } catch (error) {
            console.error('Staking error:', error);
            alert('Failed to stake tokens. Please try again.');
        }
    }
    
    skipStaking() {
        // Mark that user has seen staking screen
        this.currentUser.hasStaked = true;
        this.currentUser.stakeAmount = 0;
        
        // Save updated user
        localStorage.setItem('bbeCurrentUser', JSON.stringify(this.currentUser));
        
        // Update users array
        const users = JSON.parse(localStorage.getItem('bbeUsers') || '[]');
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = this.currentUser;
            localStorage.setItem('bbeUsers', JSON.stringify(users));
        }
        
        this.showMainApp();
    }
    
    // Profile Management
    handleProfileUpdate(e) {
        e.preventDefault();
        const name = document.getElementById('profile-name-input').value;
        const bio = document.getElementById('profile-bio').value;
        const skills = document.getElementById('profile-skills').value;
        
        // Update user
        this.currentUser.name = name;
        this.currentUser.bio = bio;
        this.currentUser.skills = skills;
        
        // Save updated user
        localStorage.setItem('bbeCurrentUser', JSON.stringify(this.currentUser));
        
        // Update users array
        const users = JSON.parse(localStorage.getItem('bbeUsers') || '[]');
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = this.currentUser;
            localStorage.setItem('bbeUsers', JSON.stringify(users));
        }
        
        // Update UI
        this.updateUIForUserRole();
        
        // Close modal
        this.closeModal('profile-modal');
        alert('Profile updated successfully');
    }
    
    updateUIForUserRole() {
        if (!this.currentUser) return;
        
        // Update profile info
        document.getElementById('profile-name').textContent = this.currentUser.name;
        document.getElementById('profile-role').textContent = this.currentUser.role === 'job-host' ? 'Project Owner' : 'Jobber';
        document.getElementById('user-name').textContent = this.currentUser.name;
        document.getElementById('user-role').textContent = this.currentUser.role === 'job-host' ? 'Project Owner' : 'Jobber';
        
        // Format date for display
        const memberDate = new Date(this.currentUser.memberSince);
        const formattedDate = memberDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        document.getElementById('member-since').textContent = formattedDate;
        
        // Update registration status
        const registrationStatus = this.currentUser.registered ? 'Registered' : 'Not Registered';
        if (document.getElementById('profile-registration')) {
            document.getElementById('profile-registration').textContent = registrationStatus;
        }
        
        // Show registration fee if paid
        if (this.currentUser.registered && this.currentUser.registrationFee) {
            const regFeeElement = document.getElementById('registration-fee-item');
            if (regFeeElement) {
                regFeeElement.style.display = 'block';
                document.getElementById('profile-reg-fee').textContent = `${this.currentUser.registrationFee} BBE`;
            }
        }
        
        // Update badges
        this.updateProfileBadges();
        
        // Show/hide role-specific elements
        if (this.currentUser.role === 'job-host') {
            document.getElementById('post-job-btn').style.display = 'block';
            document.getElementById('my-jobs-btn').style.display = 'block';
            document.getElementById('stake-info').style.display = 'block';
            document.getElementById('manage-stake-btn').style.display = 'block';
            document.getElementById('staked-amount').textContent = `${this.currentUser.stakeAmount} BBE`;
            
            // Update stake modal info if user has staked
            if (this.currentUser.stakeAmount > 0) {
                document.getElementById('current-stake').textContent = `${this.currentUser.stakeAmount} BBE`;
                
                const unlockDate = new Date(this.currentUser.stakeUnlockDate);
                document.getElementById('unlock-date').textContent = unlockDate.toLocaleDateString();
                
                // Calculate earned bonus (mock calculation)
                const bonusPercentage = 15; // Example percentage
                const earnedBonus = this.currentUser.stakeAmount * (bonusPercentage / 100);
                document.getElementById('earned-bonus').textContent = `${earnedBonus} BBE`;
                
                // Enable/disable withdraw button based on unlock date
                const now = new Date();
                document.getElementById('withdraw-stake-btn').disabled = now < unlockDate;
            }
        } else {
            document.getElementById('post-job-btn').style.display = 'none';
            document.getElementById('my-jobs-btn').style.display = 'none';
            document.getElementById('stake-info').style.display = 'none';
            document.getElementById('manage-stake-btn').style.display = 'none';
        }
        
        // Show user profile
        document.getElementById('user-profile').classList.remove('hidden');
        document.getElementById('user-profile').classList.add('flex');
    }
    
    updateProfileBadges() {
        const badgesContainer = document.getElementById('profile-badges');
        if (!badgesContainer) return;
        
        badgesContainer.innerHTML = '';
        
        if (!this.currentUser) return;
        
        // Add registered badge
        if (this.currentUser.registered) {
            const registeredBadge = document.createElement('span');
            registeredBadge.className = 'badge registered';
            registeredBadge.innerHTML = '<i class="fas fa-check-circle"></i>Registered';
            badgesContainer.appendChild(registeredBadge);
        }
        
        // Add premium badge
        if (this.currentUser.hasPremium) {
            const premiumBadge = document.createElement('span');
            premiumBadge.className = 'badge premium';
            premiumBadge.innerHTML = '<i class="fas fa-crown"></i>Premium';
            badgesContainer.appendChild(premiumBadge);
        }
        
        // Add verified badge for job hosts with stakes
        if (this.currentUser.role === 'job-host' && this.currentUser.stakeAmount) {
            const verifiedBadge = document.createElement('span');
            verifiedBadge.className = 'badge verified';
            verifiedBadge.innerHTML = '<i class="fas fa-shield-alt"></i>Verified';
            badgesContainer.appendChild(verifiedBadge);
        }
    }
    
    // Wallet Connection
    async connectWallet() {
        if (typeof window.ethereum === 'undefined') {
            alert('Please install MetaMask to use this application!');
            return;
        }
        
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Switch to Base testnet
            await this.switchToBaseTestnet();
            
            // Initialize provider and signer
            this.provider = new ethers.providers.Web3Provider(window.ethereum);
            this.signer = this.provider.getSigner();
            this.userAddress = await this.signer.getAddress();
            
            // Update UI
            this.updateWalletStatus(true);
            
            // Load user data
            await this.loadUserData();
            
            console.log('Wallet connected:', this.userAddress);
        } catch (error) {
            console.error('Error connecting wallet:', error);
            this.showNotification('Failed to connect wallet', 'error');
        }
    }
    
    async switchToBaseTestnet() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: this.baseTestnetConfig.chainId }]
            });
        } catch (switchError) {
            // Chain not added, try to add it
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [this.baseTestnetConfig]
                    });
                } catch (addError) {
                    throw new Error('Failed to add Base testnet to wallet');
                }
            } else {
                throw switchError;
            }
        }
    }
    
    updateWalletStatus(connected) {
        const statusElement = document.getElementById('wallet-status');
        const textElement = document.getElementById('wallet-text');
        const connectButton = document.getElementById('connect-wallet');
        
        if (connected) {
            statusElement.className = 'wallet-status connected';
            textElement.textContent = `${this.userAddress.slice(0, 6)}...${this.userAddress.slice(-4)}`;
            connectButton.textContent = 'Connected';
            connectButton.disabled = true;
            
            // Update BBE balance in UI
            document.getElementById('bbe-balance').textContent = '1000'; // Mock balance
        } else {
            statusElement.className = 'wallet-status disconnected';
            textElement.textContent = 'Connect Wallet';
            connectButton.textContent = 'Connect Wallet';
            connectButton.disabled = false;
        }
    }
    
    async loadUserData() {
        try {
            // Load BBE balance (mock for now)
            const balance = await this.getBBEBalance();
            document.getElementById('bbe-balance').textContent = balance;
            
            // Update stats
            this.updateStats();
            
            // Render appropriate jobs view based on user role
            if (this.currentUser && this.currentUser.role === 'job-host') {
                this.renderPostedJobs();
            } else {
                this.renderAvailableJobs();
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }
    
    async getBBEBalance() {
        // Mock BBE balance - in real implementation, this would query the contract
        return Math.floor(Math.random() * 1000) + 100;
    }
    
    loadMockData() {
        // Initialize jobs data if not in localStorage
        if (!localStorage.getItem('bbeJobs')) {
            const mockJobs = [
                {
                    id: 1,
                    title: 'Smart Contract Developer',
                    description: 'Develop and deploy smart contracts for DeFi protocol',
                    budget: 500,
                    deadline: '2024-02-15',
                    skills: ['Solidity', 'Web3', 'DeFi'],
                    status: 'open',
                    poster: '0x1234...5678',
                    posterName: 'DeFi Builder',
                    applications: []
                },
                {
                    id: 2,
                    title: 'Frontend Developer',
                    description: 'Build responsive React frontend for Web3 application',
                    budget: 300,
                    deadline: '2024-02-20',
                    skills: ['React', 'Web3.js', 'Tailwind'],
                    status: 'open',
                    poster: '0x9876...4321',
                    posterName: 'Web3 Startup',
                    applications: []
                },
                {
                    id: 3,
                    title: 'Blockchain Auditor',
                    description: 'Security audit for smart contract system',
                    budget: 800,
                    deadline: '2024-02-25',
                    skills: ['Security', 'Solidity', 'Auditing'],
                    status: 'in-progress',
                    poster: '0x5555...6666',
                    posterName: 'Security Firm',
                    applications: []
                }
            ];
            localStorage.setItem('bbeJobs', JSON.stringify(mockJobs));
        }
        
        // Load jobs from localStorage
        this.jobs = JSON.parse(localStorage.getItem('bbeJobs') || '[]');
        
        // Initialize applications if not in localStorage
        if (!localStorage.getItem('bbeApplications')) {
            localStorage.setItem('bbeApplications', JSON.stringify([]));
        }
        
        // Load applications from localStorage
        this.userApplications = JSON.parse(localStorage.getItem('bbeApplications') || '[]');
        
        this.renderAvailableJobs();
        this.updateStats();
    }
    
    updateStats() {
        const userJobs = this.jobs.filter(job => job.poster === this.userAddress);
        const activeJobs = userJobs.filter(job => job.status === 'open' || job.status === 'in-progress');
        const completedJobs = userJobs.filter(job => job.status === 'completed');
        
        document.getElementById('active-jobs').textContent = activeJobs.length;
        document.getElementById('applications').textContent = this.userApplications.length;
        document.getElementById('completed-jobs').textContent = completedJobs.length;
    }
    
    openPostJobModal() {
        if (!this.userAddress) {
            this.showNotification('Please connect your wallet first', 'error');
            return;
        }
        document.getElementById('post-job-modal').classList.add('active');
    }
    
    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }
    
    async handlePostJob(e) {
        e.preventDefault();
        
        if (!this.userAddress || !this.currentUser) {
            this.showNotification('Please connect your wallet first', 'error');
            return;
        }
        
        if (this.currentUser.role !== 'job-host') {
            this.showNotification('Only job hosts can post jobs', 'error');
            return;
        }
        
        const formData = {
            title: document.getElementById('job-title').value,
            description: document.getElementById('job-description').value,
            budget: parseInt(document.getElementById('job-budget').value),
            deadline: document.getElementById('job-deadline').value,
            skills: document.getElementById('job-skills').value.split(',').map(s => s.trim())
        };
        
        try {
            // In real implementation, this would interact with smart contract
            await this.postJobToContract(formData);
            
            // Add to local jobs array for demo
            const newJob = {
                id: this.jobs.length + 1,
                ...formData,
                status: 'open',
                poster: this.userAddress,
                posterName: this.currentUser.name,
                applications: []
            };
            
            this.jobs.push(newJob);
            
            // Save to localStorage
            localStorage.setItem('bbeJobs', JSON.stringify(this.jobs));
            
            this.renderPostedJobs();
            this.renderAvailableJobs();
            this.updateStats();
            
            this.closeModal('post-job-modal');
            this.showNotification('Job posted successfully!', 'success');
            
            // Reset form
            document.getElementById('post-job-form').reset();
        } catch (error) {
            console.error('Error posting job:', error);
            this.showNotification('Failed to post job', 'error');
        }
    }
    
    async postJobToContract(jobData) {
        // Mock contract interaction - in real implementation:
        // 1. Approve BBE tokens for escrow
        // 2. Call job contract to create job
        // 3. Transfer tokens to escrow
        
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Job posted to contract:', jobData);
                resolve();
            }, 1000);
        });
    }
    
    renderPostedJobs() {
        const jobsContainer = document.getElementById('jobs-container');
        jobsContainer.innerHTML = '';
        
        if (!this.currentUser) return;
        
        // Filter jobs posted by current user
        const userJobs = this.jobs.filter(job => job.posterName === this.currentUser.name);
        
        if (userJobs.length === 0) {
            jobsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-briefcase"></i>
                    <p>You haven't posted any jobs yet</p>
                    <button class="btn-primary" onclick="app.openModal('post-job-modal')">
                        Post Your First Job
                    </button>
                </div>
            `;
            return;
        }
        
        // Render each job
        userJobs.forEach(job => {
            const jobCard = this.createJobCard(job, 'manage');
            jobsContainer.appendChild(jobCard);
        });
    }
    
    createJobCard(job, mode) {
        const card = document.createElement('div');
        card.className = 'job-card';
        
        // Format deadline
        const deadline = new Date(job.deadline).toLocaleDateString();
        
        // Format skills
        const skills = Array.isArray(job.skills) ? job.skills.join(', ') : job.skills;
        
        card.innerHTML = `
            <div class="job-header">
                <h3 class="job-title">${job.title}</h3>
                <div class="job-budget">${job.budget} BBE</div>
            </div>
            <div class="job-description">${job.description}</div>
            <div class="job-meta">
                <div class="meta-item">
                    <i class="fas fa-calendar"></i>
                    <span>Deadline: ${deadline}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-code-branch"></i>
                    <span>Skills: ${skills}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-user"></i>
                    <span>Posted by: ${job.posterName}</span>
                </div>
            </div>
            <div class="job-status ${job.status}">
                <span>${job.status.charAt(0).toUpperCase() + job.status.slice(1)}</span>
            </div>
            <div class="job-actions">
                ${mode === 'apply' ? `
                    <button class="btn-primary" onclick="app.openApplyJobModal(${job.id})">
                        <i class="fas fa-paper-plane mr-2"></i>Apply
                    </button>
                ` : `
                    <button class="btn-primary" onclick="app.viewJobApplications(${job.id})">
                        <i class="fas fa-users mr-2"></i>View Applications (${job.applications.length})
                    </button>
                    <button class="btn-secondary" onclick="app.editJob(${job.id})">
                        <i class="fas fa-edit mr-2"></i>Edit
                    </button>
                `}
            </div>
        `;
        
        return card;
    }
    
    renderAvailableJobs() {
        const jobsContainer = document.getElementById('jobs-container');
        jobsContainer.innerHTML = '';
        
        // Filter jobs not posted by current user
        let availableJobs = this.jobs.filter(job => 
            job.status === 'open' && 
            (!this.currentUser || job.posterName !== this.currentUser.name)
        );
        
        if (availableJobs.length === 0) {
            jobsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <p>No available jobs found</p>
                </div>
            `;
            return;
        }
        
        // Render each job
        availableJobs.forEach(job => {
            const jobCard = this.createJobCard(job, 'apply');
            jobsContainer.appendChild(jobCard);
        });
    }
    
    openApplyJobModal(jobId) {
        if (!this.userAddress) {
            this.showNotification('Please connect your wallet first', 'error');
            return;
        }
        
        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;
        
        // Populate job details
        document.getElementById('apply-job-details').innerHTML = `
            <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-semibold text-lg mb-2">${job.title}</h3>
                <p class="text-gray-600 mb-2">${job.description}</p>
                <div class="flex justify-between text-sm text-gray-500">
                    <span><i class="fas fa-coins mr-1"></i>${job.budget} BBE</span>
                    <span><i class="fas fa-calendar mr-1"></i>${job.deadline}</span>
                </div>
            </div>
        `;
        
        // Store job ID for form submission
        document.getElementById('apply-job-form').dataset.jobId = jobId;
        
        this.openModal('apply-job-modal');
    }
    
    openModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }
    
    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }
    
    viewJobApplications(jobId) {
        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;
        
        // In a real app, this would show a detailed applications view
        this.showNotification(`Job "${job.title}" has ${job.applications.length} applications`, 'info');
    }
    
    editJob(jobId) {
        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;
        
        // Pre-fill the form with existing job data
        document.getElementById('job-title').value = job.title;
        document.getElementById('job-description').value = job.description;
        document.getElementById('job-budget').value = job.budget;
        document.getElementById('job-deadline').value = job.deadline;
        document.getElementById('job-skills').value = Array.isArray(job.skills) ? job.skills.join(', ') : job.skills;
        
        // Store the job ID for updating
        document.getElementById('post-job-form').dataset.editingJobId = jobId;
        
        this.openModal('post-job-modal');
    }
    
    withdrawApplication(applicationId) {
        const applicationIndex = this.userApplications.findIndex(app => app.id === applicationId);
        if (applicationIndex === -1) return;
        
        this.userApplications.splice(applicationIndex, 1);
        localStorage.setItem('bbeApplications', JSON.stringify(this.userApplications));
        
        this.renderMyApplications();
        this.showNotification('Application withdrawn successfully', 'success');
    }
    
    viewJobDetails(jobId) {
        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;
        
        // In a real app, this would show detailed job information
        this.showNotification(`Viewing details for job: ${job.title}`, 'info');
    }
    
    async handleApplyJob(e) {
        e.preventDefault();
        
        const jobId = parseInt(e.target.dataset.jobId);
        const coverLetter = document.getElementById('cover-letter').value;
        const portfolio = document.getElementById('portfolio').value;
        
        try {
            // In real implementation, this would interact with smart contract
            await this.applyToJobContract(jobId, { coverLetter, portfolio });
            
            // Add to local applications for demo
            const application = {
                id: Date.now(),
                jobId,
                applicant: this.userAddress,
                coverLetter,
                portfolio,
                status: 'pending',
                timestamp: new Date().toISOString()
            };
            
            this.userApplications.push(application);
            
            // Add to job applications
            const job = this.jobs.find(j => j.id === jobId);
            if (job) {
                job.applications.push(application);
            }
            
            // Save to localStorage
             localStorage.setItem('bbeApplications', JSON.stringify(this.userApplications));
             localStorage.setItem('bbeJobs', JSON.stringify(this.jobs));
             
             // Update the job in the jobs array to include the new application
             const jobIndex = this.jobs.findIndex(j => j.id === jobId);
             if (jobIndex !== -1) {
                 this.jobs[jobIndex] = job;
             }
            
            this.updateStats();
            this.renderAvailableJobs();
            
            this.closeModal('apply-job-modal');
            this.showNotification('Application submitted successfully!', 'success');
            
            // Reset form
            document.getElementById('apply-job-form').reset();
        } catch (error) {
            console.error('Error applying to job:', error);
            this.showNotification('Failed to submit application', 'error');
        }
    }
    
    async applyToJobContract(jobId, applicationData) {
        // Mock contract interaction
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Application submitted to contract:', { jobId, ...applicationData });
                resolve();
            }, 1000);
        });
    }
    
    browseJobs() {
        document.getElementById('jobs-section-title').textContent = 'Available Jobs';
        this.renderAvailableJobs();
    }
    
    showMyJobs() {
        if (this.currentUser.role === 'job-host') {
            document.getElementById('jobs-section-title').textContent = 'My Posted Jobs';
            this.renderPostedJobs();
        } else {
            document.getElementById('jobs-section-title').textContent = 'My Applications';
            this.renderMyApplications();
        }
    }
    
    showMyApplications() {
        document.getElementById('jobs-section-title').textContent = 'My Applications';
        this.renderMyApplications();
    }
    
    renderMyApplications() {
        const jobsContainer = document.getElementById('jobs-container');
        jobsContainer.innerHTML = '';
        
        if (!this.currentUser) return;
        
        // Filter applications by current user
        const userApplications = this.userApplications.filter(app => 
            app.applicant === this.userAddress
        );
        
        if (userApplications.length === 0) {
            jobsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-file-alt"></i>
                    <p>You haven't applied to any jobs yet</p>
                    <button class="btn-primary" onclick="app.browseJobs()">
                        Browse Available Jobs
                    </button>
                </div>
            `;
            return;
        }
        
        // Render each application
        userApplications.forEach(application => {
            // Find the job this application is for
            const job = this.jobs.find(j => j.id === application.jobId);
            if (!job) return;
            
            const jobCard = this.createApplicationCard(job, application);
            jobsContainer.appendChild(jobCard);
        });
    }
    
    createApplicationCard(job, application) {
        const card = document.createElement('div');
        card.className = 'job-card application-card';
        
        card.innerHTML = `
            <div class="job-header">
                <h3 class="job-title">${job.title}</h3>
                <div class="application-status ${application.status}">
                    ${application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </div>
            </div>
            <div class="job-description">${job.description}</div>
            <div class="job-meta">
                <div class="meta-item">
                    <i class="fas fa-coins"></i>
                    <span>Budget: ${job.budget} BBE</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-user"></i>
                    <span>Posted by: ${job.posterName}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-calendar"></i>
                    <span>Applied: ${new Date(application.timestamp).toLocaleDateString()}</span>
                </div>
            </div>
            <div class="application-details">
                <h4>Your Cover Letter:</h4>
                <p>${application.coverLetter}</p>
            </div>
            <div class="job-actions">
                ${application.status === 'pending' ? `
                    <button class="btn-secondary" onclick="app.withdrawApplication(${application.id})">
                        <i class="fas fa-times mr-2"></i>Withdraw
                    </button>
                ` : application.status === 'accepted' ? `
                    <button class="btn-primary" onclick="app.viewJobDetails(${job.id})">
                        <i class="fas fa-tasks mr-2"></i>View Job Details
                    </button>
                ` : `
                    <button class="btn-secondary" disabled>
                        ${application.status === 'rejected' ? 'Application Rejected' : 'Job Completed'}
                    </button>
                `}
            </div>
        `;
        
        return card;
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            type === 'warning' ? 'bg-yellow-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Global functions for onclick handlers
function openPostJobModal() {
    app.openPostJobModal();
}

function closeModal(modalId) {
    app.closeModal(modalId);
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new BaseBridgeApp();
});

// Handle account changes
if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
            // User disconnected wallet
            if (app) {
                app.userAddress = null;
                app.updateWalletStatus(false);
            }
        } else {
            // User switched accounts
            window.location.reload();
        }
    });
    
    window.ethereum.on('chainChanged', (chainId) => {
        // Reload page when chain changes
        window.location.reload();
    });
}