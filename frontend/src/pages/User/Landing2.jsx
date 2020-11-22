import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { user } from "../../actions";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import { bindActionCreators } from "redux";
import {
  selectUserPhotos,
  selectUserComments,
  selectUserAlbums,
} from "../../reducers";
import { useEffect } from "react";
import "./styles.css";

const Landing = ({ user, photos, getPhotos, albums, getAlbums, comments }) => {
  const [params, setParams] = useState({
    redirect: false,
    url: "",
  });

  const addMore = (
    <FontAwesomeIcon
      icon={faPlusCircle}
      onClick={() => setParams({ redirect: true, url: "/upload" })}
      title="Agregar más"
    />
  );

  useEffect(() => {
      // TODO: Don't ask for limit and offset (deprecated ?)
    getPhotos(user.id, 4, 0, false);
    getAlbums(user.id);
  }, []);

  if (params.redirect) {
    return <Redirect push to={params.url} />;
  }
  return (
    <Container fluid className="dashboard">
      <Helmet>
        <title>{`Escritorio de ${user.first_name} ${user.last_name}`}</title>
      </Helmet>
      <Row>
        <Col>
          <h2
            style={{
              textAlign: "left",
            }}
          >
            Escritorio
          </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="stat-box">
            <Container fluid className="stat-box-header">
              <h2>Cantidad de fotos</h2>
            </Container>
            <Container fluid>
              2048
              Ver todas
            </Container>
          </div>
        </Col>
        <Col>
          <div className="stat-box">
            <Container fluid className="stat-box-header">
              <h2>Cantidad de álbumes</h2>
            </Container>
            <Container fluid>
              2
              Ver todos
            </Container>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="stat-box">
            <Container fluid className="stat-box-header">
              <h2>Fotograf&iacute;as no listadas {addMore}</h2>
              {/* {photos.length !== 0 ? (
                <Link to={"/user/dashboard/photos"}> Ver Todas</Link>
              ) : null} */}
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
      getPhotos: user.getUserPhotos,
      getAlbums: user.getUserAlbums,
      onLoadGetPublicAlbums: user.loadPublicUserAlbums,
      onLoadGetPublicPhotos: user.loadPublicUserPhotos,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(Landing);
