import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Container, DropdownItem, Spinner } from "reactstrap";
import { IBasicBatchInfo } from "../../components/BatchCard/BatchCard";
import { BatchInformation } from "../../components/BatchInformation/BatchInformation";
import { NavBar } from "../../components/NavBar/NavBar";
import { axiosInstance } from "../../util/axiosConfig";

interface IBatchId {
  batchId: string;
}

interface IBatchDetailedInfo {
  name: string;
  endDate: string;
  employeeAssignments: [
    {
      employee: {
        firstName: string;
        lastName: string;
      };
    }
  ];
  skill: string;
  associateAssignments: {
    active: boolean;
    associate: {
      firstName: string;
      lastName: string;
      grades: {
        gradeId: number;
        dateReceived: string;
        score: number;
      }[];
    };
  }[];
}

interface IProps extends RouteComponentProps<IBatchId>, IBasicBatchInfo {
  batches: [IBatchDetailedInfo];
}

export const BatchInformationPage: React.FC<IProps> = (props: IProps) => {
  const [hasSpinner, setSpinner] = useState(false);
  const [hasData, setRecievedData] = useState(false);
  const [batchData, setBatchData] = useState({
    name: "N/A",
    endDate: "",
    employeeAssignments: [
      {
        employee: {
          firstName: "N/A",
          lastName: "",
        },
      },
    ],
    skill: "N/A",
    associateAssignments: [],
  } as IBatchDetailedInfo);

  /**
   * This function gets all of the batch data from our back end. This
   * includes data about each associate's test / quiz scores.
   *
   * @param batchId the batch id passed in from the batch card on the
   * home page
   *
   * @returns This function just changes the batch state
   */
  const getBatchData = async (batchId: string) => {
    setSpinner(true);

    //array to place batch data into
    let batchInfo: IBatchDetailedInfo = {
      name: "N/A",
      endDate: "",
      employeeAssignments: [
        {
          employee: {
            firstName: "N/A",
            lastName: "",
          },
        },
      ],
      skill: "N/A",
      associateAssignments: [],
    };

    //get data from server based on user id that was given
    try {
      const response = await (await axiosInstance()).get(
        "/client/batch/" + batchId
      );

      batchInfo = { ...response.data };
    } catch (error: any) {
      console.log(error);
    } finally {
      setSpinner(false);
    }

    return batchInfo;
  };

  const getBatchDataNow = async () => {
    if (props.match.params.batchId != null) {
      getBatchData(
        props.match.params.batchId
      ).then((response: IBatchDetailedInfo) => setBatchData(response));
    }
    setRecievedData(true);
  };

  if (!hasData) {
    getBatchDataNow();
  }

  return (
    <>
      <Container
        style={{
          minHeight: "100vh",
          maxWidth: "100vw",
          backgroundColor: "#E3E3E3",
        }}
      >
        <NavBar>
          <Link to="/home">
            <DropdownItem>Return to Client Home</DropdownItem>
          </Link>
        </NavBar>

        {/* Spinner displays below nav bar */}

        {hasSpinner ? (
          <div className=" row justify-content-center">
            <Spinner color="info" style={{ margin: 70 }} />
          </div>
        ) : (
          <BatchInformation
            batches={[
              {
                batchId: props.match.params.batchId,
                batchName: batchData.name,
                endDate: batchData.endDate,
                skill: batchData.skill,
                trainer: `${batchData.employeeAssignments[0].employee.firstName} ${batchData.employeeAssignments[0].employee.lastName}`,
                associateAssignments: batchData.associateAssignments,
              },
            ]}
          />
        )}
      </Container>
    </>
  );
};

const mapStateToProps = (store: any) => {
  return {
    batches: store.batchState.batches,
  };
};

export default withRouter(connect<any>(mapStateToProps)(BatchInformationPage));
