import React, { ChangeEvent, useEffect, useState } from "react";
import { Batch } from "./types";
import { getDummyBatches, getClientBatches } from "./api";
import { Col, Container, Row } from "reactstrap";
import { NavBar } from "../../components/NavBar/NavBar";
import BatchCard from "./BatchCard";
import firebase from "firebase/app";
import "firebase/auth";
import "./home-page.scss";

interface IProps {
  batches: Batch[];
  hiddenBatchIds: Set<string>;
  searchText: string;
  searchTexts: string[];
}

// TODO loading stuff
const HomePage = (props: IProps) => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [hiddenBatchIds, setHiddenBatchIds] = useState<Set<string>>(
    new Set<string>()
  );
  const [searchText, setSearchText] = useState<string>("");
  const [searchTexts, setSearchTexts] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase
            .auth()
            .currentUser?.getIdTokenResult(true)
            .then((idTokenResult) => {
              if (idTokenResult.claims.role) {
                getBatches(idTokenResult.claims.email, true);
              } else {
                getBatches(idTokenResult.claims.email, false);
              }
            });
        } else {
          window.location.href = "/"; //redirects to login page
        }
      });
    })();
  }, []);

  useEffect(() => updateHiddenBatchIds(), [searchText])// eslint-disable-line react-hooks/exhaustive-deps

  const getBatches = async (email: string, admin: boolean) => {
    // show batches that finish furthest in the future first
    const batchList = admin
      ? (await getDummyBatches()).sort((a, b) =>
          a.endDate === b.endDate ? 0 : a.endDate < b.endDate ? 1 : -1
        )
      : (await getClientBatches(email)).sort((a, b) =>
          a.endDate === b.endDate ? 0 : a.endDate < b.endDate ? 1 : -1
        );
    setBatches(batchList);
  };

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
    for (const b of batches) {
      const wc = BatchCard.WrappedComponent;
      const haystacks: string[] = [
        b.name.toLowerCase(),
        b.location.toLowerCase(),
        wc.getTrainersLine(b).toLowerCase(),
        wc.getDateLine(b).toLowerCase(),
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
    <Container className="home-page">
      <NavBar />
      <Row className="justify-content-between">
        <Col md="auto" />
        <Col className="text-left center-column" md="8" lg="7" xl="5">
          <input
            value={searchText}
            onChange={onInputChange}
            placeholder="new york`349"
            onKeyDown={handleKeyDown}
          />
          {batches
            .filter((b) => !hiddenBatchIds.has(b.batchId))
            .map((batch, index) => (
              <BatchCard key={index} batch={batch} searchTexts={searchTexts} />
            ))}
        </Col>
        <Col md="auto" />
      </Row>
    </Container>
  );
};

export default HomePage;