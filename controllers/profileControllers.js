import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import UserModel from '../models/UserModel.js'
import ProfileModel from '../models/ProfileModel.js'
import PostModel from '../models/PostModel.js'

// @desc - Get profile of the current user
// @route - GET - /api/profile/me
// @access - Private
export const getCurrentProfile = asyncHandler(async (req, res) => {
  const profile = await ProfileModel.findOne({ user: req.user._id }).populate(
    'user',
    ['name', 'avatar']
  )
  if (profile) {
    return res.json(profile)
  }
  res.status(404)
  throw new Error('Profile not found')
})

// @desc - Add Profile
// @route - POST - /api/profile
// @access - Private
export const addProfile = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    facebook,
    twitter,
    linkedin,
    instagram,
    youtube
  } = req.body
  const profileFields = {
    user: req.user._id,
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills: skills
      ? skills
          .toString()
          .split(',')
          .map(skill => skill.trim())
      : [],
    social: { facebook, linkedin, instagram, twitter, youtube }
  }
  let profile = await ProfileModel.findOne({ user: req.user._id })
  if (profile) {
    profile = await ProfileModel.findOneAndUpdate(
      { user: req.user._id },
      { $set: profileFields },
      { new: true }
    )
    return res.json(profile)
  } else {
    profile = new ProfileModel(profileFields)
    await profile.save()
    res.json(profile)
  }
})

// @desc - Get all profiles
// @route - GET - /api/profile
// @access - Public
export const getAllProfiles = asyncHandler(async (req, res) => {
  const profiles = await ProfileModel.find().populate('user', [
    'name',
    'avatar'
  ])
  if (profiles) {
    return res.json(profiles)
  }
  res.status(404)
  throw new Error('No profile found')
})

// @desc - Get profile by ID
// @route - GET - /api/profile/:id
// @access - Public
export const getProfileById = asyncHandler(async (req, res) => {
  const profile = await ProfileModel.findById(req.params.id).populate('user', [
    'name',
    'avatar'
  ])
  if (profile) {
    return res.json(profile)
  }
  res.status(404)
  throw new Error('Profile not found')
})

// @desc - Delete Only Profile
// @route - /api/profile/:id
// @access - Private/Admin
export const deleteProfileById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const profile = await ProfileModel.findById(id).populate('user', 'isAdmin')
  const user = await UserModel.findById(req.user._id)
  if (profile) {
    if (user.isAdmin) {
      if (profile.user.isAdmin) {
        res.status(400)
        throw new Error('You cannot delete Profile of an Admin user')
      }
      await ProfileModel.findByIdAndDelete(id)
      return res.json({ msg: 'Profile deleted successfully.' })
    } else {
      res.status(400)
      throw new Error('You are not authorized to delete this profile')
    }
  }
  res.status(404)
  throw new Error('Profile not found')
})

// @desc - Delete user, profile and post
// @route - DELETE - /api/profile
// @access - Private
export const deleteProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findOne(req.user._id)
  if (user) {
    await UserModel.findByIdAndDelete(req.user._id)
    await ProfileModel.findOneAndDelete({ user: req.user._id })
    await PostModel.findOneAndDelete({ user: req.user._id })
    return res.json({ msg: 'User deleted' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc - Add experience to profile
// @route - PUT - /api/profile/experience
// @access - Private
export const addExperience = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const { title, company, location, from, to, current, description } = req.body
  const addExp = { title, company, location, from, to, current, description }
  const profile = await ProfileModel.findOne({ user: req.user._id })
  if (profile) {
    profile.experience.unshift(addExp)
    await profile.save()
    return res.json(profile)
  }
  res.status(404)
  throw new Error('Profile not found')
})

// @desc - Delete Experience
// @route - DELETE - /api/profile/experience/:expId
// access - Private
export const deleteExperince = asyncHandler(async (req, res) => {
  const profile = await ProfileModel.findOne({ user: req.user._id })
  if (profile) {
    const removeIndex = profile.experience.findIndex(
      exp => exp._id.toString() === req.params.expId
    )
    if (removeIndex === -1) {
      res.status(404)
      throw new Error('Experience not found')
    }
    profile.experience.splice(removeIndex, 1)
    await profile.save()
    return res.json(profile)
  }
  res.status(404)
  throw new Error('Profile not found')
})

// @desc - Add education to profile
// @route - PUT - /api/education
// @access - Private
export const addEducation = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const { school, degree, fieldofstudy, from, to, current, description } =
    req.body
  const addEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  }
  const profile = await ProfileModel.findOne({ user: req.user._id })
  if (profile) {
    profile.education.unshift(addEdu)
    await profile.save()
    return res.json(profile)
  }
  res.status(404)
  throw new Error('Profile not found')
})

// @desc - Delete Education from profile
// @route - /api/profile/education/:eduId
// @access - Private
export const deleteEducation = asyncHandler(async (req, res) => {
  const profile = await ProfileModel.findOne({ user: req.user._id })
  if (profile) {
    const removeIndex = profile.education.findIndex(
      edu => edu._id.toString() === req.params.eduId
    )
    if (removeIndex === -1) {
      res.status(404)
      throw new Error('Education not found')
    }
    profile.education.splice(removeIndex, 1)
    await profile.save()
    return res.json(profile)
  }
  res.status(404)
  throw new Error('Profile not found')
})
