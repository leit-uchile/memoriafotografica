import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { user } from "../../actions";
import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { bindActionCreators } from "redux";
import {
  selectUserPhotos,
  selectUserComments,
  selectUserAlbums,
} from "../../reducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faCameraRetro,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import Gallery from "react-photo-gallery";
import { ReportModal, UserPicture } from "../../components";
import { userRolTranslation, userTypeTranslation } from "./utils";
import moment from "moment";
import AlbumGallery from "../../components/AlbumGallery";

const makeIcons = (rol_id) => {
  switch (rol_id) {
    case 1:
      return <FontAwesomeIcon icon={faCameraRetro} />;
    case 2:
      return <FontAwesomeIcon icon={faAddressCard} />;
    case 3:
      return <FontAwesomeIcon icon={faSuitcase} />;
    default:
      return "Failed";
  }
};

const PublicProfile = ({
  location,
  match,
  user,
  photos,
  getPublicPhotos,
  albums,
  getPublicAlbums,
}) => {
  const [params, setParams] = useState({
    redirect: false,
    url: "",
  });

  useEffect(() => {
    getPublicPhotos(user.id);
    getPublicAlbums(user.id);
  }, [user]);

  var mappedPhotos = photos
    .slice(photos.length - 3, photos.length)
    .map((el) => ({
      src: el.thumbnail,
      height: el.aspect_h,
      width: el.aspect_w,
      id: el.id,
    }));

  var mappedAlbums = albums.slice(albums.length - 3, albums.length);
  
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
          <Container fluid>
            <Row>
              <Col sm={4}>
                <UserPicture
                  user={user}
                  dims={100}
                  render={(user) => (
                    <img
                      height="100"
                      width="100"
                      style={{ borderRadius: "50%" }}
                      src={user.avatar}
                      alt="user-avatar"
                    />
                  )}
                />
              </Col>
              <Col sm={8}>
                <h2
                  style={{
                    textAlign: "left",
                  }}
                >
                  Perfil de {user.first_name + " " + user.last_name}
                </h2>
                <p>
                  Usuario desde el{" "}
                  {moment(user.created_at).format("DD/MM/YYYY")}
                </p>
                <p>
                  {userTypeTranslation(user.user_type)}{" "}
                  {makeIcons(user.user_type)}
                </p>
                <p>{userRolTranslation(user.rol_type)}</p>
                <ReportModal
                  style={{ display: "inline-block" }}
                  className="float-left"
                  elementId={user.id}
                  reportTitle={"Reportar Usuario"}
                  options={["Finge ser otra persona", "Fotografía inadecuada"]}
                  helpText={
                    "Si consideras que hay un problema con esta usuario por favor envíamos un reporte mediante este formulario."
                  }
                  reportType={1}
                />
              </Col>
            </Row>
          </Container>
        </Col>
        <Col>
          <div className="stat-box">
            <Container fluid className="stat-box-header">
              <h2>Álbums</h2>
              {albums.length !== 0 ? (
                <Link to={`/user/public/${user.id}/albums`}> Ver Todos</Link>
              ) : null}
            </Container>
            <hr />
            <Container fluid>
              <Row>
                <Col
                  sm={
                    mappedAlbums.length === 1 ? { size: 4, offset: 4 } : { size: 12 }
                  }
                >
                  {mappedAlbums.length !== 0 ? (
                    <AlbumGallery
                      albums={mappedAlbums}
                      onClick={(e, index) => {
                        setParams({
                          redirect: true,
                          url: "/user/public/albums/" + mappedAlbums[index.index].id,
                        });
                      }}
                    />
                  ) : (
                    "Este usuario no tiene álbums"
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="stat-box">
            <Container fluid className="stat-box-header">
              <h2>Fotograf&iacute;as </h2>
              {mappedPhotos.length !== 0 ? (
                <Link to={`/user/public/${user.id}/photos`}> Ver Todas</Link>
              ) : null}
            </Container>
            <hr />
            <Container fluid>
              <Row>
                <Col
                  sm={
                    mappedPhotos.length === 1
                      ? { size: 4, offset: 4 }
                      : { size: 12 }
                  }
                >
                  {photos.length !== 0 ? (
                    <Gallery
                      photos={mappedPhotos}
                      targetRowHeight={250}
                      onClick={(e, index) =>
                        setParams({
                          redirect: true,
                          url:
                            "/photo/" +
                            mappedPhotos[index.index].id +
                            "/?user=" +
                            user.id,
                        })
                      }
                    />
                  ) : (
                    "Este usuario no tiene fotografías"
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  photos: selectUserPhotos(state),
  comments: selectUserComments(state),
  albums: selectUserAlbums(state),
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
