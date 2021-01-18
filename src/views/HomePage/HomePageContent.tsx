/* eslint-disable react-hooks/exhaustive-deps */

import React, { ChangeEvent, useEffect, useState } from "react";
import { Batch } from '../../types';
import { Col, Container, DropdownItem, Row } from 'reactstrap';
import { NavBar } from "../../components/NavBar/NavBar";
import BatchCard from "../../components/BatchCard/BatchCard";
import "firebase/auth";
import "../../scss/home-page.scss";
import { Link } from 'react-router-dom';
import { IUser } from '../../_reducers/UserReducer';

interface IHomePageContentProps {
  user: IUser;
  batches: Batch[];
}

const HomePageContent: React.FC<IHomePageContentProps> = props => {
  const [hiddenBatchIds, setHiddenBatchIds] = useState<Set<string>>(
      new Set<string>()
  );
  const [searchText, setSearchText] = useState<string>("");
  const [searchTexts, setSearchTexts] = useState<string[]>([]);

  useEffect(() => updateHiddenBatchIds(), [searchText]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    setSearchTexts(
        searchText
            .trim()
            .split("`")
            .map((s) => s.trim().toLowerCase())
            .filter((s) => !!s)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setSearchText("");
      setSearchTexts([]);
    }
  };

  const updateHiddenBatchIds = () => {
    const needles = searchTexts;
    const hiddenBatchIds = new Set<string>();

    // determine which batches should be hidden
    for (const b of props.batches) {
      const date = `${b.startDate} to ${b.endDate}`;
      const trainers = b.employeeAssignments
          .map((e) => `${e.employee.firstName} ${e.employee.lastName || ""}`)
          .join(", ");

      const haystacks: string[] = [
        b.name.toLowerCase(),
        b.location.toLowerCase(),
        trainers.toLowerCase(),
        date.toLowerCase(),
      ];

      let foundMatch = true;

      // each needle must be found in at least one of the haystacks
      for (let i = 0; foundMatch && i < needles.length; i++) {
        const needle = needles[i];
        if (!haystacks.map((h) => h.includes(needle)).includes(true)) {
          foundMatch = false;
          hiddenBatchIds.add(b.batchId);
        }
      }
    }

    setHiddenBatchIds(hiddenBatchIds);
  };

  return (
      <Container className="home-page" fluid>
        <NavBar>
          {
            props.user.role === 'admin' &&
            (
                <Link to='/admin'>
                  <DropdownItem>Map Clients</DropdownItem>
                </Link>
            )
          }
        </NavBar>
        <Row className="justify-content-center">
          <Col />
          <Col className="text-left center-column" sm="10" lg="8" xl="5">
            <h3>your batches</h3>
            <br/>
            <input
                value={searchText}
                onChange={onInputChange}
                placeholder="new york`349"
                onKeyDown={handleKeyDown}
            />
            <br/>
            <br/>
            {
              props.batches
                  .filter((b) => !hiddenBatchIds.has(b.batchId))
                  .map((batch, index) => (
                      <BatchCard
                          key={index}
                          batch={batch}
                          searchTexts={searchTexts}
                      />
                  ))}
          </Col>
          <Col />
        </Row>
      </Container>
  );
};

export default HomePageContent;
