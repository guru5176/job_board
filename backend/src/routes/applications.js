import express from 'express'
import { getMyApplications, updateApplicationStatus } from '../controllers/applicationController.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

router.get('/my-applications', protect, authorize('seeker'), getMyApplications)
router.put('/:id/status', protect, authorize('employer'), updateApplicationStatus)

export default router