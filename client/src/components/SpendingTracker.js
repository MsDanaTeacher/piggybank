import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function SpendingTracker({ user }) {
  const { id, budget, date } = useParams();
  const formBody = {
    item: "",
    cost: "",
    need: "",
  };
  const [formData, setFormData] = useState({ ...formBody });

  function handleSpendingChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  }

  function handleSpendingSubmit(e) {
    e.preventDefault();
    let token = localStorage.getItem("jwtToken");
    if(user){
        fetch("/items", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                weekly_spending_id: id,
                date: date,
                need: formData.need,
                cost: formData.cost,
                item: formData.item
            })
        })
        .then((r) => {
            if(r.ok){
                return r.json()
            } else {
                throw new Error("Try again")
            }
        })
        .then((data) => {
            console.log(data, 'spending habits')
        })
    }
  }
  return (
    <>
      <h1>Budget: ${budget}</h1>
      <h1>Dates: {date}</h1>
      <form onSubmit={(e) => handleSpendingSubmit(e)}>
        <p>need item name, cost, need</p>
        <label>Item Name:</label>
        <input
          type="text"
          name="item"
          value={formData.item}
          onChange={(e) => handleSpendingChange(e)}
        />
        <label>Cost:</label>
        <p>
          $
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={(e) => handleSpendingChange(e)}
          />
        </p>
        <label>Need or Want?</label>
        <select
          name="need"
          value={formData.need}
          onChange={(e) => handleSpendingChange(e)}
        >
          <option value="">Select:</option>
          <option value="true">Need</option>
          <option value="false">Want</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <p>Wants Total: $</p>
      <p>Needs Total: $</p>
      <p>Saved: $</p>
    </>
  );
}


// To dos:
// Update wants total, needs total, saved total using a patch request for the weekly spending instance. then, update it on the
// front end to reflect this, I think its either useffect or usestate to reflect the change