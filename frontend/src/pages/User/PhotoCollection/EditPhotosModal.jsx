import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Input,
  Form,
  FormText,
} from "reactstrap";
import { metadata, gallery } from "../../../actions";
import ReactTags from "react-tag-autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const CC_INFO = [
  { name: "CC BY", text: "Atribución" },
  { name: "CC BY-SA", text: "Atribución, Compartir Igual" },
  { name: "CC BY-ND", text: "Atribución, Sin Derivadas" },
  { name: "CC BY-NC", text: "Atribución, No Comercial" },
  { name: "CC BY-NC-SA", text: "Atribución, No Comercial, Compartir Igual" },
  { name: "CC BY-NC-ND", text: "Atribución, No Comercial, Sin Derivadas" },
];

const EditPhotosModal = ({
  isCurator,
  isOpen,
  handleToggle,
  photosId,
  photoDetails,
  getPhotoDetails,
  newTagsId,
  tags,
  getTags,
  createMultipleMetas,
  editPhoto,
  deletePhoto,
  updatedPhoto,
}) => {
  const [toggleDelete, setToggleDelete] = useState(false);
  const [formData, setData] = useState({}); //nuevos datos

  useEffect(() => {
    getTags(); //get tags from backend
  }, [newTagsId]);

  useEffect(() => {
    if (photosId.length === 1) {
      getPhotoDetails(photosId); //if user is editing only one photo, then get its details
    }
  }, [photosId]);

  // It fills formData with actual details to show it on screen later
  useEffect(() => {
    if (photosId.length === 1) {
      let info = { ...photoDetails };
      info.metadata =
        photoDetails.metadata !== undefined
          ? photoDetails.metadata.map((e) => ({
              id: e.id,
              name: e.value,
            }))
          : [];
      info.permission =
        photoDetails.permission !== undefined
          ? info.permission.toString()
          : null;
      delete info.image;
      delete info.thumbnail;
      setData(info);
    } else {
      setData({ metadata: [] });
    }
  }, [photoDetails, photosId, isOpen]);

  const updateData = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  const updateDate = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value + "T00:00" });

  const additionTag = (tag) => {
    const tagsList = [].concat(formData.metadata, tag);
    setData({ ...formData, metadata: tagsList });
  };

  const deleteTag = (i) => {
    const tagsList = formData.metadata.slice(0);
    tagsList.splice(i, 1);
    setData({ ...formData, metadata: tagsList });
  };

  // It checks if there are new tags with no ID
  const handleMetadata = () => {
    let newDetails = { ...formData };
    if (photosId.length > 1 && newDetails.metadata.length === 0) {
      delete newDetails.metadata; // No changes for each photo in its metadata field
      updatePhotoDetails(newDetails);
    } else {
      // There are metadata to push
      let newTags = newDetails.metadata.filter((el) => el.id === undefined); // New metadata unregistered
      if (newTags.length == 0) {
        newDetails.metadata = newDetails.metadata.map((el) => el.id);
        updatePhotoDetails(newDetails);
      } else {
        let toCreate = newTags.map((el) => el.name);
        createMultipleMetas(toCreate);
      }
    }
  };

  // It create array with registered metadata
  useEffect(() => {
    let newDetails = { ...formData };
    if (newDetails.metadata) {
      if (
        newDetails.metadata.filter((el) => el.id === undefined).length ===
        newTagsId.length
      ) {
        let oldTags = newDetails.metadata.filter((el) => el.id !== undefined);
        let newTags = Object.values(newTagsId).map((el) => el.id);
        newDetails.metadata = oldTags.concat(newTags);
        updatePhotoDetails(newDetails);
      } else {
        console.log("Waiting for new tags ID");
      }
    }
  }, [newTagsId]);

  const updatePhotoDetails = (newDetails) => {
    {
      photosId.forEach((photoIdToUpdate, index) => {
        photosId.length > 1 && newDetails.title !== undefined // If user renames multiple photos
          ? editPhoto(photoIdToUpdate, {
              ...newDetails,
              title: `${newDetails.title} (${index + 1})`, // Each photo gets the new title with an index
            })
          : editPhoto(photoIdToUpdate, newDetails);
      });
    }
    handleToggle();
  };

  const onDelete = (ids) => {
    ids.forEach((id) => deletePhoto(id));
    handleToggle();
  };

  const suggestions = tags
    ? tags.map((e) => ({ id: e.id, name: e.value }))
    : [];
  const PhotosForm = (
    <Fragment>
      <Form>
        <FormGroup>
          {!isCurator ? (
            <Row>
              <Col>
                <Label>Eliminar</Label>
              </Col>
              <Col>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={() => setToggleDelete(!toggleDelete)}
                  style={{
                    color: "var(--leit-red)",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                />
              </Col>
            </Row>
          ) : null}
          <Row style={{ marginBottom: "0.5em" }}>
            <Col>
              <Label>Título</Label>
            </Col>
            <Col>
              <Input
                type="text"
                value={formData.title}
                placeholder="Nuevo título de la(s) fotografía(s)"
                name="title"
                onChange={updateData}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "0.5em" }}>
            <Col>
              <Label>Descripción</Label>
            </Col>
            <Col>
              <Input
                type="textarea"
                value={formData.description}
                placeholder="Nueva descripción de la(s) fotografía(s)"
                name="description"
                onChange={updateData}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "0.5em" }}>
            <Col>
              <Label>Fecha de captura</Label>
            </Col>
            <Col>
              <Input
                type="date"
                value={`${formData.upload_date}`.slice(0, 10)}
                name="upload_date"
                onChange={updateDate}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "0.5em" }}>
            <Col>
              <Label>Etiquetas</Label>
            </Col>
            <Col>
              <ReactTags
                style={{ width: "auto" }}
                placeholder={"Añadir etiquetas"}
                autoresize={false}
                allowNew={true}
                tags={formData.metadata}
                suggestions={suggestions}
                handleDelete={deleteTag}
                handleAddition={additionTag}
              />
              <FormText color="muted">
                Para ingresar una nueva etiqueta debe presionar la tecla
                "Entrar" o "Tabulación"
              </FormText>
            </Col>
          </Row>
          {!isCurator ? (
            <Row style={{ marginBottom: "0.5em" }}>
              <Col>
                <Label>Permisos de acceso e intercambio</Label>
              </Col>
              <Col>
                <UncontrolledButtonDropdown>
                  <DropdownToggle caret color="link" style={{ padding: "0" }}>
                    {formData.permission ? formData.permission : "Seleccionar"}
                  </DropdownToggle>
                  <DropdownMenu>
                    {CC_INFO.map((el, k) => (
                      <DropdownItem
                        name="permission"
                        value={el.name}
                        onClick={updateData}
                        active={`${formData.permission}` === el.name}
                        style={{ display: "block", width: "100%" }}
                      >
                        {el.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </Col>
            </Row>
          ) : null}
        </FormGroup>
      </Form>
    </Fragment>
  );
  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => handleToggle()} size={"lg"}>
        <ModalHeader toggle={() => handleToggle()}>
          Editando {photosId.length} foto(s)
        </ModalHeader>
        <ModalBody>
          {PhotosForm}
          <Modal
            isOpen={toggleDelete}
            toggle={() => setToggleDelete(!toggleDelete)}
          >
            <ModalHeader toggle={() => setToggleDelete(!toggleDelete)}>
                Eliminar fotografía(s)
              </ModalHeader>
            <ModalBody>
              Esta acción no se puede deshacer. ¿Está seguro?
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={() => {
                  onDelete(photosId);
                  setToggleDelete(!toggleDelete);
                }}
              >
                Eliminar
              </Button>
              <Button
                color="secondary"
                onClick={() => setToggleDelete(!toggleDelete)}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          {!updatedPhoto ? (
            <Fragment>
              {!isCurator ? (
                <FormText color="muted">
                  Los cambios estarán sujetos a aprobación
                </FormText>
              ) : null}

              <Button color="primary" onClick={() => handleMetadata()}>
                Guardar cambios
              </Button>
              <Button color="secondary" onClick={() => handleToggle()}>
                Cancelar
              </Button>
            </Fragment>
          ) : (
            <Button color="secondary" onClick={() => handleToggle()}>
              Cerrar
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  photoDetails: state.photos.details,
  tags: state.metadata.all_tags,
  creating: state.metadata.creating,
  newTagsId: state.metadata.newTagsId,
  updatedPhoto: state.photos.updatedPhoto,
});

const mapActionsToProps = (dispatch) => ({
  getPhotoDetails: (id) => dispatch(gallery.photos.getPhoto(id)),
  getTags: () => dispatch(metadata.tags()),
  createMultipleMetas: (list) => dispatch(metadata.createMultipleMetas(list)),
});

export default connect(mapStateToProps, mapActionsToProps)(EditPhotosModal);
