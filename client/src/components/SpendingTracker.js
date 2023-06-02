import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SpendingTracker({ user }) {
  const { id, budget, date } = useParams();
  const formBody = {
    item: "",
    cost: "",
    need: "",
  };
  const [formData, setFormData] = useState({ ...formBody });
  const [wantsTotal, setWantsTotal] = useState(0);
  const [needsTotal, setNeedsTotal] = useState(0);
  const [savedTotal, setSavedTotal] = useState(parseFloat(budget));
  const [items, setItems] = useState([])

  function handleSpendingChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(formData);
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
          // setSavedTotal(savedTotal => savedTotal - parseInt(data.cost))
          // if(data.need){
          //     setNeedsTotal(needsTotal => needsTotal + parseInt(data.cost))
          // } else {
          //     setWantsTotal(wantsTotal => wantsTotal + parseInt(data.cost))
          // }
          handleSpendingUpdates(data);
        });
        setFormData({...formBody})
    }
  }

  function handleSpendingUpdates(data) {
    console.log(data, "data sent to callback");
    let saved = savedTotal - data.cost;
    // if(saved < 0){
    //     alert('Uh oh, you went over budget!')
    // }
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
      setSavedTotal((savedTotal) => saved);
    // //   localStorage.setItem("savedTotal", saved)
    //   if (data.need) {
        setNeedsTotal((needsTotal) => need);
    //     // localStorage.setItem("needsTotal", need)
    //   } else {
        setWantsTotal((wantsTotal) => want);
    //     // localStorage.setItem("wantsTotal", want)
    //   }
    //   console.log(wantsTotal, needsTotal, savedTotal, "wants, needs, saved");
      
      // setSavedTotal(savedTotal => savedTotal - parseInt(data.cost))
      //         if(data.need){
      //             setNeedsTotal(needsTotal + parseInt(data.cost))
      //         } else {
      //             setWantsTotal(wantsTotal + parseInt(data.cost))
      //         }
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
            setSavedTotal(data.saved)
            setWantsTotal(data.want_total)
            setNeedsTotal(data.need_total)
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
  return (
    <>
      <h1 style={{color: {savedTotal} < 0 ? "black" : "red"}}>Budget: ${budget}</h1>
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
      <p>Wants Total: ${wantsTotal}</p>
      <p>Needs Total: ${needsTotal}</p>
      <p>Saved: ${savedTotal}</p>

      <div>
        {allItems}
      </div>
    </>
  );
}

// To dos:
// Update wants total, needs total, saved total using a patch request for the weekly spending instance. then, update it on the
// front end to reflect this, I think its either useffect or usestate to reflect the change
