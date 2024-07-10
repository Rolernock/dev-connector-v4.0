import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../slices/userSlice'

export default function Login() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.users)
  const initialState = {
    email: '',
    password: ''
  }
  const [formData, setFormData] = useState(initialState)
  const { email, password } = formData
  const onChangeHandler = evt => {
    const { name, value } = evt.target
    setFormData(prevData => {
      return { ...prevData, [name]: value }
    })
  }
  const handleSubmit = evt => {
    evt.preventDefault()
    dispatch(login(formData))
  }

  if (user) {
    return <Navigate to='/dashboard' />
  }

  return (
    <>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Login to your account
      </p>
      <form className='form form-width' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            onChange={onChangeHandler}
            name='email'
            value={email}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            onChange={onChangeHandler}
            placeholder='password'
            name='password'
            value={password}
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Do not have an account? <Link to='/register'>Register</Link>
      </p>
    </>
  )
}
