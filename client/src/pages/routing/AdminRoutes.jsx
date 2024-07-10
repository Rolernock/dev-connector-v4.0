import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import Spinner from '../../components/Spinner'

export default function AdminRoutes() {
  const { user } = useSelector(state => state.users)
  return (
    <>
      {user && user.isAdmin ? (
        <>
          <Outlet />
        </>
      ) : (
        <Navigate to='/login' />
      )}
    </>
  )
}
