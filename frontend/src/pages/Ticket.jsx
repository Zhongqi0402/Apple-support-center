import React from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'
import { useParams, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  )

  const params = useParams()
  const dispatch = useDispatch()
  const { ticketId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    //dispatch(getNotes(ticketId))
    // eslint-disable-next-line
  }, [isError, message, ticketId])

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }

  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h3>Something Went Wrong</h3>
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className='btn btn-block btn-danger'>
          Close Ticket
        </button>
      )}

    </div>
  )
}

export default Ticket
