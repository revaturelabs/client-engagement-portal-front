import React from 'react'
import classes from './RequestBatchCard.module.scss'

interface Props {

}

const RequestBatchCard = (props: Props) => {

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
