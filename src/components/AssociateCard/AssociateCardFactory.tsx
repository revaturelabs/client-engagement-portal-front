import React from 'react';
import { AssociateCard } from './AssociateCard';
import {IAssociate} from '../../_reducers/AssociateReducer'
import Carousel from "react-multi-carousel";


/**
 * @function AssociateCardFactory
 * This component is a factory that will display all of the AssociateCards
 * for a particular batch. Takes in props containing the associates' info.
 * 
 * @param props - Type: IAssociate. Passed in from BatchInformation.tsx
 *
 * @returns TSX Element to render
 */
export const AssociateCardFactory:React.FC<any> = (props:IAssociate) => {

    /**
     * @constant cards
     * This field will hold all of the AssociateCards, based on the associates
     * returned from the batch.
     */
    const cards = [];

    /**
     * @function
     * This anonymous function adds AssociateCards to the cards field.
     */
    (() => {

      /**
       * Loop through the associateAssignments array that was passed in the props
       * and add them to the cards array.
       */
      try{
        for(const assoc of props.associateAssignments){
          cards.push(<AssociateCard {...assoc.associate} key={assoc.associate.lastName}/>);
         }
      } catch (error){
      }
    })();

    /**
     * @constant responsive
     * Styling Configurations for the carousel
     */
    const responsive = {
        superLargeDesktop: {
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
     * @function return
     * This function returns the TSX element itself.
     * It contains the content field, which displays all of the AssociateCards.
     */
    return(
        <>
            <Carousel className="holderCarousel" responsive={responsive}>
                {cards}
            </Carousel>
        </>
    )
}
