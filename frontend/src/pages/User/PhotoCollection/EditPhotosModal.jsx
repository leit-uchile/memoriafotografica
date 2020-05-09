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
  ButtonGroup,
} from "reactstrap";
import { metadata, gallery } from "../../../actions";
import ReactTags from "react-tag-autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

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
  const [loading, setLoading] = useState(false);
  const [formData, setData] = useState({}); //nuevos datos

  useEffect(() => {
    props.getTags(); //suggestions, TODO: llamar cuando el usuario ingresa nuevo tag
  }, []);

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
      setData(info);
    } else {
      setData({ metadata: [] });
    }
  }, [props.photoInfo, props.photosID]);

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

  const handleOnClose = () => {
    setToggle(!toggle);
    setLoading(false);
  };

  const onSend = () => {
    let to_send = { ...formData };
    if (props.photosID.length > 1 && to_send.metadata.length === 0) {
      //si hay más de una foto y no quiere cambiarle los tags
      delete to_send.metadata; //mantenemos los tags individuales
    } else {
      // let newTags = formData.metadata.filter(el => el.id === undefined).map(el => el.name);
      // if (newTags.length>0){
      //   props.createMultipleMetas(Object.values(newTags)).then(response => {
      //     console.log(response)
      //   })
      // }else{

      // }
      to_send.metadata = to_send.metadata.map((el) => el.id); // problema con nuevosTags (el.id undefined)
    }
    delete to_send.image;
    delete to_send.thumbnail;
    props.photosID.forEach((el, index) => {
      props.photosID.length > 1 && to_send.title !== undefined //si está editando el título de varias
        ? props.editPhoto(el, {
            ...to_send,
            title: `${to_send.title} (${index + 1})`,
          })
        : props.editPhoto(el, to_send);
    });
    setLoading(true);
  };

  const onDelete = (ids) => {
    ids.forEach((id) => props.deletePhoto(id));
    setLoading(true);
  };

  const { tags } = props;
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
                placeholder="Nuevo título de las fotografías"
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
                placeholder="Nueva descripción de las fotografías"
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
                  color: "var(--leit-pink)",
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
        color="success"
        onClick={() => setToggle(!toggle)}
      >
        Editar selección ({props.photosID.length})
      </Button>
      <Modal
        isOpen={toggle}
        toggle={() => setToggle(!toggle)}
        size={"lg"}
        className="user-modal"
        centered
      >
        <ModalHeader>
          {props.photosID.length === 1 ? (
            <h4 style={{ fontWeight: "bold" }}>Editando 1 foto</h4>
          ) : (
            <h4 style={{ fontWeight: "bold" }}>
              Editando {props.photosID.length} fotos
            </h4>
          )}
        </ModalHeader>
        <ModalBody>
          {!loading
            ? PhotosForm
            : "Estado de la solicitud (Cambios guardados, Error, etc)"}
          <Modal
            isOpen={toggleDelete}
            toggle={() => setToggleDelete(!toggleDelete)}
            centered
          >
            <ModalHeader>Eliminar fotografía(s)</ModalHeader>
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
                Sí, eliminar
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
          {!loading ? (
            <Fragment>
              <FormText color="muted">
                Los cambios estarán sujetos a aprobación
              </FormText>
              <ButtonGroup>
                <Button color="secondary" onClick={() => handleOnClose()}>
                  Cancelar
                </Button>
                <Button color="success" onClick={() => onSend()}>
                  Guardar cambios
                </Button>
              </ButtonGroup>
            </Fragment>
          ) : (
            <Button color="secondary" onClick={() => handleOnClose()}>
              Cerrar
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    photoInfo: state.photos.details,
    tags: state.webadmin.all_tags,
  };
};

const mapActionsToProps = (dispatch) => ({
  onLoad: (id) => dispatch(gallery.photos.getPhoto(id)),
  getTags: () => dispatch(metadata.tags()),
  editPhoto: (pID, val) => dispatch(gallery.photos.editPhoto(pID, val)),
  deletePhoto: (pID) => dispatch(gallery.photos.deletePhoto(pID)),
  createMultipleMetas: (name) => dispatch(metadata.createMultipleMetas(name)),
});

export default connect(mapStateToProps, mapActionsToProps)(EditPhotosModal);
