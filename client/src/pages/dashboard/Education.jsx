import { format } from 'date-fns'
import { useDispatch } from 'react-redux'
import { deleteEducation, getCurrentProfile } from '../../slices/profileSlice'

export default function Education({ education }) {
  const dispatch = useDispatch()
  const deleteEdu = async id => {
    await dispatch(deleteEducation(id))
    dispatch(getCurrentProfile())
  }
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td>
        {format(new Date(edu.from), 'yyyy/MM/dd')} -{' '}
        {edu.to ? format(new Date(edu.to), 'yyyy/MM/dd') : 'Now'}
      </td>
      <td>
        <button className='btn btn-danger' onClick={() => deleteEdu(edu._id)}>
          Delete
        </button>
      </td>
    </tr>
  ))
  return (
    <>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  )
}
