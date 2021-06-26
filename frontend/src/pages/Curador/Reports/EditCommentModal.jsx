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
  Row,
  Col,
} from "reactstrap";
import { LeitSpinner } from "../../../components";
import moment from "moment";

const EditCommentModal = ({
  report,
  isOpen,
  handleToggle,
  editComment,
  updating,
}) => {
  const [comment, setComment] = useState("");

  useEffect(() => {
    let info = { ...report.content_id, upload_date: moment(Date(Date.now())) };
    setComment(info);
  }, [report, isOpen]);

  const onSend = () => {
    let newComment = { ...comment };
    editComment(newComment);
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => handleToggle()} size={"lg"}>
        <ModalHeader toggle={() => handleToggle()}>
          Editar comentario
        </ModalHeader>
        <ModalBody>
          {updating === "success" ? (
            <span></span>
          ) : updating === "loading" ? (
            <Row>
              <Col style={{ textAlign: "center" }}>
                <LeitSpinner />
              </Col>
            </Row>
          ) : (
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
                      setComment({
                        ...comment,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </Col>
              </FormGroup>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => onSend()}>
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
