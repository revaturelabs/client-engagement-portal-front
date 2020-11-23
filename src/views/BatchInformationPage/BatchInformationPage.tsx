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

interface IBatchId {
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
        associateAssignments: [{
            active: boolean,
            associate: {
                firstName: string,
                lastName: string,
                grades: [{
                    gradeId: number,
                    dateReceived: string,
                    score: number,
                }],
            },
        }],
    }],
}

const BatchInformationPage: React.FC<IProps> = (props: IProps) => {

    const passedInId = props.match.params.batchId;
    console.log(passedInId); //this returns the passed in id

    const [hasSpinner, setSpinner] = useState(false);
    const [hasData, setRecievedData] = useState(false);

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
    const getBatchData = (batchId: string) => async (dispatch: any) => {

        setSpinner(true);
        
        //array to place batch data into
        let batchArray: IBatchState = {
            batches: [],
        };

        //get data from server based on user id that was given
        await Axios.get("http://ec2-35-174-62-5.compute-1.amazonaws.com:9011/client/batch/" + batchId)
            .then((response: any) => {
                console.log(response.data);

                if (response != null) {
                    const batchCardInfo = { ...response.data }
                    batchArray.batches.push(batchCardInfo);

                    console.log(batchArray.batches[0]);
                    //the "batch state" is set to be whatever was extracted from the db
                    dispatch(setBatchState(batchArray));

                }
                setSpinner(false);
            })
            .catch((error: any) => {
                console.log(error);
                setSpinner(false);
            });

        setSpinner(false);
    };

    const getBatchDataNow = () => {
        dispatch(getBatchData(passedInId));
        setRecievedData(true);
    };

    if (hasData == false) {
        getBatchDataNow();
    }

    return (
        <>
            <Container style={{minHeight: "100vh", maxWidth: "100vw"}}>
                <NavBar route="/home">
                    <Link to="/home">
                        <DropdownItem>Return to Client Home</DropdownItem>
                    </Link>
                </NavBar>

                {/* Spinner displays below nav bar */}

                {
                    hasSpinner ?
                        <div className=" row justify-content-center">
                            <Spinner color="info" style={{ margin: 70 }} />
                        </div>
                        :
                        <BatchInformation batches={[{
                            batchId: passedInId,
                            batchName: props.batches[0].name,
                            endDate: props.batches[0].endDate,
                            skill: props.batches[0].skill,
                            trainer: props.batches[0].employeeAssignments[0].employee.firstName + " " +
                                props.batches[0].employeeAssignments[0].employee.lastName,
                            associateAssignments: props.batches[0].associateAssignments,
                        }]} />
                }

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
