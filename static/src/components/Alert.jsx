import React from 'react';
import { connect } from 'react-redux';
import {Alert as BTAlert} from 'reactstrap';
import PropTypes from 'prop-types';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <Alert key={alert.id} color={alert.alertType}>
      {alert.msg}
    </Alert>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);