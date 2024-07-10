import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../slices/userSlice'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import DashboardActions from './DashboardActions'
import Education from './Education'
import Experience from './Experience'
import { getCurrentProfile, deleteAccount } from '../../slices/profileSlice'

export default function Dashboard() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.users)
  useEffect(() => {
    dispatch(getCurrentProfile())
  }, [])
  const { profile } = useSelector(state => state.profiles)
  const deleteAcc = () => {
    dispatch(deleteAccount())
    dispatch(logout())
  }
  return (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {profile ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button onClick={deleteAcc} className='btn btn-danger'>
              <i className='fas fa-user-minus'></i> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}
    </>
  )
}
