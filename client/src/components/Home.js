import React from 'react'
import Logout from './Logout'
export default function Home({ user, setUser }) {
  return (
    <>
    <div>
        Welcome back {user.username}!
    </div>
    <Logout setUser={setUser}/>
    </>
  )
}
