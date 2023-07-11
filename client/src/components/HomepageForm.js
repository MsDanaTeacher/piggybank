import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function HomepageForm({ user }) {
const navigate = useNavigate()
  const formBody = {
    budget: "",
    date: "",
  };
  const [dateRange, setDateRange] = useState([null, null]);
  const [formData, setFormData] = useState({ ...formBody });

  function handleBudgetChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  }

  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  }


  function handleDateChange(date, index) {
    const newDateRange = [...dateRange];
    newDateRange[index] = date;
    setDateRange(newDateRange);

    setFormData({
      ...formData,
      date: newDateRange.map((date) => (date ? formatDate(date) : "")),
    });

    console.log(formData);
  }

  function formatDateRange(dateRange) {
    const formattedDates = dateRange.map((date) => {
      const options = { month: 'long', day: 'numeric', year: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    });
  
    return formattedDates.join(' - ');
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    let token = localStorage.getItem("jwtToken");
    if (user) {
    const dateRangeString = formatDateRange(formData.date);
      fetch("/weekly_spendings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            budget: formData.budget,
            date: dateRangeString,
            saved: formData.budget
        }),
      })
        .then((r) => {
          if (r.ok) {
            return r.json();
          } else {
            throw new Error("Try again");
          }
        })
        .then((data) => {
          alert("created new weekly spending!");
          console.log(data.date);
          navigate(`/spendingtracker/${data.id}/${data.budget}/${data.date}`)
        })
        .catch((error) => {
          alert("nope");
        });
    }
  }
  return (
    // <div className="homepage-form-div">
    <form
      onChange={(e) => handleBudgetChange(e)}
      onSubmit={(e) => handleFormSubmit(e)}
      className="homepage-form"
    >
      {/* <label>Budget:</label> */}
      <div><label>Budget: </label>
        $ <input type="number" name="budget" value={formData.budget} id="budget" required/>
      </div>
      {/* <label>Dates</label> */}
      <div style={{marginTop: "2%", marginBottom: "4%"}}>From:<DatePicker
        selected={dateRange[0]}
        onChange={(date) => handleDateChange(date, 0)}
        required
      /></div>
      <div>To: 
      <DatePicker
        selected={dateRange[1]}
        onChange={(date) => handleDateChange(date, 1)}
        required
      />
      </div>
      <button type="submit" id="budget-submit">Submit</button>
    </form>
    // </div>
  );
}
