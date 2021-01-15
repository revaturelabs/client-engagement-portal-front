import React from 'react';
import { AssociateCard } from './AssociateCard';
import { IAssociate } from '../../_reducers/AssociateReducer'


/**
 * @function AssociateCardFactory
 * This component is a factory that will display all of the AssociateCards
 * for a particular batch. Takes in props containing the associates' info.
 * 
 * @param props - Type: IAssociate. Passed in from BatchInformation.tsx
 *
 * @returns TSX Element to render
 */
export const AssociateCardFactory: React.FC<any> = (props: IAssociate) => {

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
    try {
      for (const assoc of props.associateAssignments) {
        cards.push(<AssociateCard {...assoc.associate} key={assoc.associate.lastName} />);
      }
    } catch (error) {
    }
  })();

  /**
   * @constant responsive
   * Styling Configurations for the carousel
   */


  /**
   * @function return
   * This function returns the TSX element itself.
   * It contains the content field, which displays all of the AssociateCards.
   */
  return (
    <>
      {cards}
    </>
  )
}
