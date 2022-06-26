import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'

function Home() {
  const { user } = useSelector( ( state ) => state.auth )

  let message = user && user.isAdmin ? "View All Tickets" : 'View My Tickets'


  return (
    <>
      {!user || !user.isAdmin ? <section className='heading'>
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section> :
      <h1>Move your ass and help your customers</h1>}

      {( user && !user.isAdmin ) && <Link to='/new-ticket' className='btn btn-reverse btn-block'>
        <FaQuestionCircle /> Create New Ticket
      </Link>}

      <Link to={user && user.isAdmin ? '/admin/tickets' : '/tickets'} className='btn btn-block'>
        <FaTicketAlt /> { message }
      </Link>
    </>
  )
}

export default Home