import React from 'react';
import "../../scss/batch-card.scss";

interface IBatchCardProps{
    titlePic?:string,
    specialization?:string,
    batchName?:string
}

export const BatchCard:React.FC<IBatchCardProps> = (props:IBatchCardProps) => {
    return(
        <div className="batchcardcomp rev-card justify-content-center text-center">
            
            <div className="row justify-content-center">
                <img src={props.titlePic} alt={props.specialization + " thumbnail"} className="pic logoimg" />
            </div>
            
            <br />
            <p className="spec-text">{props.specialization}</p>
            <p>{props.batchName}</p>
            <div className="row justify-content-center">
                <button className= " view-btn test1">View</button>
            </div>
            
        </div>
    )
}