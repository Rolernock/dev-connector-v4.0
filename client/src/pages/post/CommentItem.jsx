import { formatDistanceToNow } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteComment, getPost } from '../../slices/postSlice'

export default function CommentItem({
  postId,
  comment: { _id: commentId, text, name, avatar, user, date }
}) {
  const dispatch = useDispatch()
  const datePosted = formatDistanceToNow(new Date(date))
  const { user: currentUser } = useSelector(state => state.users)

  const dltComment = async ({ commentId, postId }) => {
    await dispatch(deleteComment({ commentId, postId }))
    dispatch(getPost(postId))
  }
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img src={avatar} alt='Avatar' className='round-img' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>Posted {datePosted} ago</p>
        {(currentUser._id === user || currentUser.isAdmin) && (
          <button
            className='btn btn-danger'
            type='button'
            onClick={() => dltComment({ postId, commentId })}
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  )
}
