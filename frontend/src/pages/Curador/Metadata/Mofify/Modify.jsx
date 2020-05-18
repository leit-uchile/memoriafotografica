import React, { Fragment } from "react";
import { Card, Col, CardText, CardTitle, Button } from "reactstrap";

const Modify = () => (
  <Fragment>
    <Col sm="6">
      <Card body>
        <CardTitle>Special Title Treatment</CardTitle>
        <CardText>
          With supporting text below as a natural lead-in to additional content.
        </CardText>
        <Button>Go somewhere</Button>
      </Card>
    </Col>
    <Col sm="6">
      <Card body>
        <CardTitle>Special Title Treatment</CardTitle>
        <CardText>
          With supporting text below as a natural lead-in to additional content.
        </CardText>
        <Button>Go somewhere</Button>
      </Card>
    </Col>
  </Fragment>
);

export default Modify;
