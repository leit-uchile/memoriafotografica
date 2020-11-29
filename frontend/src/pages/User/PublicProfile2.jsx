import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { user } from "../../actions";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import { bindActionCreators } from "redux";
import {
  selectUserPhotos,
  selectUserComments,
  selectUserAlbums,
} from "../../reducers";
import { ReportModal } from "../../components";

const PublicProfile = ({
  location,
  match,
  user,
  photos,
  getPublicPhotos,
  getPublicAlbums,
}) => {
  const [params, setParams] = useState({
    redirect: false,
    url: "",
  });

  useEffect(() => {
    getPublicPhotos(user.id);
    getPublicAlbums(user.id);
  },[location.pathname]);

  if (params.redirect) {
    return <Redirect push to={params.url} />;
  }
  return (
    <Container className="dashboard">
      <Helmet>
        <title>{`Perfil de ${user.first_name} ${user.last_name}`}</title>
      </Helmet>
      <Row>
        <Col>
          <h2
            style={{
              textAlign: "center",
            }}
          >
            Perfil de {user.first_name + " " + user.last_name}
          </h2>
        </Col>
        <ReportModal
          style={{ display: "inline-block" }}
          className="float-right"
          elementId={user.id}
          reportTitle={"Reportar Usuario"}
          options={["Finge ser otra persona", "Fotografía inadecuada"]}
          helpText={
            "Si consideras que hay un problema con esta usuario por favor envíamos un reporte mediante este formulario."
          }
          reportType={1}
        />
      </Row>
      <Row>
        <Col>
          <div className="stat-box">
            <Container fluid className="stat-box-header">
              <h2>Fotograf&iacute;as </h2>
              {photos ? (
                photos.length !== 0 ? (
                  <Link to={`/user/public/${user.id}/photos`}> Ver Todas</Link>
                ) : null
              ) : null}
            </Container>
            <hr />
            <Container fluid>
              <p>En construccion</p>
            </Container>
          </div>
        </Col>
        <Col>
          <div className="stat-box">
            <Container fluid className="stat-box-header">
              <h2>Me han comentado</h2>
            </Container>
            <hr />
            <Container fluid>
              <p>En construccion</p>
            </Container>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="stat-box">
            <Container fluid className="stat-box-header">
              <h2>Notificaciones</h2>
            </Container>
            <hr />
            <Container fluid>
              <p>En construccion</p>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  data: {
    photos: selectUserPhotos(state),
    comments: selectUserComments(state),
    albums: selectUserAlbums(state),
  },
  user: state.user.userData,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      getPublicAlbums: user.loadPublicUserAlbums,
      getPublicPhotos: user.loadPublicUserPhotos,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(PublicProfile);
