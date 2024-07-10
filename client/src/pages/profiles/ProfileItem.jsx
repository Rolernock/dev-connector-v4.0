import { Link } from 'react-router-dom'

export default function ProfileItem({
  profile: {
    user: { name, avatar },
    status,
    _id,
    company,
    location,
    skills
  }
}) {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='image' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span>at {company}</span>}{' '}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, idx) => (
          <li key={idx} className='text-primary'>
            <i className='fas fa-check'></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}
