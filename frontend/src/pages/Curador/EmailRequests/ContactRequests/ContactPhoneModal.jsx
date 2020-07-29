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
} from "reactstrap";

const ContactPhoneModal = (props) => {
  const { buttonLabel, className, message, send } = props;
  const [modal, setModal] = useState(false);
  const [contacted, setContacted] = useState(false);
  const toggle = () => setModal(!modal);
  const formData = {
    subject: "Hemos respondido su consulta",
    reply:
      "Buen día, este es un mensaje automático confirmando que lo hemos contactado telefónicamente",
  };

  const onSend = () => {
    send(message, formData, false);
    setModal(!modal);
  };
  return (
    <div>
      <Button color="danger" onClick={toggle} disabled={message.resolved}>
        {buttonLabel}
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
            Actualizar
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ContactPhoneModal;
