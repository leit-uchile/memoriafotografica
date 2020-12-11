import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { user } from "../../../actions";
import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { bindActionCreators } from "redux";
import {
  selectUserPhotos,
  selectUserComments,
  selectUserAlbums,
} from "../../../reducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faCameraRetro,
  faAddressCard,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import Gallery from "react-photo-gallery";
import { LeitSpinner, ReportModal, UserPicture } from "../../../components";
import { userRolTranslation, userTypeTranslation } from "../utils";
import moment from "moment";
import AlbumGallery from "../../../components/AlbumGallery";

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
    getPublicPhotos(user.id, "&page=1&page_size=4");
    getPublicAlbums(user.id, "&page=1&page_size=3");
  }, [user]);

  if (params.redirect) {
    return <Redirect push to={params.url} />;
  }
  return (
    <Container className="dashboard">
      <Helmet>
        <title>{`Perfil de ${user.first_name} ${user.last_name}`}</title>
      </Helmet>
      <Row>
        <Col className="dashboard-col">
          <Container fluid>
            <Row>
              <Col sm={4} style={{ textAlign: "center" }}>
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
              <Col
                sm={8}
                style={{
                  textAlign: "left",
                  lineHeight: "50%",
                }}
              >
                <h2>Perfil de {user.first_name + " " + user.last_name}</h2>
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
        <Col className="dashboard-col">
          <div className="stat-box">
            <Container fluid className="stat-box-header">
              <h2>&Aacute;lbumes</h2>
              {albums.count !== 0 ? (
                <Link to={`/user/public/${user.id}/albums`}>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    size={"lg"}
                    title={"Ver todos"}
                  />
                </Link>
              ) : null}
            </Container>
            <hr />
            <Container fluid>
              {albums.results ? (
                albums.results.length !== 0 ? (
                  <Row>
                    <Col
                      sm={
                        albums.results.length === 1
                          ? { size: 4, offset: 4 }
                          : { size: 12 }
                      }
                    >
                      <AlbumGallery
                        albums={albums.results}
                        onClick={(e, obj) => {
                          setParams({
                            redirect: true,
                            url:
                              "/user/public/albums/" +
                              albums.results[obj.index].id,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                ) : (
                  "Este usuario no tiene álbumes"
                )
              ) : (
                <Row>
                  <Col style={{ textAlign: "center" }}>
                    <LeitSpinner />
                  </Col>
                </Row>
              )}
            </Container>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="dashboard-col">
          <div className="stat-box">
            <Container fluid className="stat-box-header">
              <h2>Fotograf&iacute;as </h2>
              {photos.count !== 0 ? (
                <Link to={`/user/public/${user.id}/photos`}>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    size={"lg"}
                    title={"Ver todas"}
                  />
                </Link>
              ) : null}
            </Container>
            <hr />
            <Container fluid>
              {photos.results ? (
                photos.results.length !== 0 ? (
                  <Row>
                    <Col
                      sm={
                        photos.results.length === 1
                          ? { size: 4, offset: 4 }
                          : { size: 12 }
                      }
                    >
                      <Gallery
                        photos={photos.results.map((el) => ({
                          src: el.thumbnail,
                          height: el.aspect_h,
                          width: el.aspect_w,
                          id: el.id,
                        }))}
                        targetRowHeight={250}
                        onClick={(e, obj) =>
                          setParams({
                            redirect: true,
                            url:
                              "/photo/" +
                              photos.results[obj.index].id +
                              "/?user=" +
                              user.id,
                          })
                        }
                      />
                    </Col>
                  </Row>
                ) : (
                  "Este usuario no tiene fotografías"
                )
              ) : (
                <Row>
                  <Col style={{ textAlign: "center" }}>
                    <LeitSpinner />
                  </Col>
                </Row>
              )}
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
