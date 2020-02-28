import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import { connect } from 'react-redux';

const Reported_Users = () => <Container>
  <Row>
    <Col>
      <h2>
        Usuarios denunciados
      </h2>
    </Col>
  </Row>
</Container>

export default connect()(Reported_Users)