<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BaseBridge - Decentralized Freelancing Platform</title>
    <link rel="stylesheet" href="styles/main.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-brand">
                <img src="img/t-logo.png" alt="BaseBridge" class="nav-logo">
                <span class="nav-title">BaseBridge</span>
            </div>
            <div class="nav-menu">
                <a href="#home" class="nav-link active">Home</a>
                <a href="#features" class="nav-link">Features</a>
                <a href="#how-it-works" class="nav-link">How It Works</a>
                <a href="#pricing" class="nav-link">Pricing</a>
                <a href="pages/auth.php" class="nav-link btn-primary">Get Started</a>
            </div>
            <div class="nav-toggle">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-container">
            <div class="hero-content">
                <h1 class="hero-title">
                    The Future of <span class="gradient-text">Freelancing</span> is Here
                </h1>
                <p class="hero-subtitle">
                    Connect with top talent and clients on the Base blockchain. Secure, transparent, and powered by BBE tokens.
                </p>
                <div class="hero-buttons">
                    <a href="pages/auth.php" class="btn btn-primary btn-large">
                        <i class="fas fa-rocket"></i>
                        Start Freelancing
                    </a>
                    <a href="pages/auth.php?role=client" class="btn btn-secondary btn-large">
                        <i class="fas fa-briefcase"></i>
                        Hire Talent
                    </a>
                </div>
                <div class="hero-stats">
                    <div class="stat">
                        <span class="stat-number">10K+</span>
                        <span class="stat-label">Active Users</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">5K+</span>
                        <span class="stat-label">Projects Completed</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">$2M+</span>
                        <span class="stat-label">Total Earnings</span>
                    </div>
                </div>
            </div>
            <div class="hero-image">
                <img src="img/basebridge.jpeg" alt="BaseBridge Platform" class="hero-img">
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Why Choose BaseBridge?</h2>
                <p class="section-subtitle">Experience the next generation of freelancing with blockchain technology</p>
            </div>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3 class="feature-title">Secure Payments</h3>
                    <p class="feature-description">Smart contracts ensure automatic and secure payments upon project completion</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-coins"></i>
                    </div>
                    <h3 class="feature-title">BBE Token Economy</h3>
                    <p class="feature-description">Earn and spend BBE tokens for premium features and reduced transaction fees</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-globe"></i>
                    </div>
                    <h3 class="feature-title">Global Marketplace</h3>
                    <p class="feature-description">Connect with talent and clients from around the world on Base blockchain</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h3 class="feature-title">Analytics Dashboard</h3>
                    <p class="feature-description">Track your performance with detailed analytics and insights</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <h3 class="feature-title">Community Driven</h3>
                    <p class="feature-description">Join a thriving community of freelancers and project owners</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-lightning-bolt"></i>
                    </div>
                    <h3 class="feature-title">Fast Transactions</h3>
                    <p class="feature-description">Lightning-fast transactions powered by Base L2 technology</p>
                </div>
            </div>
        </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="how-it-works">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">How It Works</h2>
                <p class="section-subtitle">Get started in just a few simple steps</p>
            </div>
            <div class="steps-container">
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h3 class="step-title">Create Account</h3>
                        <p class="step-description">Sign up and choose your role as a freelancer or project owner</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h3 class="step-title">Connect Wallet</h3>
                        <p class="step-description">Connect your Base wallet and get BBE tokens for registration</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h3 class="step-title">Start Working</h3>
                        <p class="step-description">Post projects or apply for jobs and start earning</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="pricing">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Simple Pricing</h2>
                <p class="section-subtitle">Choose the plan that works for you</p>
            </div>
            <div class="pricing-grid">
                <div class="pricing-card">
                    <div class="pricing-header">
                        <h3 class="pricing-title">Freelancer</h3>
                        <div class="pricing-price">
                            <span class="price-amount">50</span>
                            <span class="price-currency">BBE</span>
                        </div>
                        <p class="pricing-subtitle">One-time registration fee</p>
                    </div>
                    <ul class="pricing-features">
                        <li><i class="fas fa-check"></i> Apply to unlimited jobs</li>
                        <li><i class="fas fa-check"></i> Basic profile features</li>
                        <li><i class="fas fa-check"></i> Secure payments</li>
                        <li><i class="fas fa-check"></i> Community access</li>
                    </ul>
                    <a href="pages/auth.php?role=freelancer" class="btn btn-outline">Get Started</a>
                </div>
                <div class="pricing-card featured">
                    <div class="pricing-badge">Most Popular</div>
                    <div class="pricing-header">
                        <h3 class="pricing-title">Project Owner</h3>
                        <div class="pricing-price">
                            <span class="price-amount">100</span>
                            <span class="price-currency">BBE</span>
                        </div>
                        <p class="pricing-subtitle">One-time registration fee</p>
                    </div>
                    <ul class="pricing-features">
                        <li><i class="fas fa-check"></i> Post unlimited projects</li>
                        <li><i class="fas fa-check"></i> Advanced filtering</li>
                        <li><i class="fas fa-check"></i> Priority support</li>
                        <li><i class="fas fa-check"></i> Analytics dashboard</li>
                        <li><i class="fas fa-check"></i> Smart contracts</li>
                    </ul>
                    <a href="pages/auth.php?role=client" class="btn btn-primary">Get Started</a>
                </div>
                <div class="pricing-card">
                    <div class="pricing-header">
                        <h3 class="pricing-title">Premium</h3>
                        <div class="pricing-price">
                            <span class="price-amount">+100</span>
                            <span class="price-currency">BBE</span>
                        </div>
                        <p class="pricing-subtitle">Additional premium features</p>
                    </div>
                    <ul class="pricing-features">
                        <li><i class="fas fa-check"></i> Premium badge</li>
                        <li><i class="fas fa-check"></i> Featured listings</li>
                        <li><i class="fas fa-check"></i> Advanced analytics</li>
                        <li><i class="fas fa-check"></i> Priority matching</li>
                        <li><i class="fas fa-check"></i> Custom branding</li>
                    </ul>
                    <a href="pages/auth.php?premium=true" class="btn btn-outline">Upgrade</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-brand">
                        <img src="img/t-logo.png" alt="BaseBridge" class="footer-logo">
                        <span class="footer-title">BaseBridge</span>
                    </div>
                    <p class="footer-description">
                        The future of freelancing on the Base blockchain. Secure, transparent, and decentralized.
                    </p>
                </div>
                <div class="footer-section">
                    <h4 class="footer-heading">Platform</h4>
                    <ul class="footer-links">
                        <li><a href="pages/browse-jobs.php">Browse Jobs</a></li>
                        <li><a href="pages/post-job.php">Post a Job</a></li>
                        <li><a href="pages/dashboard.php">Dashboard</a></li>
                        <li><a href="pages/profile.php">Profile</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4 class="footer-heading">Support</h4>
                    <ul class="footer-links">
                        <li><a href="pages/help.php">Help Center</a></li>
                        <li><a href="pages/contact.php">Contact Us</a></li>
                        <li><a href="pages/faq.php">FAQ</a></li>
                        <li><a href="pages/terms.php">Terms of Service</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4 class="footer-heading">Connect</h4>
                    <div class="social-links">
                        <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-discord"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-telegram"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-github"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 BaseBridge. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>