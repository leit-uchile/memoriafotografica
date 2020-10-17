import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, ModalBody, ModalHeader, ModalFooter, Input} from "reactstrap";
import { gallery,user, site_misc } from "../../../actions";
import { connect } from "react-redux";
import Gallery from "react-photo-gallery";
import { LeitSpinner } from "../../../components";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faCamera, faCloudUploadAlt, faPencilAlt, faSave, faTrashAlt, faUndo } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import PhotoEditor from "../../../components/PhotoEditor"
import { album } from "../../../actions/gallery_api";
import { deleteAlbum, editAlbum } from "../../../actions/gallery_api/album";
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
  onLoadGetPhotos,
  user,
  userPhotos,
  deleteAlbum,
  deleteAlbumStatus,
  editAlbum,
  editAlbumStatus
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
  const [description, setDescription] = useState("")
  const [name, setName] = useState("")
  const [pictures, setPictures] = useState([])
  const [action, setAction] = useState(false)
  const [deleteLoader, setDeleteLoader] = useState(false)
  const [editLoader, setEditLoader] = useState(false)
  const DeleteAlbumModal = (props) => {
    const {
      buttonLabel,
      className,
      deleteButton,
      loading
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
            {loading ? <LeitSpinner/> : (<Button color="primary" onClick={deleteButton}>Eliminar</Button>)}
            <Button color="secondary" onClick={toggle}>Cancelar</Button>            
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  


  const editButton = () => {
    if(editing){
      let newPhotoIds = pictures.filter(e => e.selected).map(e => e.id)      
      console.log(newPhotoIds)      
      let data = {        
        pictures : newPhotoIds,
        name,
        description
      }
      editAlbum(albumData.id, data)
      setEditLoader(true)
    } else {
      setEditing(true)
    }
  }

  const deleteButton = () => {
    deleteAlbum(albumData.id)
    setDeleteLoader(true)
  }
  useEffect( () => {
    if(deleteAlbumStatus.sent && deleteAlbumStatus.success) setAction(true)
    if(editAlbumStatus.sent && editAlbumStatus.success) setAction(true)
  }, [deleteAlbumStatus, editAlbumStatus])
  useEffect( () => setAction(false), [action])

  const handleOnSelect = (selectedPhoto) => {
    let pics = pictures.map(p => {
      if(p.id == selectedPhoto.id){
        p.selected = !p.selected
      }
      return p
    })
    setPictures(pics)    
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
    if(albumData) setDescription(albumData.description);
  }, [albumData]);

  useEffect(() => {
    onLoadGetPhotos(user.id, 0, 0);
  }, [])
  
  useEffect(()=>{
    if(editing){
      let albIds = display.photos.map(e => (e.id))
      let selectedpics = userPhotos.map(e => {
        let newP = {}
        newP.id = e.id
        newP.selected = albIds.includes(e.id)
        newP.src = e.thumbnail        
        newP.height = e.aspect_h
        newP.width = e.aspect_w
        return newP;
      })
      setPictures(selectedpics)
      setDescription(albumData.description)
      setName(albumData.name)
    }
  }, [editing])
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

  return action ? <Redirect to="/user/dashboard/albums"></Redirect> : (albumData !== {} ? (
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
                  <h2>{albumData.collection ? "Colección" : "Album"} : {editing ? (<Input type="text" value={name} onChange={(e => setName(e.target.value))}/>) : albumData.name }</h2>
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
                    {editing ? <PhotoEditor viewLink={false} selectAllBtn={false} selectIcon="check" photos={pictures} onClick={(e,index)=>(handleOnSelect(index.photo))} /> : (
                      <Gallery
                        photos={display.photos}
                        targetRowHeight={200}
                        onClick={(e, index) => {
                          handleOnClick(index);
                        }}
                      />
                    )}
                  </Col>
                  <Col sm={3} className="album-sticky-element">
                    <div className="album-white-box">                      
                      <span className="album-photo-count">
                        {albumData.pictures ? albumData.pictures.length : "0"} <FontAwesomeIcon icon={faCamera} />                        
                      </span>
                      <span className="album-meta">
                        {display.uploaded} <FontAwesomeIcon icon={faCloudUploadAlt}/>
                      </span>
                      {editing ? (<Input type="textarea" className="album-textarea" rows="7" value={description} onChange={e => setDescription(e.target.value)}></Input>) : (
                        <p className="album-desc">{albumData.description}</p>
                      )}
                      <Row>                        
                        <Col>
                          <Button color="primary" onClick={editButton}>{editing ? "Confirmar Cambios ":"Editar"}  <FontAwesomeIcon icon={editing ? faSave : faPencilAlt}/></Button>
                        </Col>
                        <Col>
                          {editing ? <Button color="danger" onClick={()=>setEditing(!editing)}>Cancelar <FontAwesomeIcon icon={faUndo}/></Button> : <DeleteAlbumModal loading={deleteLoader} deleteButton={deleteButton} buttonLabel="Eliminar"/>}
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
  ) : null);
};

const mapStateToProps = (state) => ({
  loading: state.albumcollection.loading,
  albumData: state.albumcollection.albumData,
  deleteAlbumStatus: state.albumcollection.deleteAlbum,
  editAlbumStatus: state.albumcollection.editAlbum,
  user: state.user.userData,
  userPhotos: state.user.photos,
});

const mapActionsToProps = (dispatch) => ({
  loadInfo: (id, detailed = true) =>
    dispatch(gallery.album.loadAlbumInfo(id, detailed)),
  pushPhotos: (photos) => dispatch(site_misc.pushPhotoArray(photos)),
  setIndex: (num) => dispatch(site_misc.setSelectedId(num)),
  onLoadGetPhotos: (user_id, limit, offset) =>
    dispatch(user.getUserPhotos(user_id, limit, offset)),
  deleteAlbum: id => dispatch(gallery.album.deleteAlbum(id)),
  editAlbum: (id,data) => dispatch(gallery.album.editAlbum(id,data))
});

export default connect(mapStateToProps, mapActionsToProps)(AlbumView);
