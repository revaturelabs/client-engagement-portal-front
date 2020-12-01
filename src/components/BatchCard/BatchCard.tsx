import React, { useState } from 'react';
import "../../scss/batch-card.scss";
import javaLogo from '../../assets/java-logo.png';
import reactReduxLogo from '../../assets/react-redux-logo.png';
import javaAuto from '../../assets/JavaAutoLogo.png';
import pegaLogo from '../../assets/Pegalogo.jpg';
import salesLogo from '../../assets/sales.png';
import bigData from '../../assets/bigData.png';
import netLogo from '../../assets/NET.jpg';
import devOpsLogo from '../../assets/devOps.jpg';
import { Redirect } from 'react-router-dom';

export interface IBasicBatchInfo {
    batchId: string,
    specialization: string,
    batchName: string,
}

/**
 * This is a "card" which represents one of the different batches that
 * are mapped to a specific client. The button on this card should send the
 * user to a page displaying much more detailed information about this specific
 * batch.
 *
 * @param props The batch information that was passed in from the Home page component.
 */
export const BatchCard: React.FC<IBasicBatchInfo> = (props: IBasicBatchInfo) => {

    const [batchButtonClicked, setBatchButtonClicked] = useState(false);

    /**
     * @function goToBatchViewPage
     * Once the "View" button is clicked, this function redirects the user to a page with detailed batch info.
     *
     * @param event contains the click event that calls this function.
     */
    const goToBatchViewPage = (event:React.MouseEvent<Element, MouseEvent>) => {

        setBatchButtonClicked(true);
    }


    let image = ""; //sets the image of this card to match the specialization
    if (props.specialization === "Java/Microservices") {
        image = javaLogo;
    }
    else if (props.specialization === "PEGA") {
        image = pegaLogo;
    }
    else if (props.specialization === "Java with Automation") {
        image = javaAuto;
    }
    else if (props.specialization === "Java React") {
        image = reactReduxLogo;
    }
    else if (props.specialization === "Big Data") {
        image = bigData;
    }
    else if (props.specialization === "SalesForce") {
        image = salesLogo;
    }
    else if (props.specialization === ".NET/Microservices") {
        image = netLogo;
    }
    else if (props.specialization === "Java Devops") {
        image = devOpsLogo;
    }

    return (
        <div id="batchcardcomp" className="batchcardcomp rev-card justify-content-center text-center">

            {/* Specialization image */}
            <div className="row justify-content-center">
                <img src={image} alt={props.specialization + " thumbnail"} className="pic" id="img-test"/>
            </div>

            <br />
            {/* Specialization text */}
            <p id="test-spec" className="spec-text">{props.specialization}</p>
            {/* Batch Name text */}
            <p id="test-name">{props.batchName}</p>
            
            {/* View button */}
            <div className="row justify-content-center">
                <button onClick={(event: React.MouseEvent<Element, MouseEvent>) => goToBatchViewPage(event)} id="test-btn" className="view-btn">View</button>
            </div>
            {/* Boolean which determines if a view button has been clicked. If so, the user gets redirected */}
            {batchButtonClicked ? <Redirect to={`/batch/${props.batchId}`} /> : <span id="no-redirect" /> }

        </div>
    )
}