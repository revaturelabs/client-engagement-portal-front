import React from 'react'
import classes from './RequestBatchCardModal.module.scss'

/**
 * @function RequestBatchCardModal
 * Component to display when the client requests a new batch.
 */
const RequestBatchCardModal = () => {
    return (
        <div className={classes.RequestBatchCardModal}>
            <div>Request Sent Successfully</div>
            <div className={classes.XButton}>X</div>
        </div>
    )
}

export default RequestBatchCardModal;
