import React, { useState, Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { misc } from "../actions";
import { connect } from "react-redux";
import { home } from "../actions";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faBook, faAddressCard } from "@fortawesome/free-solid-svg-icons";
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

class RequestPhoto extends Component{
  constructor(props){
    super(props);
    this.state = {
      requestedPhotos:{},
      subject:'',
      requester: {
        firstname:'',
        lastname:'',
        idcard:'',
        ocuppation:'',
        adress:'',
        state:'',
        phone:'',
        email:'',
        corporateName:'',
        corporateLegalEntity:'',
        corporateAdress:'',
        corporatePhone:''
      }
    };
  }

  
  onSubmit = e =>{
    e.preventDefault();
    this.sendRequest(this.state); //action
  }

  render() {

    return(
      <Container>
        <Row>
          <Col>
            <h2 style={styles.title}>Formulario para solicitud de material audiovisual</h2>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <Form style={styles.form}>
              <FormGroup>
                <div style={styles.formTitle}>
                  <FontAwesomeIcon icon={faImages} style={{marginRight: '1em'}}/>
                  <Label>Material solicitado</Label>
                </div>
                <Input type="select" multiple>{/*Listado obtenido de props*/}
                  <option>foto1</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <div style={styles.formTitle}>
                <FontAwesomeIcon icon={faBook} style={{marginRight: '1em'}}/>
                <Label>Finalidad de la reproducción</Label>
                </div>
                <Input type='textarea' placeholder="Especificación" required/>
              </FormGroup>

              <div style={styles.formTitle}>
                <FontAwesomeIcon icon={faAddressCard } style={{marginRight: '1em'}} />
                <Label>Identificación del solicitante</Label>
              </div>
              <FormGroup row>
                <Col>
                  <Input type='text' style={{marginBottom:'0.5em'}} placeholder='Nombre' required/>
                  <Input type='text' style={{marginBottom:'0.5em'}} placeholder='CI' required/>
                  <Input type='text' style={{marginBottom:'0.5em'}} placeholder='Dirección' required/>
                  <Input type='text' style={{marginBottom:'0.5em'}} placeholder='Teléfono' required/>
                  <Input type='text' style={{marginBottom:'0.5em'}} placeholder='Institución' required/>
                  <Input type='text' style={{marginBottom:'0.5em'}} placeholder='Dirección Institución' required/>
                </Col>
                <Col>
                  <Input type='text' style={{marginBottom:'0.5em'}} placeholder='Apellidos' required/>
                  <Input type='text' style={{marginBottom:'0.5em'}} placeholder='Actividad/Profesión' required/>
                  <Input type='text' style={{marginBottom:'0.5em'}} placeholder='Comuna' required/>
                  <Input type='email' style={{marginBottom:'0.5em'}} placeholder='Email' required/>
                  <Input type='text' style={{marginBottom:'0.5em'}} placeholder='Razón Social' required/>
                  <Input type='text' style={{marginBottom:'0.5em'}} placeholder='Teléfono Institución' required/>
                </Col>
              </FormGroup>
              <Button>Solicitar</Button>
            </Form>
          </Col>
          <Col sm={4}>
          <p style={{textAlign: 'justify', textJustify: 'inter-word'}}>
        La Biblioteca Central de la FCFM, respondiendo a su misión de
        centralizar, sistematizar y poner a disposición información de interés
        para la comunidad, ofrece al público una recopilación de fotografías que
        evocan la historia de la Escuela de InJeniería de la Universidad de
        Chile, de quienes han pasado por ella y de los hitos que han marcado su
        trayectoria desde sus comienzos hasta la actualidad. <br />
        <br />
        El acceso a la información de este sitio web es gratuito y no requiere
        registro previo. Sin perjuicio de ello, es necesario registrarse tanto
        para solicitar información o el uso de las imágenes del sitio, como para
        aportarla. <br />
        <br />
        Esta plataforma tiene por finalidad la consolidación de un espacio
        participativo destinado a preservar la memoria de esta Facultad, por lo
        que cualquier persona puede contribuir mediante la aportación de
        material fotográfico o de los antecedentes que conozca respecto de
        cualquiera de las imágenes expuestas. Para facilitar este proceso, el
        usuario puede crear una cuenta desde la cual interactuar con el sitio.{" "}
        <br />
        <br />
        Los contenidos de este portal están protegidos por la{" "}
        <b>Ley 17.336 sobre Propiedad Intelectual</b>, por lo que la Universidad
        sólo puede conceder licencias de uso respecto de las imágenes sobre las
        que tiene titularidad. Cuando sean solicitadas licencias sobre
        materiales ajenos a la misma, se remitirá al usuario la información de
        su respectivo titular para que este pueda dirigirse ante quien
        corresponda.
        <br />
        <br />
        La Biblioteca se reserva el derecho de administrar, crear y modificar
        los contenidos, las prestaciones y servicios que ofrece esta plataforma,
        siendo todos ellos susceptibles de cambio sin que exista obligación para
        la Biblioteca de comunicarlo a sus usuarios.
      </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

const styles = {
  form:{
    backgroundColor: '#f7f7f7', 
    padding:'2em',
    border:'1px solid rgb(210,214,218)'
  },
  title:{
    color:'#ff5a60',
    textAlign:'center',
    margin:'1em'
  },
  formTitle: {
    fontSize:'14px',
    fontWeight:'bold',
    padding:'0.5em',
    borderBottom: '1px solid rgb(210,214,218)',
    marginBottom: '10px',
  },
}

const mapStateToProps = state => {
  return {
    //necesito el listado de fotos
  };
};

const mapActionsToProps = dispatch => {
  return {
    onLoad: () => {
      return dispatch(home.home());
    },
    setRoute: route => {
      return dispatch(misc.setCurrentRoute(route));
    },
    sendRequest: (info) => {
      return dispatch() //enviar informacion formulario
    }
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(RequestPhoto);
