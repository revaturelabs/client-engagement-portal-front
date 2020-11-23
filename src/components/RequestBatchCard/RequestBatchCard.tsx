import React from 'react'
import classes from './RequestBatchCard.module.scss'

/**
 * @function RequestBatchCard
 * Default content to display when the signed-in client has no batches.
 */
const RequestBatchCard = () => {

    const requestBatchCardText = "No batches have been selected for you just yet. Our administrators will assign you one soon. In the meantime, you’re welcome to click the button below to notify one of our administrators.";

    return (
        <div className={classes.RequestBatchCard}>
            <div className={classes.RequestBatchCardText}>
                {requestBatchCardText}
            </div>
            <div className={classes.RequestBatchButton}>Request Batch</div>
        </div>
    )
}

export default RequestBatchCard;
