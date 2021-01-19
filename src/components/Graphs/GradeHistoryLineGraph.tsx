import React, { useEffect, useRef } from "react";
// import Chart, { Line } from "react-chartjs-2";
import { Batch } from "../../types";
import Chart from "chart.js";


//They will pass us a prop called Batch

const GradeHistoryLineGraph: React.FC<{ batch: Batch; traineeId: string }> = ({ batch: {associateAssignments: associates}, traineeId }) => {
  //Temporary Storage for the Graph's Data
  const chart = useRef<HTMLCanvasElement>(null);

    //No dependencies so this code runs once at the start
    useEffect(() => {
      if (!associates.length || !chart.current) return;
      const [{ associate: { grades, firstName, lastName } }] = associates.filter(({ associate: { grades: [{traineeId:id}] } }) => traineeId === id);
      
      new Chart(chart.current, {
        type: 'line',
        data: {
          labels: grades.map(({ dateReceived }) => dateReceived),
          datasets: [{
            data: grades.map(({ score }) => score),
            fill: true,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)"
          }],
        },
        options: {
          title: { display: true, text: `${firstName} ${lastName}` },
          legend: { display: false },
          responsive: true,
          scales: {
            yAxes: [
              {
                scaleLabel: { display: true, labelString: 'Percentage' },
                display: true,
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 100,
                }
              }
            ],
            xAxes: [
              {
                scaleLabel: { display: true, labelString: 'Week' },
                display: true,
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 100,
                }
              }
            ],
          }
        }
      });
    //End of useEffect
    }, [associates, traineeId, chart]);

    useEffect(() => {
      if (window.innerWidth < 500 && chart.current)
        chart.current.style.display = 'none';
      window.addEventListener('resize', () => {
        if (!chart.current) return;
        console.log(window.innerWidth + " WIDTH");
        if (window.innerWidth < 500) {
          chart.current.style.display = 'none';
        } else {
          chart.current.style.display = 'block';
        }
      });
    }, []);

    return (
      // <div className="grade-history-line-graph">
        /* {graphData && <Line data={graphData} />} */
      /* </div> */
        <canvas className="graph-line-grade-history" ref={chart} />
    );
}

export default GradeHistoryLineGraph;