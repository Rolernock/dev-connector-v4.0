import { configureStore } from '@reduxjs/toolkit'
import userReducer from './src/slices/userSlice'
import postReducer from './src/slices/postSlice'
import profileReducer from './src/slices/profileSlice'

export const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postReducer,
    profiles: profileReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})
