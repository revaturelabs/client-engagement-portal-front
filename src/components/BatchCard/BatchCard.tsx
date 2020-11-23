import React, { useState } from 'react';
import "../../scss/batch-card.scss";
import javaLogo from '../../assets/java-logo.png';
import reactReduxLogo from '../../assets/react-redux-logo.png';
import javaAuto from '../../assets/JavaAutoLogo.png';
<<<<<<< HEAD
// import javaMicro from '../../assets/JavaMicroLogo.jpg';
=======
>>>>>>> 72a8fc8243ed44954d401029a1db8e8afbff3f81
import pegaLogo from '../../assets/Pegalogo.jpg';
import salesLogo from '../../assets/sales.png';
import bigData from '../../assets/bigData.png';
import netLogo from '../../assets/NET.jpg';
import devOpsLogo from '../../assets/devOps.jpg';
<<<<<<< HEAD

interface IBatchCardProps{
=======
import { Redirect } from 'react-router-dom';

interface IProps{
>>>>>>> 72a8fc8243ed44954d401029a1db8e8afbff3f81
    batchId: number,
    specialization:string,
    batchName:string,
}

<<<<<<< HEAD
export const BatchCard:React.FC<IBatchCardProps> = (props:IBatchCardProps) => {
    const goToBatchViewPage = () => {
        console.log("send this id to the \"batch view page\" to load the right page: " + props.batchId);
        //window.location.href = "/batchView"+props.batchId;
=======
/**
 * @function BatchCard
 * Displays a summary of a particular batch in a compact card format.
 *
 * @param props contains batch information that informs what the bcard will display.
 * Should be passed in by an ancestor that retrieves this information from the back end.
 */
export const BatchCard:React.FC<IProps> = (props:IProps) => {

    const [batchButtonClicked, setBatchButtonClicked] = useState(false);

    /**
     * @function goToBatchViewPage
     * Once the "View" button is clicked, this function redirects the user to a page with detailed batch info.
     *
     * @param event contains the click event that calls this function.
     */
    const goToBatchViewPage = (event:React.MouseEvent<Element, MouseEvent>) => {
        console.log("send this id to the \"batch view page\" to load the right page: " + props.batchId);
        //window.location.href = "/batchView"+props.batchId;

        // SET A DETAILED BATCH STATE TO INCLUDE THE DETAILS OF THE BATCH BEING VIEWED
        // This detailed batch state will be displayed when the redirect to "/batch" runs

        setBatchButtonClicked(true);
>>>>>>> 72a8fc8243ed44954d401029a1db8e8afbff3f81
    }

    //sets the image of this card to match the specialization
    let image = "";
<<<<<<< HEAD
    if (props.specialization == "Java/Microservices")
    {
        image = javaLogo;
    }
    else if (props.specialization == "PEGA")
    {
        image = pegaLogo;
    }
    else if (props.specialization == "Java with Automation")
    {
        image = javaAuto;
    }
    else if (props.specialization == "Java React")
    {
        image = reactReduxLogo;
    }
    else if (props.specialization == "Big Data")
    {
        image = bigData;
    }
    else if (props.specialization == "SalesForce")
    {
        image = salesLogo;
    }
    else if (props.specialization == ".NET/Microservices")
    {
        image = netLogo;
    }
    else if (props.specialization == "Java Devops")
=======
    if (props.specialization === "Java/Microservices")
    {
        image = javaLogo;
    }
    else if (props.specialization === "PEGA")
    {
        image = pegaLogo;
    }
    else if (props.specialization === "Java with Automation")
    {
        image = javaAuto;
    }
    else if (props.specialization === "Java React")
    {
        image = reactReduxLogo;
    }
    else if (props.specialization === "Big Data")
    {
        image = bigData;
    }
    else if (props.specialization === "SalesForce")
    {
        image = salesLogo;
    }
    else if (props.specialization === ".NET/Microservices")
    {
        image = netLogo;
    }
    else if (props.specialization === "Java Devops")
>>>>>>> 72a8fc8243ed44954d401029a1db8e8afbff3f81
    {
        image = devOpsLogo;
    }

    return(
        <div className="batchcardcomp rev-card justify-content-center text-center">
            
            <div className="row justify-content-center">
                <img src={image} alt={props.specialization + " thumbnail"} className="pic logoimg" />
            </div>
            
            <br />
            <p className="spec-text">{props.specialization}</p>
            <p>{props.batchName}</p>
            <div className="row justify-content-center">
<<<<<<< HEAD
                <button onClick={goToBatchViewPage} className= " view-btn test1">View</button>
=======
                <button onClick={(event:React.MouseEvent<Element, MouseEvent>) => goToBatchViewPage(event)} className="view-btn test1">View</button>
>>>>>>> 72a8fc8243ed44954d401029a1db8e8afbff3f81
            </div>
            {batchButtonClicked ? <Redirect to="/batch" /> : <></>}
            
        </div>
    )
}