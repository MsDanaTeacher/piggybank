import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const loginData = {
    username: "",
    password: "",
  };
  const [login, setLogin] = useState({ ...loginData });

  function handleLoginChange(e) {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
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
        } else {
        throw new Error('Login unsuccessful')
      }
    })
    .then((data) => {
        setUser(data.user);
        localStorage.setItem('token', data.token);
        // console.log(data.user, data.token, 'user and token')
        navigate("/home");
    })
    .catch((error) => {
        alert('Login unsuccessful')
    })
  }

  return (
    <>
      <form
        onChange={(e) => handleLoginChange(e)}
        onSubmit={(e) => handleLoginSubmit(e)}
      >
        <label>Username:</label>
        <input type="text" name="username" value={login.username} />
        <label>Password:</label>
        <input type="password" name="password" value={login.password} />
        <button>Login</button>
      </form>
    </>
  );
}
