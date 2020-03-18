import React from "react";
import {LeitSpinner} from "./index";
import { Container, Row, Col } from "reactstrap";

const SuspenseFallback = ({ message }) => (
  <Container>
    <Row>
      <Col style={{ textAlign: "center" }}>
        <h2> {message}</h2>
      </Col>
    </Row>
    <Row>
      <Col style={{ textAlign: "center" }}>
        <LeitSpinner />
      </Col>
    </Row>
  </Container>
);
export default SuspenseFallback;
