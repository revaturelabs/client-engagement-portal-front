import Axios from 'axios';
import React from 'react';
import { AssociateCard } from './AssociateCard';
import {IAssociate} from '../../_reducers/AssociateReducer'
import Carousel from "react-multi-carousel";

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
     * This will get all associates from the back-end given the batchID
     */
    const beginningUrl = "http://ec2-35-174-62-5.compute-1.amazonaws.com:9011/";
    const url = beginningUrl+"client/batch/"+props.batchID; 
    let associates:IAssociate[];
    const getAssociates = async () => {
        const response = await Axios.get(url); 
        associates = await response.data;
    }

    
    /**
     * This field will hold all of the AssociateCards, based on the associates
     * returned from the batch.
     */
    let cards = [];

    /**
     * This anonymous function adds AssociateCards to the cards field.
     */
    (() => {
        
        // cards.push(<AssociateCard />);
        cards = [<AssociateCard />,<AssociateCard />,<AssociateCard />,<AssociateCard />,<AssociateCard />, <AssociateCard />, <AssociateCard />];
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
        
    })()

    /**
     * Configurations for the carousel
     */
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 1200 },
          items: 5,
          slidesToSlide: 5
        },
        desktop: {
          breakpoint: { max: 1200, min: 992 },
          items: 3,
          slidesToSlide: 3
        },
        tablet: {
          breakpoint: { max: 992, min: 576 },
          items: 2,
          slidesToSlide: 2
        },
        mobile: {
          breakpoint: { max: 576, min: 0 },
          items: 1,
          slidesToSlide: 1
        }
      };

    /**
     * This function returns the TSX element itself.
     * It contains the content field, which displays all of the AssociateCards.
     */
    return(
        <>
            
            <Carousel responsive={responsive}>              
                {cards}
            </Carousel>
            
        </>
    )


}