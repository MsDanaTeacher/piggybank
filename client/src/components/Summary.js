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
                const sortedData = data.sort((a, b) => {
                    const dateA = new Date(a.date.split(' - ')[0]);
                    const dateB = new Date(b.date.split(' - ')[0]);
                    return dateA - dateB;
                  });
                  setSummaryData(sortedData);
            })
        }
    }, [])


    console.log(summaryData, 'sorted')
    function handleDelete(el){
        const token = localStorage.getItem("jwtToken")
        fetch(`weekly_spendings/${el.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            setSummaryData((summaryData) => summaryData.filter((s) => s.id !== el.id))
        })
    }

    const allSpendings = summaryData.map((el) => (
        <SpendingTile el={el} user={user} handleDelete={handleDelete}/>
    ))


    
  return (
    <>
    <button onClick={handleHomeClick}>back to home</button>
    {allSpendings}
    </>
  )
}
