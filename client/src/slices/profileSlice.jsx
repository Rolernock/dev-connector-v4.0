import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

const initialState = {
  profiles: [],
  profile: null
}

export const getAllProfiles = createAsyncThunk(
  '/profiles/getAllProfiles',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/profile')
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(err => toast.error(err.msg))
      return rejectWithValue(errors)
    }
  }
)

export const createProfile = createAsyncThunk(
  '/profiles/createProfile',
  async ({ formData, edit = false }, { rejectWithValue }) => {
    console.log(formData)
    try {
      const { data } = await axios.post('/api/profile', formData)
      edit
        ? toast.success('Profile Updated successfully')
        : toast.success('Profile Created successfully')
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(err => toast.error(err.msg))
      return rejectWithValue(errors)
    }
  }
)

export const addEducation = createAsyncThunk(
  '/profiles/addEducation',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put('/api/profile/education', formData)
      toast.success('Education added')
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(err => toast.error(err.msg))
      return rejectWithValue(errors)
    }
  }
)

export const addExperience = createAsyncThunk(
  '/profiles/addEducation',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put('/api/profile/experience', formData)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(err => toast.error(err.msg))
      return rejectWithValue
    }
  }
)

export const deleteProfileById = createAsyncThunk(
  '/profiles/deleteProfileById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/profile/${id}`)
      toast.success(data.msg)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(err => toast.error(err.msg))
      return rejectWithValue(errors)
    }
  }
)

export const getProfileById = createAsyncThunk(
  '/profiles/getProfileById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/profile/${id}`)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      errors.map(err => toast.success(err.msg))
      return rejectWithValue(errors)
    }
  }
)

export const deleteExperience = createAsyncThunk(
  '/profiles/deleteExperience',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/profile/experience/${id}`)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const deleteEducation = createAsyncThunk(
  '/profiles/deleteEducation',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/profile/education/${id}`)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const getCurrentProfile = createAsyncThunk(
  '/profiles/getCurrentProfile',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('api/profile/me')
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const deleteAccount = createAsyncThunk(
  'deleteAccount',
  async (_, { rejectWithValue }) => {
    if (window.confirm('Are you sure?, This CANNOT be undone!')) {
      try {
        const { data } = await axios.delete('api/profile')
        toast.success('Your accout has been deleted permanently!')
        return data
      } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
          errors.forEach(error => toast.error(error.msg))
        }
        rejectWithValue(err.message)
      }
    }
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: state => {
      state.profile = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAllProfiles.fulfilled, (state, action) => {
        state.profiles = action.payload
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.profile = action.payload
      })
      .addCase(getCurrentProfile.fulfilled, (state, action) => {
        state.profile = action.payload
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.profile = null
      })
  }
})

export const { clearProfile } = profileSlice.actions
export default profileSlice.reducer
