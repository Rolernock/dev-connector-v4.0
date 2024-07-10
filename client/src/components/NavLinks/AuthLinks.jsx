import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../slices/userSlice'
import { clearProfile } from '../../slices/profileSlice'

export default function AuthLinks() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.users)
  const handleLogOut = async () => {
    await dispatch(logout())
    await dispatch(clearProfile())
    navigate('/login')
  }
  return (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i> <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link onClick={handleLogOut} to='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
      <li>
        {user && user.isAdmin && <Link to='/admin/all-users'>Users</Link>}
      </li>
    </ul>
  )
}
