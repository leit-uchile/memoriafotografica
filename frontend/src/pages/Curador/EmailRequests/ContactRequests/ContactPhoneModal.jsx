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
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const ContactPhoneModal = ({ className, message, send }) => {
  const [modal, setModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [contacted, setContacted] = useState(false);
  const toggle = () => setModal(!modal);
  const formData = {
    subject: "Hemos respondido su consulta",
    reply:
      "Buen día, este es un mensaje automático confirmando que lo hemos contactado telefónicamente",
  };

  const onSend = () => {
    let msgUpdate = { ...message };
    msgUpdate.resolved = true;
    msgUpdate.email_sent = false;
    setSending(true);
    send(msgUpdate, formData).then((r) => {
      setSending(false);
      setModal(!modal);
    });
  };

  return (
    <div>
      <Button className="actions" onClick={toggle}>
        <FontAwesomeIcon icon={faPhone} />
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Contacto</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Número de teléfono</Label>
              <Input
                type="text"
                name="phone"
                value={message.phone_number}
                disabled
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="check"
                  checked={contacted}
                  onClick={() => setContacted(!contacted)}
                  required
                />{" "}
                Ha sido contactado por esta vía
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            disabled={!contacted}
            onClick={() => onSend()}
          >
            {sending ? (
              <Spinner style={{ width: "1rem", height: "1rem" }} />
            ) : (
              ""
            )}{" "}
            Actualizar
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ContactPhoneModal;
