import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Temporary in-memory storage for testing
let tempUsers = []

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export const signup = async (req, res) => {
  try {
    console.log('Signup request received:', req.body)
    const { name, email, password, role } = req.body
    
    if (!name || !email || !password) {
      console.log('Missing required fields')
      return res.status(400).json({ message: 'Please provide name, email and password' })
    }
    
    // Check in temp storage first
    const userExists = tempUsers.find(u => u.email === email)
    if (userExists) {
      console.log('User already exists:', email)
      return res.status(400).json({ message: 'User already exists' })
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const user = {
      _id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      role: role || 'seeker'
    }
    
    tempUsers.push(user)
    console.log('User created successfully:', user.email)
    
    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token: generateToken(user._id)
    })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    console.log('Login request received:', req.body)
    const { email, password } = req.body
    
    if (!email || !password) {
      console.log('Missing email or password')
      return res.status(400).json({ message: 'Please provide email and password' })
    }
    
    const user = tempUsers.find(u => u.email === email)
    if (!user) {
      console.log('User not found:', email)
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      console.log('Password mismatch for:', email)
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    
    console.log('Login successful for:', email)
    
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token: generateToken(user._id)
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: error.message })
  }
}

export const getMe = async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}