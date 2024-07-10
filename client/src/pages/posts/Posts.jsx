import { useEffect } from 'react'
import { getPosts } from '../../slices/postSlice'
import { useSelector, useDispatch } from 'react-redux'
import PostForm from './PostForm'
import Spinner from '../../components/Spinner'
import PostItem from './PostItem'

export default function Posts() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPosts())
  }, [])
  const { posts } = useSelector(state => state.posts)
  return (
    <>
      {posts ? (
        <div>
          <h1 className='large text-primary'>Posts</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Welcome to the community
          </p>
          <PostForm />
          <div className='posts'>
            {posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  )
}
