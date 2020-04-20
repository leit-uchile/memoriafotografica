import React, { useState, useEffect, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Row, Col, Container } from "reactstrap";
import { Helmet } from "react-helmet";

import ReportModal from "../../components/ReportModal";
import CommentHandler from "./CommentHandler";
import Photo from "../../components/Photo";
import { gallery, site_misc, webadmin } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faCamera,
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "./photoInfo.css";
import { getPermissionLogo } from "../../utils";
import Tags from "./Tags";
import Categories from "./Categories";
import Addthis from "./Addthis";

const PhotoDetails = ({
  photoInfo,
  suggestions,
  photoIndex,
  onLoad,
  findPhotoQueryPage,
  loadSuggestions,
  putSearch,
  putRequestPhoto,
  match,
  location,
}) => {
  const [state, setState] = useState({
    loadingPhoto: true,
    redirectToGallery: false,
    currentIndex: -1,
    // Page navigation
    leftIndex: -1,
    rightIndex: -1,
    pageSize: 10,
    page: 0,
    currentPage: 0,
  });

  const imageContainer = React.createRef();

  const redirectToSearch = (tagId, value) => {
    if (tagId !== undefined && tagId !== "") {
      putSearch(tagId, value);
      setState({ redirectToGallery: true });
    }
  };

  // When the photo changes reload its info
  useEffect(() => {
    // Load data
    onLoad(match.params.id);
    // Reset page counter
    setState({ ...state, currentPage: -1 });
    // Ask for our page number based on query
    findPhotoQueryPage(match.params.id,location.search)
    // METHOD
    loadSuggestions(state.page, location.search);
  }, [onLoad, match.params.id, location.search]);

  if (state.redirectToGallery) {
    return <Redirect push to="/gallery" />;
  }
  return (
    <div ref={imageContainer} className="disable-css-transitions">
      <Helmet>
        <meta
          property="og:url"
          content="http://memoriafotografica.ing.fcfm.cl/"
        />
        <meta property="og:title" content={photoInfo.details.title} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={photoInfo.details.description}
        />
        <meta property="og:image" content={photoInfo.details.thumbnail} />
        <title>{photoInfo.details.title}</title>
      </Helmet>
      <Container fluid>
        <Row className="photoPanelView">
          <Col md={{ offset: 3, size: 6 }}>
            <h2 style={styles.center}>{photoInfo.details.title}</h2>
            <div style={{ textAlign: "center" }}>
              <Link
                className="photoDetailNavigation"
                style={{
                  display: "inline-block",
                  marginRight: "1em",
                }}
                to={`/photo/${state.leftIndex}`}
              >
                <FontAwesomeIcon
                  icon={faChevronCircleLeft}
                  style={{ height: "25px", width: "25px" }}
                />
              </Link>
              <img
                alt={photoInfo.details.title}
                src={photoInfo.details.thumbnail}
                style={{
                  display: "inline-block",
                  margin: "0 auto",
                  maxHeight: "60vh",
                  maxWidth: "75%",
                }}
              />
              <Link
                className="photoDetailNavigation"
                style={{
                  display: "inline-block",
                  marginLeft: "1em",
                }}
                to={`/photo/${state.rightIndex}`}
              >
                <FontAwesomeIcon
                  icon={faChevronCircleRight}
                  style={{ height: "25px", width: "25px" }}
                />
              </Link>
            </div>
          </Col>
        </Row>
        <Row
          className="photoPanelView"
          style={{
            padding: "1em",
            minHeight: "auto",
            marginBottom: "2em",
          }}
        >
          <Col>
            <div style={{ textAlign: "center" }}>
              {suggestions
                ? suggestions.map((im, k) => (
                    <Photo
                      className={
                        im.id !== photoInfo.details.id
                          ? "suggestionPhoto"
                          : "suggestionPhoto thisPhoto"
                      }
                      key={k}
                      url={im.thumbnail}
                      name={"Foto relacionada"}
                      useLink={im.id !== photoInfo.details.id}
                      onClick={() => {}}
                      redirectUrl={"/photo/" + im.id}
                      height={"50px"}
                      width={"50px"}
                    />
                  ))
                : null}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container>
              <Row>
                <Col md={3}>
                  {photoInfo.details.user ? (
                    <Fragment>
                      <div
                      className="photoDetailAvatar"
                        style={{
                          backgroundImage: `url(${photoInfo.details.user.avatar})`,
                        }}
                      ></div>
                      <div style={{ marginLeft: "6em" }}>
                        <b>
                          <Link
                            to={
                              "/user/public/" + photoInfo.details.user.id + "/"
                            }
                          >{`${photoInfo.details.user.first_name} ${photoInfo.details.user.last_name}`}</Link>
                        </b>
                        <p>{photoInfo.details.user.rol_type}</p>
                      </div>
                    </Fragment>
                  ) : null}
                  <Tags
                    tags={photoInfo.details.metadata}
                    onRedirect={redirectToSearch}
                    style={{ clear: "both" }}
                  />
                  <Categories
                    cats={photoInfo.details.category}
                    onRedirect={redirectToSearch}
                  />
                </Col>
                <Col md={9}>
                  <Container fluid>
                    <Row>
                      <Col>
                        <h3>Descripción</h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h5 style={{ color: "#999" }}>
                          <FontAwesomeIcon
                            icon={faCamera}
                            style={{ marginRight: "1em" }}
                          />
                          Tomada el{" "}
                          {moment(photoInfo.details.upload_date).format(
                            "DD/MM/YYYY"
                          )}
                        </h5>
                      </Col>

                      <Col>
                        <h5 style={{ color: "#999" }}>
                          <FontAwesomeIcon
                            icon={faCalendarPlus}
                            style={{ marginRight: "1em" }}
                          />
                          Subida el{" "}
                          {moment(photoInfo.details.created_at).format(
                            "DD/MM/YYYY"
                          )}
                        </h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p>{photoInfo.details.description}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button
                          tag={Link}
                          to="/request-photo"
                          className="float-left"
                          onClick={() => {
                            putRequestPhoto(photoInfo.details);
                          }}
                        >
                          Solicitar foto
                        </Button>
                        <ReportModal
                          style={{
                            display: "inline-block",
                            width: "30px",
                            height: "30px",
                            margin: "auto 2px auto 2px",
                          }}
                          className="float-left"
                          elementId={match.params.id}
                          reportTitle={"Reportar fotografia"}
                          options={[
                            "Contenido inapropiado",
                            "Incita a la violencia",
                            "Usuario no es autor del contenido",
                          ]}
                          helpText={
                            "Si consideras que hay un problema con esta fotografía por favor envíamos un reporte mediante este formulario."
                          }
                          reportType={2}
                        />
                        <Addthis
                          title={photoInfo.details.title}
                          description={photoInfo.details.description}
                          thumbnail={photoInfo.details.thumbnail}
                        />
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row
          style={{
            borderTop: "solid 1px gray",
            marginTop: "2em",
            paddingTop: "2em",
          }}
        >
          <Col>
            <Container>
              <Row>
                <Col md={3}>
                  <h3>Licencia</h3>
                  {photoInfo.details.permission.map((el) =>
                    getPermissionLogo(el, 90, 32)
                  )}
                </Col>
                <Col md={9}>
                  <CommentHandler id={match.params.id} fluid />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const styles = {
  center: {
    textAlign: "center",
  },
  cc: {
    position: "absolute",
    bottom: "0",
  },
};

const mapStateToProps = (state) => ({
  photoInfo: state.photos,
  suggestions: state.photos.photos,
  photoIndex: state.site_misc.home.selectedIndex,
});

const mapActionsToProps = (dispatch) => ({
  onLoad: (id) => dispatch(gallery.photos.getPhoto(id)),
  findPhotoQueryPage: (id,params) => dispatch(gallery.photos.findPhotoQueryPage(id,10,params)),
  loadSuggestions: (page,params) => dispatch(gallery.photos.photoQuerySuggestions(page,10,params)),
  putSearch: (id, value) => dispatch(site_misc.putSearchItem(id, value)),
  putRequestPhoto: (value) => dispatch(webadmin.putRequestPhoto(value)),
  setSelectedId: (id) => dispatch(site_misc.setSelectedId(id)),
});

export default connect(mapStateToProps, mapActionsToProps)(PhotoDetails);
