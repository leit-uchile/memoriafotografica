import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
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
} from "reactstrap";

const EditCommentModal = ({
  comment,
  isOpen,
  handleToggle,
  editComment
}) => {
  const [formData, setData] = useState({...comment}); //nuevos datos

  const updateData = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => handleToggle()} size={"lg"}>
        <ModalHeader toggle={() => handleToggle()}>
          Editar comentario
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Comentario</Label>
              <Input
                type="textarea"
                value={formData.content}
                placeholder="Nuevo comentario"
                name="content"
                onChange={updateData}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          {!false ? (
            <Fragment>
              <Button color="primary" onClick={()=> editComment(formData)}>
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

export default (EditCommentModal);
