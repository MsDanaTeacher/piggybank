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
     <div className="landing-page-main-div">
        <nav>
          <p>PiggyBank</p>
          <button onClick={() => navigate("/")}>Home</button>
        </nav>
        <div class="form-div">
        <p>Have an account? <br/><button onClick={handleLogInClick} class="form-signup-button">Log in!</button></p><br />
        <h2>Sign up</h2>
      <form onChange={(e) => handleSignUpChange(e)} onSubmit={(e) => handleSignUpSubmit(e)}>
        <label>Username:</label>
        <input type="text" name="username" value={signup.username} />
        <label>Password:</label>
        <input type="text" name="password" value={signup.password} />
        <button class="form-login-button">Sign Up</button>
      </form>
      </div></div>
      </>
  );
}
