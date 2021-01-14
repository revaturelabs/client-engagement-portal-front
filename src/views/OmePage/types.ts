import reactReduxLogo from '../../assets/react-redux-logo.png';
import javaLogo from '../../assets/java-logo.png';
import javaAuto from '../../assets/JavaAutoLogo.png';
import pegaLogo from '../../assets/Pegalogo.jpg';
import salesLogo from '../../assets/sales.png';
import bigData from '../../assets/bigData.png';
import netLogo from '../../assets/NET.jpg';
import devOpsLogo from '../../assets/devOps.jpg';

export const JAVA_MICROSERVICES = 'Java/Microservices';
export const PEGA = 'PEGA';
export const JAVA_WITH_AUTOMATION = 'Java with Automation';
export const JAVA_REACT = 'Java React';
export const BIG_DATA = 'Big Data';
export const SALESFORCE = 'SalesForce';
export const DOTNET_MICROSERVICES = '.NET/Microservices';
export const JAVA_DEVOPS = 'Java Devops';

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

export interface Grade {
  dateReceived: string;
  gradeId: number;
  score: number;
  traineeId: string;
}

export interface Associate {
  email: string;
  salesforceId: string; // ie SF-2012
  firstName: string;
  lastName: string;
  grades: Grade[];
}

export interface Employee {
  email: string;
  firstName: string;
  lastName: string;
}

interface EmployeeAssignment {
  role: string; // ie ROLE_LEAD_TRAINER
  employee: Employee;
}

interface AssociateAssignment {
  trainingStatus: string; // ie Training
  associate: Associate;
  startDate: string;
  endDate: string;
  active: boolean;
}

export interface BasicBatchData {
  batchId: string;
  skill: BatchSkill;
  name: string;
}

export interface Batch extends BasicBatchData {
  startDate: string;
  endDate: string;
  location: string;
  type: string;
  goodGrade: number;
  passingGrade: number;
  currentWeek: number;
  employeeAssignments: EmployeeAssignment[];
  associateAssignments: AssociateAssignment[];
}

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