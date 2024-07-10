import { check } from 'express-validator'

export const validateNewUser = [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please provide a valide email').isEmail(),
  check('password', 'Password is required').notEmpty()
]

export const validateUser = [
  check('email', 'Please provide a valide email').isEmail(),
  check('password', 'Password is required').notEmpty()
]

export const validateProfile = [
  check('status', 'Status is required').notEmpty(),
  check('skills', 'Skills is required').notEmpty()
]

export const validateExperience = [
  check('title', 'Title is required').notEmpty(),
  check('company', 'Company is required').notEmpty(),
  check('from', 'From is required').notEmpty()
]

export const validateEducation = [
  check('school', 'School is required').notEmpty(),
  check('degree', 'Degree is required').notEmpty(),
  check('fieldofstudy', 'Field of study is required').notEmpty(),
  check('from', 'From is required').notEmpty()
]

export const validateText = [check('text', 'Text is required').notEmpty()]
