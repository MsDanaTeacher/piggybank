import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PieChart from "./PieChart";

export default function SpendingTracker({ user }) {
  const { id, budget, date } = useParams();
  const navigate = useNavigate()
  const formBody = {
    item: "",
    cost: "",
    need: "",
  };
  const [formData, setFormData] = useState({ ...formBody });
  const [wantsTotal, setWantsTotal] = useState(0);
  const [needsTotal, setNeedsTotal] = useState(0);
  const [savedTotal, setSavedTotal] = useState(budget);
  const [items, setItems] = useState([])

  function handleBackClick(){
    navigate("/home")
  }
  function handleSpendingChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSpendingSubmit(e) {
    e.preventDefault();
    let token = localStorage.getItem("jwtToken");
    if (user) {
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
          item: formData.item,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          handleSpendingUpdates(data);
        });
        setFormData({...formBody})
    }
  }

  function handleSpendingUpdates(data) {
    console.log(data, "data sent to callback");
    let saved = (parseInt(savedTotal) - parseInt(data.cost));
    let need = needsTotal;
    let want = wantsTotal;
    if (data.need) {
      need = need + data.cost;
    } else {
      want = want + data.cost;
    }
    console.log(saved, need, want, "calculated");
    let token = localStorage.getItem("jwtToken");
    if (user) {
      fetch(`/weekly_spendings/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          want_total: want,
          need_total: need,
          saved: saved,
        }),
      }).then((r) => r.json());
      setSavedTotal(saved);
        setNeedsTotal(need);
        setWantsTotal(want);
    }
  }
  useEffect(() => {
    let token=localStorage.getItem("jwtToken")
    if(user){
        fetch(`/weekly_spendings/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then(r => r.json())
        .then(data => {
            console.log(data, 'updated info')
            // setSavedTotal(data.saved)
            if(data.want_total === null){
                setWantsTotal(0)
            } else {
            setWantsTotal(data.want_total)
            }
            if(data.need_total === null){
                setNeedsTotal(0)
            } else{
            setNeedsTotal(data.need_total)
            }
            setSavedTotal(data.saved)
        })
    }
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("jwtToken")
    fetch(`/items?user_id=${user.id}&weekly_spending_id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
    .then((r) => r.json())
    .then(data => {
        setItems(data)
        console.log(data, 'all items')
    })
  }, [wantsTotal, needsTotal, savedTotal])

  let allItems = items.map((el) => (
    <div key={el.id} style={{border: "2px solid black"}}>
    <h5>{el.item}</h5>
    <p>{el.cost}</p>
    <p>{el.need === true ? "need" : "want"}</p>
    </div>
  ))
  let color; 
  savedTotal < 0 ? color = "red" : color = "black"

  return (
    <>
    <button onClick={handleBackClick}>back</button>
      <h1 style={{color: `${color}`}}>Budget: ${budget}</h1>
      <h1>Dates: {date}</h1>
      <form onSubmit={(e) => handleSpendingSubmit(e)}>
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
      <p>Wants Total: ${wantsTotal}</p>
      <p>Needs Total: ${needsTotal}</p>
      <p style={{color: `${color}`}}>Saved: ${savedTotal}</p>
      <div>
        {allItems}
      </div>
      <PieChart wantsTotal={wantsTotal} needsTotal={needsTotal} savedTotal={savedTotal} id={id}/>
    </>
  );
}

