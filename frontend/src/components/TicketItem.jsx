import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

function TicketItem({ ticket }) {
  const { user } = useSelector((state) => state.auth)
  const [ticketClass, setTicketClass] = useState('ticket')

  useEffect(() => {
    if (user.isAdmin) {
      setTicketClass('staff-ticket')
    }
  }, [ user ])
  

  return (
    <div className={ticketClass}>
      <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      { user.isAdmin && <div>{ticket.user.name}</div> }
      { !user.isAdmin ?
          <Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>
            View
          </Link>
        : <Link to={`/admin/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>
            View Ticket
          </Link>
      }
    </div>
  )
}

export default TicketItem