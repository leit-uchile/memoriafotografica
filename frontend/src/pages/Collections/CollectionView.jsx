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
import { bindActionCreators } from "redux";
import "./collectionView.css";
import { selectAlbumsLoading, selectAlbumsData } from "../../reducers";

/*
 Helper local rendering functions
*/
const RenderPhoto = ({ photo }) => (
  <div className="collection-view-photo">
    <img src={photo.thumbnail} width="100%" />
  </div>
);

const RenderData = ({ photo, handle }) => (
  <div className="collection-view-info">
    <h5 style={{ color: "#999" }}>
      <FontAwesomeIcon icon={faCamera} /> Tomada el{" "}
      {moment(photo.upload_date).format("DD/MM/YYYY")}
    </h5>
    <p>{photo.description}</p>
    <Button
      color="link"
      onClick={() => {
        handle();
      }}
    >
      Ver más
    </Button>
  </div>
);

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
}) => {
  // Load album info
  useEffect(() => {
    loadInfo(match.params.id, true);
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
        photos: albumData.pictures,
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
    src: el.thumbnail,
    height: el.aspect_h,
    width: el.aspect_w,
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
                <h3>{`Colección: ${albumData.name}`}</h3>
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
                        <RenderPhoto photo={photo} />
                      </Col>
                      <Col sm={{ size: 6 }} className="collection-view-line">
                        <RenderData
                          photo={photo}
                          handle={() => handleOnClick(i)}
                        />
                      </Col>
                    </Row>
                  ))
                : display.photos.map((photo, i) =>
                    i % 2 === 0 ? (
                      <Row className="collection-view-element">
                        <Col sm={{ size: 6 }}>
                          <RenderData
                            photo={photo}
                            handle={() => handleOnClick(i)}
                          />
                        </Col>
                        <Col sm={{ size: 6 }} className="collection-view-line">
                          <RenderPhoto photo={photo} />
                        </Col>
                      </Row>
                    ) : (
                      <Row className="collection-view-element">
                        <Col sm={{ size: 6 }}>
                          {" "}
                          <RenderPhoto photo={photo} />
                        </Col>
                        <Col sm={{ size: 6 }} className="collection-view-line">
                          <RenderData
                            photo={photo}
                            handle={() => handleOnClick(i)}
                          />
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
  loading: selectAlbumsLoading(state),
  albumData: selectAlbumsData(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      loadInfo: gallery.album.loadAlbumInfo,
      pushPhotos: site_misc.pushPhotoArray,
      setIndex: site_misc.setSelectedId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(CollectionView);
