import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../../components/Navbar'

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className='container'>
        <Outlet />
      </div>
      <ToastContainer />
    </>
  )
}
