import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../../components/Spinner'
import ProfileItem from './ProfileItem'
import { getAllProfiles } from '../../slices/profileSlice'

export default function Profiles() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllProfiles())
  }, [])
  const { profiles } = useSelector(state => state.profiles)
  return (
    <>
      {!profiles ? (
        <Spinner />
      ) : (
        <>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and Connect with
            developers
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              <>
                {profiles.map(profile => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))}
              </>
            ) : (
              <h4>No Profiles Found</h4>
            )}
          </div>
        </>
      )}
    </>
  )
}
