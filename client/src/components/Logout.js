import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout({ setUser }) {
    const navigate = useNavigate()

    function handleLogoutClick(){
        setUser({username: ""});
        localStorage.removeItem("jwtToken");
        navigate("/login")
    }

  return (
    <button onClick={handleLogoutClick}>Log Out</button>
  )
}
