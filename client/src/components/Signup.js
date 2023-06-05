import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({setUser}) {
    const navigate = useNavigate()
  const signupData = {
    username: "",
    password: "",
  };

  const [signup, setSignup] = useState({ ...signupData });

  function handleLogInClick(){
    navigate("/login")
  }
  
  function handleSignUpChange(e) {
    setSignup({
      ...signup,
      [e.target.name]: e.target.value
    })
    console.log(signup)
  }

  function handleSignUpSubmit(e){
    e.preventDefault();
    fetch("/api/v1/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(signup)
    })
    .then(r => r.json())
        .then(data => {
            localStorage.setItem("jwt", data.jwt)
            setUser(data.user)
            alert('signup successful!')
            navigate('/login')
        })
        .catch(err => alert(err))
  }
  return (
    <>
      <form onChange={(e) => handleSignUpChange(e)} onSubmit={(e) => handleSignUpSubmit(e)}>
        <label>Username:</label>
        <input type="text" name="username" value={signup.username} />
        <label>Password:</label>
        <input type="text" name="password" value={signup.password} />
        <button>Sign Up</button>
      </form>
      <p>Have an account? <button onClick={handleLogInClick}>Log in!</button></p>
    </>
  );
}
