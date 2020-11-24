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
import { SET_BATCHES_DETAILS } from '../../actions/BatchCardActions';
import { BatchDetailReducer, IBatchDetailedState } from '../../_reducers/BatchReducer';

export interface IBasicBatchInfo {
    batchId: string,
    specialization: string,
    batchName: string,
}

/**
 * @function BatchCard
 * Displays a summary of a particular batch in a compact card format.
 *
 * @param props contains batch information that informs what the bcard will display.
 * Should be passed in by an ancestor that retrieves this information from the back end.
 */
export const BatchCard: React.FC<IBasicBatchInfo> = (props: IBasicBatchInfo) => {

    const [batchButtonClicked, setBatchButtonClicked] = useState(false);

    const [batchDetailedInfo, setBatchDetailedInfo] = useState(props);

    /**
     * @function goToBatchViewPage
     * Once the "View" button is clicked, this function redirects the user to a page with detailed batch info.
     *
     * @param event contains the click event that calls this function.
     */
    const goToBatchViewPage = (event: React.MouseEvent<Element, MouseEvent>) => {
        console.log("send this id to the \"batch view page\" to load the right page: " + props.batchId);
        //window.location.href = "/batchView/"+props.batchId;

        // SET A DETAILED BATCH STATE TO INCLUDE THE DETAILS OF THE BATCH BEING VIEWED
        // This detailed batch state will be displayed when the redirect to "/batch" runs
        setBatchDetailedInfo(props);
        console.log(props.batchId);



        /**
         * The fields here are used to grab data on all of the batches from
         * a state. Then, we iterate through those batches until we find
         * a batch name that matches the props of this component. Finally,
         * we reset the state to only include the one batch, which we can return
         * on the batch information page.
         */
        const allBatchDetails = BatchDetailReducer("");
        const justBatches = allBatchDetails.batches; //list of batches
        let batchDetails: IBatchDetailedState = { batches: [] };
        let i = 0;
        for (; justBatches[i];) {
            let oneBatch = justBatches[i] //specific batch
            let bName = oneBatch.name //batch name
            if (bName === props.batchName) {
                batchDetails.batches.push(oneBatch);
                break;
            }
            i++;
        }
        BatchDetailReducer(SET_BATCHES_DETAILS, batchDetails);

        setBatchButtonClicked(true);
    }


    let image = ""; //sets the image of this card to match the specialization
    if (props.specialization == "Java/Microservices") {
        image = javaLogo;
    }
    else if (props.specialization == "PEGA") {
        image = pegaLogo;
    }
    else if (props.specialization == "Java with Automation") {
        image = javaAuto;
    }
    else if (props.specialization == "Java React") {
        image = reactReduxLogo;
    }
    else if (props.specialization == "Big Data") {
        image = bigData;
    }
    else if (props.specialization == "SalesForce") {
        image = salesLogo;
    }
    else if (props.specialization == ".NET/Microservices") {
        image = netLogo;
    }
    else if (props.specialization == "Java Devops") {
        image = devOpsLogo;
    }

    return (
        <div className="batchcardcomp rev-card justify-content-center text-center">

            <div className="row justify-content-center">
                <img src={image} alt={props.specialization + " thumbnail"} className="pic logoimg" />
            </div>

            <br />
            <p className="spec-text">{props.specialization}</p>
            <p>{props.batchName}</p>
            <div className="row justify-content-center">
                <button onClick={(event: React.MouseEvent<Element, MouseEvent>) => goToBatchViewPage(event)} className="view-btn test1">View</button>
            </div>
            {batchButtonClicked ? <Redirect to={`/batch/${props.batchId}`} /> : <></>}

        </div>
    )
}