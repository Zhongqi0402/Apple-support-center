import React from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { adminGetTicket } from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import {
  getNotes,
  createNote,
  updateNotes,
  // reset as notesReset,
} from '../features/notes/noteSlice'
import NoteItem from '../components/NoteItem'
import openSocket from 'socket.io-client'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}
Modal.setAppElement('#root')

function Ticket() {
  // states
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')

  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  )
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  )
  const { user } = useSelector( ( state ) => state.auth )

  const dispatch = useDispatch()
  const { ticketId } = useParams()


  useEffect(() => {
    const newSocket = openSocket('/');
    const handler = data => {
      // console.log( data.data.user._id.toString() )
      // console.log( user._id.toString() )
      if (data.action === 'add-note' && 
          (ticketId === data.data.ticket.toString()) && 
          ( data.data.user._id.toString() !== user._id.toString() ) ) {
        // if data is sent from current user, do nothing
        // data.data.user compare to current user -> state.
        dispatch(updateNotes( data.data ))
      } 
    };
    newSocket.on( 'posts', handler )
    return () => newSocket.off( 'posts', handler )
  }, []);


  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(adminGetTicket(ticketId))
    dispatch(getNotes(ticketId))
    // eslint-disable-next-line
  }, [isError, message, ticketId])

   // Create note submit
   const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({ noteText, ticketId }))
    closeModal()
  }

  // Open/close modal
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)


  if (isLoading || notesIsLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h3>Something Went Wrong</h3>
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/admin/tickets' />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>User Name: {ticket.user ? ticket.user.name : ''}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button onClick={openModal} className='btn'>
          <FaPlus /> Reply to Customer
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add Reply To Customer</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Hi there. We are very sorry to hear your issue...'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
    </div>
  )
}

export default Ticket
