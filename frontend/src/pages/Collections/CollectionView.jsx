import React, { useEffect, useState, Fragment } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "reactstrap";
import { LeitSpinner } from "../../components";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Helmet from "react-helmet";
import Gallery from "react-photo-gallery";
import { useMediaQuery } from "react-responsive";
import { CSSTransition } from "react-transition-group";
import { gallery, site_misc } from "../../actions";
import { connect } from "react-redux";
import "./collectionView.css";

const loremIpsum =
  " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut pretium augue. Etiam in odio enim. Mauris vitae pretium libero. Aliquam erat volutpat. Aliquam risus nisl, varius sed viverra vel, sagittis quis massa. Duis vitae mattis dui, eu convalli";
const eloremIpsum = "Descripcion de la foto";
/**
 * Display album with pagination and individual image links
 *
 * TODO: finish pagination
 *
 * @param {Object} match
 * @param {Object} albumData
 * @param {Boolean} loading
 * @param {Function} loadInfo
 * @param {Function} setIndex
 * @param {Function} pushPhotos
 */
const CollectionView = ({
  match,
  albumData,
  loadInfo,
  loading,
  setIndex,
  pushPhotos,
  location,
}) => {
  // Load album info
  useEffect(() => {
    loadInfo(match.params.id);
  }, [match.params.id, loadInfo]);

  // Scroll up!
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  });

  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 480px)",
  });

  // compute one time and store here
  const [display, setDisplay] = useState({
    photos: [],
    uploaded: "",
    redirect: false,
    timeline: true,
  });

  useEffect(() => {
    if (albumData !== null && albumData.pictures) {
      setDisplay({
        ...display,
        photos: albumData.pictures.map((el) => ({
          src: el.thumbnail,
          height: el.aspect_h,
          width: el.aspect_w,
          id: el.id,
        })),
        uploaded: new Date(albumData.created_at).toLocaleDateString("es"),
        redirect: false,
      });
    }
  }, [albumData]);

  const handleOnClick = (id) => {
    console.log(id);
    setIndex(id);
    setDisplay({ ...display, redirect: id });
  };

  if (display.redirect !== false) {
    // TODO: change this push photos to url use
    pushPhotos(albumData.pictures);
    return (
      <Redirect
        push
        to={`/photo/${display.photos[display.redirect].id}/?album=${
          albumData.id
        }`}
      />
    );
  }

  const mapped = display.photos.map((el) => ({
    src: el.src,
    height: el.height,
    width: el.width,
    id: el.id,
  }));

  return albumData !== {} ? (
    <Container fluid style={{ padding: "0", margin: "0", marginTop: "-2em" }}>
      {loading ? (
        <LeitSpinner />
      ) : (
        <Fragment>
          <Helmet>
            <title>{`Colección: ${albumData.name}`}</title>
          </Helmet>
          <Row>
            <Col>
              <blockquote className="collection-view-description">
                <p>{albumData.description}</p>
              </blockquote>
            </Col>
          </Row>
          <Row>
            <Col style={{ textAlign: "center", marginBottom: "1rem" }}>
              <ButtonGroup>
                <Button
                  disabled={!display.timeline}
                  onClick={() => setDisplay({ ...display, timeline: false })}
                >
                  Ver como galeria
                </Button>
                <Button
                  disabled={display.timeline}
                  onClick={() => setDisplay({ ...display, timeline: true })}
                >
                  Ver como linea de tiempo
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
          <CSSTransition
            in={display.timeline}
            timeout={400}
            classNames="timeline"
            unmountOnExit
          >
            <Container>
              {isTabletOrMobileDevice
                ? display.photos.map((photo, i) => (
                    <Row className="collection-view-element">
                      <Col sm={{ size: 6 }}>
                        <div className="collection-view-photo">
                          <img src={photo.src} width="100%" />
                        </div>
                      </Col>
                      <Col sm={{ size: 6 }} className="collection-view-line">
                        <div className="collection-view-info">
                          <h5 style={{ color: "#999" }}>
                            <FontAwesomeIcon icon={faCamera} /> Tomada el{" "}
                            {moment("1990-10-10T00:00:00-03:00").format(
                              "DD/MM/YYYY"
                            )}
                          </h5>
                          <p>{loremIpsum}</p>
                          <Button
                            color="link"
                            onClick={() => {
                              handleOnClick(i);
                            }}
                          >
                            Ver más
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  ))
                : display.photos.map((photo, i) =>
                    i % 2 === 0 ? (
                      <Row className="collection-view-element">
                        <Col sm={{ size: 6 }} md={{ size: 6 }}>
                          <div className="collection-view-info">
                            <h5 style={{ color: "#999" }}>
                              <FontAwesomeIcon icon={faCamera} /> Tomada el{" "}
                              {moment("1990-10-10T00:00:00-03:00").format(
                                "DD/MM/YYYY"
                              )}
                            </h5>
                            <p>{loremIpsum}</p>
                            <Button
                              color="link"
                              onClick={() => {
                                handleOnClick(i);
                              }}
                            >
                              Ver más
                            </Button>
                          </div>
                        </Col>
                        <Col
                          sm={{ size: 6 }}
                          md={{ size: 6 }}
                          className="collection-view-line"
                        >
                          <div className="collection-view-photo">
                            <img src={photo.src} width="100%" />
                          </div>
                        </Col>
                      </Row>
                    ) : (
                      <Row className="collection-view-element">
                        <Col md={{ size: 6 }} sm={{ size: 6 }}>
                          <div className="collection-view-photo">
                            <img src={photo.src} width="100%" />
                          </div>
                        </Col>
                        <Col
                          sm={{ size: 6 }}
                          md={{ size: 6 }}
                          className="collection-view-line"
                        >
                          <div className="collection-view-info">
                            <h5 style={{ color: "#999" }}>
                              <FontAwesomeIcon icon={faCamera} /> Tomada el{" "}
                              {moment("1990-10-10T00:00:00-03:00").format(
                                "DD/MM/YYYY"
                              )}
                            </h5>
                            <p>{loremIpsum}</p>
                            <Button
                              color="link"
                              onClick={() => {
                                handleOnClick(i);
                              }}
                            >
                              Ver más
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    )
                  )}
            </Container>
          </CSSTransition>
          <CSSTransition
            in={!display.timeline}
            timeout={400}
            classNames="timeline"
            unmountOnExit
          >
            <Row>
              <Col>
                <Container>
                  <Row>
                    <Col>
                      <Gallery
                        photos={mapped}
                        targetRowHeight={200}
                        onClick={(e, index) => handleOnClick(index.index)}
                      />
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </CSSTransition>
          <Row>
            <Col style={{ textAlign: "center", margin: "1rem 0" }}>
              <Button color="primary" tag={Link} to={"/collections"}>
                Ver más colecciones
              </Button>
            </Col>
          </Row>
        </Fragment>
      )}
    </Container>
  ) : null;
};

const mapStateToProps = (state) => ({
  loading: state.albumcollection.loading,
  albumData: state.albumcollection.albumData,
});

const mapActionsToProps = (dispatch) => ({
  loadInfo: (id, detailed = true) =>
    dispatch(gallery.album.loadAlbumInfo(id, detailed)),
  pushPhotos: (photos) => dispatch(site_misc.pushPhotoArray(photos)),
  setIndex: (num) => dispatch(site_misc.setSelectedId(num)),
});

export default connect(mapStateToProps, mapActionsToProps)(CollectionView);
