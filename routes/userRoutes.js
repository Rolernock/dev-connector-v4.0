import express from 'express'
import {
  validateNewUser,
  validateUser
} from '../middleware/expressValidators.js'
const router = express.Router()
import {
  registerUser,
  authUser,
  logOutUser,
  getCurrentUser,
  getAllUsers,
  updateUser,
  getUserById,
  deleteUser,
  resetPasswordEmail,
  resetPassword
} from '../controllers/userControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router
  .route('/')
  .post(validateNewUser, registerUser)
  .get(protect, getCurrentUser)
router.get('/all-users', protect, admin, getAllUsers)
router.post('/forgot-password', resetPasswordEmail)
router.put('/reset-password/:token', resetPassword)
router
  .route('/:id')
  .put(protect, admin, updateUser)
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser)
router.post('/login', validateUser, authUser)
router.post('/logout', logOutUser)

export default router
