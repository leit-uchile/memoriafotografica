import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const ContactModal = ({ el}) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [formData, setData] = useState({
      emailTo: el.email,
      subject: "Hemos respondido su consulta",
      content: ''
  });

  const updateData = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  const send = () =>{
      setModal(!modal);
      
  }
  return (
    <div>
      <Button color="danger" onClick={toggle}>Responder</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Contacto</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Label>Para</Label>
                    <Input 
                        type="email" 
                        name="emailTo" 
                        value={formData.emailTo}
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
                    <Input type="textarea" name="content"/>
                </FormGroup>
            </Form>  
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>send()}>Enviar</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ContactModal;