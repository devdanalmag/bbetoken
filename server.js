const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));

// Session configuration
app.use(session({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});

// In-memory data storage (replace with database in production)
let users = [];
let jobs = [];
let applications = [];
let messages = [];
let portfolios = [];
let reviews = [];

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Routes

// Home page
app.get('/', (req, res) => {
    res.render('index', { title: 'BaseBridge - Blockchain Freelancing Platform' });
});

// Authentication pages
app.get('/auth', (req, res) => {
    res.render('auth', { title: 'Join BaseBridge - Authentication' });
});

// Dashboard
app.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'Dashboard - BaseBridge' });
});

// Jobs
app.get('/jobs', (req, res) => {
    res.render('jobs', { title: 'Browse Jobs - BaseBridge' });
});

// Post Job
app.get('/post-job', (req, res) => {
    res.render('post-job', { title: 'Post a Job - BaseBridge' });
});

// Profile
app.get('/profile', (req, res) => {
    res.render('profile', { title: 'Profile - BaseBridge' });
});

// API Routes

// User registration
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const newUser = {
            id: uuidv4(),
            name,
            email,
            password: hashedPassword,
            role,
            isRegistered: false,
            isPremium: false,
            isVerified: false,
            registrationFee: role === 'jobber' ? 50 : 100,
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        
        // Generate JWT token
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                isRegistered: newUser.isRegistered,
                isPremium: newUser.isPremium,
                isVerified: newUser.isVerified,
                registrationFee: newUser.registrationFee
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        
        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                isRegistered: user.isRegistered,
                isPremium: user.isPremium,
                isVerified: user.isVerified,
                registrationFee: user.registrationFee
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Complete registration (pay fee)
app.post('/api/auth/complete-registration', authenticateToken, (req, res) => {
    try {
        const { isPremium } = req.body;
        const userId = req.user.id;
        
        // Find user
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Update user registration status
        users[userIndex].isRegistered = true;
        users[userIndex].isPremium = isPremium || false;
        users[userIndex].registrationCompletedAt = new Date().toISOString();
        
        res.json({
            message: 'Registration completed successfully',
            user: {
                id: users[userIndex].id,
                name: users[userIndex].name,
                email: users[userIndex].email,
                role: users[userIndex].role,
                isRegistered: users[userIndex].isRegistered,
                isPremium: users[userIndex].isPremium,
                isVerified: users[userIndex].isVerified
            }
        });
    } catch (error) {
        console.error('Registration completion error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user profile
app.get('/api/user/profile', authenticateToken, (req, res) => {
    try {
        const user = users.find(u => u.id === req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const { password, ...userProfile } = user;
        res.json({ user: userProfile });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update user profile
app.put('/api/user/profile', authenticateToken, (req, res) => {
    try {
        const userId = req.user.id;
        const updates = req.body;
        
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Update user data (excluding sensitive fields)
        const allowedUpdates = ['name', 'phone', 'location', 'timezone', 'bio', 'skills', 'hourlyRate'];
        allowedUpdates.forEach(field => {
            if (updates[field] !== undefined) {
                users[userIndex][field] = updates[field];
            }
        });
        
        users[userIndex].updatedAt = new Date().toISOString();
        
        const { password, ...userProfile } = users[userIndex];
        res.json({ message: 'Profile updated successfully', user: userProfile });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get jobs
app.get('/api/jobs', (req, res) => {
    try {
        const { category, budget, experience, search, page = 1, limit = 10 } = req.query;
        let filteredJobs = [...jobs];
        
        // Apply filters
        if (category && category !== 'all') {
            filteredJobs = filteredJobs.filter(job => job.category === category);
        }
        
        if (budget) {
            const [min, max] = budget.split('-').map(Number);
            filteredJobs = filteredJobs.filter(job => {
                const jobBudget = job.budget;
                return jobBudget >= min && (max ? jobBudget <= max : true);
            });
        }
        
        if (experience && experience !== 'all') {
            filteredJobs = filteredJobs.filter(job => job.experienceLevel === experience);
        }
        
        if (search) {
            const searchLower = search.toLowerCase();
            filteredJobs = filteredJobs.filter(job => 
                job.title.toLowerCase().includes(searchLower) ||
                job.description.toLowerCase().includes(searchLower) ||
                job.skills.some(skill => skill.toLowerCase().includes(searchLower))
            );
        }
        
        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + parseInt(limit);
        const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
        
        res.json({
            jobs: paginatedJobs,
            totalJobs: filteredJobs.length,
            currentPage: parseInt(page),
            totalPages: Math.ceil(filteredJobs.length / limit)
        });
    } catch (error) {
        console.error('Jobs fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create job
app.post('/api/jobs', authenticateToken, upload.array('attachments', 5), (req, res) => {
    try {
        const jobData = req.body;
        const attachments = req.files ? req.files.map(file => ({
            filename: file.filename,
            originalName: file.originalname,
            path: file.path,
            size: file.size
        })) : [];
        
        const newJob = {
            id: uuidv4(),
            ...jobData,
            clientId: req.user.id,
            attachments,
            status: 'open',
            applicationsCount: 0,
            createdAt: new Date().toISOString()
        };
        
        jobs.push(newJob);
        
        res.status(201).json({
            message: 'Job created successfully',
            job: newJob
        });
    } catch (error) {
        console.error('Job creation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Apply for job
app.post('/api/jobs/:jobId/apply', authenticateToken, (req, res) => {
    try {
        const { jobId } = req.params;
        const { proposal, bidAmount } = req.body;
        const applicantId = req.user.id;
        
        // Check if job exists
        const job = jobs.find(j => j.id === jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        
        // Check if user already applied
        const existingApplication = applications.find(app => 
            app.jobId === jobId && app.applicantId === applicantId
        );
        if (existingApplication) {
            return res.status(400).json({ error: 'Already applied for this job' });
        }
        
        const newApplication = {
            id: uuidv4(),
            jobId,
            applicantId,
            proposal,
            bidAmount: parseFloat(bidAmount),
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        
        applications.push(newApplication);
        
        // Update job applications count
        const jobIndex = jobs.findIndex(j => j.id === jobId);
        if (jobIndex !== -1) {
            jobs[jobIndex].applicationsCount += 1;
        }
        
        res.status(201).json({
            message: 'Application submitted successfully',
            application: newApplication
        });
    } catch (error) {
        console.error('Job application error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user's applications
app.get('/api/user/applications', authenticateToken, (req, res) => {
    try {
        const userApplications = applications.filter(app => app.applicantId === req.user.id);
        
        // Populate with job details
        const populatedApplications = userApplications.map(app => {
            const job = jobs.find(j => j.id === app.jobId);
            return {
                ...app,
                job: job ? {
                    id: job.id,
                    title: job.title,
                    budget: job.budget,
                    category: job.category
                } : null
            };
        });
        
        res.json({ applications: populatedApplications });
    } catch (error) {
        console.error('Applications fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user's jobs (for clients)
app.get('/api/user/jobs', authenticateToken, (req, res) => {
    try {
        const userJobs = jobs.filter(job => job.clientId === req.user.id);
        res.json({ jobs: userJobs });
    } catch (error) {
        console.error('User jobs fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404');
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 BaseBridge server is running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 API endpoints available at http://localhost:${PORT}/api`);
});

module.exports = app;