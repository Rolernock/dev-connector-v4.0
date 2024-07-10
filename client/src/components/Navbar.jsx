import { Link } from 'react-router-dom'
import GuestLinks from './NavLinks/GuestLinks'
import AuthLinks from './NavLinks/AuthLinks'
import { useSelector } from 'react-redux'

export default function Navbar() {
  const { user } = useSelector(state => state.users)
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      <>{user ? <AuthLinks /> : <GuestLinks />}</>
    </nav>
  )
}
