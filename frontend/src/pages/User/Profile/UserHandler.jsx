import React, { useEffect } from "react";
import { user } from "../../../actions";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { LeitSpinner } from "../../../components";
import PublicProfile from "./PublicProfile2";
import { bindActionCreators } from "redux";
import "../styles.css";
import { selectUserPublicUser,
  selectUserPublicStatus} from "../../../reducers";

const UserHandler= ({
  match,
  location,
  loadPublicUser,
  publicUser,
  dataStatus,
  ...rest
}) => {
  useEffect(() => {
    loadPublicUser(match.params.id);
  }, [loadPublicUser, match.params.id]);

  return dataStatus==="loading" ? (
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
  ) : publicUser === undefined || publicUser === null ? (
    <Container className="userNotAvailable">
      <Row>
        <Col sm={6}>
          <h2>
            Usuario <br></br> No encontrado
          </h2>
        </Col>
        <Col sm={6}>
          <p>El usuario que buscas no existe o no est&aacute; disponible</p>
          <p>
            Esto puede ser debido a una URL defectuosa o a que el usuario fue
            censurado por mala conducta.
          </p>
        </Col>
      </Row>
    </Container>
  ) : (
    <PublicProfile
      location={location}
      match={match}
      user={publicUser}
      {...rest}
    />
  );
};

const mapStateToProps = (state) => ({
  publicUser: selectUserPublicUser(state),
  dataStatus: selectUserPublicStatus(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      loadPublicUser: user.loadAUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(UserHandler);
