//rafce
import React from 'react'
import { Link } from 'react-router-dom'

const Pnf = () => {
  return (
    <div style={{height:'100vh'}} className='my-5 d-flex justify-content-center align-items-center flex-column'>
      <h1 style={{fontSize:'80px'}}>404!</h1>
      <img className='img-fluid' src="https://cdnl.iconscout.com/lottie/premium/thumb/data-error-8597339-6842609.gif" alt="" />
      <h1>Look Like You're Lost</h1>
      <p>The page your looking for is not available!</p>
      <Link to={'/'}  className="btn btn-warning">Go To Home</Link>
    </div>
  )
}

export default Pnf