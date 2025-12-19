import express from 'express'
import { getJobs, getJobById, createJob, applyToJob, getMyJobs, getJobApplications } from '../controllers/jobController.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

router.get('/', getJobs)
router.get('/my-jobs', protect, authorize('employer'), getMyJobs)
router.get('/:id', getJobById)
router.post('/', protect, authorize('employer'), createJob)
router.post('/:id/apply', protect, authorize('seeker'), applyToJob)
router.get('/:id/applications', protect, authorize('employer'), getJobApplications)

export default router