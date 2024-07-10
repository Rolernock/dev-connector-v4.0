import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { addEducation } from '../../slices/profileSlice'
import { current } from '@reduxjs/toolkit'

export default function AddEducation() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const initialState = {
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  }
  const [formData, setFormData] = useState(initialState)
  const { school, degree, fieldofstudy, from, to, current, description } =
    formData
  const handleChange = evt => {
    const { name, value, type, checked } = evt.target
    const newVal = type === 'checkbox' ? checked : value
    setFormData(prevData => {
      return { ...prevData, [name]: newVal }
    })
  }
  const handleSubmit = evt => {
    evt.preventDefault()
    dispatch(addEducation(formData))
    navigate('/dashboard')
  }
  return (
    <>
      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <i className='fas fa-graduation-cap'></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form onSubmit={handleSubmit} className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            value={school}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            onChange={handleChange}
            value={degree}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Field of Study'
            name='fieldofstudy'
            onChange={handleChange}
            value={fieldofstudy}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input type='date' name='from' onChange={handleChange} value={from} />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current}
              onChange={handleChange}
            />
            Current School or Bootcamp
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            onChange={handleChange}
            disabled={current}
            value={to}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            value={description}
            onChange={handleChange}
            cols='30'
            rows='5'
            placeholder='Program Description'
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </>
  )
}
