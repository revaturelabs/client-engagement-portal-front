import React, { useEffect, useState } from "react";
import Chart, { Line } from "react-chartjs-2";
import { isPropertySignature } from "typescript";
import { Batch } from "../../types";
import { batchGrades } from "./AssociateGradeDummyData";


//They will pass us a prop called Batch

const GradeHistoryLineGraph: React.FC<{ batch: Batch }> = ({ batch }, traineeId: string) => {

  //Temporary Storage for the Graph's Data
  const [graphData, setGraphData] = useState({});

    //No dependencies so this code runs once at the start
    useEffect(() => {

      //Create array to contain Graph data
      const gradeArray: any = [];
  
      console.log("Batch Data: ", batch);
      console.log("Trainee ID: "), traineeId;
  
      //Pull the Associate's name
      const associateName = batch.associateAssignments[0].associate.firstName
                             + " " + batch.associateAssignments[0].associate.lastName;

      //Create an iterator for the array's indices
      let count = 0;

      //Iterate through Batch data, looking for data matching the traineeId
      for (const associateAssignment of batch.associateAssignments) {
        console.log(associateAssignment.associate.grades);
        //Check if current traineeId is defined and if we're looking at the target Trainee
        associateAssignment.associate.grades && (traineeId == associateAssignment.associate.grades[0].traineeId) ? (
          //If we are, push their data to the array
          gradeArray.push({
            grade: associateAssignment.associate.grades[count].score,
            week:  associateAssignment.associate.grades[count].dateReceived
          })
        ) : (console.log("No Associate Data Found"));

        count++;
      }

      //Set the Graph Data
      setGraphData({
        labels: gradeArray.week,
        datasets: [{
            label: associateName + "'s Weekly Scores",
            data: gradeArray.grade,
            fill: true,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)"
          }]
        });

    //End of useEffect
    });

    return (
      <div className="grade-history-line-graph">
        <Line data={graphData}/>
      </div>
    );
}

export default GradeHistoryLineGraph;