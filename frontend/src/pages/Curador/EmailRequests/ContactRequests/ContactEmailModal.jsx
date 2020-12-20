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
  Spinner,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const ContactModal = ({ className, message, send }) => {
  const [modal, setModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setData] = useState({
    subject: "Hemos respondido su consulta",
    reply: "",
  });

  const toggle = () => setModal(!modal);

  const updateData = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  const onSend = () => {
    let msgUpdate = { ...message };
    msgUpdate.resolved = true;
    msgUpdate.email_sent = true;
    setSending(true);
    send(msgUpdate, formData).then((r) => {
      setSending(false);
      setModal(!modal);
    });
  };

  return (
    <div>
      <Button className="actions" onClick={toggle}>
        <FontAwesomeIcon icon={faEnvelope} />
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Contacto</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Para</Label>
              <Input
                type="email"
                name="emailTo"
                value={message.email}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label>Asunto</Label>
              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={updateData}
              />
            </FormGroup>
            <FormGroup>
              <Label>Respuesta</Label>
              <Input
                type="textarea"
                name="reply"
                value={formData.reply}
                onChange={updateData}
              />
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
            Enviar
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ContactModal;
