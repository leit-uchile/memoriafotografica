import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { metadata, gallery } from "../../../actions";
import ReactTags from "react-tag-autocomplete";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  FormText,
} from "reactstrap";
import Spinner from "reactstrap/lib/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { LeitSpinner } from "../../../components/index";
import { bindActionCreators } from "redux";
import {
  selectPhotosDetails,
  selectMetaDataAllTags,
  selectMetaDataCreating,
  selectMetaDataNewIds,
  selectPhotosOpsCompleted,
  selectPhotosOpsErrors,
} from "../../../reducers";

const FilterModal = ({
  className,
  photoId,
  photoDetails,
  getPhotoDetails,
  setOps,
  editPhoto,
  tags,
  getTags,
  createMultipleMetas,
  newTagsId,
  completed,
  errors,
}) => {
  const [modal, setModal] = useState(false);
  const [newphoto, setNewphoto] = useState({});
  const [sending, setSending] = useState(false);

  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      getPhotoDetails(photoId);
      getTags(); //get tags from backend
      setOps(1); //required for change updatedPhoto status and reload Filter
    }
  };

  useEffect(() => {
    let info = { ...photoDetails };
    info.metadata =
      photoDetails.metadata !== undefined
        ? photoDetails.metadata.map((e) => ({
            id: e.id,
            name: e.value,
          }))
        : [];
    delete info.permission;
    delete info.comments;
    delete info.report;
    delete info.category;
    setNewphoto(info);
  }, [photoDetails]);

  const handleCheckboxChange = (event) => {
    const target = event.target;
    const value = target.checked;
    let editedPhoto = { ...newphoto };
    editedPhoto[target.name] = value;
    setNewphoto(editedPhoto);
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    let editedPhoto = { ...newphoto };
    editedPhoto[target.name] = value;
    setNewphoto(editedPhoto);
  };
  const updateDate = (e) =>
    setNewphoto({ ...newphoto, [e.target.name]: e.target.value + "T00:00" });

  const handleMetadata = () => {
    let newDetails = { ...newphoto };

    let newTags = newDetails.metadata.filter((el) => el.id === undefined); // New metadata unregistered
    if (newTags.length === 0) {
      newDetails.metadata = newDetails.metadata.map((el) => el.id);
      saveChanges(newDetails);
    } else {
      let toCreate = newTags.map((el) => el.name);
      createMultipleMetas(toCreate);
    }
  };

  // It create array with registered metadata
  useEffect(() => {
    let newDetails = { ...newphoto };
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
        saveChanges(newDetails);
      } else {
        console.log("Waiting for new tags ID");
      }
    }
    // eslint-disable-next-line
  }, [newTagsId]);

  const saveChanges = (to_send) => {
    delete to_send.image;
    delete to_send.thumbnail;
    setSending(true);
    editPhoto(to_send.id, to_send);
  };

  useEffect(() => {
    if (errors.length === 0 && sending) {
      setSending(false);
      toggle();
    }
    // eslint-disable-next-line
  }, [completed, errors]);

  const additionTag = (tag) => {
    const tagsList = [].concat(newphoto.metadata, tag);
    setNewphoto({ ...newphoto, metadata: tagsList });
  };

  const deleteTag = (i) => {
    const tagsList = newphoto.metadata.slice(0);
    tagsList.splice(i, 1);
    setNewphoto({ ...newphoto, metadata: tagsList });
  };

  const suggestions = tags
    ? tags.map((e) => ({ id: e.id, name: e.value }))
    : [];

  return (
    <div>
      <Button className="actions" onClick={toggle}>
        <FontAwesomeIcon icon={faPencilAlt} />
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          Curando fotografía:{" "}
          {photoDetails && !sending ? photoDetails.title : ""}{" "}
        </ModalHeader>
        <ModalBody>
          {photoDetails ? (
            <Form>
              <Row style={{ margin: "4px 0px" }}>
                <Col>
                  <img src={newphoto.image} width="100%" alt="Photo" />
                </Col>
              </Row>
              <FormGroup>
                <FormText>Visibilidad de la foto</FormText>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <FormGroup check className="center">
                    <input
                      type="checkbox"
                      name="approved"
                      checked={newphoto.approved}
                      onChange={handleCheckboxChange}
                      id="approved"
                      class="toggle-button"
                    />
                    <label for="approved">Aprobada</label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup check>
                    <input
                      type="checkbox"
                      name="censure"
                      checked={newphoto.censure}
                      onChange={handleCheckboxChange}
                      id="censured"
                      class="toggle-button"
                    />
                    <label for="censured">Censurada</label>
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup>
                <FormText>Editar información de la foto</FormText>
              </FormGroup>
              <FormGroup row>
                <Label for="title" sm={3}>
                  Título{" "}
                </Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    name="title"
                    value={newphoto.title}
                    onChange={handleChange}
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
                    name="description"
                    value={newphoto.description}
                    onChange={handleChange}
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
                    value={`${newphoto.upload_date}`.slice(0, 10)}
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
                    allowNew={true}
                    tags={newphoto.metadata}
                    suggestions={suggestions}
                    handleDelete={deleteTag}
                    handleAddition={additionTag}
                  />
                  <FormText color="muted">
                    Para ingresar una nueva etiqueta debe presionar la tecla
                    "Entrar" o "Tabulación"
                  </FormText>
                </Col>
              </FormGroup>
            </Form>
          ) : (
            <LeitSpinner />
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleMetadata}>
            {sending ? (
              <Spinner style={{ width: "1rem", height: "1rem" }} />
            ) : (
              ""
            )}{" "}
            Guardar cambios
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  photoDetails: selectPhotosDetails(state),
  tags: selectMetaDataAllTags(state),
  creating: selectMetaDataCreating(state),
  newTagsId: selectMetaDataNewIds(state),
  completed: selectPhotosOpsCompleted(state),
  errors: selectPhotosOpsErrors(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      getPhotoDetails: gallery.photos.getPhoto,
      getTags: metadata.tags,
      setOps: gallery.photos.setNBOps,
      createMultipleMetas: metadata.createMultipleMetas,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(FilterModal);
