import React from 'react';
import { Batch } from '../../types';
import { findAverage } from '../../util';

const PercentageCircle : React.FC<{batch:Batch}> = ({ batch }) => {
    const percentage = (findAverage(
        batch.associateAssignments
            .filter(({ associate: {grades} }) => grades)
            // Grades are assured to exist after filter
            .map( ({ associate: {grades} }) => findAverage(grades!.map(({ score }) => score)) )
    ) / 100).toFixed(4)
        || .000;

    return (
    <span>
         <div className="percentage-circle-container">
             <div className="percentage-circle">
                <svg>
                    <circle cx="70" cy="70" r="50" />
                    <circle cx="70" cy="70" r="50" />
                </svg>
                <div className="percentage-circle-number">
                    <h2>{(+percentage * 100).toFixed(2)}<span>%</span></h2>
                </div>
            </div>
            <h2  className="percentage-circle-title">Batch Average <h2></h2>Grade</h2>

            <style>{`
                .percentage-circle-container {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    height: 150px;
                    width: 150px;
                    transform: translateY(.4rem);
                    margin: auto;
                }

                .percentage-circle-container .percentage-circle {
                    position: relative;
                }

                .percentage-circle-container .percentage-circle svg {
                    position: relative;
                    width: 150px;
                    height: 150px;
                    transform: rotateZ(-90deg);
                }

                .percentage-circle-container .percentage-circle svg circle {
                    fill: none;
                    stroke-width: 10;
                    stroke: #000;
                    transform: translate(5px, 5px);
                    stroke-dasharray: 314;
                    stroke-dashoffset: 314;
                    stroke-linecap: round;
                }

                .percentage-circle-container .percentage-circle svg circle:nth-child(1) {
                    stroke-dashoffset: 0;
                    stroke: #f3f3f3;
                }

                .percentage-circle-container .percentage-circle svg circle:nth-child(2) {
                    stroke-dashoffset: ${314 * (1 - +percentage)};
                    stroke: #03a9f4;
                }

                .percentage-circle-container .percentage-circle .percentage-circle-number {
                    position: absolute;
                    top: .42rem;
                    left: .1rem;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #999;
                }

                .percentage-circle-container .percentage-circle .percentage-circle-number h2 {
                    font-size: 1.25rem;
                }

                .percentage-circle-container .percentage-circle .percentage-circle-number h2 span {
                    font-size: .8rem;
                }

                .percentage-circle-container .percentage-circle-title {
                    color: #999;
                    font-weight: 700;
                    letter-spacing: 1px;
                    font-size: 1.025rem;
                    text-align: center;
                    transform: translateY(-.34rem);
                }
            `}</style>
        </div>
    </span>
    )
}

export default PercentageCircle
