import reactReduxLogo from './assets/react-redux-logo.png';
import javaLogo from './assets/java-logo.png';
import javaAuto from './assets/JavaAutoLogo.png';
import pegaLogo from './assets/Pegalogo.jpg';
import salesLogo from './assets/sales.png';
import bigData from './assets/bigData.png';
import netLogo from './assets/NET.jpg';
import devOpsLogo from './assets/devOps.jpg';


// Primitive Aliases

export const JAVA_MICROSERVICES = 'Java/Microservices';
export const PEGA = 'PEGA';
export const JAVA_WITH_AUTOMATION = 'Java with Automation';
export const JAVA_REACT = 'Java React';
export const BIG_DATA = 'Big Data';
export const SALESFORCE = 'SalesForce';
export const DOTNET_MICROSERVICES = '.NET/Microservices';
export const JAVA_DEVOPS = 'Java Devops';


// Types

export type valueof<T> = T[keyof T];

export type BatchSkill =
      typeof JAVA_MICROSERVICES
    | typeof PEGA
    | typeof JAVA_WITH_AUTOMATION
    | typeof JAVA_REACT
    | typeof BIG_DATA
    | typeof SALESFORCE
    | typeof DOTNET_MICROSERVICES
    | typeof JAVA_DEVOPS
    | 'N/A';


// Interfaces

/* Users */
export interface User{
    email:string;
    firstName:string;
    lastName:string;
    phone?:string;
}

export interface UserAdmin extends User{

}

export interface UserClient extends User{
    businessFunction?:string;
    industry?:string;
    companyName?:string;
}

export interface UserState{
    user:User|null;
}

/* Batches */
export interface Associate {
    firstName: string;
    lastName: string;
    salesforceId: number;
    grades: {
        dateReceived: string,
        gradeId: number,
        score: number,
        traineeId: string
    }[];
    testScores?: {
        week: number,
        score: number
    }[];
    techScores?: {
        tech: string,
        score: number
    }[];
}

export interface AssociateAssignment {
    active: boolean;
    associate: Associate;
}

export interface Employee {
    firstName: string,
    lastName: string,
}

export interface BasicBatchData {
    batchId: string;
    skill: BatchSkill;
    name: string;
}

export interface Batch extends BasicBatchData {
    endDate: string;
    trainer: string;
    goodGrade: number;
    passingGrade: number;
    employeeAssignments: {
        employee: Employee,
    }[];
    associateAssignments: AssociateAssignment[];
}

export interface BatchState {
    batches : BasicBatchData[]
}

/* Notifications */
export interface Notification {
    requestId:number;
    requestType:string;
    status:string;
    dateCreated:string;
    message:string;
    client: {
        clientId:number,
        email:string,
        companyName:string,
        phoneNumber:string
    }
}

export interface NotificationState {
    notifications : Notification[]|null;
}

// Redux
export interface Store {
    userState : UserState;
    batchState : BatchState;
    notificationState : NotificationState;
}

export interface Action {
    type : string;
    payload? : any;
}


// Maps

export const batchSkillToImage : {[K in BatchSkill]: string} = {
    [JAVA_MICROSERVICES]: javaLogo,
    [PEGA]: pegaLogo,
    [JAVA_WITH_AUTOMATION]: javaAuto,
    [JAVA_REACT]: reactReduxLogo,
    [BIG_DATA]: bigData,
    [SALESFORCE]: salesLogo,
    [DOTNET_MICROSERVICES]: netLogo,
    [JAVA_DEVOPS]: devOpsLogo,
    'N/A': '',
}
