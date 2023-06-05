import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";

Chart.register(ArcElement, Tooltip);

export default function SummaryDetails() {
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    fetch(`/weekly_spendings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items);
        setSummary(data);
      });
  }, []);

  const allItems = items.map((i) => (
    <div key={i.id} style={{ border: "2px solid red", width: "50vw" }}>
      <p>{i.item}</p>
      <p>{i.cost}</p>
    </div>
  ));
  function handleBackToSummaries() {
    navigate("/summary");
  }

  const savedSummary =
    summary.saved > 0
      ? `I saved $${summary.saved}.`
      : "I did not save money this week.";

  const needsSummary = summary.need_total > 0 ? `I spent $${summary.need_total} on needs` : "I didn't spend money on needs"
  const wantsSummary = summary.want_total > 0 ? `I spent $${summary.want_total} on wants` : "I didn't spend money on wants"
  const data = {
    labels: ["Wants", "Needs", "Saved"],
    datasets: [
      {
        data: [
          summary.want_total,
          summary.need_total,
          summary.saved < 0 ? null : summary.saved,
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
      <button onClick={handleBackToSummaries}>back to summaries</button>
      <h2>Spending Receipt</h2>
      <div style={{ display: "flex" }}>
        <div style={{ maxWidth: "50%", width: "auto" }}>
          <Doughnut data={data} options={options} />
        </div>
        <div>
          {allItems}
          <p>
            I had ${summary.budget} to spend. {needsSummary}. {wantsSummary}. {savedSummary}
          </p>
        </div>
      </div>
    </>
  );
}
