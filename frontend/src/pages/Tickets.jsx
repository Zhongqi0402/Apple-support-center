import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, getAllTickets, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'

function Tickets() {
    const { tickets, isLoading, isSuccess } = useSelector(
      (state) => state.tickets
    )
    const [ticket_heading, setTicket_heading] = useState('ticket-headings')
    const { user } = useSelector( ( state ) => state.auth )
  
    const dispatch = useDispatch()
  
    useEffect(() => {
      return () => {
        if (isSuccess) {
          dispatch(reset())
        }
      }
    }, [dispatch, isSuccess])
  
    useEffect(() => {
      if (user) {
        if ( user.isAdmin ) {
          setTicket_heading('staff-ticket-headings')
          dispatch(getAllTickets())
        } else {
          dispatch(getTickets())
        }
      }
    }, [dispatch, user])

    if (isLoading) {
      return <Spinner />
    }
    
    return (
      <>
      <h1>Tickets</h1>
        
        <BackButton url='/' />
        <h1>{user && user.isAdmin ? 'Staff View All' : <></>} Tickets</h1>
        <div className='tickets'>
          <div className={ticket_heading}>
            <div>Date</div>
            <div>Product</div>
            <div>Status</div>
            {user.isAdmin && <div>Name</div>}
            <div></div>
          </div>
          {tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
          ))}
        </div>
        
        
      </>
    )
  }
  
export default Tickets  