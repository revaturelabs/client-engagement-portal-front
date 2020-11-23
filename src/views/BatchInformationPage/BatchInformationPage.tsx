import Axios from 'axios';
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Container, DropdownItem, Row, Spinner } from 'reactstrap';
import { setBatchState } from '../../actions/BatchCardActions';
import { IBasicBatchInfo } from '../../components/BatchCard/BatchCard';
import { BatchInformation } from '../../components/BatchInformation/BatchInformation';
import { NavBar } from '../../components/NavBar/NavBar';
import { axiosInstance } from '../../util/axiosConfig';
import { IBatchState } from '../../_reducers/BatchReducer';

interface IBatchId{
    batchId: string,
}

interface IProps extends RouteComponentProps<IBatchId>, IBasicBatchInfo {
    batches: [{
        name: string,
        endDate: string,
        employeeAssignments: [{
            employee: {
                firstName: string,
                lastName: string,
            },
        }],
        skill: string,
        associateAssignents: [{
            active: boolean,
            associate: {
                firstName: string,
                lastName: string,
                grades: [], //will need to edit this soon
            },
        }],
    }],
}

const BatchInformationPage: React.FC<IProps> = (props:IProps) => {

    const passedInId = props.match.params.batchId;
    console.log(passedInId); //this returns the passed in id

    const [hasSpinner, setSpinner] = useState(false);

    const dispatch = useDispatch();
    
    /**
     * This function gets all of the batch data from our back end. This
     * includes data about each associate's test / quiz scores.
     * 
     * @param batchId the batch id passed in from the batch card on the
     * home page
     * 
     * @returns This function just changes the batch state to 
     */
    const getBatchData = (batchId:string) => async (dispatch:any) => {

        setSpinner(true);

        //array to place batch data into
        let batchArray:IBatchState = {
            batches: [],
        };

        //get data from server based on user id that was given
        await Axios.get("http://ec2-35-174-62-5.compute-1.amazonaws.com:9011/client/batch/"+ batchId)
        .then((response:any) => {
            console.log(response.data);

            if (response != null)
            {
                const batchCardInfo = {  ...response.data }
                batchArray.batches.push(batchCardInfo);
                
                console.log(batchArray.batches[0]);
                //the "batch state" is set to be whatever was extracted from the db
                dispatch(setBatchState(batchArray));
                
            }
            setSpinner(false);
        })
        .catch((error:any) => {
            console.log(error);
            setSpinner(false);
        });

        setSpinner(false);
    };

    const getBatchDataNow = () => {
        dispatch(getBatchData(passedInId));
    };

    return (
        <>
            <Container style={{minHeight: "100vh", maxWidth: "100vw", backgroundColor:"#E3E3E3"}}>
                <NavBar>
                    <Link to="/home">
                        <DropdownItem>Return to Client Home</DropdownItem>
                    </Link>
                </NavBar>

                {/* Spinner displays below the main batch card */}
                <Row>
                    <div className="justify-content-center">
                        {hasSpinner ? <Spinner color="info" /> : <span/>}
                    </div>
                </Row>
                <button onClick={getBatchDataNow}>get batch info</button>
                <BatchInformation batches={[{
                    batchId: passedInId,
                    batchName: props.batches[0].name,
                    endDate: props.batches[0].endDate,
                    skill: props.batches[0].skill,
                    trainer: props.batches[0].employeeAssignments[0].employee.firstName + " " +
                        props.batches[0].employeeAssignments[0].employee.lastName,
                    assAssign: props.batches[0].associateAssignents,
                    }]}/>
            </Container>
        </>
    );
}

const mapStateToProps = (store: any) => {
    return {
        batches: store.batchState.batches,
    };
};

export default withRouter(connect<any>(mapStateToProps)(BatchInformationPage));
