<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Join BaseBridge - Authentication</title>
    <link rel="stylesheet" href="../styles/main.css">
    <link rel="stylesheet" href="../styles/auth.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-brand">
                <a href="../index.php">
                    <img src="../img/t-logo.png" alt="BaseBridge" class="nav-logo">
                    <span class="nav-title">BaseBridge</span>
                </a>
            </div>
            <div class="nav-menu">
                <a href="../index.php" class="nav-link">Home</a>
                <a href="../index.php#features" class="nav-link">Features</a>
                <a href="../index.php#pricing" class="nav-link">Pricing</a>
            </div>
        </div>
    </nav>

    <!-- Auth Container -->
    <div class="auth-container">
        <div class="auth-wrapper">
            <!-- Left Side - Branding -->
            <div class="auth-branding">
                <div class="branding-content">
                    <div class="branding-logo">
                        <img src="../img/t-logo.png" alt="BaseBridge" class="brand-logo">
                        <h1 class="brand-title">BaseBridge</h1>
                    </div>
                    <h2 class="branding-headline">Join the Future of Freelancing</h2>
                    <p class="branding-description">
                        Connect with top talent and clients on the Base blockchain. Secure, transparent, and powered by BBE tokens.
                    </p>
                    <div class="branding-features">
                        <div class="feature-item">
                            <i class="fas fa-shield-alt"></i>
                            <span>Secure Smart Contracts</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-coins"></i>
                            <span>BBE Token Economy</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-globe"></i>
                            <span>Global Marketplace</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Side - Auth Forms -->
            <div class="auth-forms">
                <!-- Login Form -->
                <div id="login-form" class="auth-form active">
                    <div class="form-header">
                        <h2 class="form-title">Welcome Back</h2>
                        <p class="form-subtitle">Sign in to your BaseBridge account</p>
                    </div>
                    
                    <form id="login-form-element" class="form">
                        <div class="form-group">
                            <label for="login-email" class="form-label">
                                <i class="fas fa-envelope"></i>
                                Email Address
                            </label>
                            <input type="email" id="login-email" class="form-input" required placeholder="Enter your email">
                        </div>
                        
                        <div class="form-group">
                            <label for="login-password" class="form-label">
                                <i class="fas fa-lock"></i>
                                Password
                            </label>
                            <input type="password" id="login-password" class="form-input" required placeholder="Enter your password">
                        </div>
                        
                        <div class="form-options">
                            <label class="checkbox-label">
                                <input type="checkbox" class="checkbox">
                                <span class="checkmark"></span>
                                Remember me
                            </label>
                            <a href="#" class="forgot-link">Forgot password?</a>
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-full">
                            <i class="fas fa-sign-in-alt"></i>
                            Sign In
                        </button>
                    </form>
                    
                    <div class="form-footer">
                        <p>Don't have an account? <a href="#" id="show-signup" class="link">Sign up</a></p>
                    </div>
                </div>

                <!-- Signup Form -->
                <div id="signup-form" class="auth-form">
                    <div class="form-header">
                        <h2 class="form-title">Create Account</h2>
                        <p class="form-subtitle">Join BaseBridge and start your journey</p>
                    </div>
                    
                    <form id="signup-form-element" class="form">
                        <div class="form-group">
                            <label for="signup-name" class="form-label">
                                <i class="fas fa-user"></i>
                                Full Name
                            </label>
                            <input type="text" id="signup-name" class="form-input" required placeholder="Enter your full name">
                        </div>
                        
                        <div class="form-group">
                            <label for="signup-email" class="form-label">
                                <i class="fas fa-envelope"></i>
                                Email Address
                            </label>
                            <input type="email" id="signup-email" class="form-input" required placeholder="Enter your email">
                        </div>
                        
                        <div class="form-group">
                            <label for="signup-password" class="form-label">
                                <i class="fas fa-lock"></i>
                                Password
                            </label>
                            <input type="password" id="signup-password" class="form-input" required placeholder="Create a password">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">
                                <i class="fas fa-user-tag"></i>
                                Choose Your Role
                            </label>
                            <div class="role-selection">
                                <label class="role-option">
                                    <input type="radio" name="user-role" value="jobber" class="role-radio">
                                    <div class="role-card">
                                        <div class="role-icon">
                                            <i class="fas fa-user-tie"></i>
                                        </div>
                                        <h3 class="role-title">Freelancer</h3>
                                        <p class="role-description">Find and apply for projects</p>
                                        <div class="role-price">
                                            <span class="price">50 BBE</span>
                                            <span class="price-label">Registration Fee</span>
                                        </div>
                                    </div>
                                </label>
                                
                                <label class="role-option">
                                    <input type="radio" name="user-role" value="job-host" class="role-radio">
                                    <div class="role-card">
                                        <div class="role-icon">
                                            <i class="fas fa-briefcase"></i>
                                        </div>
                                        <h3 class="role-title">Project Owner</h3>
                                        <p class="role-description">Post projects and hire talent</p>
                                        <div class="role-price">
                                            <span class="price">100 BBE</span>
                                            <span class="price-label">Registration Fee</span>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" class="checkbox" required>
                                <span class="checkmark"></span>
                                I agree to the <a href="#" class="link">Terms of Service</a> and <a href="#" class="link">Privacy Policy</a>
                            </label>
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-full">
                            <i class="fas fa-user-plus"></i>
                            Create Account
                        </button>
                    </form>
                    
                    <div class="form-footer">
                        <p>Already have an account? <a href="#" id="show-login" class="link">Sign in</a></p>
                    </div>
                </div>

                <!-- Registration Screen -->
                <div id="registration-screen" class="auth-form">
                    <div class="form-header">
                        <h2 class="form-title">Complete Registration</h2>
                        <p class="form-subtitle">Pay your registration fee to activate your account</p>
                    </div>
                    
                    <div class="registration-content">
                        <div class="wallet-status">
                            <div class="wallet-info">
                                <i class="fas fa-wallet"></i>
                                <div class="wallet-details">
                                    <span class="wallet-label">Connected Wallet</span>
                                    <span id="wallet-address" class="wallet-address">Not connected</span>
                                </div>
                            </div>
                            <button id="connect-wallet" class="btn btn-secondary btn-sm">
                                <i class="fas fa-link"></i>
                                Connect Wallet
                            </button>
                        </div>
                        
                        <div class="balance-display">
                            <div class="balance-item">
                                <span class="balance-label">BBE Balance</span>
                                <span id="bbe-balance" class="balance-amount">0 BBE</span>
                            </div>
                        </div>
                        
                        <div class="fee-breakdown">
                            <div class="fee-item">
                                <span class="fee-label">Base Registration Fee</span>
                                <span id="base-fee" class="fee-amount">50 BBE</span>
                            </div>
                            
                            <div class="premium-option">
                                <label class="checkbox-label premium-label">
                                    <input type="checkbox" id="premium-checkbox" class="checkbox">
                                    <span class="checkmark"></span>
                                    <div class="premium-info">
                                        <span class="premium-title">
                                            <i class="fas fa-crown"></i>
                                            Premium Badge
                                        </span>
                                        <span class="premium-description">Get featured listings and priority support</span>
                                    </div>
                                    <span class="premium-price">+100 BBE</span>
                                </label>
                            </div>
                            
                            <div class="fee-total">
                                <span class="total-label">Total Fee</span>
                                <span id="total-fee" class="total-amount">50 BBE</span>
                            </div>
                        </div>
                        
                        <div class="registration-actions">
                            <button id="pay-register-btn" class="btn btn-primary btn-full">
                                <i class="fas fa-credit-card"></i>
                                Pay & Register
                            </button>
                            
                            <button id="skip-registration" class="btn btn-outline btn-full">
                                <i class="fas fa-forward"></i>
                                Skip Registration (Limited Features)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Notification -->
    <div id="notification" class="notification">
        <div class="notification-content">
            <i class="notification-icon"></i>
            <span class="notification-message"></span>
        </div>
    </div>

    <script src="../js/auth.js"></script>
</body>
</html>