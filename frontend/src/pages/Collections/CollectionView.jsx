import React, { useEffect, useState, Fragment } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { gallery, site_misc } from "../../actions";
import { connect } from "react-redux";
import { LeitSpinner, Photo } from "../../components";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
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
  });

  useEffect(() => {
    if (albumData !== null && albumData.pictures) {
      setDisplay({
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

  return albumData !== {} ? (
    <Container fluid style={{ padding: "0", margin: "0", marginTop: "-2em" }}>
      {loading ? (
        <LeitSpinner />
      ) : (
        <Fragment>
          <Row>
            <Col style={{ padding: "0", margin: "0" }}>
              <Photo
                url={
                  "https://www.cec.uchile.cl/cinetica/pcordero/recordando/FotosFCFM/FCFM_1921.jpg"
                }
                height="300px"
                hover={false}
                redirectUrl="#"
                style={{
                  backgroundPositionY: "55%",
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <blockquote className="collection-view-description">
                <p>{albumData.description}</p>
              </blockquote>
            </Col>
          </Row>

          {isTabletOrMobileDevice
            ? display.photos.map((photo, i) => (
                <Row className="collection-view-element">
                  <Col sm={{ size: 3 }}>
                    <div className="collection-view-photo">
                      <img src={photo.src} width="100%" />
                    </div>
                  </Col>
                  <Col sm={{ size: 3 }} className="collection-view-line">
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
                    <Col
                      sm={i % 2 === 0 ? { size: 5, offset: 1 } : { size: 5 }}
                      md={i % 2 === 0 ? { size: 3, offset: 3 } : { size: 3 }}
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
                    <Col
                      sm={i % 2 === 0 ? { size: 5 } : { size: 5, offset: 1 }}
                      md={i % 2 === 0 ? { size: 3 } : { size: 3, offset: 3 }}
                      className="collection-view-line"
                    >
                      <div className="collection-view-photo">
                        <img src={photo.src} width="100%" />
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <Row className="collection-view-element">
                    <Col
                      md={i % 2 !== 0 ? { size: 3, offset: 3 } : { size: 3 }}
                      sm={i % 2 !== 0 ? { size: 5, offset: 1 } : { size: 5 }}
                    >
                      <div className="collection-view-photo">
                        <img src={photo.src} width="100%" />
                      </div>
                    </Col>
                    <Col
                      sm={i % 2 !== 0 ? { size: 5 } : { size: 5, offset: 1 }}
                      md={i % 2 !== 0 ? { size: 3 } : { size: 3, offset: 3 }}
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

          <div style={{ textAlign: "center" }}>
            <Button color="primary" tag={Link} to={"/collections"}>
              Ver más colecciones
            </Button>
          </div>
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
