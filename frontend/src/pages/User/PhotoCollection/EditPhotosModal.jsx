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
  FormText
} from "reactstrap";
import { photoDetails, home, curador } from "../../../actions";
import ReactTags from "react-tag-autocomplete";

const CC_INFO = [
  { name: "CC BY", text: "Atribución" },
  { name: "CC BY-SA", text: "Atribución, Compartir Igual" },
  { name: "CC BY-ND", text: "Atribución, Sin Derivadas" },
  { name: "CC BY-NC", text: "Atribución, No Comercial" },
  { name: "CC BY-NC-SA", text: "Atribución, No Comercial, Compartir Igual" },
  { name: "CC BY-NC-ND", text: "Atribución, No Comercial, Sin Derivadas" }
];

const EditPhotosModal = props => {
  const [toggle, setToggle] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setData] = useState({}); //nuevos datos

  useEffect(() => {
    props.onLoad(props.photos); //info de la fotografia
    props.getTags(); //suggestions
  }, [props.photos]);

  useEffect(() => {
    props.onLoad(props.photos); //se actualiza info tras guardarla
  }, [sent]);

  const updateData = e =>
    setData({ ...formData, [e.target.name]: e.target.value });
  
  const updateDate = e =>
    setData({ ...formData, [e.target.name]: e.target.value+'T00:00:00-03:00' });

  const additionTag = tag => {
    const tags = [].concat(formData.metadata, tag);
    setData({ ...formData, metadata: tags });
  };

  const deleteTag = i => {
    const tags = formData.metadata.slice(0);
    tags.splice(i, 1);
    setData({ ...formData, tags });
  };

  const handleOnClose = () => {
    setData({});
    setToggle(!toggle);
    setSent(false)
  }

  const onSend = () => {
    props.editPhoto(props.photos, formData)
    setSent(true)
  }

  const { photoInfo, tags } = props; 
  const metadata = photoInfo.metadata!==undefined ? photoInfo.metadata.map(e => ({ id: e.id, name: e.value, })) : [];
  const suggestions = tags ? tags.map(e => ({ id: e.id, name: e.value, })) : [];
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
                defaultValue={photoInfo.title}
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
                defaultValue={photoInfo.description}
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
              defaultValue={`${photoInfo.upload_date}`.slice(0,10)} 
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
                  tags={metadata}
                  suggestions={suggestions}
                  handleDelete={deleteTag}
                  handleAddition={additionTag}
              />
              <FormText color="muted">
                Para ingresar una nueva etiqueta debe presionar la tecla "Entrar" o "Tabulación" 
              </FormText>
            </Col>
          </Row>
          <Row style={{ marginBottom: "0.5em" }}>
            <Col>
              <Label>Permisos de acceso e intercambio</Label>
            </Col>
            <Col>
              <UncontrolledButtonDropdown>
                <DropdownToggle caret color="link" style={{padding:'0'}}>
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
                      active={`${formData.permission}`===el.name}
                      style={{display:'block',width:'100%'}}
                    >
                      {el.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
                
              </UncontrolledButtonDropdown>
              <FormText color="muted">
                El permiso actual es {photoInfo.permission}
              </FormText>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </Fragment>
  );

  return (
    <div>
      <Button
        disabled={props.photos.length === 0}
        color="success"
        onClick={() => setToggle(!toggle)}
      >
        Editar selección ({props.photos.length})
      </Button>
      <Modal isOpen={toggle} toggle={() => setToggle(!toggle)}>
        {props.photos.length === 1 ? (
          <ModalHeader>
            <h4 style={{ fontWeight: "bold" }}>Editando 1 foto</h4>
          </ModalHeader>
        ) : (
          <ModalHeader>
            <h4 style={{ fontWeight: "bold" }}>
              Editando {props.photos.length} fotos
            </h4>
          </ModalHeader>
        )}
        <ModalBody>
          {!sent
            ? PhotosForm
            : "Estado de la solicitud (Cambios guardados, Error, etc)"
          }
          <Modal isOpen={toggleDelete} toggle={()=>setToggleDelete(!toggleDelete)} centered>
            <ModalHeader>¿Está seguro de eliminar la fotografía?</ModalHeader>
            <ModalBody>Esta acción no se puede deshacer. Confirme su acción</ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={()=>setToggleDelete(!toggleDelete)}>Eliminar</Button>{' '}
              <Button color="secondary" onClick={()=>setToggleDelete(!toggleDelete)}>Cancelar</Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          {!sent ? (
            <Fragment>
              <Button color="success" onClick={()=>onSend()}>
                Guardar cambios
              </Button>
              <Button color="secondary" onClick={() => handleOnClose()}>
                Cancelar
              </Button>
              <Button color="danger" onClick={() => setToggleDelete(!toggleDelete)}>
                Eliminar
              </Button>
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

const mapStateToProps = state => {
  return {
    photoInfo: state.photoDetails.details,
    tags: state.home.all_tags,
  };
};

const mapActionsToProps = dispatch => ({
  onLoad: id => dispatch(photoDetails.getPhoto(id)),
  getTags: () => dispatch(home.tags()),
  editPhoto: (pID, val) =>
    dispatch(curador.editPhoto(pID, val))
});

export default connect(mapStateToProps, mapActionsToProps)(EditPhotosModal);
