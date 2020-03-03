import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { albumcollection, home } from "../../../actions";
import { connect } from "react-redux";
import Gallery from "react-photo-gallery";
import {LeitSpinner} from "../../../components";
import "./albumcollection.css";
import { Redirect } from "react-router-dom";

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
const AlbumView = ({ match, albumData, loadInfo, loading, setIndex, pushPhotos }) => {
  // Load album info
  useEffect(() => {
    loadInfo(match.params.id);
  }, [match.params.id, loadInfo]);

  // compute one time and store here
  const [display, setDisplay] = useState({
    photos: [],
    uploaded: "",
    redirect: false
  });

  useEffect(() => {
    if (albumData !== null && albumData.pictures) {
      setDisplay({
        photos: albumData.pictures.map(el => ({
          src: el.thumbnail,
          height: el.aspect_h,
          width: el.aspect_w,
          id: el.id
        })),
        uploaded: new Date(albumData.created_at).toLocaleDateString("es"),
        redirect: false
      });
    }
  }, [albumData]);

  const handleOnClick = obj => {
    setIndex(obj.index)
    setDisplay({ ...display, redirect: obj.index });
  };

  if (display.redirect !== false){
    pushPhotos(albumData.pictures);
    return (
      <Redirect push to={`/photo/${display.photos[display.redirect].id}`} />
    );
  }

  return albumData !== {} ? (
    <Container fluid className="album-container home-background parallax">
      <Row className="album-title-row">
        <Col>
          {loading ? (
            <LeitSpinner />
          ) : (
            <h2>{`${albumData.collection ? "Colección" : "Album"}: ${
              albumData.name
            }`}</h2>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Container>
            {loading ? (
              <LeitSpinner />
            ) : (
              <div> {/* Do not remove this div, it allows for sticky behavior*/}
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

const mapStateToProps = state => ({
  loading: state.albumcollection.loading,
  albumData: state.albumcollection.albumData
});

const mapActionsToProps = dispatch => ({
  loadInfo: (id, detailed = true) =>
    dispatch(albumcollection.loadAlbumInfo(id, detailed)),
  pushPhotos: photos => dispatch(home.pushPhotoArray(photos)),
  setIndex: num => dispatch(home.setSelectedId(num)),
});

export default connect(mapStateToProps, mapActionsToProps)(AlbumView);
