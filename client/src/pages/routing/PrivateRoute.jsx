import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
  const { user } = useSelector(state => state.users)
  return user ? <Outlet /> : <Navigate to='/login' />
}
