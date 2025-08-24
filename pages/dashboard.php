<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - BaseBridge</title>
    <link rel="stylesheet" href="../styles/main.css">
    <link rel="stylesheet" href="../css/dashboard.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-brand">
                <img src="../img/t-logo.png" alt="BaseBridge" class="nav-logo">
                <span class="nav-title">BaseBridge</span>
            </div>
            <div class="nav-menu">
                <a href="../index.php" class="nav-link">Home</a>
                <a href="jobs.php" class="nav-link">Browse Jobs</a>
                <a href="post-job.php" class="nav-link">Post Job</a>
                <a href="dashboard.php" class="nav-link active">Dashboard</a>
                <a href="profile.php" class="nav-link">Profile</a>
                <button id="logout-btn" class="btn btn-outline">Logout</button>
            </div>
        </div>
    </nav>

    <!-- Dashboard Content -->
    <div class="dashboard-container">
        <!-- Sidebar -->
        <aside class="dashboard-sidebar">
            <div class="sidebar-header">
                <div class="user-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="user-info">
                    <h3 id="user-name">Loading...</h3>
                    <p id="user-role">Loading...</p>
                    <div id="user-badges" class="user-badges"></div>
                </div>
            </div>
            
            <nav class="sidebar-nav">
                <a href="#overview" class="sidebar-link active" data-section="overview">
                    <i class="fas fa-chart-line"></i>
                    <span>Overview</span>
                </a>
                <a href="#jobs" class="sidebar-link" data-section="jobs">
                    <i class="fas fa-briefcase"></i>
                    <span>My Jobs</span>
                </a>
                <a href="#applications" class="sidebar-link" data-section="applications">
                    <i class="fas fa-file-alt"></i>
                    <span>Applications</span>
                </a>
                <a href="#earnings" class="sidebar-link" data-section="earnings">
                    <i class="fas fa-dollar-sign"></i>
                    <span>Earnings</span>
                </a>
                <a href="#messages" class="sidebar-link" data-section="messages">
                    <i class="fas fa-envelope"></i>
                    <span>Messages</span>
                    <span class="message-count">3</span>
                </a>
                <a href="#settings" class="sidebar-link" data-section="settings">
                    <i class="fas fa-cog"></i>
                    <span>Settings</span>
                </a>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="dashboard-main">
            <!-- Overview Section -->
            <section id="overview-section" class="dashboard-section active">
                <div class="section-header">
                    <h1>Dashboard Overview</h1>
                    <p>Welcome back! Here's what's happening with your account.</p>
                </div>

                <!-- Stats Cards -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-briefcase"></i>
                        </div>
                        <div class="stat-content">
                            <h3 id="total-jobs">0</h3>
                            <p>Active Jobs</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="stat-content">
                            <h3 id="total-earnings">$0</h3>
                            <p>Total Earnings</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="stat-content">
                            <h3 id="rating">5.0</h3>
                            <p>Rating</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-content">
                            <h3 id="completed-jobs">0</h3>
                            <p>Completed</p>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="dashboard-grid">
                    <div class="dashboard-card">
                        <div class="card-header">
                            <h3>Recent Activity</h3>
                            <a href="#" class="view-all">View All</a>
                        </div>
                        <div class="activity-list" id="recent-activity">
                            <div class="activity-item">
                                <div class="activity-icon">
                                    <i class="fas fa-plus-circle"></i>
                                </div>
                                <div class="activity-content">
                                    <p><strong>Welcome to BaseBridge!</strong></p>
                                    <span class="activity-time">Just now</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard-card">
                        <div class="card-header">
                            <h3>Quick Actions</h3>
                        </div>
                        <div class="quick-actions">
                            <a href="jobs.php" class="action-btn">
                                <i class="fas fa-search"></i>
                                <span>Browse Jobs</span>
                            </a>
                            <a href="post-job.php" class="action-btn">
                                <i class="fas fa-plus"></i>
                                <span>Post New Job</span>
                            </a>
                            <a href="profile.php" class="action-btn">
                                <i class="fas fa-user"></i>
                                <span>Edit Profile</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Jobs Section -->
            <section id="jobs-section" class="dashboard-section">
                <div class="section-header">
                    <h1>My Jobs</h1>
                    <button class="btn btn-primary" onclick="window.location.href='post-job.php'">
                        <i class="fas fa-plus"></i> Post New Job
                    </button>
                </div>

                <div class="jobs-tabs">
                    <button class="tab-btn active" data-tab="active">Active Jobs</button>
                    <button class="tab-btn" data-tab="completed">Completed</button>
                    <button class="tab-btn" data-tab="draft">Drafts</button>
                </div>

                <div class="jobs-list" id="jobs-list">
                    <div class="empty-state">
                        <i class="fas fa-briefcase"></i>
                        <h3>No jobs found</h3>
                        <p>Start by posting your first job or browse available opportunities.</p>
                        <a href="post-job.php" class="btn btn-primary">Post Your First Job</a>
                    </div>
                </div>
            </section>

            <!-- Applications Section -->
            <section id="applications-section" class="dashboard-section">
                <div class="section-header">
                    <h1>Applications</h1>
                    <div class="filter-buttons">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="pending">Pending</button>
                        <button class="filter-btn" data-filter="accepted">Accepted</button>
                        <button class="filter-btn" data-filter="rejected">Rejected</button>
                    </div>
                </div>

                <div class="applications-list" id="applications-list">
                    <div class="empty-state">
                        <i class="fas fa-file-alt"></i>
                        <h3>No applications yet</h3>
                        <p>Your job applications will appear here.</p>
                        <a href="jobs.php" class="btn btn-primary">Browse Jobs</a>
                    </div>
                </div>
            </section>

            <!-- Earnings Section -->
            <section id="earnings-section" class="dashboard-section">
                <div class="section-header">
                    <h1>Earnings & Payments</h1>
                </div>

                <div class="earnings-overview">
                    <div class="earnings-card">
                        <h3>Total Balance</h3>
                        <div class="balance-amount">$0.00</div>
                        <button class="btn btn-primary">Withdraw</button>
                    </div>
                    <div class="earnings-card">
                        <h3>This Month</h3>
                        <div class="balance-amount">$0.00</div>
                        <span class="earnings-change">+0% from last month</span>
                    </div>
                    <div class="earnings-card">
                        <h3>Pending</h3>
                        <div class="balance-amount">$0.00</div>
                        <span class="earnings-note">Available in 3-5 days</span>
                    </div>
                </div>

                <div class="earnings-history">
                    <h3>Transaction History</h3>
                    <div class="empty-state">
                        <i class="fas fa-receipt"></i>
                        <h3>No transactions yet</h3>
                        <p>Your earning history will appear here.</p>
                    </div>
                </div>
            </section>

            <!-- Messages Section -->
            <section id="messages-section" class="dashboard-section">
                <div class="section-header">
                    <h1>Messages</h1>
                    <button class="btn btn-primary">
                        <i class="fas fa-plus"></i> New Message
                    </button>
                </div>

                <div class="messages-container">
                    <div class="messages-sidebar">
                        <div class="message-search">
                            <input type="text" placeholder="Search messages...">
                            <i class="fas fa-search"></i>
                        </div>
                        <div class="messages-list">
                            <div class="message-item active">
                                <div class="message-avatar">
                                    <i class="fas fa-user-circle"></i>
                                </div>
                                <div class="message-content">
                                    <h4>System</h4>
                                    <p>Welcome to BaseBridge!</p>
                                    <span class="message-time">Just now</span>
                                </div>
                                <div class="message-status unread"></div>
                            </div>
                        </div>
                    </div>
                    <div class="message-chat">
                        <div class="chat-header">
                            <h3>System</h3>
                            <div class="chat-actions">
                                <button class="btn-icon"><i class="fas fa-phone"></i></button>
                                <button class="btn-icon"><i class="fas fa-video"></i></button>
                                <button class="btn-icon"><i class="fas fa-ellipsis-v"></i></button>
                            </div>
                        </div>
                        <div class="chat-messages">
                            <div class="message received">
                                <div class="message-bubble">
                                    <p>Welcome to BaseBridge! We're excited to have you on board. Feel free to explore the platform and start connecting with amazing opportunities.</p>
                                    <span class="message-timestamp">Just now</span>
                                </div>
                            </div>
                        </div>
                        <div class="chat-input">
                            <input type="text" placeholder="Type your message...">
                            <button class="btn btn-primary">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Settings Section -->
            <section id="settings-section" class="dashboard-section">
                <div class="section-header">
                    <h1>Settings</h1>
                </div>

                <div class="settings-grid">
                    <div class="settings-card">
                        <h3>Account Settings</h3>
                        <div class="setting-item">
                            <label>Email Notifications</label>
                            <label class="toggle">
                                <input type="checkbox" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        <div class="setting-item">
                            <label>SMS Notifications</label>
                            <label class="toggle">
                                <input type="checkbox">
                                <span class="slider"></span>
                            </label>
                        </div>
                        <div class="setting-item">
                            <label>Two-Factor Authentication</label>
                            <label class="toggle">
                                <input type="checkbox">
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>

                    <div class="settings-card">
                        <h3>Privacy Settings</h3>
                        <div class="setting-item">
                            <label>Profile Visibility</label>
                            <select class="form-select">
                                <option>Public</option>
                                <option>Private</option>
                                <option>Registered Users Only</option>
                            </select>
                        </div>
                        <div class="setting-item">
                            <label>Show Online Status</label>
                            <label class="toggle">
                                <input type="checkbox" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>

                    <div class="settings-card">
                        <h3>Danger Zone</h3>
                        <div class="setting-item">
                            <button class="btn btn-outline-danger">Change Password</button>
                        </div>
                        <div class="setting-item">
                            <button class="btn btn-danger">Delete Account</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>

    <!-- Notification -->
    <div id="notification" class="notification">
        <div class="notification-content">
            <i class="notification-icon fas fa-check-circle"></i>
            <span class="notification-message"></span>
        </div>
    </div>

    <script src="../js/dashboard.js"></script>
</body>
</html>