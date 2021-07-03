import React from "react";
import {
  Col,
  Row,
  Card,
  CardTitle,
  CardText,
  UncontrolledCollapse,
} from "reactstrap";

const HelpMessages = ({ id, messages }) => (
  <UncontrolledCollapse toggler={id} style={{ marginBottom: "1em" }}>
    <Row>
      {messages.map((m, index) => (
        <Col key={index}>
          <Card body>
            <CardTitle style={{ fontWeight: "bold" }}>{m.action}</CardTitle>
            <CardText>{m.helpMessage}</CardText>
          </Card>
        </Col>
      ))}
    </Row>
  </UncontrolledCollapse>
);

export default HelpMessages;
