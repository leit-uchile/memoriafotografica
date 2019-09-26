import React from 'react';
import { connect } from 'react-redux';
import {Alert as BTAlert, Container, Row, Col} from 'reactstrap';
import PropTypes from 'prop-types';

const Alert = ({ alerts }) => 
  alerts !== null &&
  alerts.length > 0 ?
  <Container style={{marginTop:"1em"}}>
    {alerts.map(alert => (
      <Row>
        <Col>
          <BTAlert key={alert.id} color={alert.alertType}>
            {alert.msg}
          </BTAlert>
        </Col>
      </Row>
    ))}
  </Container> : null

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);