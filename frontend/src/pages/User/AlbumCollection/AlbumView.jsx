import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { gallery, site_misc } from "../../../actions";
import { connect } from "react-redux";
import Gallery from "react-photo-gallery";
import { LeitSpinner } from "../../../components";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faCamera, faCloudUploadAlt, faPencilAlt, faSave, faTrashAlt, faUndo } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
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
    loadInfo(match.params.id);
  }, [match.params.id, loadInfo]);

  // compute one time and store here
  const [display, setDisplay] = useState({
    photos: [],
    uploaded: "",
    redirect: false,
  });

  const [editing, setEditing] = useState(false)
  const [description, setDescription] = useState(albumData.description)
  
  const DeleteAlbumModal = (props) => {
    const {
      buttonLabel,
      className
    } = props;
  
    const [modal, setModal] = useState(false);
  
    const toggle = () => setModal(!modal);
  
    return (
      <div>
        <Button color="danger" onClick={toggle}>{buttonLabel}<FontAwesomeIcon icon={faTrashAlt}/></Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Confirmar eliminación</ModalHeader>
          <ModalBody>
            Está seguro/a ? Esta acción no puede deshacerse
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Eliminar</Button>{' '}            
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  


  const editButton = () => {
    if(editing){

    } else {
      setEditing(true)
    }
  }
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
                      : "/user/dashboard"
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
                    editing ? <PhotoEditor/> : (
                      <Gallery
                        photos={display.photos}
                        targetRowHeight={200}
                        onClick={(e, index) => {
                          handleOnClick(index);
                        }}
                      />
                    )
                  </Col>
                  <Col sm={3} className="album-sticky-element">
                    <div className="album-white-box">                      
                      <span className="album-photo-count">
                        {albumData.pictures ? albumData.pictures.length : "0"} <FontAwesomeIcon icon={faCamera} />                        
                      </span>
                      <span className="album-meta">
                        {display.uploaded} <FontAwesomeIcon icon={faCloudUploadAlt}/>
                      </span>
                      <p className="album-desc">{albumData.description}</p>
                      <Row>
                        <Col>
                          <Button color="primary" onClick={editButton}>{editing ? "Confirmar Cambios ":"Editar"}  <FontAwesomeIcon icon={editing ? faSave : faPencilAlt}/></Button>

                        </Col>
                        <Col>
                          {editing ? <Button color="danger" onClick={()=>setEditing(!editing)}>Cancelar <FontAwesomeIcon icon={faUndo}/></Button> : <DeleteAlbumModal buttonLabel="Eliminar"/>}
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </Container>
        </Col>
      </Row>
      <Row>
      </Row>
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

export default connect(mapStateToProps, mapActionsToProps)(AlbumView);
