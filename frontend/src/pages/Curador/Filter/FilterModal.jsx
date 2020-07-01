import React, { useState } from "react";
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
  FormText,
} from "reactstrap";

const FilterModal = (props) => {
  const { buttonLabel, className, photo, editPhoto } = props;

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newphoto, setNewphoto] = useState({ ...photo });
  const toggle = () => {
    setNewphoto(photo);
    setLoading(false);
    setModal(!modal);
  };

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

  const saveChanges = () => {
    setLoading(!loading);
    //Enviar Data a backend;
    let to_send = { ...newphoto };
    delete to_send.image;
    delete to_send.thumbnail;
    delete to_send.permission;
    // TODO: FIX IT!
    delete to_send.metadata;
    editPhoto(to_send.id, to_send).then((response) => {
      setLoading(!loading);
      window.location.reload();
    });
  };

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          Curando fotografía: {photo.title}{" "}
        </ModalHeader>
        <ModalBody>
          <Form>
            <img src={photo.image} width="100%" alt="fotografia a editar" />
            <FormText>Visibilidad de la foto</FormText>
            <Row form>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="approved"
                    checked={newphoto.approved}
                    onChange={handleCheckboxChange}
                  />{" "}
                  Foto Aprobada
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="censure"
                    checked={newphoto.censure}
                    onChange={handleCheckboxChange}
                  />{" "}
                  Foto Censurada
                </Label>
              </FormGroup>
            </Row>
            <FormText>Información de la foto</FormText>
            <FormGroup>
              <Label>Editar Título</Label>
              <Input
                type="text"
                name="title"
                value={newphoto.title}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Editar Descripción</Label>
              <Input
                type="textarea"
                name="description"
                value={newphoto.description}
                onChange={handleChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveChanges}>
            {!loading ? "Guardar Cambios" : "enviando..."}
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default FilterModal;
