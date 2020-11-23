import React from 'react'
import classes from './RequestBatchCard.module.scss'

interface Props {

}

const RequestBatchCard = (props: Props) => {

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
