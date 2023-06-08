import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import SpendingTile from './SpendingTile'
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";

Chart.register(ArcElement, Tooltip);

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

    let wantsTotal = 0;
    let needsTotal = 0;
    let savedTotal = 0;
    for(let i = 0; i < summaryData.length; i++){
        wantsTotal = wantsTotal + summaryData[i].want_total
        needsTotal = needsTotal + summaryData[i].need_total
        savedTotal = savedTotal + summaryData[i].saved
    }    

    const data = {
        labels: ["Wants", "Needs", "Saved"],
        datasets: [
          {
            data: [
              wantsTotal,
              needsTotal,
              savedTotal < 0 ? null : savedTotal,
            ],
            backgroundColor: ["#2A9D8F", "#F4A261", "#E9C46A"],
            hoverBackgroundColor: ["#7BCDC3", "#F3C8A7", "#EAD196"],
          },
        ],
      };
    
      const options = {
        plugins: {
          tooltip: {
            enabled: true,
          },
        },
      };
    
      
  return (
   <>
   <button onClick={handleHomeClick}>back to home</button>
    <div style={{display: "flex"}}>
    <div>
    <h2>{user.username}'s Spending Summary:</h2>
    <h5>Wants Spending Total:</h5>
    <p>${wantsTotal}</p>
    <h5>Needs Spending Total:</h5>
    <p>${needsTotal}</p>
    <h5>All Time Savings:</h5>
    <p>${savedTotal}</p>
    </div>
    <div style={{ maxWidth: "50%", width: "auto" }}>
          <Doughnut data={data} options={options} />
        </div>
</div>
        <div>
    <h2>Browse Previous Spending:</h2>
    {allSpendings}
    </div>
    </>
  
  )
}
