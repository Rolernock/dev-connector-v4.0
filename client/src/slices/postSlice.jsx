import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

const initialState = {
  posts: [],
  post: null
}

export const getPosts = createAsyncThunk(
  '/posts/getPosts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/posts')
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(err => toast.error(err.msg))
      return rejectWithValue(errors)
    }
  }
)

export const getPost = createAsyncThunk(
  '/posts/getPost',
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/posts/${postId}`)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(err => toast.error(err.msg))
      return rejectWithValue(errors)
    }
  }
)

export const addPost = createAsyncThunk(
  '/posts/addPost',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/posts', formData)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(err => toast.error(err.msg))
      return rejectWithValue(errors)
    }
  }
)

export const addComment = createAsyncThunk(
  '/posts/addComment',
  async ({ text, postId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/posts/comment/${postId}`, { text })
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(err => toast.error(err.msg))
      return rejectWithValue(errors)
    }
  }
)

export const addLike = createAsyncThunk(
  '/posts/addLike',
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/posts/like/${postId}`)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const removeLike = createAsyncThunk(
  '/posts/removePost',
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/posts/unlike/${postId}`)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(err => toast.error(err.msg))
      return rejectWithValue(errors)
    }
  }
)

export const deleteComment = createAsyncThunk(
  '/posts/deleteComment',
  async ({ postId, commentId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `/api/posts/comment/${postId}/${commentId}`
      )
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const deletePost = createAsyncThunk(
  '/posts/deletePost',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/posts/${id}`)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(err => toast.error(err.msg))
      return rejectWithValue(errors)
    }
  }
)

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts = action.payload
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.post = action.payload
      })
  }
})

export default postSlice.reducer
