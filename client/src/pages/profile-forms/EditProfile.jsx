import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProfile, getCurrentProfile } from '../../slices/profileSlice'

export default function EditProfile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getCurrentProfile())
  }, [])
  const { profile } = useSelector(state => state.profiles)
  const initialState = {
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  }
  const [formData, setFormData] = useState(initialState)
  const [displaySocialInputs, toggleSocialInputs] = useState(false)
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData
  const handleChange = evt => {
    const { name, value } = evt.target
    setFormData(prevData => {
      return { ...prevData, [name]: value }
    })
  }
  useEffect(() => {
    if (profile) {
      setFormData({
        company: profile.company || '',
        website: profile.website || '',
        location: profile.location || '',
        status: profile.status || '',
        skills: profile.skills || '',
        githubusername: profile.githubusername || '',
        bio: profile.bio || bio,
        twitter: profile.social.twitter || '',
        facebook: profile.social.facebook || '',
        linkedin: profile.social.linkedin || '',
        youtube: profile.social.youtube || '',
        instagram: profile.social.instagram || ''
      })
    }
  }, [profile])
  const handleSubmit = evt => {
    evt.preventDefault()
    dispatch(createProfile({ formData, edit: true }))
    navigate('/dashboard')
  }

  return (
    <>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <select name='status' onChange={handleChange} value={status}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instruction or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            value={company}
            onChange={handleChange}
            name='company'
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            value={website}
            onChange={handleChange}
            name='website'
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            value={location}
            onChange={handleChange}
            name='location'
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            value={skills}
            onChange={handleChange}
            name='skills'
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML, CSS, JAVASCRIPT, PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            onChange={handleChange}
            value={githubusername}
            name='githubusername'
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='A short bio of yourself'
            value={bio}
            onChange={handleChange}
            name='bio'
          />
          <small className='form-text'>Tell us a little about yourself</small>
        </div>
        <div className='my-2'>
          <button
            type='button'
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span className='m-2'>Optional</span>
          {displaySocialInputs && (
            <>
              <div className='form-group social-input'>
                <i className='fab fa-twitter fa-2x'></i>
                <input
                  type='text'
                  placeholder='Twitter URL'
                  onChange={handleChange}
                  value={twitter}
                  name='twitter'
                />
              </div>
              <div className='form-group social-input'>
                <i className='fab fa-facebook fa-2x'></i>
                <input
                  type='text'
                  placeholder='Facebook URL'
                  onChange={handleChange}
                  value={facebook}
                  name='facebook'
                />
              </div>
              <div className='form-group social-input'>
                <i className='fab fa-youtube fa-2x'></i>
                <input
                  type='text'
                  placeholder='YouTube URL'
                  onChange={handleChange}
                  value={youtube}
                  name='youtube'
                />
              </div>
              <div className='form-group social-input'>
                <i className='fab fa-linkedin fa-2x'></i>
                <input
                  type='text'
                  placeholder='Linkedin URL'
                  onChange={handleChange}
                  value={linkedin}
                  name='linkedin'
                />
              </div>
              <div className='form-group social-input'>
                <i className='fab fa-instagram fa-2x'></i>
                <input
                  type='text'
                  placeholder='Instagram URL'
                  onChange={handleChange}
                  value={instagram}
                  name='instagram'
                />
              </div>
            </>
          )}
          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </div>
      </form>
    </>
  )
}
