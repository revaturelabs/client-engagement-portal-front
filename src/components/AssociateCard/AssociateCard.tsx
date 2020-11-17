import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Row } from 'reactstrap';
import { AssociateCardModal } from './AssociateCardModal';
// import '../../scss/revature-colors.scss';
// import '../../scss/app.scss';
// import '../../scss/batch-card.scss'

interface IProps{

};

//This component displays the associate's information on a batch's page.
export const AssociateCard:React.FC<any> = (props:IProps) => {

    const [mPopped, setMPopped] = React.useState(false);

    let modalPopped:boolean = false;
    //let theContent;

    return (
        <body>
            <Card className="rev-card" style={{margin: "auto", width: "10%"}}>
               {/* div for image and name */}
               <div>
                   <h5 font-family={"$rev-font"}>{/* Name goes here */}Test User</h5>
                   <img className="pic" src="" alt="associate_profile_pic"/>
               </div>
               {/* div for past quiz grades */}
               <div>
                   <h5>Latest Test Score: 90%{/*code to get the last test score*/}</h5>
               </div>
               {/* <Button onClick={() => {setMPopped(!mPopped); }}>
                   View
               </Button> */}
               <AssociateCardModal />
           </Card>
           
        </body>
    )

}