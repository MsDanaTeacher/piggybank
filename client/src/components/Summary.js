import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'

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
        <div key={el.id} style={{border: "2px solid blue"}}>
            <p>{el.date}</p>
            <p>Budget: ${el.budget}</p>
            <p>Wants Total: ${el.want_total === null? 0 : el.want_total}</p>
            <p>Needs Total: ${el.need_total === null? 0 : el.need_total}</p>
            <p>Saved Total: ${el.saved}</p>
            <button onClick={(el) => handleSeeDetails(el)}>See more details</button>
        </div>
    ))

    function handleSeeDetails(el){
        const id = el.id
        if (token){
        fetch(`/weekly_spendings/${id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
            }
        })
        .then(r => r.json)
        .then(data => console.log(data))
    }
    }

  return (
    <>
    <button onClick={handleHomeClick}>back to home</button>
    {allSpendings}
    </>
  )
}
