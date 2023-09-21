import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='not-found-container'>
        <h3>404 - Error</h3>
        <p>Cannot find that page. <Link to='/'>Click here to redirect to Homepage</Link></p>
    </div>
  )
}

export default NotFound