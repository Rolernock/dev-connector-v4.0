import { Link } from 'react-router-dom'
import { FaExclamationTriangle } from 'react-icons/fa'

export default function NotFound() {
  return (
    <div className='container'>
      <section className='text-center'>
        <FaExclamationTriangle className='my-2 large' />
        <h1 className='x-large my-1'>404 Not Found</h1>
        <p className='lead'>This page does not exist</p>
        <Link to='/' className='lead btn'>
          Go Back
        </Link>
      </section>
    </div>
  )
}
