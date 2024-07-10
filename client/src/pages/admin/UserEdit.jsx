import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getUserById } from '../../slices/userSlice'
import Spinner from '../../components/Spinner'

export default function UserEdit() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { userId } = useSelector(state => state.users)
  const initialState = {
    name: '',
    email: '',
    isAdmin: false,
    password: ''
  }
  const [formData, setFormData] = useState(initialState)
  const { name, email, isAdmin, password } = formData
  const onChangeHandler = evt => {
    const { name, value, type, checked } = evt.target
    setFormData(prevData => {
      return { ...prevData, [name]: type === 'checkbox' ? checked : value }
    })
  }
  useEffect(() => {
    dispatch(getUserById(id))
  }, [])
  useEffect(() => {
    if (userId) {
      setFormData({
        _id: userId._id || '',
        name: userId.name || '',
        email: userId.email || '',
        isAdmin: userId.isAdmin || '',
        password: userId.password || ''
      })
    }
  }, [userId])
  const handleSubmit = evt => {
    evt.preventDefault()
    dispatch(updateUser(formData))
    navigate('/admin/all-users')
  }

  return (
    <>
      {!userId ? (
        <Spinner />
      ) : (
        <>
          <Link to='/admin/all-users' className='btn btn-light my-3'>
            Go Back
          </Link>
          <h1 className='large text-primary'>Edit User</h1>
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
            </div>
            <div className='form-group'>
              <input
                className='b-radius'
                type='text'
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
                type='checkbox'
                placeholder='isAdmin'
                onChange={onChangeHandler}
                name='isAdmin'
                checked={isAdmin}
              />
              <span> isAdmin</span>
            </div>
            <input type='submit' className='btn btn-primary' />
          </form>
        </>
      )}
    </>
  )
}
