import Axios from 'axios';
import React from 'react';
import { AssociateCard } from './AssociateCard';
import {IAssociate} from '../../_reducers/AssociateReducer'

interface IProps{
    batchID:string,
};

export const AssociateCardFactory:React.FC<any> = (props:IProps) => {

    //this code WILL change
    //instead of doing a call to get associates
    //we'll get the associates from the batch/id endpoint that was already called

    //const url = '${baseUrl}/some url'; //for if we configure a base url
    const url = "some url";
    let associates:IAssociate[];
    const getAssociates = async () => {
        const response = await Axios.get(url+`?batchID=${props.batchID}`); 
        associates = await response.data;
    }
    const content = () => {
        
        let cards = "";
        for(let associate of associates){
            cards += <AssociateCard {...associate} />;
        }

        return cards;
    }

    return(
        <>
            {content}
        </>
    )


}