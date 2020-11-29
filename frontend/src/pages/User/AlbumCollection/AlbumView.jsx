import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { gallery, site_misc } from "../../../actions";
import { connect } from "react-redux";
import Gallery from "react-photo-gallery";
import { LeitSpinner } from "../../../components";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { bindActionCreators } from "redux";
import "./styles.css";
import {selectAlbumsLoading,
        selectAlbumCollectionAlbumData,} from "../../../reducers";

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
const AlbumView = ({
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
    loadInfo(match.params.id, true);
  }, [match.params.id, loadInfo]);

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

  const handleOnClick = (obj) => {
    setIndex(obj.index);
    setDisplay({ ...display, redirect: obj.index });
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
    <Container fluid className="album-container home-background parallax">
      <Row className="album-title-row">
        <Col>
          <Container>
            <Row>
              <Col xs={2}>
                <Button
                  color="secondary"
                  tag={Link}
                  to={
                    location.pathname.includes("public")
                      ? `/gallery`
                      : "/user/dashboard/albums"
                  }
                  style={{ height: "30px" }}
                >
                  <FontAwesomeIcon icon={faArrowAltCircleLeft} />{" "}
                  {location.pathname.includes("public") ? "Galeria" : "Volver"}
                </Button>
              </Col>
              <Col xs={9}>
                {loading ? (
                  <LeitSpinner />
                ) : (
                  <h2>{`${albumData.collection ? "Colección" : "Album"}: ${
                    albumData.name
                  }`}</h2>
                )}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container>
            {loading ? (
              <LeitSpinner />
            ) : (
              <div>
                {" "}
                {/* Do not remove this div, it allows for sticky behavior*/}
                <Row>
                  <Col sm={9}>
                    <Gallery
                      photos={display.photos}
                      targetRowHeight={200}
                      onClick={(e, index) => {
                        handleOnClick(index);
                      }}
                    />
                  </Col>
                  <Col sm={3} className="album-sticky-element">
                    <div className="album-white-box">
                      <p className="album-desc">{albumData.description}</p>
                      <span className="album-photo-count">
                        {`Fotos: ${
                          albumData.pictures ? albumData.pictures.length : 0
                        }`}
                      </span>
                      <span className="album-meta">
                        {`Subida el : ${display.uploaded}`}
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </Container>
        </Col>
      </Row>
      ;
    </Container>
  ) : null;
};

const mapStateToProps = (state) => ({
  loading: selectAlbumsLoading(state),
  albumData: selectAlbumCollectionAlbumData(state),
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

export default connect(mapStateToProps, mapActionsToProps)(AlbumView);
