import './Landing.css';
import './LoginSignup.css'
import './Home.css'
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Landing from './components/Landing';
import Home from './components/Home';
import SpendingTracker from './components/SpendingTracker';
import Summary from './components/Summary';
import SummaryDetails from './components/SummaryDetails';

function App() {
  const [user, setUser] = useState({ username: "" })

  useEffect(() => {
    let token = localStorage.getItem("jwtToken");
    if(token && !user.username){
    fetch("/api/v1/auto_login", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then((r) => r.json())
    .then((data) => {
        setUser(data);
    });
  }
}, []);

  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login user={user} setUser={setUser}/>}/>
          <Route path="/signup" element={<Signup setUser={setUser}/>}/>
          <Route path="/home" element={<Home user={user} setUser={setUser}/>}/>
          <Route path="/spendingtracker/:id/:budget/:date" element={<SpendingTracker user={user}/>}/>
          {/* <Route path="/summary" element={<Summary user={user}/>} /> */}
          <Route path="/summarydetails/:id" element={<SummaryDetails />} />
          <Route path="/" element={<Landing />}/>
        </Routes>
    </Router>
    
  );
}

export default App;
