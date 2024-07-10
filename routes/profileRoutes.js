import express from 'express'
import {
  validateProfile,
  validateExperience,
  validateEducation
} from '../middleware/expressValidators.js'
import {
  addProfile,
  getAllProfiles,
  getCurrentProfile,
  getProfileById,
  deleteProfile,
  addExperience,
  deleteExperince,
  addEducation,
  deleteEducation,
  deleteProfileById
} from '../controllers/profileControllers.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router
  .route('/')
  .post(protect, validateProfile, addProfile)
  .get(getAllProfiles)
  .delete(protect, deleteProfile)
router.get('/me', protect, getCurrentProfile)
router.put('/experience', protect, validateExperience, addExperience)
router.put('/education', protect, validateEducation, addEducation)
router.route('/:id').get(getProfileById).delete(protect, deleteProfileById)
router.delete('/experience/:expId', protect, deleteExperince)
router.delete('/education/:eduId', protect, deleteEducation)

export default router
