import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllUsers, deleteUser } from '../../slices/userSlice'

export default function UserListItem({ user }) {
  const dispatch = useDispatch()
  const deleteHandler = async id => {
    if (window.confirm('Are you sure you want to delete this user')) {
      await dispatch(deleteUser(id)).unwrap()
      dispatch(getAllUsers())
    } else {
      toast.error('User deletion unsuccessful.')
      return
    }
  }
  return (
    <>
      <td>{user._id}</td>
      <td>{user.name}</td>
      <td>
        <Link to={`mailto:${user.email}`}>{user.email}</Link>
      </td>
      <td>
        {user.isAdmin ? (
          <FaCheck style={{ color: 'green' }} />
        ) : (
          <FaTimes style={{ color: 'red' }} />
        )}
      </td>
      <td>
        <Link to={`/admin/user/${user._id}/edit`}>
          <Button variant='light' className='btn-sm'>
            <FaEdit />
          </Button>
        </Link>
        <Button
          variant='danger'
          className='btn-sm'
          onClick={() => deleteHandler(user._id)}
        >
          <FaTrash style={{ color: 'white' }} />
        </Button>
      </td>
    </>
  )
}
