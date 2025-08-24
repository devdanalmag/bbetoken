class JobsApp {
    constructor() {
        this.currentUser = null;
        this.allJobs = [];
        this.filteredJobs = [];
        this.currentPage = 1;
        this.jobsPerPage = 10;
        this.currentView = 'list';
        this.currentSort = 'newest';
        this.filters = {
            search: '',
            categories: [],
            budget: '',
            duration: [],
            experience: [],
            skills: []
        };
        this.init();
    }

    init() {
        this.checkAuthentication();
        this.setupEventListeners();
        this.generateMockJobs();
        this.loadJobs();
    }

    checkAuthentication() {
        const savedUser = localStorage.getItem('bbeCurrentUser');
        if (!savedUser) {
            // Allow browsing without login, but limit functionality
            this.currentUser = null;
        } else {
            try {
                this.currentUser = JSON.parse(savedUser);
            } catch (error) {
                console.error('Error parsing user data:', error);
                this.currentUser = null;
            }
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('job-search');
        const searchBtn = document.getElementById('search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filters.search = e.target.value;
                this.debounceSearch();
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.applyFilters();
                }
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.applyFilters());
        }

        // Filter checkboxes and radio buttons
        const filterInputs = document.querySelectorAll('.filter-option input');
        filterInputs.forEach(input => {
            input.addEventListener('change', () => this.handleFilterChange(input));
        });

        // Skill tags
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('click', () => this.toggleSkillFilter(tag));
        });

        // Clear filters
        const clearFilters = document.getElementById('clear-filters');
        if (clearFilters) {
            clearFilters.addEventListener('click', () => this.clearAllFilters());
        }

        // Sort and view options
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.applyFilters();
            });
        }

        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                this.setView(view);
                
                // Update active state
                viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Modal functionality
        const modal = document.getElementById('application-modal');
        const modalClose = document.getElementById('modal-close');
        const cancelBtn = document.getElementById('cancel-application');
        const applicationForm = document.getElementById('application-form');
        
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closeModal());
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
        
        if (applicationForm) {
            applicationForm.addEventListener('submit', (e) => this.submitApplication(e));
        }

        // Logout functionality
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn && this.currentUser) {
            logoutBtn.addEventListener('click', () => this.logout());
        } else if (logoutBtn) {
            logoutBtn.textContent = 'Login';
            logoutBtn.addEventListener('click', () => {
                window.location.href = 'auth';
            });
        }
    }

    generateMockJobs() {
        const mockJobs = [
            {
                id: '1',
                title: 'Full-Stack Web Application Development',
                description: 'Looking for an experienced full-stack developer to build a modern web application using React and Node.js. The project involves creating a user dashboard, API integration, and responsive design.',
                budget: 2500,
                category: 'web-development',
                duration: 'medium',
                experience: 'intermediate',
                skills: ['javascript', 'react', 'nodejs'],
                clientName: 'TechCorp Inc.',
                clientInitial: 'T',
                postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                status: 'active',
                applicants: 12
            },
            {
                id: '2',
                title: 'Mobile App UI/UX Design',
                description: 'Need a talented designer to create modern, user-friendly interfaces for our mobile application. Must have experience with Figma and mobile design principles.',
                budget: 1200,
                category: 'design',
                duration: 'short',
                experience: 'intermediate',
                skills: ['figma', 'ui-design', 'mobile-design'],
                clientName: 'StartupXYZ',
                clientInitial: 'S',
                postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                status: 'active',
                applicants: 8
            },
            {
                id: '3',
                title: 'WordPress E-commerce Website',
                description: 'Build a complete e-commerce website using WordPress and WooCommerce. Need someone experienced with payment integration and custom themes.',
                budget: 1800,
                category: 'web-development',
                duration: 'medium',
                experience: 'intermediate',
                skills: ['wordpress', 'woocommerce', 'php'],
                clientName: 'RetailBusiness',
                clientInitial: 'R',
                postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                status: 'active',
                applicants: 15
            },
            {
                id: '4',
                title: 'Python Data Analysis Script',
                description: 'Create a Python script to analyze large datasets and generate reports. Experience with pandas, matplotlib, and data visualization required.',
                budget: 800,
                category: 'programming',
                duration: 'short',
                experience: 'intermediate',
                skills: ['python', 'pandas', 'data-analysis'],
                clientName: 'DataCorp',
                clientInitial: 'D',
                postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                status: 'active',
                applicants: 6
            },
            {
                id: '5',
                title: 'Content Writing for Tech Blog',
                description: 'Looking for a skilled content writer to create engaging articles about technology trends, software development, and digital marketing.',
                budget: 600,
                category: 'writing',
                duration: 'long',
                experience: 'entry',
                skills: ['content-writing', 'seo', 'tech-writing'],
                clientName: 'TechBlog Media',
                clientInitial: 'T',
                postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                status: 'active',
                applicants: 20
            },
            {
                id: '6',
                title: 'React Native Mobile App Development',
                description: 'Develop a cross-platform mobile application using React Native. The app should include user authentication, real-time messaging, and push notifications.',
                budget: 3500,
                category: 'mobile-development',
                duration: 'long',
                experience: 'expert',
                skills: ['react-native', 'javascript', 'mobile-development'],
                clientName: 'MobileFirst',
                clientInitial: 'M',
                postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
                status: 'active',
                applicants: 9
            },
            {
                id: '7',
                title: 'SEO Optimization for E-commerce Site',
                description: 'Improve search engine rankings for our e-commerce website. Need comprehensive SEO audit, keyword research, and implementation of best practices.',
                budget: 1000,
                category: 'marketing',
                duration: 'medium',
                experience: 'intermediate',
                skills: ['seo', 'google-analytics', 'keyword-research'],
                clientName: 'OnlineStore',
                clientInitial: 'O',
                postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                status: 'active',
                applicants: 11
            },
            {
                id: '8',
                title: 'Logo and Brand Identity Design',
                description: 'Create a complete brand identity package including logo, color palette, typography, and brand guidelines for a new tech startup.',
                budget: 1500,
                category: 'design',
                duration: 'short',
                experience: 'intermediate',
                skills: ['logo-design', 'branding', 'adobe-illustrator'],
                clientName: 'NewTech Startup',
                clientInitial: 'N',
                postedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
                status: 'active',
                applicants: 14
            }
        ];

        // Save to localStorage
        localStorage.setItem('bbeAllJobs', JSON.stringify(mockJobs));
        this.allJobs = mockJobs;
    }

    loadJobs() {
        // Try to load from localStorage first
        const savedJobs = localStorage.getItem('bbeAllJobs');
        if (savedJobs) {
            try {
                this.allJobs = JSON.parse(savedJobs);
            } catch (error) {
                console.error('Error loading jobs:', error);
                this.generateMockJobs();
            }
        } else {
            this.generateMockJobs();
        }

        this.applyFilters();
    }

    handleFilterChange(input) {
        const name = input.name;
        const value = input.value;
        const checked = input.checked;

        switch (name) {
            case 'category':
                if (checked) {
                    this.filters.categories.push(value);
                } else {
                    this.filters.categories = this.filters.categories.filter(c => c !== value);
                }
                break;
            case 'budget':
                this.filters.budget = checked ? value : '';
                break;
            case 'duration':
                if (checked) {
                    this.filters.duration.push(value);
                } else {
                    this.filters.duration = this.filters.duration.filter(d => d !== value);
                }
                break;
            case 'experience':
                if (checked) {
                    this.filters.experience.push(value);
                } else {
                    this.filters.experience = this.filters.experience.filter(e => e !== value);
                }
                break;
        }

        this.applyFilters();
    }

    toggleSkillFilter(tag) {
        const skill = tag.dataset.skill;
        const isActive = tag.classList.contains('active');

        if (isActive) {
            tag.classList.remove('active');
            this.filters.skills = this.filters.skills.filter(s => s !== skill);
        } else {
            tag.classList.add('active');
            this.filters.skills.push(skill);
        }

        this.applyFilters();
    }

    clearAllFilters() {
        // Reset filters
        this.filters = {
            search: '',
            categories: [],
            budget: '',
            duration: [],
            experience: [],
            skills: []
        };

        // Clear UI
        document.getElementById('job-search').value = '';
        
        const filterInputs = document.querySelectorAll('.filter-option input');
        filterInputs.forEach(input => input.checked = false);
        
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => tag.classList.remove('active'));

        this.applyFilters();
    }

    debounceSearch() {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.applyFilters();
        }, 300);
    }

    applyFilters() {
        let filtered = [...this.allJobs];

        // Apply search filter
        if (this.filters.search) {
            const searchTerm = this.filters.search.toLowerCase();
            filtered = filtered.filter(job => 
                job.title.toLowerCase().includes(searchTerm) ||
                job.description.toLowerCase().includes(searchTerm) ||
                job.skills.some(skill => skill.toLowerCase().includes(searchTerm))
            );
        }

        // Apply category filter
        if (this.filters.categories.length > 0) {
            filtered = filtered.filter(job => 
                this.filters.categories.includes(job.category)
            );
        }

        // Apply budget filter
        if (this.filters.budget) {
            filtered = filtered.filter(job => {
                const budget = job.budget;
                switch (this.filters.budget) {
                    case '0-500':
                        return budget <= 500;
                    case '500-1000':
                        return budget > 500 && budget <= 1000;
                    case '1000-2500':
                        return budget > 1000 && budget <= 2500;
                    case '2500+':
                        return budget > 2500;
                    default:
                        return true;
                }
            });
        }

        // Apply duration filter
        if (this.filters.duration.length > 0) {
            filtered = filtered.filter(job => 
                this.filters.duration.includes(job.duration)
            );
        }

        // Apply experience filter
        if (this.filters.experience.length > 0) {
            filtered = filtered.filter(job => 
                this.filters.experience.includes(job.experience)
            );
        }

        // Apply skills filter
        if (this.filters.skills.length > 0) {
            filtered = filtered.filter(job => 
                this.filters.skills.some(skill => job.skills.includes(skill))
            );
        }

        // Apply sorting
        this.sortJobs(filtered);

        this.filteredJobs = filtered;
        this.currentPage = 1;
        this.renderJobs();
        this.updateResultsCount();
    }

    sortJobs(jobs) {
        switch (this.currentSort) {
            case 'newest':
                jobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
                break;
            case 'oldest':
                jobs.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
                break;
            case 'budget-high':
                jobs.sort((a, b) => b.budget - a.budget);
                break;
            case 'budget-low':
                jobs.sort((a, b) => a.budget - b.budget);
                break;
            case 'title':
                jobs.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }
    }

    setView(view) {
        this.currentView = view;
        const container = document.getElementById('jobs-container');
        
        if (view === 'grid') {
            container.classList.add('grid-view');
            container.classList.remove('list-view');
        } else {
            container.classList.add('list-view');
            container.classList.remove('grid-view');
        }
        
        this.renderJobs();
    }

    renderJobs() {
        const container = document.getElementById('jobs-container');
        if (!container) return;

        if (this.filteredJobs.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>No jobs found</h3>
                    <p>Try adjusting your filters or search terms to find more opportunities.</p>
                    <button class="btn btn-primary" onclick="jobsApp.clearAllFilters()">Clear Filters</button>
                </div>
            `;
            return;
        }

        // Calculate pagination
        const startIndex = (this.currentPage - 1) * this.jobsPerPage;
        const endIndex = startIndex + this.jobsPerPage;
        const jobsToShow = this.filteredJobs.slice(startIndex, endIndex);

        container.innerHTML = jobsToShow.map(job => this.renderJobCard(job)).join('');
        
        // Add event listeners to job cards
        this.attachJobCardListeners();
        
        // Render pagination
        this.renderPagination();
    }

    renderJobCard(job) {
        const timeAgo = this.getTimeAgo(job.postedDate);
        const skillsHtml = job.skills.map(skill => 
            `<span class="job-skill">${skill}</span>`
        ).join('');

        return `
            <div class="job-card" data-job-id="${job.id}">
                <div class="job-header">
                    <h3 class="job-title">${job.title}</h3>
                    <div class="job-budget">$${job.budget.toLocaleString()}</div>
                </div>
                <p class="job-description">${job.description}</p>
                <div class="job-skills">${skillsHtml}</div>
                <div class="job-meta">
                    <div class="job-client">
                        <div class="client-avatar">${job.clientInitial}</div>
                        <span>${job.clientName}</span>
                    </div>
                    <div class="job-posted">
                        <i class="fas fa-clock"></i>
                        <span>${timeAgo}</span>
                    </div>
                </div>
                <div class="job-actions">
                    <button class="btn-apply" data-job-id="${job.id}">
                        <i class="fas fa-paper-plane"></i>
                        Apply Now
                    </button>
                    <button class="btn-save" data-job-id="${job.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
    }

    attachJobCardListeners() {
        // Apply buttons
        const applyBtns = document.querySelectorAll('.btn-apply');
        applyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const jobId = btn.dataset.jobId;
                this.openApplicationModal(jobId);
            });
        });

        // Save buttons
        const saveBtns = document.querySelectorAll('.btn-save');
        saveBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const jobId = btn.dataset.jobId;
                this.toggleSaveJob(jobId, btn);
            });
        });
    }

    openApplicationModal(jobId) {
        if (!this.currentUser) {
            this.showNotification('Please login to apply for jobs', 'error');
            setTimeout(() => {
                window.location.href = 'auth';
            }, 2000);
            return;
        }

        const job = this.allJobs.find(j => j.id === jobId);
        if (!job) return;

        // Set job ID in hidden field
        document.getElementById('job-id').value = jobId;
        
        // Show modal
        const modal = document.getElementById('application-modal');
        modal.classList.add('show');
        
        // Focus on cover letter
        setTimeout(() => {
            document.getElementById('cover-letter').focus();
        }, 300);
    }

    closeModal() {
        const modal = document.getElementById('application-modal');
        modal.classList.remove('show');
        
        // Reset form
        document.getElementById('application-form').reset();
    }

    submitApplication(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const applicationData = {
            id: Date.now().toString(),
            jobId: document.getElementById('job-id').value,
            applicantId: this.currentUser.id,
            coverLetter: document.getElementById('cover-letter').value,
            proposedBudget: document.getElementById('proposed-budget').value,
            deliveryTime: document.getElementById('delivery-time').value,
            portfolioLinks: document.getElementById('portfolio-links').value,
            appliedAt: new Date().toISOString(),
            status: 'pending'
        };

        // Get job details for application
        const job = this.allJobs.find(j => j.id === applicationData.jobId);
        if (job) {
            applicationData.jobTitle = job.title;
            applicationData.clientName = job.clientName;
        }

        // Save application
        const applications = JSON.parse(localStorage.getItem('bbeApplications') || '[]');
        applications.push(applicationData);
        localStorage.setItem('bbeApplications', JSON.stringify(applications));

        this.showNotification('Application submitted successfully!', 'success');
        this.closeModal();
    }

    toggleSaveJob(jobId, btn) {
        if (!this.currentUser) {
            this.showNotification('Please login to save jobs', 'error');
            return;
        }

        const savedJobs = JSON.parse(localStorage.getItem('bbeSavedJobs') || '[]');
        const isAlreadySaved = savedJobs.includes(jobId);

        if (isAlreadySaved) {
            // Remove from saved
            const updatedSaved = savedJobs.filter(id => id !== jobId);
            localStorage.setItem('bbeSavedJobs', JSON.stringify(updatedSaved));
            btn.classList.remove('saved');
            this.showNotification('Job removed from saved', 'success');
        } else {
            // Add to saved
            savedJobs.push(jobId);
            localStorage.setItem('bbeSavedJobs', JSON.stringify(savedJobs));
            btn.classList.add('saved');
            this.showNotification('Job saved successfully', 'success');
        }
    }

    renderPagination() {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;

        const totalPages = Math.ceil(this.filteredJobs.length / this.jobsPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHtml = '';
        
        // Previous button
        paginationHtml += `
            <button class="pagination-btn" ${this.currentPage === 1 ? 'disabled' : ''} 
                    onclick="jobsApp.goToPage(${this.currentPage - 1})">
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                paginationHtml += `
                    <button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" 
                            onclick="jobsApp.goToPage(${i})">
                        ${i}
                    </button>
                `;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                paginationHtml += '<span class="pagination-ellipsis">...</span>';
            }
        }
        
        // Next button
        paginationHtml += `
            <button class="pagination-btn" ${this.currentPage === totalPages ? 'disabled' : ''} 
                    onclick="jobsApp.goToPage(${this.currentPage + 1})">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        pagination.innerHTML = paginationHtml;
    }

    goToPage(page) {
        const totalPages = Math.ceil(this.filteredJobs.length / this.jobsPerPage);
        if (page < 1 || page > totalPages) return;
        
        this.currentPage = page;
        this.renderJobs();
        
        // Scroll to top of jobs
        document.querySelector('.jobs-main').scrollIntoView({ behavior: 'smooth' });
    }

    updateResultsCount() {
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            const total = this.filteredJobs.length;
            const start = (this.currentPage - 1) * this.jobsPerPage + 1;
            const end = Math.min(start + this.jobsPerPage - 1, total);
            
            if (total === 0) {
                resultsCount.textContent = 'No jobs found';
            } else {
                resultsCount.textContent = `Showing ${start}-${end} of ${total} jobs`;
            }
        }
    }

    getTimeAgo(date) {
        const now = new Date();
        const posted = new Date(date);
        const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));
        
        if (diffInHours < 1) {
            return 'Just posted';
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
        }
    }

    logout() {
        localStorage.removeItem('bbeCurrentUser');
        this.showNotification('Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'auth';
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

// Initialize the jobs app when DOM is loaded
let jobsApp;
document.addEventListener('DOMContentLoaded', () => {
    jobsApp = new JobsApp();
});

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        max-width: 400px;
    }
    
    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .notification.success {
        border-left: 4px solid #10b981;
    }
    
    .notification.error {
        border-left: 4px solid #ef4444;
    }
    
    .notification.warning {
        border-left: 4px solid #f59e0b;
    }
    
    .notification-icon {
        font-size: 1.25rem;
    }
    
    .notification.success .notification-icon {
        color: #10b981;
    }
    
    .notification.error .notification-icon {
        color: #ef4444;
    }
    
    .notification.warning .notification-icon {
        color: #f59e0b;
    }
    
    .notification-message {
        color: #1a202c;
        font-weight: 500;
    }
    
    .pagination-ellipsis {
        padding: 0.5rem;
        color: #718096;
    }
`;
document.head.appendChild(notificationStyles);