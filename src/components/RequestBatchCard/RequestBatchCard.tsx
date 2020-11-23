import React from 'react'
import classes from './RequestBatchCard.module.scss'

/**
 * @function RequestBatchCard
 * Default content to display when the signed-in client has no batches.
 */
const RequestBatchCard = () => {

    const requestBatchCardText = "No batches have been selected for you just yet. Our administrators will assign you one soon.";

    return (
        <div className={classes.RequestBatchCard}>
            <div className={classes.RequestBatchCardText}>
                {requestBatchCardText}
            </div>
        </div>
    )
}

export default RequestBatchCard;
