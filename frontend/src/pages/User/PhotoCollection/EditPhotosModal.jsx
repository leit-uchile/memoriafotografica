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
import { photoDetails, home } from "../../../actions";
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
  const [sent, setSent] = useState(false);
  const [formData, setData] = useState(
    {
      title: "",
      description: "",
      created_at: "",
      tags: [],
      permission: ""
    });

  useEffect(() => {
    props.onLoad(props.photos); //photoDetails
    props.getTags(); //suggestions
  }, [props.photos]);

  const updateData = e =>
    setData({ ...formData, [e.target.name]: e.target.value });

  const deleteTag = i => {
    const tags = formData.tags.slice(0);
    tags.splice(i, 1);
    setData({ ...formData, tags });
  };

  const additionTag = tag => {
    const tags = [].concat(formData.tags, tag);
    setData({ ...formData, tags: tags });
  };

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
              name="created_at" 
              onChange={updateData} 
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
                <DropdownToggle caret color="link">
                {formData.permission === ""
                    ? "Seleccionar"
                    : formData.permission}
                </DropdownToggle>
                <DropdownMenu>
                  {CC_INFO.map((el, k) => (
                    <DropdownItem
                      name="permission"
                      value={el.name}
                      onClick={updateData}
                      active={`${photoInfo.permission}`===el.name}
                      style={{display:'block',width:'100%'}}
                    >
                      {el.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
                
              </UncontrolledButtonDropdown>
              <FormText color="muted">
                El elemento coloreado es el permiso actual
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
            : "Estado de la solicitud (Cambios guardados, Error, etc)"}
        </ModalBody>
        <ModalFooter>
          {!sent ? (
            <Fragment>
              <Button color="success">
                Guardar cambios
              </Button>
              <Button color="secondary" onClick={() => setToggle(!toggle)}>
                Cancelar
              </Button>
              <Button color="danger" onClick={() => setToggle(!toggle)}>
                Eliminar
              </Button>
            </Fragment>
          ) : (
            <Button color="secondary" onClick={() => setToggle(!toggle)}>
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
    tags: state.home.all_tags
  };
};

const mapActionsToProps = dispatch => ({
  onLoad: id => dispatch(photoDetails.getPhoto(id)),
  getTags: () => dispatch(home.tags())
});

export default connect(mapStateToProps, mapActionsToProps)(EditPhotosModal);
