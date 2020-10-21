import React from "react";
import { connect } from "react-redux";
import { UncontrolledAlert as BTAlert, Container, Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import { selectSiteMiscAlerts } from "../../reducers";
const Alert = ({ alerts }) =>
  alerts !== null && alerts.length > 0 ? (
    <Container
      style={{
        top: "calc(1em + 65px)",
        zIndex: "999",
        position: "sticky",
        height: "0",
      }}
    >
      {alerts.map((alert) => (
        <Row key={alert.id}>
          <Col>
            <BTAlert color={alert.alertType}>{alert.msg}</BTAlert>
          </Col>
        </Row>
      ))}
    </Container>
  ) : null;

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: selectSiteMiscAlerts(state),
});

export default connect(mapStateToProps)(Alert);
