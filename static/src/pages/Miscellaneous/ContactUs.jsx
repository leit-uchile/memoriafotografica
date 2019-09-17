import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faAddressCard, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from "reactstrap";

const ContactUs = () => {
  return(
    <Container>
        <Row>
          <Col style={styles.title}>
            <h2>Contáctenos</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form style={{width:'60.8em', backgroundColor: '#f7f7f7', padding:'2em', border:'1px solid rgb(210,214,218)'}}>
              <div style={styles.formTitle}>
                <FontAwesomeIcon icon={faAddressCard } style={{marginRight: '1em'}} />
                <Label>Identificación de contacto</Label>
              </div>
              <FormGroup row>
                <Col>
                  <Input type='text' style={{marginBottom:'0.5em'}} placeholder='Nombre' required/>
                  <Input type='text' style={{marginBottom:'0.5em'}} placeholder='Teléfono' required/>
                </Col>
                <Col>
                  <Input type='text' style={{marginBottom:'0.5em'}} placeholder='Apellidos' required/>
                  <Input type='email' style={{marginBottom:'0.5em'}} placeholder='Correo' required/>
                </Col>
              </FormGroup>
              <FormGroup>
                <div style={styles.formTitle}>
                <FontAwesomeIcon icon={faBook} style={{marginRight: '1em'}}/>
                <Label>Motivo</Label>
                </div>
                <Input type='textarea' placeholder="Mensaje" required/>
              </FormGroup>
              <Button>Enviar</Button>
            </Form>
          </Col>
        </Row>
        <Row style={{marginTop:'3em'}}>
          <Col xs="5">
            <Map 
            source={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d832.1722723612256!2d-70.66411451184945!3d-33.457405879914106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI3JzI2LjciUyA3MMKwMzknNDguOCJX!5e0!3m2!1ses!2sus!4v1568426455672!5m2!1ses!2sus"}
            />
          </Col>
          <Col xs="3">
            <p>Para más información puede visitarnos en la Facultad de Ciencias Físicas y Matemáticas, Universidad de Chile
              Beauchef 850, Santiago</p>
            <div style={{display:'block', backgroundColor: '#f7f7f7', textAlign:'center', padding:'0.2em'}}>
              <FontAwesomeIcon icon={faPhoneAlt} style={{marginRight:'0.2em'}}/>
              Biblioteca Central  
              +56 22 978 4074
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

const Map = ({ source }) => {
  if (!source) {
    return <div style={{width:"460px", height:"300px", border:'1px solid black'}}>No se ha podido cargar el mapa</div>;
  }
  const src = source;     
  return (
    <div>
      <iframe src={src} style={{width:"460px", height:"300px", border:"0", allowFullScreen:""}}></iframe>
    </div>
  );
};

const styles = {
  title:{
    color:'#ff5a60',
    display:'flex',
    margin:'1em 25% 1em'
  },
  formTitle: {
    fontSize:'14px',
    fontWeight:'bold',
    padding:'0.5em',
    borderBottom: '1px solid rgb(210,214,218)',
    marginBottom: '10px',
  },
}
export default ContactUs;
