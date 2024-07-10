import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axios from 'axios'

const initialState = {
  users: [],
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  userId: null
}

export const register = createAsyncThunk(
  '/users/register',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users', formData)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(err => toast.error(err.msg))
      return rejectWithValue(errors)
    }
  }
)

export const login = createAsyncThunk(
  '/users/login',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users/login', formData)
      toast.success(`Welcome back ${data.name}`)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(err => toast.error(err.msg))
      return rejectWithValue(errors)
    }
  }
)

export const getAllUsers = createAsyncThunk(
  '/users/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/users/all-users')
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const deleteUser = createAsyncThunk(
  '/users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/users/${id}`)
      toast.success(data.msg)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(err => toast.error(err.msg))
      return rejectWithValue(errors)
    }
  }
)

export const getUserById = createAsyncThunk(
  '/users/getUserById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const updateUser = createAsyncThunk(
  '/users/updateUser',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/users/${formData._id}`, formData)
      toast.success('User updated successfully')
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(err => toast.error(err.msg))
      return rejectWithValue(errors)
    }
  }
)

export const logout = createAsyncThunk(
  '/users/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users/logout')
      toast.success(data.msg)
      return data.msg
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(err => toast.error(err.msg))
      return rejectWithValue(errors)
    }
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(logout.fulfilled, state => {
        state.user = null
        localStorage.removeItem('user')
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(login.rejected, state => {
        state.user = null
        localStorage.removeItem('user')
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userId = action.payload
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
  }
})

export default userSlice.reducer
