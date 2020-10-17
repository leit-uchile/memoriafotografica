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
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { bindActionCreators } from "redux";
import { selectPhotosDetails,
         selectPhotosUpdatedPhoto,
         selectMetaDataAllTags,
         selectMetaDataCreating,
         selectMetaDataNewIds,} from "../../../reducers";

const CC_INFO = [
  { name: "CC BY", text: "Atribución" },
  { name: "CC BY-SA", text: "Atribución, Compartir Igual" },
  { name: "CC BY-ND", text: "Atribución, Sin Derivadas" },
  { name: "CC BY-NC", text: "Atribución, No Comercial" },
  { name: "CC BY-NC-SA", text: "Atribución, No Comercial, Compartir Igual" },
  { name: "CC BY-NC-ND", text: "Atribución, No Comercial, Sin Derivadas" },
];

const EditPhotosModal = ({
  getTags,
  newIds,
  onLoad,
  photosID,
  photoInfo,
  isOpen,
  createMultipleMetas,
  editPhoto,
  deletePhoto,
  tags,
  updatedPhoto,
}) => {
  const [toggle, setToggle] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [formData, setData] = useState({}); //nuevos datos

  useEffect(() => {
    getTags(); //suggestions, TODO: llamar cuando el usuario ingresa nuevo tag
  }, [newIds, getTags]);

  useEffect(() => {
    if (photosID.length === 1) {
      onLoad(photosID); //photoInfo
    }
  }, [photosID]);

  useEffect(() => {
    if (photosID.length === 1) {
      let info = { ...photoInfo };
      info.metadata =
        photoInfo.metadata !== undefined
          ? photoInfo.metadata.map((e) => ({ id: e.id, name: e.value }))
          : [];
      info.permission =
        photoInfo.permission !== undefined ? info.permission.toString() : null;
      delete info.image;
      delete info.thumbnail;
      setData(info);
    } else {
      setData({ metadata: [] });
    }
  }, [photoInfo, photosID, toggle]);

  const updateData = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  const updateDate = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value + "T00:00" });

  const additionTag = (tag) => {
    const tags = [].concat(formData.metadata, tag);
    setData({ ...formData, metadata: tags });
  };

  const deleteTag = (i) => {
    const tags = formData.metadata.slice(0);
    tags.splice(i, 1);
    setData({ ...formData, metadata: tags });
  };

  const handleToggle = () => {
    setToggle(!toggle);
    isOpen(!toggle); //permite el refresh una vez cerrado
  };

  const handleMetadata = () => {
    let to_send = { ...formData };
    if (photosID.length > 1 && to_send.metadata.length === 0) {
      //si hay más de una foto y no quiere cambiarle los tags
      delete to_send.metadata; //mantenemos los tags individuales
      update(to_send);
    } else {
      //vemos si es necesario crear alguno
      let newTags = to_send.metadata.filter((el) => el.id === undefined);
      if (newTags.length == 0) {
        to_send.metadata = to_send.metadata.map((el) => el.id);
        update(to_send);
      } else {
        let toCreate = newTags.map((el) => el.name); //names
        createMultipleMetas(toCreate); //->props.newIds
      }
    }
  };

  //Une los nuevos tags tras crear una id para ellos
  useEffect(() => {
    let to_send = { ...formData };
    if (to_send.metadata) {
      //Hay metadata
      //Si se crearon los nuevos
      if (
        to_send.metadata.filter((el) => el.id === undefined).length ===
        newIds.length
      ) {
        let newTags = Object.values(newIds).map((el) => el.id); //ids nuevas
        let oldTags = to_send.metadata
          .filter((el) => el.id !== undefined)
          .map((el) => el.id); //ids ya creadas
        to_send.metadata = oldTags.concat(newTags);
        update(to_send);
      } else {
        console.log("Aun no se crean ids para nuevos tags");
      }
    }
  }, [newIds]);

  const update = (to_send) => {
    photosID.forEach((el, index) => {
      let updatedPhoto =
        photosID.length > 1 && to_send.title !== undefined //si está editando el título de varias
          ? {
              ...to_send,
              title: `${to_send.title} (${index + 1})`,
            }
          : { ...to_send };
      // Dont send user nor categories
      delete updatedPhoto.category;
      delete updatedPhoto.user;
      editPhoto(el, updatedPhoto);
    });
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
        </FormGroup>
      </Form>
    </Fragment>
  );
  return (
    <div>
      <Button
        disabled={photosID.length === 0}
        color="primary"
        onClick={() => handleToggle()}
      >
        Editar selección ({photosID.length})
      </Button>
      <Modal isOpen={toggle} toggle={() => handleToggle()} size={"lg"}>
        <ModalHeader toggle={handleToggle}>
          {photosID.length === 1
            ? "Editando 1 foto"
            : `Editando ${photosID.length} fotos`}
        </ModalHeader>
        <ModalBody>
          {PhotosForm}
          <Modal
            isOpen={toggleDelete}
            toggle={() => setToggleDelete(!toggleDelete)}
          >
            <ModalHeader toggle={handleToggle}>
              Eliminar fotografía(s)
            </ModalHeader>
            <ModalBody>
              Esta acción no se puede deshacer. ¿Está seguro?
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={() => {
                  onDelete(photosID);
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
              <FormText color="muted">
                Los cambios estarán sujetos a aprobación
              </FormText>
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
  photoInfo: selectPhotosDetails(state),
  tags: selectMetaDataAllTags(state),
  creating: selectMetaDataCreating(state),
  newIds: selectMetaDataNewIds(state),
  updatedPhoto: selectPhotosUpdatedPhoto(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      onLoad: gallery.photos.getPhoto,
      getTags: metadata.tags,
      editPhoto: gallery.photos.editPhoto,
      deletePhoto: gallery.photos.deletePhoto,
      createMultipleMetas: metadata.createMultipleMetas,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(EditPhotosModal);
