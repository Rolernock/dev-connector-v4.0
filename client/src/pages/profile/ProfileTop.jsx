import { Link } from 'react-router-dom'

export default function ProfileTop({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
  }
}) {
  return (
    <div className='profile-top bg-primary p-2'>
      <img src={avatar} className='round-img my-1' alt='profile-image' />
      <h1 className='large'>{name}</h1>
      <p className='lead'>
        {status} {company && <span>at {company}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div className='icons my-1'>
        {website && (
          <Link
            to={`https://${website}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fas fa-globe fa-2x'></i>
          </Link>
        )}
        {social && social.twitter && (
          <Link
            to={`https://${social.twitter}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-twitter fa-2x'></i>
          </Link>
        )}
        {social && social.facebook && (
          <Link
            to={`https://${social.facebook}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-facebook fa-2x'></i>
          </Link>
        )}
        {social && social.linkedin && (
          <Link
            to={`https://${social.linkedin}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-linkedin fa-2x'></i>
          </Link>
        )}
        {social && social.youtube && (
          <Link
            to={`https://${social.youtube}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-youtube fa-2x'></i>
          </Link>
        )}
        {social && social.instagram && (
          <Link
            to={`https://${social.instagram}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-instagram fa-2x'></i>
          </Link>
        )}
      </div>
    </div>
  )
}
