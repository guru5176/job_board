import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: `${API_URL}/api`
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth API
export const signup = async (userData) => {
  const response = await api.post('/auth/signup', userData)
  return response.data
}

export const login = async (userData) => {
  const response = await api.post('/auth/login', userData)
  return response.data
}

export const getMe = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

// Jobs API
export const getJobs = async (filters = {}) => {
  const response = await api.get('/jobs', { params: filters })
  return response.data
}

export const getJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`)
  return response.data
}

export const createJob = async (jobData) => {
  const response = await api.post('/jobs', jobData)
  return response.data
}

export const applyToJob = async (jobId, applicationData) => {
  const response = await api.post(`/jobs/${jobId}/apply`, applicationData)
  return response.data
}

export const getMyJobs = async () => {
  const response = await api.get('/jobs/my-jobs')
  return response.data
}

export const getJobApplications = async (jobId) => {
  const response = await api.get(`/jobs/${jobId}/applications`)
  return response.data
}

// Applications API
export const getMyApplications = async () => {
  const response = await api.get('/applications/my-applications')
  return response.data
}

export { API_URL }