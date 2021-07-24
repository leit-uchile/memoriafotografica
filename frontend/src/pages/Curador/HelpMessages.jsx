import React from "react";
import PropTypes from "prop-types";
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

HelpMessages.propTypes = {
  id: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
};

export default HelpMessages;
