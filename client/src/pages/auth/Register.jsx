import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../slices/userSlice'

export default function Register() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.users)
  const initialState = {
    name: '',
    email: '',
    password: '',
    password2: ''
  }
  const [formData, setFormData] = useState(initialState)
  const { name, email, password, password2 } = formData
  const onChangeHandler = evt => {
    const { name, value } = evt.target
    setFormData(prevData => {
      return { ...prevData, [name]: value }
    })
  }
  const handleSubmit = evt => {
    evt.preventDefault()
    if (password !== password2) {
      return toast.error('Passwords do not match')
    } else {
      dispatch(register(formData))
    }
  }

  if (user) {
    return <Navigate to='/dashboard' />
  }
  return (
    <>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form form-width' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            className='b-radius'
            type='text'
            placeholder='Name'
            onChange={onChangeHandler}
            name='name'
            value={name}
          />
        </div>
        <div className='form-group'>
          <input
            className='b-radius'
            type='email'
            placeholder='Email Address'
            onChange={onChangeHandler}
            name='email'
            value={email}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use Gravatar
            email
          </small>
        </div>
        <div className='form-group'>
          <input
            className='b-radius'
            type='password'
            onChange={onChangeHandler}
            placeholder='password'
            name='password'
            value={password}
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            className='b-radius'
            type='password'
            onChange={onChangeHandler}
            placeholder='password2'
            name='password2'
            value={password2}
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </>
  )
}
