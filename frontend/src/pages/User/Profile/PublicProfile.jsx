import React, { useEffect } from "react";
import { user } from "../../../actions";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { LeitSpinner } from "../../../components";
import Landing from "../Landing";
import { bindActionCreators } from "redux";
import "./styles.css";
import { selectUserPublicUser,
         selectUserPublicLoading} from "../../../reducers";

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
  }, [loadPublicUser, match.params.id]);

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
    <Landing
      location={location}
      match={match}
      publicUser={publicUser}
      {...rest}
    />
  );
};

const mapStateToProps = (state) => ({
  publicUser: selectUserPublicUser(state),
  loading: selectUserPublicLoading(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      loadPublicUser: user.loadAUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(PublicProfile);
