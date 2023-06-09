import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SpendingTile({ el, user, handleDelete }) {
    const navigate = useNavigate()

    function handleDetailsClick(){
        if(user){
            navigate(`/summarydetails/${el.id}`)
            }
        }
    function handleDeleteClick(){
        handleDelete(el)
    }
  return (
    <div key={el.id} className='each-previous-spending'>
            <p className='date'>{el.date}</p>
            <p>Budget: ${el.budget}</p>
            <p>Wants Total: ${el.want_total === null? 0 : el.want_total}</p>
            <p>Needs Total: ${el.need_total === null? 0 : el.need_total}</p>
            <p>Saved Total: ${el.saved}</p>
            <button onClick={handleDetailsClick} className='summary-buttons'>See more details</button>
            <button onClick={handleDeleteClick} className='summary-buttons'>Delete Spending Summary</button>
        </div>
  )
}
