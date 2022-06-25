const express = require( 'express' )

const router = express.Router()

const {
   getAllTickets,
   getTicket
} = require('../controllers/adminController')

const { protect } = require('../middleware/authMiddleware')

//    /api/admin/tickets
router.route( '/tickets' ).get( protect, getAllTickets )

//    /api/admin/ticket/:id
router.route( '/ticket/:id' ).get( protect, getTicket )

module.exports = router