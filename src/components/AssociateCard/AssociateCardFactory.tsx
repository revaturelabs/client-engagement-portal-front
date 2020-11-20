import Axios from 'axios';
import React from 'react';
import { AssociateCard } from './AssociateCard';
import {IAssociate} from '../../_reducers/AssociateReducer'
import { Button } from 'reactstrap';

interface IProps{
    batchID:string,
}
/**
 * This component is a factory that will display all of the AssociateCards
 * for a particular batch. Takes in props containing the batch's ID.
 * @param props - Type: IProps {batchID}
 * 
 * @returns TSX Element to render
 */
export const AssociateCardFactory:React.FC<any> = (props:IProps) => {

    //this code WILL change
    //instead of doing a call to get associates
    //we'll get the associates from the batch/id endpoint that was already called

    /**
     * This state is used to show and hide the associate cards based on a button.
     */
    const [isHidden, setHidden] = React.useState(false);
    /**
     * The button flips the hidden state of the cards based on the current state.
     */
    const handleHide = () => setHidden(!isHidden);


    //const url = '${baseURL}/some url'; //for if we configure a base url
    /**
     * This will get all associates from the back-end given the batchID
     */
    const beginningUrl = "http://ec2-35-174-62-5.compute-1.amazonaws.com:9011/";
    const url = beginningUrl+"client/batch/"+props.batchID; 
    let associates:IAssociate[];
    const getAssociates = async () => {
        const response = await Axios.get(url); 
        associates = await response.data;
    }

    let cards = [];
    /**
     * This field will hold all of the AssociateCards, based on the associates
     * returned from the batch.
     */
    const content = (() => {
        
        
        // cards.push(<AssociateCard />);
    cards = [<AssociateCard />,<AssociateCard />,<AssociateCard />,<AssociateCard />,<AssociateCard />];
        /**
         * For each associate in the batch, create a new AssociateCard,
         * and pass in their information as props.
         */
        // if(associates === undefined){
        //     //do nothing
        // } else{
        //     for(let associate of associates){
        //         cards.push(<AssociateCard {...associate} />);
        //     }
        // }
        
        console.log(cards);
        
    })()


    /**
     * This function returns the TSX element itself.
     * It contains the content field, which displays all of the AssociateCards.
     */
    return(
        <>
            <Button onClick={handleHide}>Associates</Button>
            <span id="contentHolder" hidden={isHidden}>{cards}</span>            
        </>
    )


}