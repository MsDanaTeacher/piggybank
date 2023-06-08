import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className='landing-page-main-div'>
    <nav>
      <h1>PiggyBank</h1>
      <button onClick={() => navigate("/login")}>Log In</button>
    </nav>
    <div>
      <div>
      <h2>Financial literacy is
important. 
Spend. Save.
Learn.</h2>
<button onClick={() => navigate("/signup")}>Sign Up</button>
</div>
    </div>
    </div>
  )
}
