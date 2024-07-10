import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../slices/postSlice'
import { format } from 'date-fns'
import { addLike, removeLike, deletePost } from '../../slices/postSlice'
export default function PostItem({
  post: { _id, text, name, avatar, user, likes, comments, createdAt },
  showActions = true
}) {
  const dispatch = useDispatch()
  const postDate = format(new Date(createdAt), 'yyyy/MM/dd')
  const { user: currentUser } = useSelector(state => state.users)
  const like = async postId => {
    await dispatch(addLike(postId))
    dispatch(getPosts())
  }
  const unLike = async postId => {
    await dispatch(removeLike(postId))
    dispatch(getPosts())
  }
  const deletePst = async postId => {
    await dispatch(deletePost(postId))
    dispatch(getPosts(postId))
  }
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='Avatar' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>Posted on {postDate}</p>
        {showActions && (
          <>
            <button
              onClick={() => like(_id)}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-up'></i>{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              onClick={() => unLike(_id)}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-down'></i>
            </button>
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            {(currentUser._id === user || currentUser.isAdmin) && (
              <button
                type='button'
                onClick={() => deletePst(_id)}
                className='btn btn-danger'
              >
                <i className='fas fa-times'></i>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
