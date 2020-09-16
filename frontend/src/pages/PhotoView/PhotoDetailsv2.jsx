import React, { useState, useEffect, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Row, Col, Container } from "reactstrap";
import { Helmet } from "react-helmet";
import { ReportModal, Photo, NoMatch, LeitSpinner } from "../../components/";
import CommentHandler from "./Comments/CommentHandler";
import { gallery, site_misc, webadmin } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus, faCamera } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { getPermissionLogo } from "../../utils";
import Tags from "./Elements/Tags";
import Categories from "./Elements/Categories";
import Addthis from "./Elements/Addthis";
import PhotoDisplay from "./Elements/PhotoDisplay";
import { bindActionCreators } from "redux";
import "./styles.css";

const PhotoDetails = ({
  photoInfo,
  suggestions,
  photoPage,
  onLoad,
  setRoute,
  findPhotoQueryPage,
  loadSuggestions,
  putSearch,
  putRequestPhoto,
  match,
  location,
  errors,
}) => {
  const [state, setState] = useState({
    loadingPhoto: true,
    redirectToGallery: false,
    // Page navigation
    leftIndex: -1,
    rightIndex: -1,
    pageSize: 10,
    page: 0,
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
    setRoute("/photo");
    // Load data
    onLoad(match.params.id);
    // Reset page counter
    setState({ ...state, loadingPhoto: true });
    // Ask for our page number based on query
    findPhotoQueryPage(match.params.id, state.pageSize, location.search);
    // eslint-disable-next-line
  }, [onLoad, match.params.id, location.search]);

  useEffect(() => {
    // Initial load
    if (photoInfo.id !== undefined && state.loadingPhoto === true) {
      setState({ ...state, loadingPhoto: false });
    }
    // eslint-disable-next-line
  }, [photoInfo.id]);

  // Get suggestions
  useEffect(() => {
    if (photoPage.page !== null) {
      loadSuggestions(photoPage.page, state.pageSize, location.search);
    }
    // eslint-disable-next-line
  }, [photoPage.page]);

  useEffect(() => {
    setState({
      ...state,
      page: photoPage.page,
      rightIndex: photoPage.nextId,
      leftIndex: photoPage.prevId,
    });
    // eslint-disable-next-line
  }, [photoPage.position]);

  if (state.redirectToGallery) {
    return <Redirect push to="/gallery" />;
  }

  // In case of wrong id or banned id
  if (errors !== null && errors !== undefined) {
    return <NoMatch location={location} />;
  }

  return (
    <div ref={imageContainer}>
      <Helmet>
        <meta
          property="og:url"
          content="http://memoriafotografica.ing.fcfm.cl/"
        />
        <meta property="og:title" content={photoInfo.title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={photoInfo.description} />
        <meta property="og:image" content={photoInfo.thumbnail} />
        <title>{photoInfo.title}</title>
      </Helmet>
      <Container fluid>
        <Row className="photoPanelView" style={{ textAlign: "center" }}>
          <Col md={{ offset: 3, size: 6 }}>
            {state.loadingPhoto ? (
              <LeitSpinner />
            ) : (
              <PhotoDisplay
                details={photoInfo}
                leftIndex={state.leftIndex}
                rightIndex={state.rightIndex}
                params={location.search}
              />
            )}
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
                ? suggestions.length > state.pageSize
                  ? null
                  : suggestions.map((im, k) => (
                      <Photo
                        className={`suggestionPhoto ${
                          im.id === photoInfo.id ? "thisPhoto" : ""
                        }`}
                        key={k}
                        url={im.thumbnail}
                        name={"Foto relacionada"}
                        useLink={im.id !== photoInfo.id}
                        onClick={() => {}}
                        redirectUrl={`/photo/${im.id}/${location.search}`}
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
                  {photoInfo.user ? (
                    <Fragment>
                      <div
                        className="photoDetailAvatar"
                        style={{
                          backgroundImage: `url(${photoInfo.user.avatar})`,
                        }}
                      ></div>
                      <div style={{ marginLeft: "6em" }}>
                        <b>
                          <Link
                            to={"/user/public/" + photoInfo.user.id + "/"}
                          >{`${photoInfo.user.first_name} ${photoInfo.user.last_name}`}</Link>
                        </b>
                        <p>{photoInfo.user.rol_type}</p>
                      </div>
                    </Fragment>
                  ) : null}
                  <Tags
                    tags={photoInfo.metadata}
                    onRedirect={redirectToSearch}
                    style={{ clear: "both" }}
                  />
                  <Categories
                    cats={photoInfo.category}
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
                          <FontAwesomeIcon icon={faCamera} /> Tomada el{" "}
                          {moment(photoInfo.upload_date).format("DD/MM/YYYY")}
                        </h5>
                      </Col>

                      <Col>
                        <h5 style={{ color: "#999" }}>
                          <FontAwesomeIcon icon={faCalendarPlus} /> Subida el{" "}
                          {moment(photoInfo.created_at).format("DD/MM/YYYY")}
                        </h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p>{photoInfo.description}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button
                          className="secondary float-left"
                          onClick={() => {
                            putRequestPhoto(photoInfo);
                          }}
                        >
                          Solicitar foto
                        </Button>
                        <ReportModal
                          style={{
                            display: "inline-block",
                            margin: "auto 2px auto 2px",
                          }}
                          className="danger float-left"
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
                          title={photoInfo.title}
                          description={photoInfo.description}
                          thumbnail={photoInfo.thumbnail}
                        />
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
                  marginBottom: "3em",
                }}
              >
                <Col md={3}>
                  <h3>Licencia</h3>
                  {photoInfo.permission.map((el) =>
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

const mapStateToProps = (state) => ({
  photoInfo: state.photos.details,
  suggestions: state.photos.photos,
  errors: state.photos.errors,
  photoIndex: state.site_misc.home.selectedIndex,
  photoPage: state.site_misc.home.photoPagination,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      onLoad: gallery.photos.getPhoto,
      setRoute: site_misc.setCurrentRoute,
      findPhotoQueryPage: gallery.photos.findPhotoQueryPage,
      loadSuggestions: gallery.photos.photoQuerySuggestions,
      putSearch: site_misc.putSearchItem,
      putRequestPhoto: webadmin.putRequestPhoto,
      setSelectedId: site_misc.setSelectedId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(PhotoDetails);
