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
    <tr key={el.id} style={{borderBottom: "1px solid white"}}>
    <td>{el.item}</td>
    <td>${el.cost}</td>
    <td>{el.need === false ? "✅" : null}</td>
    <td>{el.need === true ? "✅" : null}</td>
    </tr>
  ))
  let color; 
  savedTotal < 0 ? color = "red" : color = "black"

  return (
    <>
    <div class="spending-tracker-page">
    <button onClick={handleBackClick} id="tracker-back-button">back</button>

    <h1>{date}</h1>
    <div className="spending-tracker-flex-div">
    <div className="spending-form-div">
      <p style={{color: `${color}`}} className="spending-tracker-titles">Budget: ${budget}</p>
      <form onSubmit={(e) => handleSpendingSubmit(e)}>
        <label>Item Name:</label><br/>
        <input
          type="text"
          name="item"
          value={formData.item}
          onChange={(e) => handleSpendingChange(e)}
          required
        /><br/>
        <label>Cost:
          </label><br/>$
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={(e) => handleSpendingChange(e)}
            required
          /><br />
        <label>Need or Want?</label>
        <select
          name="need"
          value={formData.need}
          onChange={(e) => handleSpendingChange(e)}
          required
        >
          <option value="">Select:</option>
          <option value="true">Need</option>
          <option value="false">Want</option>
        </select><br/>
        <button type="submit" id="spending-submit">Submit</button>
      </form>
      <p>Wants Total: ${wantsTotal}</p>
      <p>Needs Total: ${needsTotal}</p>
      <p style={{color: `${color}`, marginBottom: "0"}}>Saved: ${savedTotal}</p>
      </div>
      <div>
      <PieChart wantsTotal={wantsTotal} needsTotal={needsTotal} savedTotal={savedTotal} id={id}/>
      </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
          <tr>
            <th>Item</th>
            <th>Cost</th>
            <th>Want</th>
            <th>Need</th>
          </tr>
          </thead>
          <tbody>
      {allItems}
      </tbody>
      </table>
      </div>
      </div>
    </>
  );
}

