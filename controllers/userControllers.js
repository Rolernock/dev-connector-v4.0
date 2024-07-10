import asyncHandler from 'express-async-handler'
import crypto from 'crypto'
import gravatar from 'gravatar'
import { validationResult } from 'express-validator'
import generateToken from '../utils/generateToken.js'
import sendEmail from '../utils/sendEmail.js'
import UserModel from '../models/UserModel.js'

// @desc - Register User
// @route - POST - /api/users
// @access - Public
export const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const { name, email, password } = req.body
  let user = await UserModel.findOne({ email })
  if (user) {
    res.status(400)
    throw new Error('User Already Exists!')
  }
  const avatar = gravatar.url(email, { s: 200, r: 'pg', d: 'mm' })
  user = new UserModel({ name, email, password, avatar })
  await user.save()
  generateToken(res, user._id)
  // sendEmail({
  //   to: email,
  //   subject: 'Welcome to mernDevs!',
  //   text: `Hello ${name}, \n\nWe are excited to have you join our community of MERN Stack developers. Connect, share and grow with fellow developers.`,
  //   html: `<h1>Hello ${name},</h1>
  //        <p>Welcome to <strong>mernDevs</strong>! We're excited to have you join our community of MERN Stack developers. Connect, share, and grow with fellow developers.</p>
  //        <p>Happy coding!</p>
  //        <p>The mernDevs Team</p>`
  // })
  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  })
})

// @desc - Auth User
// @route - POST - /api/users/login
// @access - Public
export const authUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const { email, password } = req.body
  const user = await UserModel.findOne({ email })
  if (!user) {
    res.status(404)
    throw new Error('Invalid user or password')
  }
  const matchPasswords = await user.matchPassword(password)
  if (matchPasswords) {
    generateToken(res, user._id)
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('Invalid user or password')
  }
})

// @desc - Logout
// @route - POST - /api/users/logout
export const logOutUser = asyncHandler((req, res) => {
  res.clearCookie('jwt')
  return res.status(200).json({ msg: 'Logged out successfully.' })
})

// @desc - Get Current User
// @route - GET - /api/users
// @access - Private
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id).select('-password')
  if (user) return res.json(user)
  res.status(404)
  throw new Error('User Not Found')
})

// @desc - Get All Users
// @route - GET - /api/users/allUsers
// @access - Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find().select('-password')
  if (users) return res.json(users)
  res.status(404)
  throw new Error('User Not Found')
})

export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body
  const user = await UserModel.findOne({ _id: req.params.id })
  if (user) {
    user.name = name !== undefined ? name : user.name
    user.email = email !== undefined ? email : user.email
    user.password = password !== undefined ? password : user.password
    user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

// @desc - Get User By Id
// @route - /api/users/:id
// @access - Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id).select('-password')
  if (user) return res.json(user)
  res.status(404)
  throw new Error('User Not Found')
})

// @desc - Delete User
// @route - /api/users/:id
// @access - Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id)
  if (user) {
    if (user.isAdmin) {
      res.status(400)
      throw new Error('Cannot delete admin user.')
    } else {
      await UserModel.deleteOne({ _id: user._id })
      return res.json({ msg: 'User deleted Successfully' })
    }
  }
  res.status(404)
  throw new Error('User Not Found')
})

// @desc - Send Reset Password Email
// @route - POST - /api/users/forgot-password
// @access - Public
export const resetPasswordEmail = asyncHandler(async (req, res) => {
  const { email } = req.body
  const user = await UserModel.findOne({ email })
  if (!user) {
    res.status(404)
    throw new Error('User Not Found')
  }
  const resetToken = user.getResetPasswordToken()
  await user.save()
  const resetUrl = `https://localhost:5173/reset-password/${resetToken}`
  const message = `You requested a password reset. Please click the link below to reset your password:
  
  
  ${resetUrl}`
  try {
    sendEmail({
      to: user.email,
      subject: `Password Reset`,
      text: message
    })
    res.json({ msg: 'Reset password email sent.' })
  } catch (err) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()
    res.status(500)
    throw new Error(err)
  }
})

// @desc - Reset Password
// @route - PUT - /api/users/reset-password
// @access - Public
export const resetPassword = asyncHandler(async (req, res) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')
  const user = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  })
  if (user) {
    user.password = req.body.password
    user.resetPasswordExpire = undefined
    user.resetPasswordToken = undefined
    await user.save()
    res.json({ msg: 'Password updated successfull' })
  } else {
    res.status(400)
    throw new Error('Invalid or expired password')
  }
})
