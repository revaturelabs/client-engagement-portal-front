import React from 'react'
import classes from './RequestBatchCardModal.module.scss'

interface Props {

}

const RequestBatchCardModal = (props: Props) => {
    return (
        <div className={classes.RequestBatchCardModal}>
            <div>Request Sent Successfully</div>
            <div className={classes.XButton}>X</div>
        </div>
    )
}

export default RequestBatchCardModal;
