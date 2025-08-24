class PostJobApp {
    constructor() {
        this.currentUser = null;
        this.currentStep = 1;
        this.totalSteps = 3;
        this.selectedSkills = [];
        this.uploadedFiles = [];
        this.formData = {
            title: '',
            category: '',
            description: '',
            skills: [],
            duration: '',
            experience: '',
            budget: 0,
            deadline: '',
            specialRequirements: '',
            featured: false,
            urgent: false,
            attachments: []
        };
        this.init();
    }

    init() {
        this.checkAuthentication();
        this.setupEventListeners();
        this.updateStepIndicator();
        this.updatePreview();
        this.updatePricing();
    }

    checkAuthentication() {
        const savedUser = localStorage.getItem('bbeCurrentUser');
        if (!savedUser) {
            this.showNotification('Please login to post a job', 'error');
            setTimeout(() => {
                window.location.href = 'auth';
            }, 2000);
            return;
        }

        try {
            this.currentUser = JSON.parse(savedUser);
            if (!this.currentUser.registered) {
                this.showNotification('Please complete registration to post jobs', 'error');
                setTimeout(() => {
                    window.location.href = 'auth';
                }, 2000);
                return;
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            window.location.href = 'auth';
        }
    }

    setupEventListeners() {
        // Step navigation
        const nextBtn = document.getElementById('next-step');
        const prevBtn = document.getElementById('prev-step');
        const submitBtn = document.getElementById('submit-job');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextStep());
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevStep());
        }
        
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitJob());
        }

        // Form inputs for real-time preview
        const titleInput = document.getElementById('job-title');
        const categorySelect = document.getElementById('job-category');
        const descriptionTextarea = document.getElementById('job-description');
        const budgetInput = document.getElementById('job-budget');
        
        if (titleInput) {
            titleInput.addEventListener('input', (e) => {
                this.formData.title = e.target.value;
                this.updatePreview();
            });
        }
        
        if (categorySelect) {
            categorySelect.addEventListener('change', (e) => {
                this.formData.category = e.target.value;
                this.updatePreview();
            });
        }
        
        if (descriptionTextarea) {
            descriptionTextarea.addEventListener('input', (e) => {
                this.formData.description = e.target.value;
                this.updateCharacterCount(e.target);
                this.updatePreview();
            });
        }
        
        if (budgetInput) {
            budgetInput.addEventListener('input', (e) => {
                this.formData.budget = parseFloat(e.target.value) || 0;
                this.updatePreview();
            });
        }

        // Duration and experience radio buttons
        const durationRadios = document.querySelectorAll('input[name="duration"]');
        const experienceRadios = document.querySelectorAll('input[name="experience"]');
        
        durationRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.formData.duration = e.target.value;
                    this.updatePreview();
                }
            });
        });
        
        experienceRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.formData.experience = e.target.value;
                    this.updatePreview();
                }
            });
        });

        // Skills input
        const skillsInput = document.getElementById('skills-input');
        if (skillsInput) {
            skillsInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.addSkill(e.target.value.trim());
                    e.target.value = '';
                }
            });
        }

        // Skill suggestions
        const skillSuggestions = document.querySelectorAll('.skill-suggestion');
        skillSuggestions.forEach(suggestion => {
            suggestion.addEventListener('click', () => {
                const skill = suggestion.dataset.skill;
                this.addSkill(skill);
                suggestion.classList.add('selected');
            });
        });

        // Featured and urgent checkboxes
        const featuredCheckbox = document.getElementById('featured-job');
        const urgentCheckbox = document.getElementById('urgent-job');
        
        if (featuredCheckbox) {
            featuredCheckbox.addEventListener('change', (e) => {
                this.formData.featured = e.target.checked;
                this.updatePricing();
            });
        }
        
        if (urgentCheckbox) {
            urgentCheckbox.addEventListener('change', (e) => {
                this.formData.urgent = e.target.checked;
                this.updatePricing();
            });
        }

        // File upload
        this.setupFileUpload();

        // Step indicators
        const stepIndicators = document.querySelectorAll('.step-indicator');
        stepIndicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const step = parseInt(indicator.dataset.step);
                if (step < this.currentStep || this.validateStep(this.currentStep)) {
                    this.goToStep(step);
                }
            });
        });

        // Logout functionality
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    }

    setupFileUpload() {
        const fileUploadArea = document.getElementById('file-upload-area');
        const fileInput = document.getElementById('attachments');
        
        if (!fileUploadArea || !fileInput) return;

        // Drag and drop
        fileUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUploadArea.classList.add('dragover');
        });
        
        fileUploadArea.addEventListener('dragleave', () => {
            fileUploadArea.classList.remove('dragover');
        });
        
        fileUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadArea.classList.remove('dragover');
            const files = Array.from(e.dataTransfer.files);
            this.handleFiles(files);
        });
        
        // Click to upload
        fileUploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            this.handleFiles(files);
        });
    }

    handleFiles(files) {
        const maxSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'application/zip',
            'application/x-rar-compressed'
        ];

        files.forEach(file => {
            if (file.size > maxSize) {
                this.showNotification(`File "${file.name}" is too large. Maximum size is 10MB.`, 'error');
                return;
            }
            
            if (!allowedTypes.includes(file.type)) {
                this.showNotification(`File type "${file.type}" is not supported.`, 'error');
                return;
            }
            
            if (this.uploadedFiles.find(f => f.name === file.name)) {
                this.showNotification(`File "${file.name}" is already uploaded.`, 'warning');
                return;
            }
            
            this.uploadedFiles.push(file);
        });
        
        this.renderUploadedFiles();
    }

    renderUploadedFiles() {
        const container = document.getElementById('uploaded-files');
        if (!container) return;
        
        container.innerHTML = this.uploadedFiles.map((file, index) => `
            <div class="uploaded-file">
                <div class="file-info">
                    <i class="fas fa-file file-icon"></i>
                    <div>
                        <div class="file-name">${file.name}</div>
                        <div class="file-size">${this.formatFileSize(file.size)}</div>
                    </div>
                </div>
                <i class="fas fa-times remove-file" data-index="${index}"></i>
            </div>
        `).join('');
        
        // Add remove file listeners
        const removeButtons = container.querySelectorAll('.remove-file');
        removeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                this.removeFile(index);
            });
        });
    }

    removeFile(index) {
        this.uploadedFiles.splice(index, 1);
        this.renderUploadedFiles();
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    addSkill(skill) {
        if (!skill || this.selectedSkills.includes(skill.toLowerCase())) {
            return;
        }
        
        this.selectedSkills.push(skill.toLowerCase());
        this.formData.skills = [...this.selectedSkills];
        this.renderSelectedSkills();
        this.updatePreview();
    }

    removeSkill(skill) {
        this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
        this.formData.skills = [...this.selectedSkills];
        this.renderSelectedSkills();
        this.updatePreview();
        
        // Unselect suggestion if exists
        const suggestion = document.querySelector(`[data-skill="${skill}"]`);
        if (suggestion) {
            suggestion.classList.remove('selected');
        }
    }

    renderSelectedSkills() {
        const container = document.getElementById('selected-skills');
        if (!container) return;
        
        container.innerHTML = this.selectedSkills.map(skill => `
            <div class="skill-tag">
                ${skill}
                <span class="remove-skill" data-skill="${skill}">×</span>
            </div>
        `).join('');
        
        // Add remove listeners
        const removeButtons = container.querySelectorAll('.remove-skill');
        removeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const skill = btn.dataset.skill;
                this.removeSkill(skill);
            });
        });
    }

    updateCharacterCount(textarea) {
        const counter = document.getElementById('desc-count');
        if (!counter) return;
        
        const count = textarea.value.length;
        const maxCount = 2000;
        
        counter.textContent = count;
        
        const counterContainer = counter.parentElement;
        counterContainer.classList.remove('warning', 'error');
        
        if (count > maxCount * 0.9) {
            counterContainer.classList.add('warning');
        }
        
        if (count > maxCount) {
            counterContainer.classList.add('error');
        }
    }

    nextStep() {
        if (!this.validateStep(this.currentStep)) {
            return;
        }
        
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateStepDisplay();
            this.updateStepIndicator();
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStepDisplay();
            this.updateStepIndicator();
        }
    }

    goToStep(step) {
        if (step >= 1 && step <= this.totalSteps) {
            this.currentStep = step;
            this.updateStepDisplay();
            this.updateStepIndicator();
        }
    }

    updateStepDisplay() {
        // Hide all steps
        const steps = document.querySelectorAll('.form-step');
        steps.forEach(step => step.classList.remove('active'));
        
        // Show current step
        const currentStepElement = document.querySelector(`[data-step="${this.currentStep}"]`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }
        
        // Update navigation buttons
        const prevBtn = document.getElementById('prev-step');
        const nextBtn = document.getElementById('next-step');
        const submitBtn = document.getElementById('submit-job');
        
        if (prevBtn) {
            prevBtn.style.display = this.currentStep === 1 ? 'none' : 'flex';
        }
        
        if (nextBtn) {
            nextBtn.style.display = this.currentStep === this.totalSteps ? 'none' : 'flex';
        }
        
        if (submitBtn) {
            submitBtn.style.display = this.currentStep === this.totalSteps ? 'flex' : 'none';
        }
    }

    updateStepIndicator() {
        const indicators = document.querySelectorAll('.step-indicator');
        indicators.forEach((indicator, index) => {
            const stepNumber = index + 1;
            indicator.classList.remove('active', 'completed');
            
            if (stepNumber === this.currentStep) {
                indicator.classList.add('active');
            } else if (stepNumber < this.currentStep) {
                indicator.classList.add('completed');
            }
        });
    }

    validateStep(step) {
        let isValid = true;
        const errors = [];
        
        // Clear previous errors
        document.querySelectorAll('.form-group.error').forEach(group => {
            group.classList.remove('error');
        });
        document.querySelectorAll('.error-message').forEach(msg => {
            msg.remove();
        });
        
        switch (step) {
            case 1:
                // Validate basic information
                const title = document.getElementById('job-title').value.trim();
                const category = document.getElementById('job-category').value;
                const description = document.getElementById('job-description').value.trim();
                
                if (!title) {
                    this.showFieldError('job-title', 'Job title is required');
                    isValid = false;
                }
                
                if (!category) {
                    this.showFieldError('job-category', 'Please select a category');
                    isValid = false;
                }
                
                if (!description) {
                    this.showFieldError('job-description', 'Project description is required');
                    isValid = false;
                } else if (description.length < 50) {
                    this.showFieldError('job-description', 'Description must be at least 50 characters');
                    isValid = false;
                }
                
                if (this.selectedSkills.length === 0) {
                    this.showNotification('Please add at least one required skill', 'error');
                    isValid = false;
                }
                break;
                
            case 2:
                // Validate project details
                const duration = document.querySelector('input[name="duration"]:checked');
                const experience = document.querySelector('input[name="experience"]:checked');
                const budget = parseFloat(document.getElementById('job-budget').value);
                
                if (!duration) {
                    this.showNotification('Please select project duration', 'error');
                    isValid = false;
                }
                
                if (!experience) {
                    this.showNotification('Please select required experience level', 'error');
                    isValid = false;
                }
                
                if (!budget || budget < 50) {
                    this.showFieldError('job-budget', 'Budget must be at least $50');
                    isValid = false;
                }
                break;
                
            case 3:
                // Step 3 validation (optional fields)
                break;
        }
        
        return isValid;
    }

    showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('error');
            
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
            
            field.parentNode.appendChild(errorElement);
        }
    }

    updatePreview() {
        // Update title
        const previewTitle = document.getElementById('preview-title');
        if (previewTitle) {
            previewTitle.textContent = this.formData.title || 'Your job title will appear here';
        }
        
        // Update budget
        const previewBudget = document.getElementById('preview-budget');
        if (previewBudget) {
            previewBudget.textContent = `$${this.formData.budget.toLocaleString()}`;
        }
        
        // Update category
        const previewCategory = document.getElementById('preview-category');
        if (previewCategory) {
            const categoryText = this.getCategoryDisplayName(this.formData.category);
            previewCategory.textContent = categoryText || 'Category';
        }
        
        // Update duration
        const previewDuration = document.getElementById('preview-duration');
        if (previewDuration) {
            const durationText = this.getDurationDisplayName(this.formData.duration);
            previewDuration.textContent = durationText || 'Duration';
        }
        
        // Update experience
        const previewExperience = document.getElementById('preview-experience');
        if (previewExperience) {
            const experienceText = this.getExperienceDisplayName(this.formData.experience);
            previewExperience.textContent = experienceText || 'Experience';
        }
        
        // Update description
        const previewDescription = document.getElementById('preview-description');
        if (previewDescription) {
            const description = this.formData.description || 'Your project description will appear here...';
            previewDescription.textContent = description.length > 150 ? 
                description.substring(0, 150) + '...' : description;
        }
        
        // Update skills
        const previewSkills = document.getElementById('preview-skills');
        if (previewSkills) {
            previewSkills.innerHTML = this.selectedSkills.map(skill => 
                `<span class="preview-skill">${skill}</span>`
            ).join('');
        }
    }

    getCategoryDisplayName(category) {
        const categories = {
            'web-development': 'Web Development',
            'mobile-development': 'Mobile Development',
            'design': 'Design & Creative',
            'writing': 'Writing & Content',
            'marketing': 'Marketing & SEO',
            'programming': 'Programming & Tech',
            'data-science': 'Data Science',
            'business': 'Business & Consulting',
            'other': 'Other'
        };
        return categories[category] || category;
    }

    getDurationDisplayName(duration) {
        const durations = {
            'short': 'Short-term',
            'medium': 'Medium-term',
            'long': 'Long-term'
        };
        return durations[duration] || duration;
    }

    getExperienceDisplayName(experience) {
        const experiences = {
            'entry': 'Entry Level',
            'intermediate': 'Intermediate',
            'expert': 'Expert'
        };
        return experiences[experience] || experience;
    }

    updatePricing() {
        const baseFee = 10;
        const featuredFee = this.formData.featured ? 50 : 0;
        const urgentFee = this.formData.urgent ? 25 : 0;
        const total = baseFee + featuredFee + urgentFee;
        
        // Update featured fee display
        const featuredFeeElement = document.getElementById('featured-fee');
        if (featuredFeeElement) {
            featuredFeeElement.style.display = this.formData.featured ? 'flex' : 'none';
        }
        
        // Update urgent fee display
        const urgentFeeElement = document.getElementById('urgent-fee');
        if (urgentFeeElement) {
            urgentFeeElement.style.display = this.formData.urgent ? 'flex' : 'none';
        }
        
        // Update total cost
        const totalCostElement = document.getElementById('total-cost');
        if (totalCostElement) {
            totalCostElement.textContent = `$${total.toFixed(2)}`;
        }
    }

    async submitJob() {
        if (!this.validateStep(this.currentStep)) {
            return;
        }
        
        // Collect all form data
        const formElement = document.getElementById('job-form');
        const formData = new FormData(formElement);
        
        // Add additional data
        const jobData = {
            id: Date.now().toString(),
            title: formData.get('title'),
            category: formData.get('category'),
            description: formData.get('description'),
            skills: this.selectedSkills,
            duration: formData.get('duration'),
            experience: formData.get('experience'),
            budget: parseFloat(formData.get('budget')),
            deadline: formData.get('deadline'),
            specialRequirements: formData.get('specialRequirements'),
            featured: formData.has('featured'),
            urgent: formData.has('urgent'),
            clientId: this.currentUser.id,
            clientName: this.currentUser.name || this.currentUser.email,
            clientInitial: (this.currentUser.name || this.currentUser.email).charAt(0).toUpperCase(),
            postedDate: new Date().toISOString(),
            status: 'active',
            applicants: 0,
            attachments: this.uploadedFiles.map(file => ({
                name: file.name,
                size: file.size,
                type: file.type
            }))
        };
        
        // Show loading state
        const submitBtn = document.getElementById('submit-job');
        if (submitBtn) {
            submitBtn.classList.add('btn-loading');
            submitBtn.disabled = true;
        }
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Save job to localStorage
            const existingJobs = JSON.parse(localStorage.getItem('bbeAllJobs') || '[]');
            existingJobs.unshift(jobData); // Add to beginning
            localStorage.setItem('bbeAllJobs', JSON.stringify(existingJobs));
            
            // Save to user's posted jobs
            const userJobs = JSON.parse(localStorage.getItem('bbeUserJobs') || '[]');
            userJobs.unshift(jobData);
            localStorage.setItem('bbeUserJobs', JSON.stringify(userJobs));
            
            this.showNotification('Job posted successfully!', 'success');
            
            // Redirect to dashboard after a delay
            setTimeout(() => {
                window.location.href = 'dashboard';
            }, 2000);
            
        } catch (error) {
            console.error('Error posting job:', error);
            this.showNotification('Error posting job. Please try again.', 'error');
        } finally {
            // Remove loading state
            if (submitBtn) {
                submitBtn.classList.remove('btn-loading');
                submitBtn.disabled = false;
            }
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

// Initialize the post job app when DOM is loaded
let postJobApp;
document.addEventListener('DOMContentLoaded', () => {
    postJobApp = new PostJobApp();
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
`;
document.head.appendChild(notificationStyles);