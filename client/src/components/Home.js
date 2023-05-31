import React from 'react'
import { useState } from 'react'
import HomepageForm from './HomepageForm'
import Logout from './Logout'
export default function Home({ user, setUser }) {
  const [button, setButton] = useState(false)

  function handleButtonClick(){
    setButton(button => !button)
  }
  
  return (
    <>
    <div>
        Welcome back {user.username}!
    </div>
    <button onClick={handleButtonClick}>
      Track Weekly Spending
    </button>
    {button ? <HomepageForm user={user}/> : null}
    <Logout setUser={setUser}/>
    </>
  )
}
