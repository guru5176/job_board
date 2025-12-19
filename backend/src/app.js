import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import jobRoutes from './routes/jobs.js'
import applicationRoutes from './routes/applications.js'
import errorHandler from './middleware/errorHandler.js'

const app = express()

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, 'https://your-app.vercel.app']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}
app.use(cors(corsOptions))
app.use(express.json())

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend connected successfully!', timestamp: new Date() })
})

// Database test route
app.get('/api/test-db', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting']
    
    res.json({
      database: states[dbState],
      status: dbState === 1 ? 'Connected ✅' : 'Not Connected ❌',
      host: mongoose.connection.host || 'N/A',
      name: mongoose.connection.name || 'N/A'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Test auth endpoints
app.post('/api/test-signup', (req, res) => {
  console.log('Test signup received:', req.body)
  res.json({ message: 'Signup endpoint working', data: req.body })
})

app.post('/api/test-login', (req, res) => {
  console.log('Test login received:', req.body)
  res.json({ message: 'Login endpoint working', data: req.body })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/applications', applicationRoutes)

// Error Handler
app.use(errorHandler)

export default app