import React from 'react'
import './completion.css'
import { useNavigate } from 'react-router-dom'


const Completion = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/'); // Replace '/dashboard' with your actual dashboard path
  };
  return (
    <div className='complete'>
    <h1>Thank you For Your Purchase! 🎉</h1>
    <button onClick={handleButtonClick}>GO BACK TO DASHBOARD</button>
    </div>
  )
}

export default Completion