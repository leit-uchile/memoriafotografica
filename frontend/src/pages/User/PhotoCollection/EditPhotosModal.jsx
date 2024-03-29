import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
  Row,
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
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { bindActionCreators } from "redux";
import {
  selectPhotosDetails,
  selectMetaDataAllTags,
  selectMetaDataCreating,
  selectMetaDataNewIds,
  selectPhotosItemStatus,
} from "../../../reducers";
import { LeitSpinner } from "../../../components";

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
  itemStatus,
  updating,
}) => {
  const [toggleDelete, setToggleDelete] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setData] = useState({}); //new values

  useEffect(() => {
    if (isOpen) {
      getTags();
    }
    // eslint-disable-next-line
  }, [newTagsId]);

  useEffect(() => {
    setSuggestions(tags.map((e) => ({ id: e.id, name: e.value })));
    // eslint-disable-next-line
  }, [tags]);

  useEffect(() => {
    if (isOpen) {
      getPhotoDetails(photosId[0]);
    }
    // eslint-disable-next-line
  }, [isOpen, photosId]);

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
      delete info.comments;
      delete info.report;
      delete info.category;
      delete info.image;
      delete info.thumbnail;
      setData(info);
    } else {
      setData({ metadata: [] });
    }
  }, [photoDetails, photosId]);
  // photoDetails: when new info from another photoId has been requested
  // photosId: when there are 2+ photos it's necessary setData empty

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
      // There is one photo or there are metadata to push
      let newTags = newDetails.metadata.filter((el) => el.id === undefined); // New metadata unregistered
      if (newTags.length === 0) {
        newDetails.metadata = newDetails.metadata.map((el) => el.id);
        updatePhotoDetails(newDetails);
      } else {
        let toCreate = newTags.map((el) => el.name);
        createMultipleMetas(toCreate);
      }
    }
  };

  // It creates an array with registered metadata
  useEffect(() => {
    let newDetails = { ...formData };
    if (newDetails.metadata) {
      if (
        newDetails.metadata.filter((el) => el.id === undefined).length ===
        newTagsId.length
      ) {
        let oldTags = newDetails.metadata
          .filter((el) => el.id !== undefined)
          .map((el) => el.id);
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
  };

  const onDelete = (ids) => {
    ids.forEach((id) => deletePhoto(id));
  };

  const DeleteModal = (
    <Fragment>
      <Modal
        isOpen={toggleDelete}
        toggle={() => setToggleDelete(!toggleDelete)}
      >
        <ModalHeader toggle={() => setToggleDelete(!toggleDelete)}>
          Eliminar fotografía(s)
        </ModalHeader>
        <ModalBody>Esta acción no se puede deshacer. ¿Está seguro?</ModalBody>
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
    </Fragment>
  );

  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => handleToggle()} size={"lg"}>
        <ModalHeader toggle={() => handleToggle()}>
          Editando {photosId.length} foto(s)
        </ModalHeader>
        <ModalBody>
          {itemStatus === "idle" || updating === "success" ? (
            <span></span>
          ) : itemStatus === "loading" || updating === "loading" ? (
            <Row>
              <Col style={{ textAlign: "center" }}>
                <LeitSpinner />
              </Col>
            </Row>
          ) : itemStatus === "success" ? (
            <Form>
              {!isCurator ? (
                <FormGroup row>
                  <Label for="delete" sm={3}>
                    Eliminar{" "}
                  </Label>
                  <Col sm={9}>
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
                </FormGroup>
              ) : null}
              <FormGroup row>
                <Label for="title" sm={3}>
                  Título{" "}
                </Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    value={formData.title}
                    placeholder="Nuevo título de la(s) fotografía(s)"
                    name="title"
                    onChange={updateData}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="description" sm={3}>
                  Descripción{" "}
                </Label>
                <Col sm={9}>
                  <Input
                    type="textarea"
                    value={formData.description}
                    placeholder="Nueva descripción de la(s) fotografía(s)"
                    name="description"
                    onChange={updateData}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="date" sm={3}>
                  Fecha de captura{" "}
                </Label>
                <Col sm={9}>
                  <Input
                    type="date"
                    value={`${formData.upload_date}`.slice(0, 10)}
                    name="upload_date"
                    onChange={updateDate}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="tags" sm={3}>
                  Etiquetas{" "}
                </Label>
                <Col sm={9}>
                  <ReactTags
                    style={{ width: "auto" }}
                    placeholder={"Añadir etiquetas"}
                    autoresize={false}
                    allowNew={!isCurator}
                    tags={formData.metadata}
                    suggestions={suggestions}
                    handleDelete={deleteTag}
                    handleAddition={additionTag}
                  />
                  {!isCurator ? (
                    <FormText color="muted">
                      Para ingresar una nueva etiqueta debe presionar la tecla
                      "Entrar" o "Tabulación"
                    </FormText>
                  ) : null}
                </Col>
              </FormGroup>
              {!isCurator ? (
                <FormGroup row>
                  <Label for="permission" sm={3}>
                    Permisos de acceso e intercambio{" "}
                  </Label>
                  <Col sm={9}>
                    <UncontrolledButtonDropdown>
                      <DropdownToggle
                        caret
                        color="link"
                        style={{ padding: "0" }}
                      >
                        {formData.permission
                          ? formData.permission
                          : "Seleccionar"}
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
                </FormGroup>
              ) : null}
            </Form>
          ) : (
            <p>Ha ocurrido un error</p>
          )}
          {DeleteModal}
        </ModalBody>
        <ModalFooter>
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
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  itemStatus: selectPhotosItemStatus(state),
  photoDetails: selectPhotosDetails(state),
  tags: selectMetaDataAllTags(state),
  creating: selectMetaDataCreating(state),
  newTagsId: selectMetaDataNewIds(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      getPhotoDetails: gallery.photos.getPhoto,
      getTags: metadata.tags,
      createMultipleMetas: metadata.createMultipleMetas,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(EditPhotosModal);
