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
import "./userphotos.css";

const CC_INFO = [
  { name: "CC BY", text: "Atribución" },
  { name: "CC BY-SA", text: "Atribución, Compartir Igual" },
  { name: "CC BY-ND", text: "Atribución, Sin Derivadas" },
  { name: "CC BY-NC", text: "Atribución, No Comercial" },
  { name: "CC BY-NC-SA", text: "Atribución, No Comercial, Compartir Igual" },
  { name: "CC BY-NC-ND", text: "Atribución, No Comercial, Sin Derivadas" },
];

const EditPhotosModal = (props) => {
  const [toggle, setToggle] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [formData, setData] = useState({}); //nuevos datos
  const [sending, setSending] = useState(false);

  useEffect(() => {
    props.getTags(); //suggestions, TODO: llamar cuando el usuario ingresa nuevo tag
  }, [props.newIds]);

  useEffect(() => {
    if (props.photosID.length === 1) {
      props.onLoad(props.photosID); //photoInfo
    }
  }, [props.photosID]);

  useEffect(() => {
    if (props.photosID.length === 1) {
      let info = { ...props.photoInfo };
      info.metadata =
        props.photoInfo.metadata !== undefined
          ? props.photoInfo.metadata.map((e) => ({ id: e.id, name: e.value }))
          : [];
      info.permission =
        props.photoInfo.permission !== undefined
          ? info.permission.toString()
          : null;
      delete info.image;
      delete info.thumbnail;
      setData(info);
    } else {
      setData({ metadata: [] });
    }
  }, [props.photoInfo, props.photosID, toggle]);

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
    props.isOpen(!toggle); //permite el refresh una vez cerrado
  };

  const handleMetadata = () => {
    let to_send = { ...formData };
    if (props.photosID.length > 1 && to_send.metadata.length === 0) {
      //si hay más de una foto y no quiere cambiarle los tags
      delete to_send.metadata; //mantenemos los tags individuales
      update(to_send);
    } else {
      //vemos si es necesario crear alguno
      let newTags = to_send.metadata.filter((el) => el.id === undefined);
      if (newTags.length == 0) {
        console.log("No es necesario crearle id");
        to_send.metadata = to_send.metadata.map(el=>el.id);
        update(to_send);
      } else {
        console.log("Es necesario crearle id");
        let toCreate = newTags.map((el) => el.name); //names
        props.createMultipleMetas(toCreate); //->props.newIds
      }
    }
  };

  //Une los nuevos tags tras crear una id para ellos
  useEffect(() => {
    console.log("verificando creacion de nuevos tags");
    let to_send = { ...formData };
    if (to_send.metadata) {
      //Hay metadata
      //Si se crearon los nuevos
      if (
        to_send.metadata.filter((el) => el.id === undefined).length ===
        props.newIds.length
      ) {
        let newTags = Object.values(props.newIds).map((el) => el.id); //ids nuevas
        console.log("Nuevas IDS", newTags);
        let oldTags = to_send.metadata
          .filter((el) => el.id !== undefined)
          .map((el) => el.id); //ids ya creadas
        console.log("Viejas IDS", oldTags);
        to_send.metadata = oldTags.concat(newTags);
        console.log("Por guardar", to_send.metadata);
        //setSending(true);
        update(to_send);
      } else {
        console.log("Aun no se crean ids para nuevos tags");
      }
    }
  }, [props.newIds]);

  const update = (to_send) => {
    props.photosID.forEach((el, index) => {
      props.photosID.length > 1 && to_send.title !== undefined //si está editando el título de varias
        ? props.editPhoto(el, {
            ...to_send,
            title: `${to_send.title} (${index + 1})`,
          })
        : props.editPhoto(el, to_send);
    });
    handleToggle();
  };

  const onDelete = (ids) => {
    ids.forEach((id) => props.deletePhoto(id));
    handleToggle();
  };

  const { tags, updatedPhoto } = props;
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
        disabled={props.photosID.length === 0}
        color="primary"
        onClick={() => handleToggle()}
      >
        Editar selección ({props.photosID.length})
      </Button>
      <Modal
        isOpen={toggle}
        toggle={() => handleToggle()}
        size={"lg"}
      >
        <ModalHeader toggle={handleToggle}>
          {props.photosID.length === 1 ? (
            <h4 style={{ fontWeight: "bold" }}>Editando 1 foto</h4>
          ) : (
            <h4 style={{ fontWeight: "bold" }}>
              Editando {props.photosID.length} fotos
            </h4>
          )}
        </ModalHeader>
        <ModalBody>
          {PhotosForm}
          <Modal
            isOpen={toggleDelete}
            toggle={() => setToggleDelete(!toggleDelete)}
          >
            <ModalHeader toggle={handleToggle}>Eliminar fotografía(s)</ModalHeader>
            <ModalBody>
              Esta acción no se puede deshacer. ¿Está seguro?
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={() => {
                  onDelete(props.photosID);
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
  photoInfo: state.photos.details,
  tags: state.metadata.all_tags,
  creating: state.metadata.creating,
  newIds: state.metadata.newIds,
  updatedPhoto: state.photos.updatedPhoto,
});

const mapActionsToProps = (dispatch) => ({
  onLoad: (id) => dispatch(gallery.photos.getPhoto(id)),
  getTags: () => dispatch(metadata.tags()),
  editPhoto: (pID, val) => dispatch(gallery.photos.editPhoto(pID, val)),
  deletePhoto: (pID) => dispatch(gallery.photos.deletePhoto(pID)),
  createMultipleMetas: (list) => dispatch(metadata.createMultipleMetas(list)),
});

export default connect(mapStateToProps, mapActionsToProps)(EditPhotosModal);
