import { format } from 'date-fns'
import { useDispatch } from 'react-redux'
import { deleteExperience, getCurrentProfile } from '../../slices/profileSlice'

export default function Experience({ experience }) {
  const dispatch = useDispatch()
  const deleteExp = async id => {
    await dispatch(deleteExperience(id))
    dispatch(getCurrentProfile())
  }
  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td>
        {format(new Date(exp.from), 'yyyy/MM/dd')} -{' '}
        {exp.to ? format(new Date(exp.to), 'yyyy/MM/dd') : 'Now'}
      </td>
      <td>
        <button onClick={() => deleteExp(exp._id)} className='btn btn-danger'>
          Delete
        </button>
      </td>
    </tr>
  ))
  return (
    <>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  )
}
