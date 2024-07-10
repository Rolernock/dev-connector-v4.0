import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import Spinner from '../../components/Spinner'
import { getPost } from '../../slices/postSlice'
import PostItem from '../posts/PostItem'
import CommentItem from './CommentItem'

export default function Post() {
  const dispatch = useDispatch()
  const { id } = useParams()
  useEffect(() => {
    dispatch(getPost(id))
  }, [id])
  const { post } = useSelector(state => state.posts)
  return (
    <>
      {post ? (
        <>
          <Link to='/posts' className='btn'>
            Back To Posts
          </Link>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <div className='comments'>
            {post.comments.map(comment => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            ))}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  )
}
