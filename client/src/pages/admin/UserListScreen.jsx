import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { getAllUsers } from '../../slices/userSlice'
import UserListItem from './UserListItem'

export default function UserListScreen() {
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.users)
  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <>
      <h1>Users</h1>
      {!users ? (
        <Spinner />
      ) : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <UserListItem user={user} />
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
