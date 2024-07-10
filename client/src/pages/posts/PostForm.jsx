import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addPost } from '../../slices/postSlice'

export default function PostForm() {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const handleChange = evt => setText(evt.target.value)
  const handleSubmit = evt => {
    evt.preventDefault()
    dispatch(addPost({ text }))
    setText('')
  }
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form onSubmit={handleSubmit} className='form my-1'>
        <textarea
          name='text'
          onChange={handleChange}
          cols='30'
          rows='5'
          value={text}
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  )
}
