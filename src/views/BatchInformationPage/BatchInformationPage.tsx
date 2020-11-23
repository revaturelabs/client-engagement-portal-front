import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Container, DropdownItem } from 'reactstrap';
import { IBasicBatchInfo } from '../../components/BatchCard/BatchCard';
import { BatchInformation } from '../../components/BatchInformation/BatchInformation';
import { NavBar } from '../../components/NavBar/NavBar';

interface IBatchId{
    batchId: string,
}

interface IProps extends RouteComponentProps<IBatchId>, IBasicBatchInfo {
    batches: {
        batchId: string,
        skill: string,
        name: string
    }[],
}

const BatchInformationPage: React.FC<IProps> = (props:IProps) => {

    console.log(props.batchId);

    return (
        <>
            <Container style={{minHeight: "100vh", maxWidth: "100vw", backgroundColor:"#E3E3E3"}}>
                <NavBar>
                    <Link to="/home">
                        <DropdownItem>Return to Client Home</DropdownItem>
                    </Link>
                </NavBar>
                <BatchInformation batches={[{
                    batchId: props.match.params.batchId,
                    name: "",
                    endDate: "",
                    skill: "",
                    //trainer: props.batches[0].employeeAssignements[0].employee.firstName,
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
