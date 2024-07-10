import express from 'express'
import { validateText } from '../middleware/expressValidators.js'
import {
  addPosts,
  getAllPosts,
  getPostById,
  deletePost,
  likeAPost,
  unlikeAPost,
  addComment,
  deleteAComment
} from '../controllers/postControllers.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(protect, validateText, addPosts).get(getAllPosts)
router.route('/:id').get(protect, getPostById).delete(protect, deletePost)
router.put('/like/:postId', protect, likeAPost)
router.put('/comment/:postId', protect, validateText, addComment)
router.delete('/comment/:postId/:commentId', protect, deleteAComment)
router.put('/unlike/:postId/', protect, unlikeAPost)

export default router
