import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js";
import { Batch } from "../../types";
import { findAverage } from '../../util';

const BatchAverageGraph: React.FC<{ batch: Batch }> = ({ batch }) => {
  const [chart, setChart] = useState<Chart>();
  const [associate, setAssociate] = useState<string>();
  const myChart = useRef<HTMLCanvasElement>(null);

  // Generate chart on component mount
  useEffect(() => {
    // Initialize variables needed to generate a chart
    const gradeArray: any = [];
    const goodGradeArray: Array<number | undefined> = [];
    const passingGradeArray: Array<number | undefined> = [];

    // console.log("Batch Info in Graph: ", batch);

    // Get data into an array of of associates with associate Id, first name, last name, and array of individual grades
    for (const associateAssignment of batch.associateAssignments) {
      //   console.log(
      //     "associate assignment grades: ",
      //     associateAssignment.associate.grades
      //   );
      gradeArray.push({
        salesforceId: associateAssignment.associate.salesforceId,
        firstName: associateAssignment.associate.firstName,
        lastName: associateAssignment.associate.lastName,
      });
      // Add "good grade" for line plot on data array - 1 data point for each associateAssignment
      goodGradeArray.push(batch.goodGrade);

      // Add "passing grade" for line plot #2 on data array = 1 data point for each associateAssignment
      passingGradeArray.push(batch.passingGrade);

      if (associateAssignment.associate.grades) {
        // Get index of current associate
        const salesforceIdIndex = gradeArray.findIndex((el: any) => {
          return el.salesforceId === associateAssignment.associate.salesforceId;
        });
        // Create array for grades
        gradeArray[salesforceIdIndex].grades = [];
        // Push grade scores of current associate onto gradeArray
        for (const gradeObject of associateAssignment.associate.grades) {
          gradeArray[salesforceIdIndex].grades.push(gradeObject.score);
        }
      }
    }

    // console.log("gradeArray= ", gradeArray);

    // Translate new gradeObj into labels and data (average test score) for chart
    const chartLabels: string[] = [];
    const chartData: any = [];
    const barColor: any = [];

    // Get random colors for bars and calculate average grade for each associate
    for (const associate of gradeArray) {
      chartLabels.push(associate.lastName);
      barColor.push(randomColor());
      // Calculate average grade for test
      const avgGrade = Math.round( (findAverage(associate.grades) * 100 ) / 100);

      chartData.push(avgGrade);
    }

    // console.log("Labels: ", chartLabels);
    // console.log("Data: ", chartData);
    // console.log("Colors: ", barColor);

    // Generate chart
    myChart.current && setChart(new Chart(myChart.current, {
      type: "bar",
      data: {
        labels: chartLabels,
        datasets: [
          {
            data: chartData,
            label: "Average Grade",
            backgroundColor: barColor,
            hoverBackgroundColor: barColor,
          },
          {
            label: "Good Grade",
            fill: false,
            borderColor: "lightgreen",
            data: goodGradeArray,
            pointRadius: 0,
            type: "line",
          },
          {
            label: "Passing Grade",
            fill: false,
            borderColor: "lightblue",
            data: passingGradeArray,
            pointRadius: 0,
            type: "line",
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Average Assessment Scores",
        },
        layout: {
          padding: 5,
        },
        legend: {
          labels: {
            filter: function (legendItem, data) {
              // Remove label for bar chart as it is a duplicate of the chart title
              //   and doesn't match the multi colored bars.
              return legendItem.text !== "Average Grade";
            },
          },
          display: true,
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Associate Last Name",
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Average Test Score",
              },
              ticks: {
                beginAtZero: true,
                stepSize: 10,
                max: 100,
                fontSize: 8
              },
            },
          ],
        },
      },
    }));
  }, [batch]);

  // Generate random background colors for bars
  const randomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  useEffect(() => {
    if (window.innerWidth < 500 && myChart.current)
        myChart.current.style.display = 'none';
    window.addEventListener('resize', () => {
      if (!myChart.current) return;
      console.log(window.innerWidth + " WIDTH");
      if (window.innerWidth < 500) {
        myChart.current.style.display = 'none';
      } else {
        myChart.current.style.display = 'block';
      }
    });
  }, []);

  chart && console.log(associate ? `Clicked bar for ${associate}` : 'Closed grade history');

  return <>
    {/* associate && <LineGraph batch={batch} aid={associate} /> */}
    <canvas id="myChart" ref={myChart} onClick={e => chart && setAssociate((chart.data.labels as string[])[(chart.getElementAtEvent(e)[0] as { _index:number })?._index])} />
  </>;
};

export default BatchAverageGraph;
