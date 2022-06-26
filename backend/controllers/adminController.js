const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')


// @desc    Get all user tickets where status is new
// @route   GET /api/tickets/all
// @access  Private
const getAllTickets = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user || !user.isAdmin) {
    res.status(401)
    throw new Error('User not found')
  }
  const tickets = await Ticket.find({ status: 'new' }).populate( 'user', 'name' )
  res.status(200).json( tickets )

})

// @desc    Get user ticket from admin
// @route   GET /api/admin/ticket/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id).populate( 'user', 'name' )

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  res.status(200).json(ticket)
})

module.exports = {
  getAllTickets,
  getTicket
}
