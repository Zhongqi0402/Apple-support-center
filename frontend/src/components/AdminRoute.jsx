import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

const AdminRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus()
  const { user } = useSelector( state => state.auth )

  if (checkingStatus) {
    return <Spinner />
  }

  return loggedIn && user && user.isAdmin ? <Outlet /> : <Navigate to='/login' />
}

export default AdminRoute
