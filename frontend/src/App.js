import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NewTicket from './pages/NewTicket'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import AdminTicket from './pages/AdminTicket'
import Tickets from './pages/Tickets'
import Ticket from './pages/Ticket'


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />

          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/new-ticket' element={<PrivateRoute />}>
                <Route path='/new-ticket' element={<NewTicket />} />
              </Route>
              <Route path='/tickets' element={<PrivateRoute />}>
                <Route path='/tickets' element={<Tickets />} />
              </Route>
              <Route path='/ticket/:ticketId' element={<PrivateRoute />}>
                <Route path='/ticket/:ticketId' element={<Ticket />} />
              </Route>
              <Route path='/admin/tickets' element={<AdminRoute />}>
                <Route path='/admin/tickets' element={<Tickets />} />
              </Route>
              <Route path='/admin/ticket/:ticketId' element={<AdminRoute />}>
                <Route path='/admin/ticket/:ticketId' element={<AdminTicket />} />
              </Route>
            </Routes>
          </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
