import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HomepageForm from './HomepageForm'
import Logout from './Logout'
export default function Home({ user, setUser }) {
  const [button, setButton] = useState(false)

  const navigate = useNavigate()

  function handleSummaryClick(){
    navigate("/summary")
  }
  
  function handleButtonClick(){
    setButton(button => !button)
  }
  
  return (
    <>
    <div>
        Welcome back {user.username}!
    </div>
    <button onClick={handleSummaryClick}>Look at previous spendings!</button>
    <button onClick={handleButtonClick}>
      Track Weekly Spending
    </button>
    {button ? <HomepageForm user={user}/> : null}
    <Logout setUser={setUser}/>
    </>
  )
}
