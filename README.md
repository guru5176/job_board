# JobBoard – MERN Mini Job Portal

A full-stack job portal built with MongoDB, Express, React, and Node.js that connects job seekers with employers.

## Features

### For Job Seekers
- Create account and login
- Browse and search job listings with filters (role, location, type)
- View detailed job descriptions
- Submit job applications with cover letters
- Track application status in dashboard

### For Employers
- Register as employer
- Post new job listings
- Manage job postings in dashboard
- Review applications from candidates
- Update application status

### General
- Role-based authentication (seeker, employer, admin)
- Responsive design with Tailwind CSS
- Secure API communication with JWT
- Real-time data with MongoDB

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Database**: MongoDB

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd jobboard
```

2. **Setup Backend**
```bash
cd backend
npm install

# Copy environment template
cp .env.example .env

# Edit .env file with your MongoDB connection string:
# For local MongoDB: mongodb://localhost:27017/jobboard
# For MongoDB Atlas: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# Start the server
npm run dev
```

3. **Setup Frontend**
```bash
cd frontend
npm install

# Start the development server
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create job (employer only)
- `GET /api/jobs/my-jobs` - Get employer's jobs
- `POST /api/jobs/:id/apply` - Apply to job (seeker only)
- `GET /api/jobs/:id/applications` - Get job applications (employer only)

### Applications
- `GET /api/applications/my-applications` - Get user's applications (seeker only)
- `PUT /api/applications/:id/status` - Update application status (employer only)

## Project Structure

```
jobboard/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Route components
│   │   ├── hooks/          # Custom hooks
│   │   ├── context/        # React context
│   │   └── services/       # API services
│   └── ...
├── backend/                 # Express backend
│   ├── src/
│   │   ├── models/         # Mongoose models
│   │   ├── controllers/    # Route handlers
│   │   ├── routes/         # Express routes
│   │   ├── middleware/     # Custom middleware
│   │   └── config/         # Configuration
│   └── ...
└── ...
```

## Usage

1. **Sign up** as either a Job Seeker or Employer
2. **Job Seekers** can:
   - Browse jobs with search and filters
   - View job details and apply
   - Track applications in dashboard
3. **Employers** can:
   - Post new job listings
   - Manage jobs in dashboard
   - Review and manage applications

## Development

- Backend runs on port 5000 with nodemon for auto-restart
- Frontend runs on port 5173 with Vite hot reload
- MongoDB connection string can be updated in backend/.env
- JWT secret should be changed for production

## Future Enhancements

- File upload for resumes
- Email notifications
- Advanced search and filtering
- Company profiles
- Job recommendations
- Application tracking system
- Admin dashboard