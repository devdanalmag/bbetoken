# BaseBridge - Blockchain Freelancing Platform

A modern freelancing platform built with Node.js, Express, and EJS, designed for deployment on Vercel.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Job Management**: Post, browse, and manage freelance jobs
- **Dashboard**: Comprehensive user dashboard with analytics
- **Profile Management**: User profiles with skills and portfolio
- **Responsive Design**: Mobile-first responsive UI
- **File Uploads**: Support for project files and documents
- **Session Management**: Secure session handling

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Templating**: EJS (Embedded JavaScript)
- **Styling**: CSS3 with responsive design
- **File Handling**: Multer for file uploads
- **Authentication**: JWT and bcrypt
- **Session**: Express-session
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd bbetoken
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
NODE_ENV=development
PORT=3001
SESSION_SECRET=your-super-secret-session-key
JWT_SECRET=your-jwt-secret-key
```

## 🏃‍♂️ Running Locally

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The application will be available at `http://localhost:3001`

## 🚀 Deployment to Vercel

### Prerequisites
- Vercel account
- Vercel CLI installed globally: `npm i -g vercel`

### Deployment Steps

1. **Login to Vercel**:
```bash
vercel login
```

2. **Deploy the application**:
```bash
vercel
```

3. **Set Environment Variables** (in Vercel dashboard):
   - `NODE_ENV=production`
   - `SESSION_SECRET=your-production-session-secret`
   - `JWT_SECRET=your-production-jwt-secret`
   - Add any other required environment variables

4. **Deploy to production**:
```bash
vercel --prod
```

### Vercel Configuration

The project includes a `vercel.json` file with the following configuration:
- Node.js runtime for the server
- Static file serving for CSS, JS, and images
- Proper routing configuration
- Function timeout settings

## 📁 Project Structure

```
bbetoken/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── vercel.json           # Vercel deployment configuration
├── .env.example          # Environment variables template
├── views/                # EJS templates
│   ├── index.ejs
│   ├── dashboard.ejs
│   ├── profile.ejs
│   ├── post-job.ejs
│   └── partials/         # Reusable template parts
├── css/                  # Stylesheets
│   ├── main.css
│   ├── dashboard.css
│   ├── profile.css
│   └── post-job.css
├── js/                   # Client-side JavaScript
├── img/                  # Images and assets
└── uploads/              # User uploaded files
```

## 🔧 API Endpoints

- `GET /` - Home page
- `GET /dashboard` - User dashboard
- `GET /profile` - User profile
- `GET /post-job` - Job posting form
- `GET /browse-jobs` - Browse available jobs
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `POST /api/logout` - User logout

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Session management
- CORS protection
- File upload validation
- Environment variable protection

## 🎨 Styling

- Responsive design with mobile-first approach
- Modern CSS with Flexbox and Grid
- Font Awesome icons
- Custom color scheme and typography
- Smooth animations and transitions

## 📝 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Required
NODE_ENV=development
PORT=3001
SESSION_SECRET=your-session-secret
JWT_SECRET=your-jwt-secret

# Optional (for future features)
MONGODB_URI=mongodb://localhost:27017/basebridge
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 🚨 Important Notes

1. **Database**: Currently using in-memory storage. For production, integrate with MongoDB or PostgreSQL.
2. **File Uploads**: Files are stored locally. For production, use cloud storage (AWS S3, Cloudinary).
3. **Authentication**: Basic JWT implementation. Consider adding refresh tokens for production.
4. **Email**: Email functionality is prepared but not implemented. Add SMTP configuration for notifications.

## 🔄 Migration from PHP

This project was converted from PHP to Node.js for Vercel deployment:
- PHP files converted to EJS templates
- Server-side logic moved to Express.js
- Database operations prepared for JavaScript implementation
- Static assets and styling preserved

## 📞 Support

For issues and questions:
1. Check the console for error messages
2. Verify environment variables are set correctly
3. Ensure all dependencies are installed
4. Check Vercel deployment logs for production issues

## 📄 License

MIT License - see LICENSE file for details.

---

**Ready for Vercel deployment!** 🎉