import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ user, setUser }) {
  const navigate = useNavigate();

  const loginData = {
    username: "",
    password: "",
  };
  const [login, setLogin] = useState({ ...loginData });
  // const [data, setData] = useState({})
  function handleLoginChange(e) {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  }

  function handleSignUpClick(){
    navigate("/signup")
  }
  
  function handleLoginSubmit(e) {
    e.preventDefault();
    fetch("/api/v1/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(login),
    }).then((r) => {
      if (r.ok) {
        return r.json()
        } 
        else {
        throw new Error('Login unsuccessful')
      }
    })
    .then((data) => {
        setUser(data.user);
        localStorage.setItem('jwtToken', data.jwt);
        navigate("/home");
    })
    .catch((error) => {
        alert('Login unsuccessful')
    })
  }

  return (
    <>
    <div className="landing-page-main-div">
        <nav>
          <p>PiggyBank</p>
          <button onClick={() => navigate("/")}>Home</button>
        </nav>
        <div class="form-div">
        <p>Don't have an account? <br/><button onClick={handleSignUpClick} class="form-signup-button">Sign Up!</button></p><br />
        <h2>Log in</h2>
        <form
        onChange={(e) => handleLoginChange(e)}
        onSubmit={(e) => handleLoginSubmit(e)}
      >
        <label>Username</label><br />
        <input type="text" name="username" value={login.username}/><br />
        <label>Password</label><br />
        <input type="password" name="password" value={login.password} /><br/>
        <button class="form-login-button">Login</button>
      </form>
      </div></div>
    </>
  );
}
