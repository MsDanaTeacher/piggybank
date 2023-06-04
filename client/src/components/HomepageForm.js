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
    <form
      onChange={(e) => handleBudgetChange(e)}
      onSubmit={(e) => handleFormSubmit(e)}
    >
      <label>Budget:</label>
      <div>
        $<input type="number" name="budget" value={formData.budget} />
      </div>
      <label>Date Range:</label>
      <DatePicker
        selected={dateRange[0]}
        onChange={(date) => handleDateChange(date, 0)}
      />
      <DatePicker
        selected={dateRange[1]}
        onChange={(date) => handleDateChange(date, 1)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}