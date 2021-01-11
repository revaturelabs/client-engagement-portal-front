import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Container, DropdownItem, Spinner } from 'reactstrap';
import { BatchInformation } from '../../components/BatchInformation/BatchInformation';
import { NavBar } from '../../components/NavBar/NavBar';
import { Batch } from '../../types';
import { getBatchData } from '../../ajax';

interface IProps extends RouteComponentProps<{batchId:string}> {
    batches: Batch[],
}

const defaultBatchData : Batch = {
    batchId: 'N/A',
    name: "N/A",
    endDate: "N/A",
    trainer: "N/A",
    employeeAssignments: [{
        employee: {
            firstName: "N/A",
            lastName: ""
        },
    }],
    skill: "N/A",
    associateAssignments: []
}

export const BatchInformationPage: React.FC<IProps> = (props) => {
    const [hasSpinner, setSpinner] = useState<boolean>(false);
    const [batchData, setBatchData] = useState<Batch>(defaultBatchData);

    useEffect(() => {
        setSpinner(true);
        getBatchData(props.match.params.batchId)
            .then(res => setBatchData(res ?? defaultBatchData))
            .finally(() => setSpinner(false))
    }, [props]);

    return (
        <Container style={{ minHeight: "100vh", maxWidth: "100vw", backgroundColor: "#E3E3E3" }}>
            <NavBar>
                <Link to="/home"> <DropdownItem>Return to Client Home</DropdownItem> </Link>
            </NavBar>
            {/* Spinner displays below nav bar */}
            {hasSpinner
                ? <div className="row justify-content-center">
                    <Spinner color="info" style={{ margin: 70 }} />
                </div>
                : <BatchInformation batch={{
                    ...batchData,
                    batchId: props.match.params.batchId,
                    trainer: `${batchData.employeeAssignments[0].employee.firstName} ${batchData.employeeAssignments[0].employee.lastName}`
                }} />
            }
        </Container>
    );
}

export default BatchInformationPage;




