import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  Spinner,
  FormText,
} from "reactstrap";
import { Helmet } from "react-helmet";
import { gallery, user, site_misc } from "../../../actions";
import { connect } from "react-redux";
import Gallery from "react-photo-gallery";
import { LeitSpinner } from "../../../components";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowAltCircleLeft,
  faCamera,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import PhotoEditor from "../../../components/PhotoEditor";

import { bindActionCreators } from "redux";
import {
  selectAlbumCollectionAlbumData,
  selectAlbumAlbumUpdate,
  selectUserPhotos,
  selectAlbumDelete,
} from "../../../reducers";

/**
 * Display album with pagination and individual image links
 *
 * TODO: finish pagination
 *
 * @param {Object} match
 * @param {Object} albumDetails
 * @param {Boolean} loading
 * @param {Function} loadAlbum
 * @param {Function} setIndex
 * @param {Function} pushPhotos
 */

const AlbumView = ({
  location,
  match,
  albumDetails,
  loadAlbum,
  editAlbum,
  deleteAlbum,
  updatedAlbum,
  albumDeleted,
  setSelectedId,
}) => {
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({
    redirect: false,
    url: "",
  });
  const [deleteModal, setDeleteModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [albumData, setAlbumData] = useState({});
  const [selected, setSelected] = useState([]);
  const [sending, setSending] = useState(false);

  const publicView = location.pathname.includes("public");

  // Load album info
  useEffect(() => {
    setLoading(true);
    loadAlbum(match.params.id, true).then((r) => setLoading(false));
    // eslint-disable-next-line
  }, [publicView, match.params.id, updatedAlbum]);

  useEffect(() => {
    let info = {
      ...albumDetails,
      uploaded: new Date(albumDetails.created_at).toLocaleDateString("es"),
    };

    setAlbumData(info);
  }, [albumDetails, match.params.id]);

  const updateData = (e) =>
    setAlbumData({ ...albumData, [e.target.name]: e.target.value });

  const onSend = () => {
    if (!editing) {
      setEditing(true);
    } else {
      setSending(true);
      let newPhotoIds = selected;
      let data = {
        pictures: newPhotoIds,
        name: albumData.name !== "" ? albumData.name : albumDetails.name,
        description: albumData.description,
      };
      editAlbum(albumData.id, data).then((r) => setEditing(false));
    }
  };

  const DeleteAlbumModal = (props) => {
    const {
      buttonLabel,
      className,
      albumId,
      modal,
      toggle,
      deleteAlbum,
      setRedirect,
    } = props;
    const [deleting, setDeleting] = useState(false);

    const onDelete = () => {
      setDeleting(true);
      deleteAlbum(albumId).then((r) => {
        setDeleting(false);
        toggle();
        setRedirect({
          redirect: true,
          url: "/user/dashboard/albums",
        });
      });
    };

    return (
      <div>
        <Button color="danger" onClick={toggle}>
          {buttonLabel}
        </Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Eliminar álbum</ModalHeader>
          <ModalBody>Esta acción no se puede deshacer. ¿Está seguro?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={onDelete}>
              {deleting ? (
                <Spinner style={{ width: "1rem", height: "1rem" }} />
              ) : (
                ""
              )}{" "}
              Eliminar
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  if (params.redirect) {
    return <Redirect push to={params.url} />;
  }
  return (
    <Container fluid className={publicView ? "home-background parallax" : ""}>
      <Helmet>
        <title>{albumDetails ? "Album " + albumDetails.name : ""}</title>
      </Helmet>
      <Row className="album-title-row">
        <Col>
          <Container>
            <Row>
              <Col xs={2}>
                {!editing ? (
                  <Button
                    color="secondary"
                    tag={Link}
                    to={publicView ? `/gallery` : "/user/dashboard/albums"}
                    style={{ height: "30px" }}
                  >
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />{" "}
                    {publicView ? "Galería" : "Volver"}
                  </Button>
                ) : (
                  <h3>Título</h3>
                )}
              </Col>
              <Col>
                {!loading ? (
                  !editing ? (
                    <h2
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Álbum: {albumData.name}
                    </h2>
                  ) : (
                    <Input
                      type="text"
                      value={albumData.name}
                      placeholder="Nuevo título"
                      name="name"
                      onChange={updateData}
                    />
                  )
                ) : null}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container fluid>
            {!loading ? (
              <div>
                {" "}
                {/* Do not remove this div, it allows for sticky behavior*/}
                <Row>
                  <Col
                    sm={
                      albumData.pictures.length === 1
                        ? { size: 4, offset: 4 }
                        : { size: 9 }
                    }
                  >
                    {editing && !publicView ? (
                      <PhotoEditor
                        photos={albumData.pictures.map((el) => ({
                          src: el.thumbnail,
                          height: el.aspect_h,
                          width: el.aspect_w,
                          id: el.id,
                        }))}
                        targetRowHeight={250}
                        selectIcon="check"
                        getSelection={(v) => {
                          var keys = Object.keys(v)
                            .filter((el) => el.includes("nb-"))
                            .map((el) => el.substr(3));
                          setSelected(
                            keys.map((el) => albumData.pictures[Number(el)].id)
                          );
                        }}
                        update={updatedAlbum}
                      />
                    ) : (
                      <Gallery
                        photos={albumData.pictures.map((el) => ({
                          src: el.thumbnail,
                          height: el.aspect_h,
                          width: el.aspect_w,
                          id: el.id,
                        }))}
                        targetRowHeight={250}
                        onClick={(e, obj) => {
                          setSelectedId(obj.index);
                          setParams({
                            redirect: true,
                            url: `/photo/${
                              albumData.pictures[obj.index].id
                            }/?album=${albumData.id}`,
                          });
                        }}
                      />
                    )}
                  </Col>
                  <Col sm={3} className="album-sticky-element">
                    <Container className="album-white-box">
                      <Row>
                        <Col>
                          <h5 style={{ color: "#999" }}>
                            <FontAwesomeIcon icon={faCamera} /> Contiene{" "}
                            {albumData.pictures
                              ? albumData.pictures.length
                              : "0"}{" "}
                            foto(s)
                          </h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h5 style={{ color: "#999" }}>
                            <FontAwesomeIcon icon={faCloudUploadAlt} /> Creado
                            el {albumData.uploaded}
                          </h5>
                        </Col>
                      </Row>
                      <Row style={{ marginBottom: "4px" }}>
                        <Col>
                          {!editing ? (
                            <p className="album-desc">
                              {albumData.description}
                            </p>
                          ) : (
                            <Input
                              type="textarea"
                              placeholder="Nueva descripción"
                              rows="7"
                              name="description"
                              value={albumData.description}
                              onChange={updateData}
                            ></Input>
                          )}
                        </Col>
                      </Row>
                      {!publicView ? (
                        <Row>
                          <Col>
                            {!editing ? (
                              <Button color="primary" onClick={onSend}>
                                Editar
                              </Button>
                            ) : (
                              <Fragment>
                                <FormText color="muted">
                                  Se mantendrán sólo las fotos seleccionadas
                                </FormText>
                                <Button color="primary" onClick={onSend}>
                                  {sending ? (
                                    <Spinner
                                      style={{ width: "1rem", height: "1rem" }}
                                    />
                                  ) : (
                                    ""
                                  )}{" "}
                                  Guardar cambios
                                </Button>
                              </Fragment>
                            )}
                            {!editing ? (
                              <DeleteAlbumModal
                                buttonLabel="Eliminar"
                                albumId={albumData.id}
                                modal={deleteModal}
                                toggle={() => setDeleteModal(!deleteModal)}
                                deleteAlbum={deleteAlbum}
                                setRedirect={(newp) => setParams(newp)}
                              />
                            ) : (
                              <Button
                                color="secondary"
                                onClick={() => setEditing(!editing)}
                              >
                                Cancelar
                              </Button>
                            )}
                          </Col>
                        </Row>
                      ) : null}
                    </Container>
                  </Col>
                </Row>
              </div>
            ) : (
              <Row>
                <Col style={{ textAlign: "center" }}>
                  <LeitSpinner />
                </Col>
              </Row>
            )}
          </Container>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  photos: selectUserPhotos(state),
  albumDetails: selectAlbumCollectionAlbumData(state),
  updatedAlbum: selectAlbumAlbumUpdate(state),
  albumDeleted: selectAlbumDelete(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      loadAlbum: gallery.album.loadAlbumInfo,
      pushPhotos: site_misc.pushPhotoArray,
      editAlbum: gallery.album.editAlbum,
      deleteAlbum: gallery.album.deleteAlbum,
      setSelectedId: site_misc.setSelectedId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(AlbumView);
