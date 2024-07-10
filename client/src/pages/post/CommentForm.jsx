import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment, getPost } from '../../slices/postSlice'

export default function CommentForm({ postId }) {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const handleChange = evt => setText(evt.target.value)
  const handleSubmit = async evt => {
    evt.preventDefault()
    await dispatch(addComment({ text, postId }))
    dispatch(getPost(postId))
    setText('')
  }
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a comment</h3>
      </div>
      <form onSubmit={handleSubmit} className='form my-1'>
        <textarea
          name='text'
          value={text}
          onChange={handleChange}
          cols='30'
          rows='5'
          placeholder='Create a post'
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  )
}
