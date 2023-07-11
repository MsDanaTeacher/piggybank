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
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      };
    
  return (
    <>
    <div className='spending-tracker-pie-chart-div'>
            <p id="weekly-spending-chart">My Weekly Spending Chart</p>
            <div style={{ width: '80%', aspectRatio: '1', margin: 'auto' }}>
            <Doughnut data={data} options={options} />
            </div>
            </div>
    </>
  )
}
