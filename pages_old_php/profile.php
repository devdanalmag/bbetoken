<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile - BaseBridge</title>
    <link rel="stylesheet" href="../styles/main.css">
    <link rel="stylesheet" href="../css/profile.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
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
                <a href="jobs.php" class="nav-link">Browse Jobs</a>
                <a href="post-job.php" class="nav-link">Post Job</a>
                <a href="dashboard.php" class="nav-link">Dashboard</a>
                <a href="profile.php" class="nav-link active">Profile</a>
                <button id="logout-btn" class="btn btn-outline">Logout</button>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="profile-main">
        <div class="container">
            <div class="profile-layout">
                <!-- Profile Sidebar -->
                <aside class="profile-sidebar">
                    <div class="profile-card">
                        <div class="profile-avatar-section">
                            <div class="profile-avatar" id="profile-avatar">
                                <span id="avatar-initial">U</span>
                                <div class="avatar-upload">
                                    <i class="fas fa-camera"></i>
                                    <input type="file" id="avatar-input" accept="image/*">
                                </div>
                            </div>
                            <div class="profile-info">
                                <h2 id="profile-name">User Name</h2>
                                <p id="profile-role">Freelancer</p>
                                <div class="profile-badges" id="profile-badges">
                                    <!-- Badges will be added here -->
                                </div>
                            </div>
                        </div>
                        
                        <div class="profile-stats">
                            <div class="stat-item">
                                <div class="stat-value" id="jobs-completed">0</div>
                                <div class="stat-label">Jobs Completed</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value" id="total-earned">$0</div>
                                <div class="stat-label">Total Earned</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value" id="success-rate">100%</div>
                                <div class="stat-label">Success Rate</div>
                            </div>
                        </div>
                        
                        <div class="profile-actions">
                            <button class="btn btn-primary" id="edit-profile-btn">
                                <i class="fas fa-edit"></i> Edit Profile
                            </button>
                            <button class="btn btn-outline" id="view-public-profile">
                                <i class="fas fa-eye"></i> View Public Profile
                            </button>
                        </div>
                    </div>
                    
                    <!-- Quick Links -->
                    <div class="quick-links">
                        <h3>Quick Links</h3>
                        <a href="dashboard.php" class="quick-link">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </a>
                        <a href="jobs.php" class="quick-link">
                            <i class="fas fa-briefcase"></i>
                            <span>Browse Jobs</span>
                        </a>
                        <a href="post-job.php" class="quick-link">
                            <i class="fas fa-plus-circle"></i>
                            <span>Post New Job</span>
                        </a>
                        <a href="#" class="quick-link" id="wallet-link">
                            <i class="fas fa-wallet"></i>
                            <span>Wallet</span>
                        </a>
                    </div>
                </aside>

                <!-- Profile Content -->
                <div class="profile-content">
                    <!-- Profile Tabs -->
                    <div class="profile-tabs">
                        <button class="tab-btn active" data-tab="overview">
                            <i class="fas fa-user"></i> Overview
                        </button>
                        <button class="tab-btn" data-tab="portfolio">
                            <i class="fas fa-folder"></i> Portfolio
                        </button>
                        <button class="tab-btn" data-tab="reviews">
                            <i class="fas fa-star"></i> Reviews
                        </button>
                        <button class="tab-btn" data-tab="settings">
                            <i class="fas fa-cog"></i> Settings
                        </button>
                    </div>

                    <!-- Tab Content -->
                    <div class="tab-content">
                        <!-- Overview Tab -->
                        <div class="tab-pane active" id="overview-tab">
                            <div class="overview-section">
                                <h3>About Me</h3>
                                <div class="about-content">
                                    <div class="about-text" id="about-text">
                                        <p>No bio available. Click edit to add your professional summary.</p>
                                    </div>
                                    <button class="btn btn-outline btn-sm" id="edit-about-btn">
                                        <i class="fas fa-edit"></i> Edit
                                    </button>
                                </div>
                            </div>

                            <div class="overview-section">
                                <h3>Skills & Expertise</h3>
                                <div class="skills-content">
                                    <div class="skills-list" id="skills-list">
                                        <p class="no-skills">No skills added yet. Click edit to add your skills.</p>
                                    </div>
                                    <button class="btn btn-outline btn-sm" id="edit-skills-btn">
                                        <i class="fas fa-edit"></i> Edit Skills
                                    </button>
                                </div>
                            </div>

                            <div class="overview-section">
                                <h3>Experience</h3>
                                <div class="experience-content">
                                    <div class="experience-list" id="experience-list">
                                        <p class="no-experience">No experience added yet. Click edit to add your work experience.</p>
                                    </div>
                                    <button class="btn btn-outline btn-sm" id="edit-experience-btn">
                                        <i class="fas fa-edit"></i> Edit Experience
                                    </button>
                                </div>
                            </div>

                            <div class="overview-section">
                                <h3>Education</h3>
                                <div class="education-content">
                                    <div class="education-list" id="education-list">
                                        <p class="no-education">No education added yet. Click edit to add your educational background.</p>
                                    </div>
                                    <button class="btn btn-outline btn-sm" id="edit-education-btn">
                                        <i class="fas fa-edit"></i> Edit Education
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Portfolio Tab -->
                        <div class="tab-pane" id="portfolio-tab">
                            <div class="portfolio-header">
                                <h3>Portfolio</h3>
                                <button class="btn btn-primary" id="add-portfolio-btn">
                                    <i class="fas fa-plus"></i> Add Project
                                </button>
                            </div>
                            <div class="portfolio-grid" id="portfolio-grid">
                                <div class="empty-portfolio">
                                    <i class="fas fa-folder-open"></i>
                                    <h4>No Portfolio Items</h4>
                                    <p>Showcase your best work by adding portfolio projects.</p>
                                    <button class="btn btn-primary" id="add-first-portfolio">
                                        <i class="fas fa-plus"></i> Add Your First Project
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Reviews Tab -->
                        <div class="tab-pane" id="reviews-tab">
                            <div class="reviews-header">
                                <h3>Client Reviews</h3>
                                <div class="reviews-summary">
                                    <div class="rating-overview">
                                        <div class="overall-rating">
                                            <span class="rating-number" id="overall-rating">5.0</span>
                                            <div class="rating-stars" id="overall-stars">
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                            </div>
                                            <span class="rating-count" id="rating-count">(0 reviews)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="reviews-list" id="reviews-list">
                                <div class="empty-reviews">
                                    <i class="fas fa-star"></i>
                                    <h4>No Reviews Yet</h4>
                                    <p>Complete your first job to start receiving client reviews.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Settings Tab -->
                        <div class="tab-pane" id="settings-tab">
                            <div class="settings-section">
                                <h3>Account Settings</h3>
                                <form id="account-settings-form" class="settings-form">
                                    <div class="form-group">
                                        <label for="settings-name">Full Name</label>
                                        <input type="text" id="settings-name" name="name" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="settings-email">Email Address</label>
                                        <input type="email" id="settings-email" name="email" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="settings-phone">Phone Number</label>
                                        <input type="tel" id="settings-phone" name="phone">
                                    </div>
                                    <div class="form-group">
                                        <label for="settings-location">Location</label>
                                        <input type="text" id="settings-location" name="location" placeholder="City, Country">
                                    </div>
                                    <div class="form-group">
                                        <label for="settings-timezone">Timezone</label>
                                        <select id="settings-timezone" name="timezone">
                                            <option value="UTC">UTC (Coordinated Universal Time)</option>
                                            <option value="America/New_York">Eastern Time (ET)</option>
                                            <option value="America/Chicago">Central Time (CT)</option>
                                            <option value="America/Denver">Mountain Time (MT)</option>
                                            <option value="America/Los_Angeles">Pacific Time (PT)</option>
                                            <option value="Europe/London">London (GMT)</option>
                                            <option value="Europe/Paris">Paris (CET)</option>
                                            <option value="Asia/Tokyo">Tokyo (JST)</option>
                                            <option value="Asia/Shanghai">Shanghai (CST)</option>
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fas fa-save"></i> Save Changes
                                    </button>
                                </form>
                            </div>

                            <div class="settings-section">
                                <h3>Notification Preferences</h3>
                                <form id="notification-settings-form" class="settings-form">
                                    <div class="form-group checkbox-group">
                                        <label class="checkbox-label">
                                            <input type="checkbox" id="email-notifications" name="emailNotifications" checked>
                                            <span class="checkbox-custom"></span>
                                            <div class="checkbox-content">
                                                <strong>Email Notifications</strong>
                                                <small>Receive important updates via email</small>
                                            </div>
                                        </label>
                                    </div>
                                    <div class="form-group checkbox-group">
                                        <label class="checkbox-label">
                                            <input type="checkbox" id="job-alerts" name="jobAlerts" checked>
                                            <span class="checkbox-custom"></span>
                                            <div class="checkbox-content">
                                                <strong>Job Alerts</strong>
                                                <small>Get notified about new jobs matching your skills</small>
                                            </div>
                                        </label>
                                    </div>
                                    <div class="form-group checkbox-group">
                                        <label class="checkbox-label">
                                            <input type="checkbox" id="message-notifications" name="messageNotifications" checked>
                                            <span class="checkbox-custom"></span>
                                            <div class="checkbox-content">
                                                <strong>Message Notifications</strong>
                                                <small>Get notified when you receive new messages</small>
                                            </div>
                                        </label>
                                    </div>
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fas fa-save"></i> Save Preferences
                                    </button>
                                </form>
                            </div>

                            <div class="settings-section">
                                <h3>Privacy Settings</h3>
                                <form id="privacy-settings-form" class="settings-form">
                                    <div class="form-group checkbox-group">
                                        <label class="checkbox-label">
                                            <input type="checkbox" id="public-profile" name="publicProfile" checked>
                                            <span class="checkbox-custom"></span>
                                            <div class="checkbox-content">
                                                <strong>Public Profile</strong>
                                                <small>Allow your profile to be visible to clients</small>
                                            </div>
                                        </label>
                                    </div>
                                    <div class="form-group checkbox-group">
                                        <label class="checkbox-label">
                                            <input type="checkbox" id="show-earnings" name="showEarnings">
                                            <span class="checkbox-custom"></span>
                                            <div class="checkbox-content">
                                                <strong>Show Earnings</strong>
                                                <small>Display your total earnings on your public profile</small>
                                            </div>
                                        </label>
                                    </div>
                                    <div class="form-group checkbox-group">
                                        <label class="checkbox-label">
                                            <input type="checkbox" id="show-location" name="showLocation" checked>
                                            <span class="checkbox-custom"></span>
                                            <div class="checkbox-content">
                                                <strong>Show Location</strong>
                                                <small>Display your location on your profile</small>
                                            </div>
                                        </label>
                                    </div>
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fas fa-save"></i> Save Settings
                                    </button>
                                </form>
                            </div>

                            <div class="settings-section danger-zone">
                                <h3>Danger Zone</h3>
                                <div class="danger-actions">
                                    <button class="btn btn-danger" id="deactivate-account">
                                        <i class="fas fa-user-slash"></i> Deactivate Account
                                    </button>
                                    <button class="btn btn-danger" id="delete-account">
                                        <i class="fas fa-trash"></i> Delete Account
                                    </button>
                                </div>
                                <p class="danger-warning">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    These actions are permanent and cannot be undone.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Edit Profile Modal -->
    <div id="edit-profile-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit Profile</h3>
                <button class="modal-close" id="edit-profile-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="edit-profile-form">
                    <div class="form-group">
                        <label for="edit-name">Full Name</label>
                        <input type="text" id="edit-name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-title">Professional Title</label>
                        <input type="text" id="edit-title" name="title" placeholder="e.g., Full Stack Developer">
                    </div>
                    <div class="form-group">
                        <label for="edit-bio">Bio</label>
                        <textarea id="edit-bio" name="bio" rows="4" placeholder="Tell clients about yourself and your expertise..."></textarea>
                    </div>
                    <div class="form-group">
                        <label for="edit-hourly-rate">Hourly Rate (USD)</label>
                        <input type="number" id="edit-hourly-rate" name="hourlyRate" min="5" step="5" placeholder="25">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" id="cancel-edit-profile">Cancel</button>
                <button class="btn btn-primary" id="save-profile-changes">
                    <i class="fas fa-save"></i> Save Changes
                </button>
            </div>
        </div>
    </div>

    <!-- Notification -->
    <div id="notification" class="notification">
        <i class="notification-icon fas fa-check-circle"></i>
        <span class="notification-message"></span>
    </div>

    <script src="../js/profile.js"></script>
</body>
</html>