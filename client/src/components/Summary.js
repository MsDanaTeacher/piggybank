import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import SpendingTile from './SpendingTile'

export default function Summary({ user }) {
    const navigate = useNavigate()
    const [summaryData, setSummaryData] = useState([])

    function handleHomeClick(){
        navigate("/home")
    }

    const token = localStorage.getItem("jwtToken")
    useEffect(() => {
        if(token){
            fetch("/weekly_spendings", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            .then(r => r.json())
            .then(data => {
                setSummaryData(data)
                console.log(data)
            })
        }
    }, [])

    const allSpendings = summaryData.map((el) => (
        <SpendingTile el={el} user={user}/>
    ))


  return (
    <>
    <button onClick={handleHomeClick}>back to home</button>
    {allSpendings}
    </>
  )
}
