import React, { useEffect, useState, Fragment } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { gallery, site_misc } from "../../actions";
import { connect } from "react-redux";
import { LeitSpinner, Photo } from "../../components";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "./collectionView.css";

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
          {display.photos.map((photo, i) => (
            <div data-aos="fade-up">
              <div
                className={`collection-photo ${i % 2 == 0 ? "left" : "right"}`}
              >
                <img src={photo.src} width="50%" />
              </div>
              <div
                className={`collection-photo ${i % 2 == 0 ? "right" : "left"}`}
              >
                <h5 style={{ color: "#999" }}>
                  <FontAwesomeIcon icon={faCamera} /> Tomada el{" "}
                  {moment("1990-10-10T00:00:00-03:00").format("DD/MM/YYYY")}
                </h5>
                <p>Descripcion de la foto</p>
                <Button
                  color="link"
                  onClick={() => {
                    handleOnClick(i);
                  }}
                >
                  Ver más
                </Button>
              </div>
              <div style={{ clear: "both" }}></div>
            </div>
          ))}
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
