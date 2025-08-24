// Profile Page JavaScript

class ProfileApp {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.checkAuthentication();
        this.loadUserData();
        this.setupEventListeners();
        this.setupTabNavigation();
        this.updateProfileDisplay();
    }

    checkAuthentication() {
        const userData = localStorage.getItem('bbeCurrentUser');
        if (!userData) {
            window.location.href = '/auth';
            return;
        }
        this.currentUser = JSON.parse(userData);
    }

    loadUserData() {
        // Load additional profile data from localStorage or API
        const profileData = localStorage.getItem(`profile_${this.currentUser.id}`);
        if (profileData) {
            this.currentUser.profile = JSON.parse(profileData);
        } else {
            // Initialize default profile data
            this.currentUser.profile = {
                bio: '',
                skills: [],
                experience: [],
                education: [],
                portfolio: [],
                hourlyRate: 25,
                jobsCompleted: 0,
                totalEarned: 0,
                successRate: 100,
                reviews: [],
                settings: {
                    emailNotifications: true,
                    jobAlerts: true,
                    messageNotifications: true,
                    publicProfile: true,
                    showEarnings: false,
                    showLocation: true
                }
            };
        }
    }

    setupEventListeners() {
        // Logout functionality
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Avatar upload
        const avatarInput = document.getElementById('avatar-input');
        if (avatarInput) {
            avatarInput.addEventListener('change', (e) => this.handleAvatarUpload(e));
        }

        // Edit profile modal
        const editProfileBtn = document.getElementById('edit-profile-btn');
        const editProfileModal = document.getElementById('edit-profile-modal');
        const editProfileClose = document.getElementById('edit-profile-close');
        const cancelEditProfile = document.getElementById('cancel-edit-profile');
        const saveProfileChanges = document.getElementById('save-profile-changes');

        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => this.openEditProfileModal());
        }
        if (editProfileClose) {
            editProfileClose.addEventListener('click', () => this.closeEditProfileModal());
        }
        if (cancelEditProfile) {
            cancelEditProfile.addEventListener('click', () => this.closeEditProfileModal());
        }
        if (saveProfileChanges) {
            saveProfileChanges.addEventListener('click', () => this.saveProfileChanges());
        }

        // Edit buttons for overview sections
        const editAboutBtn = document.getElementById('edit-about-btn');
        const editSkillsBtn = document.getElementById('edit-skills-btn');
        const editExperienceBtn = document.getElementById('edit-experience-btn');
        const editEducationBtn = document.getElementById('edit-education-btn');

        if (editAboutBtn) {
            editAboutBtn.addEventListener('click', () => this.editAbout());
        }
        if (editSkillsBtn) {
            editSkillsBtn.addEventListener('click', () => this.editSkills());
        }
        if (editExperienceBtn) {
            editExperienceBtn.addEventListener('click', () => this.editExperience());
        }
        if (editEducationBtn) {
            editEducationBtn.addEventListener('click', () => this.editEducation());
        }

        // Portfolio buttons
        const addPortfolioBtn = document.getElementById('add-portfolio-btn');
        const addFirstPortfolio = document.getElementById('add-first-portfolio');

        if (addPortfolioBtn) {
            addPortfolioBtn.addEventListener('click', () => this.addPortfolioItem());
        }
        if (addFirstPortfolio) {
            addFirstPortfolio.addEventListener('click', () => this.addPortfolioItem());
        }

        // Settings forms
        const accountSettingsForm = document.getElementById('account-settings-form');
        const notificationSettingsForm = document.getElementById('notification-settings-form');
        const privacySettingsForm = document.getElementById('privacy-settings-form');

        if (accountSettingsForm) {
            accountSettingsForm.addEventListener('submit', (e) => this.saveAccountSettings(e));
        }
        if (notificationSettingsForm) {
            notificationSettingsForm.addEventListener('submit', (e) => this.saveNotificationSettings(e));
        }
        if (privacySettingsForm) {
            privacySettingsForm.addEventListener('submit', (e) => this.savePrivacySettings(e));
        }

        // Danger zone buttons
        const deactivateAccountBtn = document.getElementById('deactivate-account');
        const deleteAccountBtn = document.getElementById('delete-account');

        if (deactivateAccountBtn) {
            deactivateAccountBtn.addEventListener('click', () => this.deactivateAccount());
        }
        if (deleteAccountBtn) {
            deleteAccountBtn.addEventListener('click', () => this.deleteAccount());
        }

        // View public profile
        const viewPublicProfile = document.getElementById('view-public-profile');
        if (viewPublicProfile) {
            viewPublicProfile.addEventListener('click', () => this.viewPublicProfile());
        }

        // Wallet link
        const walletLink = document.getElementById('wallet-link');
        if (walletLink) {
            walletLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showNotification('Wallet integration coming soon!', 'info');
            });
        }
    }

    setupTabNavigation() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                
                // Remove active class from all tabs and panes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding pane
                btn.classList.add('active');
                const targetPane = document.getElementById(`${targetTab}-tab`);
                if (targetPane) {
                    targetPane.classList.add('active');
                }

                // Load tab-specific content
                this.loadTabContent(targetTab);
            });
        });
    }

    updateProfileDisplay() {
        // Update basic profile info
        const profileName = document.getElementById('profile-name');
        const profileRole = document.getElementById('profile-role');
        const avatarInitial = document.getElementById('avatar-initial');
        const profileBadges = document.getElementById('profile-badges');

        if (profileName) {
            profileName.textContent = this.currentUser.name || 'User Name';
        }
        if (profileRole) {
            profileRole.textContent = this.currentUser.role || 'Freelancer';
        }
        if (avatarInitial) {
            avatarInitial.textContent = (this.currentUser.name || 'U').charAt(0).toUpperCase();
        }

        // Update badges
        this.updateProfileBadges();

        // Update stats
        this.updateProfileStats();

        // Update settings forms
        this.updateSettingsForms();
    }

    updateProfileBadges() {
        const badgesContainer = document.getElementById('profile-badges');
        if (!badgesContainer) return;

        badgesContainer.innerHTML = '';

        // Add badges based on user status
        if (this.currentUser.isRegistered) {
            const registeredBadge = document.createElement('span');
            registeredBadge.className = 'badge registered';
            registeredBadge.textContent = 'Registered';
            badgesContainer.appendChild(registeredBadge);
        }

        if (this.currentUser.isPremium) {
            const premiumBadge = document.createElement('span');
            premiumBadge.className = 'badge premium';
            premiumBadge.textContent = 'Premium';
            badgesContainer.appendChild(premiumBadge);
        }

        if (this.currentUser.isVerified) {
            const verifiedBadge = document.createElement('span');
            verifiedBadge.className = 'badge verified';
            verifiedBadge.textContent = 'Verified';
            badgesContainer.appendChild(verifiedBadge);
        }
    }

    updateProfileStats() {
        const jobsCompleted = document.getElementById('jobs-completed');
        const totalEarned = document.getElementById('total-earned');
        const successRate = document.getElementById('success-rate');

        if (jobsCompleted) {
            jobsCompleted.textContent = this.currentUser.profile?.jobsCompleted || 0;
        }
        if (totalEarned) {
            totalEarned.textContent = `$${this.currentUser.profile?.totalEarned || 0}`;
        }
        if (successRate) {
            successRate.textContent = `${this.currentUser.profile?.successRate || 100}%`;
        }
    }

    updateSettingsForms() {
        // Update account settings form
        const settingsName = document.getElementById('settings-name');
        const settingsEmail = document.getElementById('settings-email');
        const settingsPhone = document.getElementById('settings-phone');
        const settingsLocation = document.getElementById('settings-location');
        const settingsTimezone = document.getElementById('settings-timezone');

        if (settingsName) settingsName.value = this.currentUser.name || '';
        if (settingsEmail) settingsEmail.value = this.currentUser.email || '';
        if (settingsPhone) settingsPhone.value = this.currentUser.phone || '';
        if (settingsLocation) settingsLocation.value = this.currentUser.location || '';
        if (settingsTimezone) settingsTimezone.value = this.currentUser.timezone || 'UTC';

        // Update notification settings
        const settings = this.currentUser.profile?.settings || {};
        const emailNotifications = document.getElementById('email-notifications');
        const jobAlerts = document.getElementById('job-alerts');
        const messageNotifications = document.getElementById('message-notifications');
        const publicProfile = document.getElementById('public-profile');
        const showEarnings = document.getElementById('show-earnings');
        const showLocation = document.getElementById('show-location');

        if (emailNotifications) emailNotifications.checked = settings.emailNotifications !== false;
        if (jobAlerts) jobAlerts.checked = settings.jobAlerts !== false;
        if (messageNotifications) messageNotifications.checked = settings.messageNotifications !== false;
        if (publicProfile) publicProfile.checked = settings.publicProfile !== false;
        if (showEarnings) showEarnings.checked = settings.showEarnings === true;
        if (showLocation) showLocation.checked = settings.showLocation !== false;
    }

    loadTabContent(tabName) {
        switch (tabName) {
            case 'overview':
                this.loadOverviewContent();
                break;
            case 'portfolio':
                this.loadPortfolioContent();
                break;
            case 'reviews':
                this.loadReviewsContent();
                break;
            case 'settings':
                // Settings are already loaded
                break;
        }
    }

    loadOverviewContent() {
        // Load about section
        const aboutText = document.getElementById('about-text');
        if (aboutText) {
            const bio = this.currentUser.profile?.bio;
            if (bio) {
                aboutText.innerHTML = `<p>${bio}</p>`;
            } else {
                aboutText.innerHTML = '<p>No bio available. Click edit to add your professional summary.</p>';
            }
        }

        // Load skills
        this.loadSkills();

        // Load experience
        this.loadExperience();

        // Load education
        this.loadEducation();
    }

    loadSkills() {
        const skillsList = document.getElementById('skills-list');
        if (!skillsList) return;

        const skills = this.currentUser.profile?.skills || [];
        if (skills.length > 0) {
            skillsList.innerHTML = skills.map(skill => 
                `<span class="skill-tag">${skill}</span>`
            ).join('');
        } else {
            skillsList.innerHTML = '<p class="no-skills">No skills added yet. Click edit to add your skills.</p>';
        }
    }

    loadExperience() {
        const experienceList = document.getElementById('experience-list');
        if (!experienceList) return;

        const experience = this.currentUser.profile?.experience || [];
        if (experience.length > 0) {
            experienceList.innerHTML = experience.map(exp => `
                <div class="experience-item">
                    <div class="experience-title">${exp.title}</div>
                    <div class="experience-company">${exp.company}</div>
                    <div class="experience-period">${exp.period}</div>
                    <div class="experience-description">${exp.description}</div>
                </div>
            `).join('');
        } else {
            experienceList.innerHTML = '<p class="no-experience">No experience added yet. Click edit to add your work experience.</p>';
        }
    }

    loadEducation() {
        const educationList = document.getElementById('education-list');
        if (!educationList) return;

        const education = this.currentUser.profile?.education || [];
        if (education.length > 0) {
            educationList.innerHTML = education.map(edu => `
                <div class="education-item">
                    <div class="education-title">${edu.degree}</div>
                    <div class="education-school">${edu.school}</div>
                    <div class="education-period">${edu.period}</div>
                    <div class="education-description">${edu.description || ''}</div>
                </div>
            `).join('');
        } else {
            educationList.innerHTML = '<p class="no-education">No education added yet. Click edit to add your educational background.</p>';
        }
    }

    loadPortfolioContent() {
        const portfolioGrid = document.getElementById('portfolio-grid');
        if (!portfolioGrid) return;

        const portfolio = this.currentUser.profile?.portfolio || [];
        if (portfolio.length > 0) {
            portfolioGrid.innerHTML = portfolio.map(item => `
                <div class="portfolio-item">
                    <div class="portfolio-image">
                        <i class="fas fa-image"></i>
                    </div>
                    <div class="portfolio-content">
                        <div class="portfolio-title">${item.title}</div>
                        <div class="portfolio-description">${item.description}</div>
                        <div class="portfolio-tags">
                            ${item.tags.map(tag => `<span class="portfolio-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `).join('');
        } else {
            portfolioGrid.innerHTML = `
                <div class="empty-portfolio">
                    <i class="fas fa-folder-open"></i>
                    <h4>No Portfolio Items</h4>
                    <p>Showcase your best work by adding portfolio projects.</p>
                    <button class="btn btn-primary" id="add-first-portfolio">
                        <i class="fas fa-plus"></i> Add Your First Project
                    </button>
                </div>
            `;
            
            // Re-attach event listener for the new button
            const addFirstPortfolio = document.getElementById('add-first-portfolio');
            if (addFirstPortfolio) {
                addFirstPortfolio.addEventListener('click', () => this.addPortfolioItem());
            }
        }
    }

    loadReviewsContent() {
        const reviewsList = document.getElementById('reviews-list');
        const overallRating = document.getElementById('overall-rating');
        const overallStars = document.getElementById('overall-stars');
        const ratingCount = document.getElementById('rating-count');

        if (!reviewsList) return;

        const reviews = this.currentUser.profile?.reviews || [];
        if (reviews.length > 0) {
            // Calculate average rating
            const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
            
            if (overallRating) overallRating.textContent = avgRating.toFixed(1);
            if (ratingCount) ratingCount.textContent = `(${reviews.length} reviews)`;
            
            // Update stars
            if (overallStars) {
                const stars = overallStars.querySelectorAll('i');
                stars.forEach((star, index) => {
                    star.className = index < Math.floor(avgRating) ? 'fas fa-star' : 'far fa-star';
                });
            }

            // Display reviews
            reviewsList.innerHTML = reviews.map(review => `
                <div class="review-item">
                    <div class="review-header">
                        <div class="review-client">${review.clientName}</div>
                        <div class="review-date">${review.date}</div>
                    </div>
                    <div class="review-rating">
                        ${Array(5).fill().map((_, i) => 
                            `<i class="${i < review.rating ? 'fas' : 'far'} fa-star"></i>`
                        ).join('')}
                    </div>
                    <div class="review-text">${review.text}</div>
                </div>
            `).join('');
        } else {
            if (overallRating) overallRating.textContent = '5.0';
            if (ratingCount) ratingCount.textContent = '(0 reviews)';
            
            reviewsList.innerHTML = `
                <div class="empty-reviews">
                    <i class="fas fa-star"></i>
                    <h4>No Reviews Yet</h4>
                    <p>Complete your first job to start receiving client reviews.</p>
                </div>
            `;
        }
    }

    // Modal and editing functions
    openEditProfileModal() {
        const modal = document.getElementById('edit-profile-modal');
        const editName = document.getElementById('edit-name');
        const editTitle = document.getElementById('edit-title');
        const editBio = document.getElementById('edit-bio');
        const editHourlyRate = document.getElementById('edit-hourly-rate');

        if (editName) editName.value = this.currentUser.name || '';
        if (editTitle) editTitle.value = this.currentUser.title || '';
        if (editBio) editBio.value = this.currentUser.profile?.bio || '';
        if (editHourlyRate) editHourlyRate.value = this.currentUser.profile?.hourlyRate || 25;

        if (modal) {
            modal.classList.add('active');
        }
    }

    closeEditProfileModal() {
        const modal = document.getElementById('edit-profile-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    saveProfileChanges() {
        const editName = document.getElementById('edit-name');
        const editTitle = document.getElementById('edit-title');
        const editBio = document.getElementById('edit-bio');
        const editHourlyRate = document.getElementById('edit-hourly-rate');

        // Update user data
        if (editName) this.currentUser.name = editName.value;
        if (editTitle) this.currentUser.title = editTitle.value;
        if (editBio) this.currentUser.profile.bio = editBio.value;
        if (editHourlyRate) this.currentUser.profile.hourlyRate = parseInt(editHourlyRate.value);

        // Save to localStorage
        this.saveUserData();

        // Update display
        this.updateProfileDisplay();
        this.loadOverviewContent();

        // Close modal
        this.closeEditProfileModal();

        this.showNotification('Profile updated successfully!', 'success');
    }

    editAbout() {
        const currentBio = this.currentUser.profile?.bio || '';
        const newBio = prompt('Edit your bio:', currentBio);
        if (newBio !== null) {
            this.currentUser.profile.bio = newBio;
            this.saveUserData();
            this.loadOverviewContent();
            this.showNotification('Bio updated successfully!', 'success');
        }
    }

    editSkills() {
        const currentSkills = this.currentUser.profile?.skills || [];
        const skillsString = currentSkills.join(', ');
        const newSkillsString = prompt('Edit your skills (comma-separated):', skillsString);
        if (newSkillsString !== null) {
            this.currentUser.profile.skills = newSkillsString
                .split(',')
                .map(skill => skill.trim())
                .filter(skill => skill.length > 0);
            this.saveUserData();
            this.loadSkills();
            this.showNotification('Skills updated successfully!', 'success');
        }
    }

    editExperience() {
        this.showNotification('Experience editing modal coming soon!', 'info');
    }

    editEducation() {
        this.showNotification('Education editing modal coming soon!', 'info');
    }

    addPortfolioItem() {
        this.showNotification('Portfolio item creation modal coming soon!', 'info');
    }

    handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const avatarElement = document.getElementById('profile-avatar');
                if (avatarElement) {
                    avatarElement.style.backgroundImage = `url(${e.target.result})`;
                    avatarElement.style.backgroundSize = 'cover';
                    avatarElement.style.backgroundPosition = 'center';
                    const initialElement = document.getElementById('avatar-initial');
                    if (initialElement) {
                        initialElement.style.display = 'none';
                    }
                }
                this.showNotification('Avatar updated successfully!', 'success');
            };
            reader.readAsDataURL(file);
        }
    }

    saveAccountSettings(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        this.currentUser.name = formData.get('name');
        this.currentUser.email = formData.get('email');
        this.currentUser.phone = formData.get('phone');
        this.currentUser.location = formData.get('location');
        this.currentUser.timezone = formData.get('timezone');

        this.saveUserData();
        this.updateProfileDisplay();
        this.showNotification('Account settings saved successfully!', 'success');
    }

    saveNotificationSettings(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        this.currentUser.profile.settings.emailNotifications = formData.has('emailNotifications');
        this.currentUser.profile.settings.jobAlerts = formData.has('jobAlerts');
        this.currentUser.profile.settings.messageNotifications = formData.has('messageNotifications');

        this.saveUserData();
        this.showNotification('Notification preferences saved successfully!', 'success');
    }

    savePrivacySettings(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        this.currentUser.profile.settings.publicProfile = formData.has('publicProfile');
        this.currentUser.profile.settings.showEarnings = formData.has('showEarnings');
        this.currentUser.profile.settings.showLocation = formData.has('showLocation');

        this.saveUserData();
        this.showNotification('Privacy settings saved successfully!', 'success');
    }

    deactivateAccount() {
        if (confirm('Are you sure you want to deactivate your account? You can reactivate it later.')) {
            this.showNotification('Account deactivation feature coming soon!', 'info');
        }
    }

    deleteAccount() {
        if (confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
            if (confirm('This will permanently delete all your data. Are you absolutely sure?')) {
                this.showNotification('Account deletion feature coming soon!', 'info');
            }
        }
    }

    viewPublicProfile() {
        this.showNotification('Public profile view coming soon!', 'info');
    }

    saveUserData() {
        localStorage.setItem('bbeCurrentUser', JSON.stringify(this.currentUser));
        localStorage.setItem(`profile_${this.currentUser.id}`, JSON.stringify(this.currentUser.profile));
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const messageElement = notification.querySelector('.notification-message');
        const iconElement = notification.querySelector('.notification-icon');
        
        if (messageElement) {
            messageElement.textContent = message;
        }
        
        // Update icon based on type
        if (iconElement) {
            iconElement.className = 'notification-icon fas ';
            switch (type) {
                case 'success':
                    iconElement.classList.add('fa-check-circle');
                    notification.className = 'notification';
                    break;
                case 'error':
                    iconElement.classList.add('fa-exclamation-circle');
                    notification.className = 'notification error';
                    break;
                case 'warning':
                    iconElement.classList.add('fa-exclamation-triangle');
                    notification.className = 'notification warning';
                    break;
                case 'info':
                    iconElement.classList.add('fa-info-circle');
                    notification.className = 'notification';
                    break;
            }
        }
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('bbeCurrentUser');
            window.location.href = '/auth';
        }
    }
}

// Initialize the profile app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ProfileApp();
});