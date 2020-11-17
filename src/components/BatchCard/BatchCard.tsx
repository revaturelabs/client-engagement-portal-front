import React from 'react';

interface IBatchCardProps{
    titlePic:string,
    specialization:string,
    batchName:string
}

export const BatchCard:React.FC<IBatchCardProps> = (props:IBatchCardProps) => {
    return(
        <div className="justify-content-center text-center" style={{backgroundColor: "white", height:"200px", paddingTop: "10px", border:"1px solid #F26925", borderRadius:"20px", marginTop: "10px"}}>
            
            <img src={props.titlePic} alt={props.specialization + " thumbnail"} style={{maxWidth:"85%", height:"30%"}} />
            <br />
            <p style={{fontSize: "14px"}}>{props.specialization}</p>
            <p>{props.batchName}</p>
            <button style={{lineHeight: 1.5, width: "70%", border:"none", backgroundColor:"#F26925", color:"white", fontSize:"20px"}}>View</button>
        </div>
    )
}