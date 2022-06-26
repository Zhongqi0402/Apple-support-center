const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Note = require('../models/noteModel')
const Ticket = require('../models/ticketModel')

const io = require('../socket')

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.ticketId)
  // console.log( user.isAdmin );
  if ( ( ticket.user.toString() === req.user.id ) || user.isAdmin ) {
    const notes = await Note.find({ ticket: req.params.ticketId }).populate( 'user', 'name' )
    res.status(200).json(notes)
  } else {
    res.status(401)
    throw new Error('User not authorized')
  }
})

// @desc    Create ticket note
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if ( ticket.user.toString() !== req.user.id && !user.isAdmin ) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: user.isAdmin,
    ticket: req.params.ticketId,
    user: req.user.id,
  })
  const newNote = note;
  newNote.user = user;
  console.log( newNote._id );
  io.getIO().emit('posts', { action: 'add-note', data: newNote });
  res.status(200).json(note)
})

module.exports = {
  getNotes,
  addNote,
}
