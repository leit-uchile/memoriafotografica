import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Input,
  Form,
  Col,
} from "reactstrap";
import moment from "moment";

const EditCommentModal = ({ report, isOpen, handleToggle, editComment }) => {
  const [comment, setComment] = useState("");

  useEffect(() => {
    let info = { ...report.content_id, "upload_date": moment(Date(Date.now()))};
    setComment(info);
  }, [report, isOpen]);

  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => handleToggle()} size={"lg"}>
        <ModalHeader toggle={() => handleToggle()}>
          Editar comentario
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="content" sm={3}>{" "} Comentario</Label>
              <Col sm={9}>
              <Input
                type="textarea"
                placeholder="Nuevo comentario"
                name="content"
                value={comment.content}
                onChange={(e) => setComment({...comment, [e.target.name]: e.target.value })}
              />
              
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          {!false ? (
            <Fragment>
              <Button color="primary" onClick={() => editComment(comment)}>
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

export default EditCommentModal;
