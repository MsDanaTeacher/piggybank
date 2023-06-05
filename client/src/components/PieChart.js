import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from "chart.js";

Chart.register(ArcElement, Tooltip);
export default function PieChart({ wantsTotal, needsTotal, savedTotal }) {
  

    const data = {
        labels: ['Wants', 'Needs', 'Saved'],
        datasets: [
            {
                data: [wantsTotal, needsTotal, savedTotal < 0 ? null : savedTotal],
                backgroundColor: ['#2A9D8F', '#F4A261', '#E9C46A'],
                hoverBackgroundColor: ['#7BCDC3', '#F3C8A7', '#EAD196'],
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
            <h2>My Weekly Spending Chart</h2>
            <div style={{maxWidth: "50%", width: "auto"}}>
            <Doughnut data={data} options={options} />
            </div>
    </>
  )
}
