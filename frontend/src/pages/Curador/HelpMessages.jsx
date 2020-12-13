import React, { Fragment } from "react";
import { Col, Card, CardTitle, CardText } from "reactstrap";

const HelpMessages = ({ messages }) => (
  <Fragment>
    {messages.map((m) => (
      <Col>
        <Card body>
          <CardTitle style={{fontWeight: "bold"}}>{m.action}</CardTitle>
          <CardText>{m.helpMessage}</CardText>
        </Card>
      </Col>
    ))}
  </Fragment>
);

export default HelpMessages;