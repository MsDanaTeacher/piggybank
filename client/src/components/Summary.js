import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Summary() {
    const navigate = useNavigate()
    function handleHomeClick(){
        navigate("/home")
    }
    
  return (
    <>
    <button onClick={handleHomeClick}>back to home</button>
    </>
  )
}
