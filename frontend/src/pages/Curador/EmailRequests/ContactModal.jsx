import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const ContactModal = (props) => {
  const { buttonLabel, className, message, send } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [formData, setData] = useState({
      subject: "Hemos respondido su consulta",
      content: ''
  });

  const updateData = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  const onSend = () =>{
      send(message, formData);
      setModal(!modal);  
  }
  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
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
                    name="content"
                    value={formData.content}
                    onChange={updateData}/>
                </FormGroup>
            </Form>  
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>onSend()}>Enviar</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ContactModal;