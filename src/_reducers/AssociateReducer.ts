/**
 * This interface defines an Associate array object.
 */
export interface IAssociate {
    associateAssignments: {
        associate: {
            firstName?: string,
            lastName?: string,
            grades?: {
                dateReceived: string,
                gradeId: number,
                score: number,
                traineeId: string
            }[],
            testScores?: {
                week: number,
                score: number
            }[],
            techScores?: {
                tech: string,
                score: number
            }[]
        }
    }[]
}

export interface IAssociateSingle {
    firstName?: string,
    lastName?: string,
    grades?: {
        dateReceived: string,
        gradeId: number,
        score: number,
        traineeId: string
    }[],
    testScores?: {
        week: number,
        score: number
    }[],
    techScores?: {
        tech: string,
        score: number
    }[]
}

/**
 * This interface defines the state of associates.
 * It will hold an array of associates.
 */
export interface IAssociatesState {
    associates: IAssociate[];
}

/**
 * Sets the initial state of associates to an emtpy array.
 */
export const initialAssociatesState: IAssociatesState = {
    associates: [],
};

/**
 * This reducer will be used to handle actions that involve IAssociatesState.
 * @param state will defualt to initialinitialAssociatesState.
 * @param action this is an associateAction. which holds type of action and the payload.
 */
// export const associateReducer = (state = initialAssociatesState, action:{type:string, payload:IAssociate}): IAssociatesState => {
//     switch(action.type) {
//         case associateTypes.GET_ALL_ASSOCIATES:
//             return {
//                     associates: [...state.associates, action.payload],
//             };
//     }
//     return state;
// }
