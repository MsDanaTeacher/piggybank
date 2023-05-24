import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Landing from './components/Landing';
import Home from './components/Home';

function App() {
  const [user, setUser] = useState({ username: "" })

  useEffect(() => {
    let token = localStorage.getItem("token");
    if(token && !user.username){
    fetch("/api/v1/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((r) => r.json())
    .then((data) => {
      if(data.user){
        setUser(data.user);
      }
    });
  }
}, []);

  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser}/>}/>
          <Route path="/signup" element={<Signup setUser={setUser}/>}/>
          <Route path="/home" element={<Home user={user} setUser={setUser}/>}/>
          <Route path="/" element={<Landing />}/>
        </Routes>
    </Router>
    
  );
}

export default App;
