import React from 'react';
import {Container, Row, Col} from 'reactstrap';

const PublicProfile = ({match, location, ...rest}) => (
  <Container>
    <Row>
      <Col>
      <h3>{JSON.stringify(match)}</h3>

      <h3>{JSON.stringify(location)}</h3>
      </Col>
    </Row>
  </Container>
)

export default PublicProfile;