import React from 'react';
import { Batch } from '../../types';
import { findAverage } from '../../util';

const PercentageCircle : React.FC<{batch:Batch}> = ({ batch }) => {
    const [integer, decimals] = findAverage(
        batch.associateAssignments
            .filter(({ associate: {grades} }) => grades)
            // Grades are assured to exist after filter
            .map( ({ associate: {grades} }) => findAverage(grades!.map(({ score }) => score)) )
    ).toFixed(2).split('.');

    return (
        <div className="circles-wrp" style={{ "position": "relative", "display": "inline-block" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
                <path fill="transparent" stroke="#D3B6C6" stroke-width="7" d="M 39.992565928065126 3.500000757060633 A 36.5 36.5 0 1 1 39.949302232260386 3.500035209108127 Z"></path>
                <path fill="transparent" stroke="#4B253A" stroke-width="7" d="M 39.992565928065126 3.500000757060633 A 36.5 36.5 0 0 1 59.07174573163989 71.12103010421852 "></path>
            </svg>
            <div className="circles-text" style={{ "position": "absolute", "top": "0px", "left": "0px", "textAlign": "center", "width": "100%", "fontSize": "28px", "height": "80px", "lineHeight": "80px" }}>
                <span className="circles-integer">{integer}</span>.
                <span className="circles-decimals">{decimals}%</span>
            </div>
        </div>

    )
}

export default PercentageCircle
