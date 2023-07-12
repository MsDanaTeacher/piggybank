import React from 'react'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import HomepageForm from './HomepageForm'
import Logout from './Logout'
import Summary from './Summary'
export default function Home({ user, setUser }) {
  // const [button, setButton] = useState(false)

  // const navigate = useNavigate()

  // function handleSummaryClick(){
  //   navigate("/summary")
  // }
  
  // function handleButtonClick(){
  //   setButton(button => !button)
  // }
  
  return (
    <div>
    <div class="user-home">
    <div>
    <nav class="user-home-nav">
          <p>PiggyBank</p>
      <Logout setUser={setUser}/>
        </nav>
        <h1>
        Welcome back {user.username}!
      </h1>
    </div>
    {/* <button onClick={handleSummaryClick}>Look at previous spendings!</button> */}
    {/* <div></div> */}
    <div class="form-summary-components">
    <div className='summary-component'>
    <Summary user={user}/>
    </div>
    <div className="user-home-form">
    <HomepageForm user={user}/>
    </div>
    </div>
    </div>
    </div>
  )
}
  
