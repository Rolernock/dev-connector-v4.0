import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Landing from './components/Landing'
import NotFound from './pages/routing/NotFound'
import MainLayout from './pages/layout/MainLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/dashboard/Dashboard'
import Profiles from './pages/profiles/Profiles'
import Profile from './pages/profile/Profile'
import PrivateRoute from './pages/routing/PrivateRoute'
import AdminRoutes from './pages/routing/AdminRoutes'
import UserListScreen from './pages/admin/UserListScreen'
import UserEdit from './pages/admin/UserEdit'
import CreateProfile from './pages/profile-forms/CreateProfile'
import EditProfile from './pages/profile-forms/EditProfile'
import AddEducation from './pages/profile-forms/AddEducation'
import AddExperience from './pages/profile-forms/AddExperience'
import Posts from './pages/posts/Posts'
import Post from './pages/post/Post'
import { store } from '../store'

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/' element={<MainLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profiles' element={<Profiles />} />
            <Route path='profile/:id' element={<Profile />} />
            <Route path='/' element={<PrivateRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/create-profile' element={<CreateProfile />} />
              <Route path='/edit-profile' element={<EditProfile />} />
              <Route path='/add-education' element={<AddEducation />} />
              <Route path='/add-experience' element={<AddExperience />} />
              <Route path='/posts' element={<Posts />} />
              <Route path='/posts/:id' element={<Post />} />

              <Route path='/admin' element={<AdminRoutes />}>
                <Route path='/admin/all-users' element={<UserListScreen />} />
                <Route path='/admin/user/:id/edit' element={<UserEdit />} />
              </Route>
            </Route>
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
