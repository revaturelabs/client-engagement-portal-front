import React from 'react'
import classes from './PlanInterventionModal.module.scss'

interface Props {
    show: boolean;
    setShow: Function
}

const PlanInterventionModal = (props: Props) => {
    return (
        <>
            {props.show ?

            <div className={classes.Backdrop}>
                <div className={classes.ModalContainer}>
                    <div className={classes.ModalTaskBar}>
                        <div className={classes.TaskBarTitle}>Request An Intervention</div>
                        <div className={classes.XButton}  onClick={() => props.setShow()}>X</div>
                    </div>
                    <div className={classes.ModalBody}>
                        <div className={classes.TextAreaContainer}>
                            <div className={classes.TextAreaLabel}>Reason For Intervention: </div>
                            <textarea className={classes.TextAreaInput} />
                        </div>
                        <div className={classes.DatePickerContainer}>
                            <div className={classes.DatePickerLabel}>Schedule An Intervention Date: </div>
                            <input type="date" className={classes.DatePicker}/>
                        </div>
                        <div className={classes.SubmitButton}>Submit</div>
                    </div>
                </div>
            </div>

            : null}
        </>
    )
}

export default PlanInterventionModal;
