import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProfileById } from '../../slices/profileSlice'
import Spinner from '../../components/Spinner'
import ProfileAbout from './ProfileAbout'
import ProfileTop from './ProfileTop'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import { deleteProfileById } from '../../slices/profileSlice'

export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getProfileById(id))
  }, [])
  const { user } = useSelector(state => state.users)
  const { profile } = useSelector(state => state.profiles)
  const deleteProfile = profileId => {
    dispatch(deleteProfileById(profileId))
    navigate('/profiles')
  }
  return (
    <>
      {!profile ? (
        <Spinner />
      ) : (
        <>
          <Link to='/profiles' className='btn btn-light'>
            Back to profiles
          </Link>
          {user && user._id === profile.user._id && (
            <Link to='/edit-profile' className='btn btn-dark'>
              Edit Profile
            </Link>
          )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map(exp => (
                    <ProfileExperience key={exp._id} experience={exp} />
                  ))}
                </>
              ) : (
                <h4>No Experience Credentials</h4>
              )}
            </div>
            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map(edu => (
                    <ProfileEducation key={edu._id} education={edu} />
                  ))}
                </>
              ) : (
                <h4>No Education</h4>
              )}
            </div>
          </div>
          {user && user.isAdmin && (
            <button
              onClick={() => deleteProfile(profile._id)}
              className='btn btn-danger'
            >
              DeleteProfile
            </button>
          )}
        </>
      )}
    </>
  )
}
