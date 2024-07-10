import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import UserModel from '../models/UserModel.js'
import PostModel from '../models/PostModel.js'

// @desc - Add posts
// @route - POST - /api/posts
// @access - Private
export const addPosts = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const { text } = req.body
  const user = await UserModel.findById(req.user._id)
  if (user) {
    const newPost = new PostModel({
      text,
      user: user._id,
      name: user.name,
      avatar: user.avatar
    })
    await newPost.save()
    const posts = await PostModel.find().sort({ createdAt: -1 })
    return res.json(posts)
  }
  res.status(404)
  throw new Error('User not found')
})

// @desc - Get all posts
// @route - GET - /api/posts
// access - Public
export const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await PostModel.find().sort({ createdAt: -1 })
  if (posts) {
    return res.json(posts)
  }
  res.status(404)
  throw new Error('Posts not found')
})

// @desc - Get post by id
// @route - GET - /api/posts:id
// access - Private
export const getPostById = asyncHandler(async (req, res) => {
  const post = await PostModel.findById(req.params.id)
  if (post) {
    return res.json(post)
  }
  res.status(404)
  throw new Error('Post not found')
})

// @desc - Delete Post
// @route - DELETE - /api/posts/:id
// @access - Private
export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params
  const post = await PostModel.findById(id)
  const user = await UserModel.findById(req.user._id)
  if (post) {
    if (post.user.equals(req.user._id) || user.isAdmin) {
      await PostModel.findByIdAndDelete(id)
      return res.json({ msg: 'Post deleted successfully' })
    } else {
      res.status(401)
      throw new Error('User not authorized')
    }
  }
  res.status(404)
  throw new Error('Post not found')
})

// @desc - Like a post
// @route - PUT - /api/posts/like/:postId
// @access - Private
export const likeAPost = asyncHandler(async (req, res) => {
  const post = await PostModel.findById(req.params.postId)
  if (post) {
    const likedPost = post.likes.filter(like => like.user.equals(req.user._id))
    if (likedPost.length > 0) {
      res.status(400)
      throw new Error('Post already liked')
    } else {
      post.likes.unshift({ user: req.user._id })
      await post.save()
      return res.json(post.likes)
    }
  }
  res.status(404)
  throw new Error('Post not found')
})

// @desc - Unlike a post
// @route - PUT - /api/posts/unlike/:postId
// @access - Private
export const unlikeAPost = asyncHandler(async (req, res) => {
  const post = await PostModel.findById(req.params.postId)
  if (post) {
    const removeLike = post.likes.findIndex(like =>
      like.user._id.equals(req.user._id)
    )
    if (removeLike === -1) {
      res.status(404)
      throw new Error('Post has not yet been liked')
    }
    post.likes.splice(removeLike, 1)
    await post.save()
    return res.json(post.likes)
  }
  res.status(404)
  throw new Error('Post not found')
})

// @desc - Add a comment to a post
// @route - PUT - /api/posts/comment/:postId
// @access - Private
export const addComment = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const { text } = req.body
  const post = await PostModel.findById(req.params.postId)
  const user = await UserModel.findById(req.user._id)
  const newComment = {
    text,
    user: user._id,
    name: user.name,
    avatar: user.avatar
  }
  if (post) {
    post.comments.unshift(newComment)
    await post.save()
    return res.json(post.comments)
  }
  res.status(404)
  throw new Error('Post not found')
})

// @desc - Delete a comment
// @route - DELETE /api/posts/comment/:postId/:commentId
// @access - Private
export const deleteAComment = asyncHandler(async (req, res) => {
  const post = await PostModel.findById(req.params.postId)
  const user = await UserModel.findById(req.user._id)
  if (post) {
    const deleteComment = post.comments.findIndex(
      comment => comment._id.toString() === req.params.commentId
    )
    if (deleteComment === -1) {
      res.status(404)
      throw new Error('Comment not found')
    }
    if (
      post.comments[deleteComment].user.equals(req.user._id) ||
      user.isAdmin
    ) {
      post.comments.splice(deleteComment, 1)
      await post.save()
      return res.json({ msg: 'Comment deleted' })
    } else {
      res.status(400)
      throw new Error('You are not authorized to delete this comment')
    }
  }
  res.status(404)
  throw new Error('Post not found')
})
