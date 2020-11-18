import React from 'react';
import "../../scss/batch-card.scss";

interface IProps{
    titlePic:string,
    specialization:string,
    batchName:string
}

export const BatchCard:React.FC<IProps> = (props:IProps) => {
    return(
        <div className="rev-card justify-content-center text-center">
            
            <div className="row justify-content-center">
                <img src={props.titlePic} alt={props.specialization + " thumbnail"} className="pic" />
            </div>
            
            <br />
            <p className="spec-text">{props.specialization}</p>
            <p>{props.batchName}</p>
            <div className="row justify-content-center">
                <button className=" view-btn">View</button>
            </div>
            
        </div>
    )
}