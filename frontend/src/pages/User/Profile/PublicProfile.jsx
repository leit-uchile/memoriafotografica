import React, { useEffect } from "react";
import { user } from "../../../actions";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { LeitSpinner } from "../../../components";
import UserDashboard from "./UserDashboard";

const PublicProfile = ({
  match,
  location,
  loadPublicUser,
  publicUser,
  loading,
  ...rest
}) => {
  useEffect(() => {
    loadPublicUser(match.params.id);
  }, [loadPublicUser]);

  return loading ? (
    <Container style={{ textAlign: "center", paddingTop: "20vh" }}>
      <Row>
        <Col>
          <h2>Cargando Informaci&oacute;n de Usuario</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <LeitSpinner />
        </Col>
      </Row>
    </Container>
  ) : publicUser === null ? (
    <Container style={{ textAlign: "center", paddingTop: "20vh" }}>
      <Row>
        <Col>
          <h2>El usuario que buscas no esta disponible</h2>
        </Col>
      </Row>
    </Container>
  ) : (
    <UserDashboard location={location} match={match} publicUser={publicUser} />
  );
};

const mapStateToProps = state => ({
  publicUser: state.user.publicUser,
  loading: state.user.publicLoading
});

const mapActionsToProps = dispatch => ({
  loadPublicUser: id => dispatch(user.loadAUser(id))
});

export default connect(mapStateToProps, mapActionsToProps)(PublicProfile);
