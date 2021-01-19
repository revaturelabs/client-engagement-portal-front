import React, {useEffect, useRef} from 'react';
import Chart from 'chart.js';
import { Batch } from '../../types';
import { useState } from 'react';
import { findAverage } from '../../util';

/** 
* This component builds a chart that takes in batch data
* and displays the chart to the screen. The batch data
* displayed is based on the amount of good and passing
* grades.
*/

interface AssociateGrades  {
    good: number,
    passing: number,
    failing: number
}

const defaultGrades: AssociateGrades = {
    good: 0,
    passing: 0,
    failing: 0
};

const DoughnutChart: React.FC<{batch: Batch}> = ({batch}) => {

    const chart = useRef<HTMLCanvasElement>(null);

    const[state, setState] = useState<AssociateGrades>(defaultGrades);
    
    useEffect(() => {

        const gradesList = batch.associateAssignments.reduce((a, {associate: {grades}} ) => {

            if(!grades) return a;

            const average = findAverage(grades.map(({score}) => score));

            const group = average > batch.goodGrade ? 'good': 
                          average > batch.passingGrade ? 'passing': 
                          'failing';

            return ({...a, [group]: a[group]+1});
        }, defaultGrades);
    
        setState(gradesList);

    },[batch]);  

    useEffect(() => {

        chart?.current && new Chart(chart.current, {
            type: 'doughnut',
            data: {
                labels: ['GOOD GRADES', 'PASSING GRADES', 'NEEDS IMPROVEMENT'],
                datasets: [
                    {
                        backgroundColor: ['#fa0015', '#3e95cd', 'darkgray'],
                        borderColor: 'black',
                        borderWidth: 1, 
                        hoverBackgroundColor: '#f26925',
                        data: [state.good, state.passing, state.failing]
                    }
                    
                ]
            },
            options: {
                responsive: true,
                legend: {
                    display: false
                },
                animation: {
                    animateScale: true
                }
            }
        });
    }, [chart, state]);

    return (
    <span>
        <div className="chartContainer">
            <canvas className="gradesChart" ref={chart}></canvas>
            <h2>Performance Standings</h2>
            <style> { `
                .chartContainer {
                    width: 33%;
                }

                .chartContainer h2 {
                    text-align: center;
                    margin-top: .5rem;
                    color: #999;
                    font-weight: 700;
                    letter-spacing: 1px;
                    font-size: 1.025rem;
                    text-align: center;
                }
            `}
            </style>
        </div>
    </span>
    )
}

export default DoughnutChart;