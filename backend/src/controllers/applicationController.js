import Application from '../models/Application.js'

export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate('job', 'title company location salary')
      .sort({ createdAt: -1 })
    
    res.json({ success: true, applications })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body
    const application = await Application.findById(req.params.id)
      .populate('job', 'employer')
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' })
    }
    
    if (application.job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' })
    }
    
    application.status = status
    await application.save()
    
    res.json({ success: true, application })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}