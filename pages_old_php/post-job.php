<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Post a Job - BaseBridge</title>
    <link rel="stylesheet" href="../styles/main.css">
    <link rel="stylesheet" href="../css/post-job.css">
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
                <a href="post-job.php" class="nav-link active">Post Job</a>
                <a href="dashboard.php" class="nav-link">Dashboard</a>
                <a href="profile.php" class="nav-link">Profile</a>
                <button id="logout-btn" class="btn btn-outline">Logout</button>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="post-job-main">
        <div class="container">
            <div class="post-job-header">
                <h1>Post a New Job</h1>
                <p>Find the perfect freelancer for your project</p>
            </div>

            <div class="post-job-content">
                <div class="job-form-container">
                    <form id="job-form" class="job-form">
                        <!-- Step 1: Basic Information -->
                        <div class="form-step active" data-step="1">
                            <div class="step-header">
                                <h2>Basic Information</h2>
                                <p>Tell us about your project</p>
                            </div>

                            <div class="form-group">
                                <label for="job-title">Job Title *</label>
                                <input type="text" id="job-title" name="title" required 
                                       placeholder="e.g., Build a responsive website with React">
                                <small class="form-help">A clear, descriptive title helps attract the right freelancers</small>
                            </div>

                            <div class="form-group">
                                <label for="job-category">Category *</label>
                                <select id="job-category" name="category" required>
                                    <option value="">Select a category</option>
                                    <option value="web-development">Web Development</option>
                                    <option value="mobile-development">Mobile Development</option>
                                    <option value="design">Design & Creative</option>
                                    <option value="writing">Writing & Content</option>
                                    <option value="marketing">Marketing & SEO</option>
                                    <option value="programming">Programming & Tech</option>
                                    <option value="data-science">Data Science</option>
                                    <option value="business">Business & Consulting</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="job-description">Project Description *</label>
                                <textarea id="job-description" name="description" required rows="6"
                                          placeholder="Describe your project in detail. Include what you need, your goals, and any specific requirements..."></textarea>
                                <div class="char-counter">
                                    <span id="desc-count">0</span>/2000 characters
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Required Skills *</label>
                                <div class="skills-input-container">
                                    <input type="text" id="skills-input" placeholder="Type a skill and press Enter">
                                    <div class="selected-skills" id="selected-skills"></div>
                                </div>
                                <div class="popular-skills">
                                    <span class="skills-label">Popular skills:</span>
                                    <div class="skill-suggestions">
                                        <span class="skill-suggestion" data-skill="javascript">JavaScript</span>
                                        <span class="skill-suggestion" data-skill="react">React</span>
                                        <span class="skill-suggestion" data-skill="nodejs">Node.js</span>
                                        <span class="skill-suggestion" data-skill="python">Python</span>
                                        <span class="skill-suggestion" data-skill="php">PHP</span>
                                        <span class="skill-suggestion" data-skill="wordpress">WordPress</span>
                                        <span class="skill-suggestion" data-skill="figma">Figma</span>
                                        <span class="skill-suggestion" data-skill="photoshop">Photoshop</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Step 2: Project Details -->
                        <div class="form-step" data-step="2">
                            <div class="step-header">
                                <h2>Project Details</h2>
                                <p>Set your budget and timeline</p>
                            </div>

                            <div class="form-group">
                                <label>Project Duration *</label>
                                <div class="radio-group">
                                    <label class="radio-option">
                                        <input type="radio" name="duration" value="short" required>
                                        <span class="radio-custom"></span>
                                        <div class="radio-content">
                                            <strong>Short-term</strong>
                                            <small>Less than 1 month</small>
                                        </div>
                                    </label>
                                    <label class="radio-option">
                                        <input type="radio" name="duration" value="medium" required>
                                        <span class="radio-custom"></span>
                                        <div class="radio-content">
                                            <strong>Medium-term</strong>
                                            <small>1-3 months</small>
                                        </div>
                                    </label>
                                    <label class="radio-option">
                                        <input type="radio" name="duration" value="long" required>
                                        <span class="radio-custom"></span>
                                        <div class="radio-content">
                                            <strong>Long-term</strong>
                                            <small>3+ months</small>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Experience Level Required *</label>
                                <div class="radio-group">
                                    <label class="radio-option">
                                        <input type="radio" name="experience" value="entry" required>
                                        <span class="radio-custom"></span>
                                        <div class="radio-content">
                                            <strong>Entry Level</strong>
                                            <small>New freelancers welcome</small>
                                        </div>
                                    </label>
                                    <label class="radio-option">
                                        <input type="radio" name="experience" value="intermediate" required>
                                        <span class="radio-custom"></span>
                                        <div class="radio-content">
                                            <strong>Intermediate</strong>
                                            <small>Some experience required</small>
                                        </div>
                                    </label>
                                    <label class="radio-option">
                                        <input type="radio" name="experience" value="expert" required>
                                        <span class="radio-custom"></span>
                                        <div class="radio-content">
                                            <strong>Expert</strong>
                                            <small>Extensive experience needed</small>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="job-budget">Project Budget (USD) *</label>
                                <div class="budget-input-container">
                                    <span class="currency-symbol">$</span>
                                    <input type="number" id="job-budget" name="budget" required min="50" step="50"
                                           placeholder="1000">
                                </div>
                                <small class="form-help">Set a competitive budget to attract quality freelancers</small>
                            </div>

                            <div class="form-group">
                                <label for="deadline">Project Deadline</label>
                                <input type="date" id="deadline" name="deadline" 
                                       min="<?php echo date('Y-m-d', strtotime('+1 day')); ?>">
                                <small class="form-help">Optional: Set a specific deadline for your project</small>
                            </div>
                        </div>

                        <!-- Step 3: Additional Requirements -->
                        <div class="form-step" data-step="3">
                            <div class="step-header">
                                <h2>Additional Requirements</h2>
                                <p>Any special requirements or preferences</p>
                            </div>

                            <div class="form-group">
                                <label for="attachments">Project Files</label>
                                <div class="file-upload-area" id="file-upload-area">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                    <p>Drag and drop files here or <span class="upload-link">browse</span></p>
                                    <input type="file" id="attachments" name="attachments" multiple 
                                           accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.zip,.rar">
                                    <small>Supported formats: PDF, DOC, TXT, Images, ZIP (Max 10MB each)</small>
                                </div>
                                <div class="uploaded-files" id="uploaded-files"></div>
                            </div>

                            <div class="form-group">
                                <label for="special-requirements">Special Requirements</label>
                                <textarea id="special-requirements" name="specialRequirements" rows="4"
                                          placeholder="Any specific requirements, preferences, or additional information..."></textarea>
                            </div>

                            <div class="form-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="featured-job" name="featured">
                                    <span class="checkbox-custom"></span>
                                    <div class="checkbox-content">
                                        <strong>Make this job featured (+$50)</strong>
                                        <small>Featured jobs get 3x more visibility and appear at the top of search results</small>
                                    </div>
                                </label>
                            </div>

                            <div class="form-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="urgent-job" name="urgent">
                                    <span class="checkbox-custom"></span>
                                    <div class="checkbox-content">
                                        <strong>Mark as urgent (+$25)</strong>
                                        <small>Urgent jobs are highlighted and get faster responses</small>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <!-- Step Navigation -->
                        <div class="step-navigation">
                            <button type="button" id="prev-step" class="btn btn-outline" style="display: none;">
                                <i class="fas fa-arrow-left"></i> Previous
                            </button>
                            <button type="button" id="next-step" class="btn btn-primary">
                                Next <i class="fas fa-arrow-right"></i>
                            </button>
                            <button type="submit" id="submit-job" class="btn btn-success" style="display: none;">
                                <i class="fas fa-check"></i> Post Job
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Job Preview -->
                <div class="job-preview-container">
                    <div class="job-preview">
                        <h3>Job Preview</h3>
                        <div class="preview-content">
                            <div class="preview-header">
                                <h4 id="preview-title">Your job title will appear here</h4>
                                <div class="preview-budget" id="preview-budget">$0</div>
                            </div>
                            <div class="preview-meta">
                                <span class="preview-category" id="preview-category">Category</span>
                                <span class="preview-duration" id="preview-duration">Duration</span>
                                <span class="preview-experience" id="preview-experience">Experience</span>
                            </div>
                            <div class="preview-description" id="preview-description">
                                Your project description will appear here...
                            </div>
                            <div class="preview-skills" id="preview-skills">
                                <!-- Skills will be added here -->
                            </div>
                            <div class="preview-footer">
                                <div class="preview-client">
                                    <div class="client-avatar">Y</div>
                                    <span>You</span>
                                </div>
                                <div class="preview-posted">
                                    <i class="fas fa-clock"></i>
                                    <span>Just posted</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Pricing Summary -->
                    <div class="pricing-summary">
                        <h4>Pricing Summary</h4>
                        <div class="pricing-item">
                            <span>Job Posting Fee</span>
                            <span>$10.00</span>
                        </div>
                        <div class="pricing-item" id="featured-fee" style="display: none;">
                            <span>Featured Job</span>
                            <span>$50.00</span>
                        </div>
                        <div class="pricing-item" id="urgent-fee" style="display: none;">
                            <span>Urgent Job</span>
                            <span>$25.00</span>
                        </div>
                        <div class="pricing-divider"></div>
                        <div class="pricing-total">
                            <span>Total</span>
                            <span id="total-cost">$10.00</span>
                        </div>
                        <small class="pricing-note">Payment will be processed using your BBE tokens</small>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Step Progress Indicator -->
    <div class="step-progress">
        <div class="step-indicator active" data-step="1">
            <div class="step-number">1</div>
            <div class="step-label">Basic Info</div>
        </div>
        <div class="step-indicator" data-step="2">
            <div class="step-number">2</div>
            <div class="step-label">Details</div>
        </div>
        <div class="step-indicator" data-step="3">
            <div class="step-number">3</div>
            <div class="step-label">Requirements</div>
        </div>
    </div>

    <!-- Notification -->
    <div id="notification" class="notification">
        <i class="notification-icon fas fa-check-circle"></i>
        <span class="notification-message"></span>
    </div>

    <script src="../js/post-job.js"></script>
</body>
</html>