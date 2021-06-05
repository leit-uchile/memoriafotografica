import React, { useEffect, useState } from "react";
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
  Spinner,
} from "reactstrap";
import moment from "moment";

const EditCommentModal = ({ report, isOpen, handleToggle, editComment }) => {
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let info = { ...report.content_id, upload_date: moment(Date(Date.now())) };
    setComment(info);
  }, [report, isOpen]);

  const onSend = () => {
    let newComment = { ...comment };
    setSending(true);
    editComment(newComment).then((r) => {
      setSending(false);
      handleToggle();
    });
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => handleToggle()} size={"lg"}>
        <ModalHeader toggle={() => handleToggle()}>
          Editar comentario
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="content" sm={3}>
                {" "}
                Comentario
              </Label>
              <Col sm={9}>
                <Input
                  type="textarea"
                  placeholder="Nuevo comentario"
                  name="content"
                  value={comment.content}
                  onChange={(e) =>
                    setComment({ ...comment, [e.target.name]: e.target.value })
                  }
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => onSend()}>
            {sending ? (
              <Spinner style={{ width: "1rem", height: "1rem" }} />
            ) : (
              ""
            )}{" "}
            Guardar cambios
          </Button>
          <Button color="secondary" onClick={() => handleToggle()}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditCommentModal;
