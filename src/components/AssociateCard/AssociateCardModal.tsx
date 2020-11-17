import React from 'react';
import { Card, Modal, Button, ModalBody } from 'reactstrap';
// import '../../scss/revature-colors.scss';
// import '../../scss/app.scss';
// import '../../scss/batch-card.scss'

interface IProps{
    
};

export const AssociateCardModal:React.FC<any> = (props:IProps) => {

    const [show, setShow] = React.useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <body style={{display:"flex"}}>
            <Button className="view-btn" onClick={handleShow}>View</Button>
            <Modal
                isOpen={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                data-backdrop="false"
                
            >
                <ModalBody style={{display:"block", alignContent:"center"}}>
                {/* <Card className="rev-card" style={{ margin: "auto",  width: "50%" }}> */}
                <Button className="view-btn" onClick={handleClose}>Close</Button>
                {/* div for image and name */}
                <div>
                    <img className="pic" src="" alt="associate_profile_pic"/>
                    <h3>First Name</h3>
                    <h2>Last Name</h2>
                </div>
                {/* div for divider */}
                <div className="h-divider"></div>
                {/* div for past assesment scores */}
                <div>
                    {/* div for scroll area */}
                    <div style={{ display: "inline-block"}}>
                        {/* Week #    grade% */}
                        <div>Week 1  90%</div>
                    </div>
                    {/* div for average grade */}
                    <div style={{ display: "inline-block"}}>
                        <h3>Average</h3>
                        <h2>some grade %</h2>
                    </div>
                </div>
                {/* div for past quiz scores */}
                <div>
                    {/* div for scroll area */}
                    <div style={{ display: "inline-block"}}>
                        {/* Quiz name   grade% */}
                        <div>Week 1  90%</div>
                    </div>
                    {/* div for average grade */}
                    <div style={{ display: "inline-block"}}>
                        <h3>Average</h3>
                        <h2>some grade %</h2>
                    </div>
                </div>
                {/* </Card>  */}
                </ModalBody>            
            </Modal>
        </body>
    )
}