import Job from '../models/Job.js'
import Application from '../models/Application.js'

export const getJobs = async (req, res) => {
  try {
    const { role, location, type, search } = req.query
    let query = {}
    
    if (role) query.title = { $regex: role, $options: 'i' }
    if (location) query.location = { $regex: location, $options: 'i' }
    if (type) query.type = type
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ]
    }
    
    const jobs = await Job.find(query).populate('employer', 'name').sort({ createdAt: -1 })
    res.json({ success: true, jobs })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employer', 'name email')
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }
    res.json({ success: true, job })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      employer: req.user._id
    })
    res.status(201).json({ success: true, job })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const applyToJob = async (req, res) => {
  try {
    const existingApplication = await Application.findOne({
      job: req.params.id,
      applicant: req.user._id
    })
    
    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied to this job' })
    }
    
    const application = await Application.create({
      job: req.params.id,
      applicant: req.user._id,
      coverLetter: req.body.coverLetter
    })
    
    res.status(201).json({ success: true, application })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user._id }).sort({ createdAt: -1 })
    res.json({ success: true, jobs })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getJobApplications = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, employer: req.user._id })
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }
    
    const applications = await Application.find({ job: req.params.id })
      .populate('applicant', 'name email')
      .sort({ createdAt: -1 })
    
    res.json({ success: true, applications })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}