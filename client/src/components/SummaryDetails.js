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
  const date = summary.date;

  const spending = [
    "To make your budget go further, it's a good idea to be mindful of your spending on things you want and things you need. Try saving more by setting a goal and saving a little each week. It can help you reach your savings target in no time!",
    "Remember, every small saving adds up! By making thoughtful choices when it comes to your expenses, you can enjoy the things you want while still building up your savings for future adventures.",
    "Making smart financial decisions is like a superpower! Take control of your budget by prioritizing your needs, cutting back on unnecessary wants, and watching your savings grow. You'll be amazed at what you can achieve!",
  ];
  const spendingWants = [
    "Great job enjoying your wants! Let's try saving a bit more next time to make your dreams come true.",
    "You're doing amazing at treating yourself to the things you enjoy! Let's also set aside some savings for the future, so you can have even more opportunities to create wonderful memories and experiences.",
    "Let's supercharge your savings power! By saving a little extra each time, you'll unlock awesome opportunities to make your dreams come true. Every dollar saved gets you closer to reaching your super-duper goals!",
  ];
  const saving = [
    "Wow, you're a savings superstar! Remember to have fun with your money too. Think about treating yourself to something special, like a small toy or a fun outing, to make your savings journey even more exciting!",
    "You're doing an amazing job saving money! It's important to also enjoy the fruits of your hard work. Consider using a small portion of your savings to do something you love, like trying a new hobby or going on a fun adventure!",
    "You're a super saver! While saving is fantastic, it's also important to reward yourself along the way. Treat yourself to something small that brings you joy, like a favorite book or a tasty treat, as a special celebration of your savings success!",
  ];
  const success = [
    "Way to go, superstar! You rocked it by finding a perfect balance between things you wanted, things you needed, and saving for the future. Keep up the awesome work, and continue making smart choices with your money!",
    "You're a budgeting pro! You did an amazing job this week by carefully managing your wants, needs, and savings. Keep up the great work, and remember to celebrate your accomplishments while still saving for those special things you're dreaming of!",
    "You're doing incredible with your money skills! By smartly spending on the things you really want, taking care of your needs, and saving up for special things, you're on your way to achieving big dreams. Keep it up, and remember that every little step gets you closer to your goals!",
  ];

  const randomIndex = Math.floor(Math.random() * 3);

  let response;
  if (summary.want_total >= summary.budget * 0.35) {
    response = spendingWants[randomIndex];
  } else if (summary.need_total + summary.want_total >= summary.budget * 0.9) {
    response = spending[randomIndex];
  } else if (summary.saved >= summary.budget * 0.2) {
    response = saving[randomIndex];
  } else if (
    summary.want_total < summary.budget * 0.35 &&
    summary.need_total <= summary.budget * 0.55 &&
    summary.saved >= summary.budget * 0.2
  ) {
    response = success[randomIndex];
  } else if (summary.saved < 0) {
    response =
      "Oops! We went over budget this week. Lets set some savings goals for next week to get back on track!";
  } else {
    response = "Keep up the good work!";
  }

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

  const allNeeds = items.map((i) => {
    if(i.need === true){
    return <div key={i.id} className="each-need-want">
      <p>{i.item} ${i.cost}</p>
    </div>}}
  );
  
  const allWants = items.map((i) => {
    if(i.need === false){
      return <div key={i.id} className="each-need-want">
      <p>{i.item} ${i.cost}</p>
    </div>
    }
  })
  function handleBackToSummaries() {
    navigate("/home");
  }

  const savedSummary =
    summary.saved > 0
      ? `I saved $${summary.saved}.`
      : "I did not save money this week.";

  const needsSummary =
    summary.need_total > 0
      ? `I spent $${summary.need_total} on needs`
      : "I didn't spend money on needs";
  const wantsSummary =
    summary.want_total > 0
      ? `I spent $${summary.want_total} on wants`
      : "I didn't spend money on wants";
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
        borderColor: "transparent",
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
    <div className="summary-details-page">
      <button onClick={handleBackToSummaries} id="back-to-summaries">back to summaries</button>
      <div className="dates-and-doughnut">
        <h2>Spending Summary: {date}</h2>
        <div style={{ width: '30%', aspectRatio: '1', margin: 'auto' }}>
          <Doughnut data={data} options={options} />
        </div>
        <p>
          I had ${summary.budget} to spend. {needsSummary}. {wantsSummary}.{" "}
          {savedSummary}
        </p>
        <p>{response}</p>
      </div>

      <div className="all-items-summary-div">
        <h2>🍎 Needs</h2>
        {allNeeds}
        <h2>🧸 Wants</h2>
        {allWants}
      </div>
      </div>
    </>
  );
}
