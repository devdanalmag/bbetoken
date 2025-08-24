<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Browse Jobs - BaseBridge</title>
    <link rel="stylesheet" href="../styles/main.css">
    <link rel="stylesheet" href="../css/jobs.css">
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
                <a href="jobs.php" class="nav-link active">Browse Jobs</a>
                <a href="post-job.php" class="nav-link">Post Job</a>
                <a href="dashboard.php" class="nav-link">Dashboard</a>
                <a href="profile.php" class="nav-link">Profile</a>
                <button id="logout-btn" class="btn btn-outline">Logout</button>
            </div>
        </div>
    </nav>

    <!-- Jobs Header -->
    <section class="jobs-header">
        <div class="container">
            <div class="header-content">
                <h1>Find Your Next Opportunity</h1>
                <p>Discover amazing projects and connect with clients worldwide</p>
                
                <!-- Search Bar -->
                <div class="search-container">
                    <div class="search-bar">
                        <i class="fas fa-search"></i>
                        <input type="text" id="job-search" placeholder="Search jobs by title, skills, or keywords...">
                        <button class="search-btn" id="search-btn">
                            <i class="fas fa-search"></i>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Jobs Content -->
    <section class="jobs-content">
        <div class="container">
            <div class="jobs-layout">
                <!-- Filters Sidebar -->
                <aside class="filters-sidebar">
                    <div class="filters-header">
                        <h3>Filters</h3>
                        <button class="clear-filters" id="clear-filters">Clear All</button>
                    </div>
                    
                    <!-- Category Filter -->
                    <div class="filter-group">
                        <h4>Category</h4>
                        <div class="filter-options">
                            <label class="filter-option">
                                <input type="checkbox" name="category" value="web-development">
                                <span class="checkmark"></span>
                                Web Development
                                <span class="count">(12)</span>
                            </label>
                            <label class="filter-option">
                                <input type="checkbox" name="category" value="mobile-development">
                                <span class="checkmark"></span>
                                Mobile Development
                                <span class="count">(8)</span>
                            </label>
                            <label class="filter-option">
                                <input type="checkbox" name="category" value="design">
                                <span class="checkmark"></span>
                                Design & Creative
                                <span class="count">(15)</span>
                            </label>
                            <label class="filter-option">
                                <input type="checkbox" name="category" value="writing">
                                <span class="checkmark"></span>
                                Writing & Content
                                <span class="count">(6)</span>
                            </label>
                            <label class="filter-option">
                                <input type="checkbox" name="category" value="marketing">
                                <span class="checkmark"></span>
                                Marketing & SEO
                                <span class="count">(9)</span>
                            </label>
                        </div>
                    </div>
                    
                    <!-- Budget Filter -->
                    <div class="filter-group">
                        <h4>Budget Range</h4>
                        <div class="filter-options">
                            <label class="filter-option">
                                <input type="radio" name="budget" value="0-500">
                                <span class="radiomark"></span>
                                $0 - $500
                            </label>
                            <label class="filter-option">
                                <input type="radio" name="budget" value="500-1000">
                                <span class="radiomark"></span>
                                $500 - $1,000
                            </label>
                            <label class="filter-option">
                                <input type="radio" name="budget" value="1000-2500">
                                <span class="radiomark"></span>
                                $1,000 - $2,500
                            </label>
                            <label class="filter-option">
                                <input type="radio" name="budget" value="2500+">
                                <span class="radiomark"></span>
                                $2,500+
                            </label>
                        </div>
                    </div>
                    
                    <!-- Project Length Filter -->
                    <div class="filter-group">
                        <h4>Project Length</h4>
                        <div class="filter-options">
                            <label class="filter-option">
                                <input type="checkbox" name="duration" value="short">
                                <span class="checkmark"></span>
                                Short term (< 1 month)
                            </label>
                            <label class="filter-option">
                                <input type="checkbox" name="duration" value="medium">
                                <span class="checkmark"></span>
                                Medium term (1-3 months)
                            </label>
                            <label class="filter-option">
                                <input type="checkbox" name="duration" value="long">
                                <span class="checkmark"></span>
                                Long term (3+ months)
                            </label>
                        </div>
                    </div>
                    
                    <!-- Experience Level Filter -->
                    <div class="filter-group">
                        <h4>Experience Level</h4>
                        <div class="filter-options">
                            <label class="filter-option">
                                <input type="checkbox" name="experience" value="entry">
                                <span class="checkmark"></span>
                                Entry Level
                            </label>
                            <label class="filter-option">
                                <input type="checkbox" name="experience" value="intermediate">
                                <span class="checkmark"></span>
                                Intermediate
                            </label>
                            <label class="filter-option">
                                <input type="checkbox" name="experience" value="expert">
                                <span class="checkmark"></span>
                                Expert
                            </label>
                        </div>
                    </div>
                    
                    <!-- Skills Filter -->
                    <div class="filter-group">
                        <h4>Popular Skills</h4>
                        <div class="skills-tags">
                            <span class="skill-tag" data-skill="javascript">JavaScript</span>
                            <span class="skill-tag" data-skill="react">React</span>
                            <span class="skill-tag" data-skill="nodejs">Node.js</span>
                            <span class="skill-tag" data-skill="python">Python</span>
                            <span class="skill-tag" data-skill="php">PHP</span>
                            <span class="skill-tag" data-skill="wordpress">WordPress</span>
                            <span class="skill-tag" data-skill="figma">Figma</span>
                            <span class="skill-tag" data-skill="photoshop">Photoshop</span>
                        </div>
                    </div>
                </aside>
                
                <!-- Jobs List -->
                <main class="jobs-main">
                    <!-- Sort and View Options -->
                    <div class="jobs-toolbar">
                        <div class="results-info">
                            <span id="results-count">Loading jobs...</span>
                        </div>
                        <div class="toolbar-actions">
                            <div class="sort-options">
                                <label for="sort-select">Sort by:</label>
                                <select id="sort-select">
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="budget-high">Highest Budget</option>
                                    <option value="budget-low">Lowest Budget</option>
                                    <option value="title">Title A-Z</option>
                                </select>
                            </div>
                            <div class="view-options">
                                <button class="view-btn active" data-view="list">
                                    <i class="fas fa-list"></i>
                                </button>
                                <button class="view-btn" data-view="grid">
                                    <i class="fas fa-th"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Jobs Grid/List -->
                    <div class="jobs-container" id="jobs-container">
                        <!-- Jobs will be loaded here -->
                        <div class="loading-state">
                            <div class="loading-spinner"></div>
                            <p>Loading amazing opportunities...</p>
                        </div>
                    </div>
                    
                    <!-- Pagination -->
                    <div class="pagination" id="pagination">
                        <!-- Pagination will be generated here -->
                    </div>
                </main>
            </div>
        </div>
    </section>

    <!-- Job Application Modal -->
    <div class="modal" id="application-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Apply for Job</h3>
                <button class="modal-close" id="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="application-form">
                    <input type="hidden" id="job-id">
                    
                    <div class="form-group">
                        <label for="cover-letter">Cover Letter *</label>
                        <textarea id="cover-letter" rows="6" placeholder="Tell the client why you're the perfect fit for this project..." required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="proposed-budget">Proposed Budget *</label>
                        <div class="input-group">
                            <span class="input-prefix">$</span>
                            <input type="number" id="proposed-budget" min="1" placeholder="0" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="delivery-time">Estimated Delivery Time *</label>
                        <select id="delivery-time" required>
                            <option value="">Select timeframe</option>
                            <option value="1-3-days">1-3 days</option>
                            <option value="1-week">1 week</option>
                            <option value="2-weeks">2 weeks</option>
                            <option value="1-month">1 month</option>
                            <option value="2-3-months">2-3 months</option>
                            <option value="3+-months">3+ months</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="portfolio-links">Portfolio Links (Optional)</label>
                        <textarea id="portfolio-links" rows="3" placeholder="Share links to relevant work samples..."></textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn btn-outline" id="cancel-application">Cancel</button>
                        <button type="submit" class="btn btn-primary">Submit Application</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Notification -->
    <div id="notification" class="notification">
        <div class="notification-content">
            <i class="notification-icon fas fa-check-circle"></i>
            <span class="notification-message"></span>
        </div>
    </div>

    <script src="../js/jobs.js"></script>
</body>
</html>