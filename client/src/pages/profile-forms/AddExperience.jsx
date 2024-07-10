import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addExperience } from '../../slices/profileSlice'

export default function AddExperience() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const initialState = {
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  }
  const [formData, setFormData] = useState(initialState)
  const { title, company, location, from, to, current, description } = formData
  const handleChange = evt => {
    const { name, value, type, checked } = evt.target
    const newVal = type === 'checkbox' ? checked : value
    setFormData(prevData => {
      return { ...prevData, [name]: newVal }
    })
  }
  const handleSubmit = evt => {
    evt.preventDefault()
    dispatch(addExperience(formData))
    navigate('/dashboard')
  }
  return (
    <>
      <h1 className='large text-primary'>Add Your Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any web developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            onChange={handleChange}
            value={title}
            name='title'
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            onChange={handleChange}
            value={company}
            name='company'
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            onChange={handleChange}
            value={location}
            name='location'
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input type='date' name='from' value={from} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <input
            type='checkbox'
            name='current'
            checked={current}
            onChange={handleChange}
          />
          Current Job
        </div>
        <div className='form-group'>
          <input
            type='date'
            name='to'
            disabled={current}
            value={to}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            onChange={handleChange}
            value={description}
            cols='30'
            rows='5'
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
