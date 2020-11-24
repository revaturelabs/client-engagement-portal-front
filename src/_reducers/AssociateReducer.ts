export interface IAssociate {
    firstName?: string,
    lastName?: string,
    testScores?: {
        week: number,
        score: number
    }[],
    techScores?: {
        tech: string,
        score: number
    }[]
}
// got it. you pulled his code
export interface IAssociatesState{
    associates: IAssociate[];
}

//will set it up to hold all associates
const initialState: IAssociatesState = {
    associates: [],
};

// export const associateReducer = (state = initialState, action:{type:string, payload:IAssociate}): IAssociatesState => {
//     switch(action.type) {
//         case associateTypes.GET_ALL_ASSOCIATES:
//             return {
//                     associates: [...state.associates, action.payload],
//             };
//     }
//     return state;
// } 