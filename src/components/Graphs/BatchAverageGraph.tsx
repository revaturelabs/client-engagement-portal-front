import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js";
import { Batch } from "../../types";
import { findAverage } from '../../util';
import GradeHistoryLineGraph from "./GradeHistoryLineGraph";
import { Modal, ModalBody, Row, ModalHeader } from 'reactstrap';


const BatchAverageGraph: React.FC<{ batch: Batch }> = ({ batch }) => {
  const [chart, setChart] = useState<Chart>();
  const [associate, setAssociate] = useState<string>('');
  const myChart = useRef<HTMLCanvasElement>(null);
  const [clickToggler, setClickToggler] = useState<boolean>(false);

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
            label: "Good Grade",
            fill: false,
            borderColor: "#474C55",
            data: goodGradeArray,
            pointRadius: 0,
            type: "line",
          },
          {
            label: "Passing Grade",
            fill: false,
            borderColor: "#72A4C2",
            data: passingGradeArray,
            pointRadius: 0,
            type: "line",
          },
          {
            data: chartData,
            label: "Average Grade",
            backgroundColor: barColor,
            hoverBackgroundColor: barColor,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Average Assessment Scores",
        },
        layout: {
          padding: 20,
        },
        legend: {
          labels: {
            fontSize: 10,
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
              ticks: { fontSize: 11,
                maxRotation: 90,
                minRotation: 90
              },
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
    return `#${Math.floor(Math.random() * (Math.floor(255) - Math.ceil(204) + 1) + Math.ceil(204)).toString(16) + Math.floor(Math.random() * (Math.floor(128) - Math.ceil(48) + 1) + Math.ceil(48)).toString(16) + Math.floor(Math.random() * (Math.floor(96) - Math.ceil(0) + 1) + Math.ceil(0)).toString(16)}`;
  };

  return <>
    <LineGraphModal batch={batch} traineeId={associate} clickToggler={clickToggler} />
    <canvas id="myChart" ref={myChart} onClick={e => {
      setClickToggler(!clickToggler);
      if (!chart || !batch?.associateAssignments?.length) return;
      const associateName = (chart.data.labels as string[])[(chart.getElementAtEvent(e)[0] as { _index:number })?._index];
      const [associateAssignment] = batch.associateAssignments.filter(({associate:{lastName}}) => lastName === associateName);
      if (!associateAssignment) return setAssociate('');
      const { associate: {grades} } = associateAssignment;
      setAssociate(grades[0].traineeId);
    }} />
  </>;
};

const LineGraphModal: React.FC<{batch:Batch;traineeId:string;clickToggler:boolean;}> = (props) => {
  const [show, setShow] = React.useState<boolean>(true);

  useEffect (() => {
    setShow(true);
  },[props]);

  if (!props.batch || !props.batch.associateAssignments || !props.batch.associateAssignments.length || !props.traineeId) return <></>;
  const [associateAssignment] = props.batch.associateAssignments.filter(({ associate: { grades: [{traineeId:id}] } }) => props.traineeId === id);
  const  associate  = associateAssignment.associate;
  const firstName = associate.firstName;
  const lastName  = associate.lastName;

  return <Modal isOpen={show} toggle={() => setShow(!show) }>
      <ModalHeader toggle={() => setShow(!show) }>
        <h3 id="associateName">{firstName} {lastName}</h3>
      </ModalHeader>
      <ModalBody>
        <div className="aso-info">
          <Row>
            <GradeHistoryLineGraph batch={props.batch} traineeId={props.traineeId}/>
          </Row>
        </div>
      </ModalBody>
    </Modal>
}

export default BatchAverageGraph;
