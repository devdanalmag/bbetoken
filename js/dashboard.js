class DashboardApp {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'overview';
        this.jobs = [];
        this.applications = [];
        this.init();
    }

    init() {
        this.checkAuthentication();
        this.loadUserData();
        this.setupEventListeners();
        this.loadDashboardData();
        this.updateUserProfile();
        this.showSection('overview');
    }

    checkAuthentication() {
        const savedUser = localStorage.getItem('bbeCurrentUser');
        if (!savedUser) {
            window.location.href = '../auth';
            return;
        }
        
        try {
            this.currentUser = JSON.parse(savedUser);
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('bbeCurrentUser');
            window.location.href = '../auth';
        }
    }

    loadUserData() {
        // Load jobs
        const savedJobs = localStorage.getItem('bbeJobs');
        if (savedJobs) {
            try {
                this.jobs = JSON.parse(savedJobs).filter(job => 
                    job.userId === this.currentUser.id
                );
            } catch (error) {
                console.error('Error loading jobs:', error);
                this.jobs = [];
            }
        }

        // Load applications
        const savedApplications = localStorage.getItem('bbeApplications');
        if (savedApplications) {
            try {
                this.applications = JSON.parse(savedApplications).filter(app => 
                    app.applicantId === this.currentUser.id
                );
            } catch (error) {
                console.error('Error loading applications:', error);
                this.applications = [];
            }
        }
    }

    setupEventListeners() {
        // Hamburger menu functionality
        const hamburgerToggle = document.getElementById('dashboardHamburger');
        const sidebar = document.querySelector('.dashboard-sidebar');
        const overlay = document.getElementById('dashboardOverlay');
        
        if (hamburgerToggle && sidebar && overlay) {
            // Toggle sidebar function
            const toggleSidebar = () => {
                hamburgerToggle.classList.toggle('active');
                sidebar.classList.toggle('active');
                overlay.classList.toggle('active');
                
                // Prevent body scroll when sidebar is open
                if (sidebar.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            };
            
            // Close sidebar function
            const closeSidebar = () => {
                hamburgerToggle.classList.remove('active');
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            };
            
            // Event listeners
            hamburgerToggle.addEventListener('click', toggleSidebar);
            overlay.addEventListener('click', closeSidebar);
            
            // Close sidebar on window resize if screen becomes larger
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    closeSidebar();
                }
            });
        }
        
        // Sidebar navigation
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                if (section) {
                    this.showSection(section);
                    // Close sidebar on mobile when clicking a link
                    if (window.innerWidth <= 768) {
                        const hamburgerToggle = document.getElementById('dashboardHamburger');
                        const sidebar = document.querySelector('.dashboard-sidebar');
                        const overlay = document.getElementById('dashboardOverlay');
                        if (hamburgerToggle && sidebar && overlay) {
                            hamburgerToggle.classList.remove('active');
                            sidebar.classList.remove('active');
                            overlay.classList.remove('active');
                            document.body.style.overflow = '';
                        }
                    }
                }
             });
         });

         // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Jobs tabs
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                this.showJobsTab(tab);
                
                // Update active tab
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.filterApplications(filter);
                
                // Update active filter
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Settings toggles
        const toggles = document.querySelectorAll('.toggle input');
        toggles.forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                this.updateSetting(e.target.closest('.setting-item'), e.target.checked);
            });
        });

        // Message input
        const chatInput = document.querySelector('.chat-input input');
        const sendBtn = document.querySelector('.chat-input .btn');
        
        if (chatInput && sendBtn) {
            const sendMessage = () => {
                const message = chatInput.value.trim();
                if (message) {
                    this.sendMessage(message);
                    chatInput.value = '';
                }
            };
            
            sendBtn.addEventListener('click', sendMessage);
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }

    showSection(sectionName) {
        // Hide all sections
        const sections = document.querySelectorAll('.dashboard-section');
        sections.forEach(section => section.classList.remove('active'));
        
        // Show target section
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Update sidebar active state
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionName) {
                link.classList.add('active');
            }
        });
        
        this.currentSection = sectionName;
        
        // Load section-specific data
        switch (sectionName) {
            case 'jobs':
                this.loadJobsSection();
                break;
            case 'applications':
                this.loadApplicationsSection();
                break;
            case 'earnings':
                this.loadEarningsSection();
                break;
            case 'messages':
                this.loadMessagesSection();
                break;
        }
    }

    updateUserProfile() {
        // Update user name and role
        const userNameEl = document.getElementById('user-name');
        const userRoleEl = document.getElementById('user-role');
        const userBadgesEl = document.getElementById('user-badges');
        
        if (userNameEl) userNameEl.textContent = this.currentUser.name;
        if (userRoleEl) {
            const roleText = this.currentUser.role === 'job-host' ? 'Project Owner' : 'Freelancer';
            userRoleEl.textContent = roleText;
        }
        
        // Update badges
        if (userBadgesEl) {
            userBadgesEl.innerHTML = '';
            
            if (this.currentUser.registered) {
                const registeredBadge = document.createElement('span');
                registeredBadge.className = 'badge registered';
                registeredBadge.textContent = 'Registered';
                userBadgesEl.appendChild(registeredBadge);
            }
            
            if (this.currentUser.hasPremium) {
                const premiumBadge = document.createElement('span');
                premiumBadge.className = 'badge premium';
                premiumBadge.textContent = 'Premium';
                userBadgesEl.appendChild(premiumBadge);
            }
            
            // Add verified badge for demo
            const verifiedBadge = document.createElement('span');
            verifiedBadge.className = 'badge verified';
            verifiedBadge.textContent = 'Verified';
            userBadgesEl.appendChild(verifiedBadge);
        }
    }

    loadDashboardData() {
        // Update stats
        const totalJobsEl = document.getElementById('total-jobs');
        const totalEarningsEl = document.getElementById('total-earnings');
        const ratingEl = document.getElementById('rating');
        const completedJobsEl = document.getElementById('completed-jobs');
        
        if (totalJobsEl) totalJobsEl.textContent = this.jobs.length;
        if (totalEarningsEl) totalEarningsEl.textContent = `$${this.currentUser.totalEarnings || 0}`;
        if (ratingEl) ratingEl.textContent = '5.0';
        if (completedJobsEl) completedJobsEl.textContent = this.currentUser.completedJobs || 0;
        
        // Load recent activity
        this.loadRecentActivity();
    }

    loadRecentActivity() {
        const activityList = document.getElementById('recent-activity');
        if (!activityList) return;
        
        const activities = [
            {
                icon: 'fas fa-user-plus',
                text: `Welcome to BaseBridge, ${this.currentUser.name}!`,
                time: 'Just now'
            }
        ];
        
        // Add job-related activities
        if (this.jobs.length > 0) {
            activities.unshift({
                icon: 'fas fa-briefcase',
                text: `You have ${this.jobs.length} active job${this.jobs.length > 1 ? 's' : ''}`,
                time: '1 hour ago'
            });
        }
        
        if (this.currentUser.registered) {
            activities.unshift({
                icon: 'fas fa-check-circle',
                text: 'Account registration completed',
                time: '2 hours ago'
            });
        }
        
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <p>${activity.text}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }

    loadJobsSection() {
        this.showJobsTab('active');
    }

    showJobsTab(tab) {
        const jobsList = document.getElementById('jobs-list');
        if (!jobsList) return;
        
        let filteredJobs = [];
        
        switch (tab) {
            case 'active':
                filteredJobs = this.jobs.filter(job => job.status === 'active');
                break;
            case 'completed':
                filteredJobs = this.jobs.filter(job => job.status === 'completed');
                break;
            case 'draft':
                filteredJobs = this.jobs.filter(job => job.status === 'draft');
                break;
        }
        
        if (filteredJobs.length === 0) {
            jobsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-briefcase"></i>
                    <h3>No ${tab} jobs found</h3>
                    <p>Start by posting your first job or browse available opportunities.</p>
                    <a href="post-job" class="btn btn-primary">Post Your First Job</a>
                </div>
            `;
        } else {
            jobsList.innerHTML = filteredJobs.map(job => `
                <div class="job-card">
                    <div class="job-header">
                        <h3>${job.title}</h3>
                        <span class="job-status status-${job.status}">${job.status}</span>
                    </div>
                    <p class="job-description">${job.description}</p>
                    <div class="job-meta">
                        <span class="job-budget">$${job.budget}</span>
                        <span class="job-date">${new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div class="job-actions">
                        <button class="btn btn-outline">Edit</button>
                        <button class="btn btn-primary">View Details</button>
                    </div>
                </div>
            `).join('');
        }
    }

    loadApplicationsSection() {
        this.filterApplications('all');
    }

    filterApplications(filter) {
        const applicationsList = document.getElementById('applications-list');
        if (!applicationsList) return;
        
        let filteredApps = this.applications;
        
        if (filter !== 'all') {
            filteredApps = this.applications.filter(app => app.status === filter);
        }
        
        if (filteredApps.length === 0) {
            applicationsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-file-alt"></i>
                    <h3>No ${filter === 'all' ? '' : filter + ' '}applications yet</h3>
                    <p>Your job applications will appear here.</p>
                    <a href="jobs" class="btn btn-primary">Browse Jobs</a>
                </div>
            `;
        } else {
            applicationsList.innerHTML = filteredApps.map(app => `
                <div class="application-card">
                    <div class="application-header">
                        <h3>${app.jobTitle}</h3>
                        <span class="application-status status-${app.status}">${app.status}</span>
                    </div>
                    <p class="application-message">${app.message}</p>
                    <div class="application-meta">
                        <span class="application-date">${new Date(app.appliedAt).toLocaleDateString()}</span>
                        <span class="application-budget">$${app.proposedBudget}</span>
                    </div>
                </div>
            `).join('');
        }
    }

    loadEarningsSection() {
        // This would typically load real earnings data
        // For now, we'll use mock data based on user info
        const totalBalance = this.currentUser.totalEarnings || 0;
        const thisMonth = Math.floor(totalBalance * 0.3);
        const pending = Math.floor(totalBalance * 0.1);
        
        // Update earnings display (already handled in HTML)
    }

    loadMessagesSection() {
        // Mock message loading
        // In a real app, this would fetch messages from a server
    }

    sendMessage(message) {
        const chatMessages = document.querySelector('.chat-messages');
        if (!chatMessages) return;
        
        const messageEl = document.createElement('div');
        messageEl.className = 'message sent';
        messageEl.innerHTML = `
            <div class="message-bubble">
                <p>${message}</p>
                <span class="message-timestamp">${new Date().toLocaleTimeString()}</span>
            </div>
        `;
        
        chatMessages.appendChild(messageEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Mock auto-reply after 2 seconds
        setTimeout(() => {
            const replyEl = document.createElement('div');
            replyEl.className = 'message received';
            replyEl.innerHTML = `
                <div class="message-bubble">
                    <p>Thank you for your message! We'll get back to you soon.</p>
                    <span class="message-timestamp">${new Date().toLocaleTimeString()}</span>
                </div>
            `;
            chatMessages.appendChild(replyEl);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 2000);
    }

    updateSetting(settingItem, value) {
        const label = settingItem.querySelector('label').textContent;
        console.log(`Setting "${label}" updated to:`, value);
        
        // Here you would typically save the setting to localStorage or send to server
        const settings = JSON.parse(localStorage.getItem('bbeSettings') || '{}');
        settings[label] = value;
        localStorage.setItem('bbeSettings', JSON.stringify(settings));
        
        this.showNotification(`${label} ${value ? 'enabled' : 'disabled'}`, 'success');
    }

    logout() {
        // Clear user session
        localStorage.removeItem('bbeCurrentUser');
        
        // Show notification
        this.showNotification('Logged out successfully', 'success');
        
        // Redirect to auth page
        setTimeout(() => {
            window.location.href = '../auth';
        }, 1000);
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        if (!notification) return;
        
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

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DashboardApp();
});

// Add additional styles for job and application cards
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .job-card, .application-card {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        transition: all 0.2s ease;
    }
    
    .job-card:hover, .application-card:hover {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transform: translateY(-1px);
    }
    
    .job-header, .application-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .job-header h3, .application-header h3 {
        margin: 0;
        color: #1a202c;
        font-size: 1.125rem;
        font-weight: 600;
    }
    
    .job-status, .application-status {
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .status-active {
        background: #dcfce7;
        color: #166534;
    }
    
    .status-completed {
        background: #dbeafe;
        color: #1e40af;
    }
    
    .status-draft {
        background: #fef3c7;
        color: #92400e;
    }
    
    .status-pending {
        background: #fef3c7;
        color: #92400e;
    }
    
    .status-accepted {
        background: #dcfce7;
        color: #166534;
    }
    
    .status-rejected {
        background: #fee2e2;
        color: #991b1b;
    }
    
    .job-description, .application-message {
        color: #718096;
        margin-bottom: 1rem;
        line-height: 1.5;
    }
    
    .job-meta, .application-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        font-size: 0.875rem;
        color: #718096;
    }
    
    .job-budget, .application-budget {
        font-weight: 600;
        color: #10b981;
    }
    
    .job-actions {
        display: flex;
        gap: 1rem;
    }
    
    .job-actions .btn {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
    }
`;
document.head.appendChild(additionalStyles);