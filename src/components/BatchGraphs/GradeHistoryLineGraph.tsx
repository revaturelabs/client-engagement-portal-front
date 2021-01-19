import React, { useEffect, useState } from "react";
import Chart, { Line } from "react-chartjs-2";
import { Batch } from "../../types";

//They will pass us a prop called Batch

const GradeHistoryLineGraph: React.FC<{ batch: Batch; traineeId: string }> = ({ batch: {associateAssignments: associates}, traineeId }) => {
  //Temporary Storage for the Graph's Data
  const [graphData, setGraphData] = useState<Chart.ChartData>();

    //No dependencies so this code runs once at the start
    useEffect(() => {
      const [{ associate: { grades, firstName, lastName } }] = associates.filter(({ associate: { grades: [{traineeId:id}] } }) => traineeId === id);

      //Set the Graph Data
      setGraphData({
        labels: grades.map(({ dateReceived }) => dateReceived),
        datasets: [{
            label: `${firstName} ${lastName}'s Weekly Scores`,
            data: grades.map(({ score }) => score),
            fill: true,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)"
          }],
        });

    //End of useEffect
    }, [associates, traineeId]);

    return (
      <div className="grade-history-line-graph">
        {graphData && <Line data={graphData} />}
      </div>
    );
}

export default GradeHistoryLineGraph;