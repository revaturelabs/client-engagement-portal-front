import React from "react";
import { Batch, batchSkillToImage } from "../../types";
import { Col, Row } from "reactstrap";
import { ReactComponent as ExternalLinkIcon } from "../../assets/external-link-square.svg";
import { RouteComponentProps, withRouter } from "react-router-dom";
import MatchTextComponent from "../../components/MatchTextComponent/MatchTextComponent";
import "../../scss/batch-card.scss";

interface IBatchCardProps extends RouteComponentProps {
  /** the batch this card represents */
  batch: Batch;

  /** texts to highlight on the card */
  searchTexts: string[];
}

const BatchCard = (props: IBatchCardProps) => {
  const getDateLine = (b: Batch) => `${b.startDate} to ${b.endDate}`;

  const getTrainersLine = (b: Batch): string =>
    b.employeeAssignments
      .map((e) => `${e.employee.firstName} ${e.employee.lastName || ""}`)
      .join(", ");

  const goToBatchPage = () => {
    props.history.push(`/batch/${props.batch.batchId}`);
  };

  const batch = props.batch;
  const imgSrc = batchSkillToImage[batch.skill];

  return (
      <Row className='batch-card m-1'>
        <Col xs="7" sm="8" className="left">
          <p className="name-line" onClick={goToBatchPage}>
            <ExternalLinkIcon width={20} height={20} />
            <MatchTextComponent
              use="span"
              needles={props.searchTexts}
              haystack={batch.name}
            />
          </p>
          <MatchTextComponent
            className="detail"
            use="p"
            needles={props.searchTexts}
            haystack={batch.location}
          />
          <MatchTextComponent
            className="detail"
            use="p"
            needles={props.searchTexts}
            haystack={getTrainersLine(batch)}
          />
          <MatchTextComponent
            className="detail date-line"
            use="p"
            needles={props.searchTexts}
            haystack={getDateLine(batch)}
          />
        </Col>
        <Col className="right flex-column">
          <div>
            <img src={imgSrc} alt="skill logo" />
          </div>
        </Col>
      </Row>
  );
};

export default withRouter(BatchCard);
