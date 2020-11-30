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
 * This reducer will be used to handle actions that involve IAssociatesState.
 * @param state will defualt to initialinitialAssociatesState.
 * @param action this is an associateAction. which holds type of action and the payload.
 */
