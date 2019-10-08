import React, { useState, Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { home, misc, requestPhoto } from "../actions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faBook, faAddressCard, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText 
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
    const {requestedPhotos} = this.props;
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
                <Requested list={this.props.requestedPhotos} removeRequestPhoto={this.props.removeRequestPhoto}/>
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

var Requested = ({list, removeRequestPhoto}) => (
  <ListGroup>
    {list.length === 0
    ? <ListGroupItem disabled>No hay fotos solicitadas</ListGroupItem>
    : list.map((el)=>
      <ListGroupItem>
        <Row>
          <Col style={{textAlign:'center'}}>
            <img 
              src={el.thumbnail} 
              alt="photo"
              height={el.aspect_h * 50}
              width={el.aspect_w * 50}
              style={ el.aspect_w > el.aspect_h
                ? {maxHeight:'128px', maxWidth:'225px'}
                : {maxHeight:'128px', maxWidth:'100px'}}
            />
            {getPermissionLogo(el, 90, 32)}
          </Col>
          <Col>
            <Row>
              <Col md={10}>
                <ListGroupItemHeading 
                  tag={Link} 
                  to={'/photo/' + el.id}>
                  {el.title}
                </ListGroupItemHeading>
              </Col>
              <Col md={2}>
                <FontAwesomeIcon 
                  icon={faTimes} 
                  style={{marginRight: '1em'}}
                  onClick={()=>removeRequestPhoto(el)}
                />
              </Col>
            </Row>
            <ListGroupItemText>
              ID:{el.id}
            </ListGroupItemText>
            <ListGroupItemText style={{textAlign: 'justify', textJustify: 'inter-word'}}>
              Descripción: {el.description}
            </ListGroupItemText>
          </Col>
        </Row>
      </ListGroupItem>
    )}
  </ListGroup>
);

const getPermissionLogo = (name, w, h) => {
  var url;
  switch (name) {
    case "CC BY":
      url = "/assets/CCBY.svg";
      break;
    case "CC BY-NC":
      url = "/assets/CCBYNC.svg";
      break;
    case "CC BY-NC-ND":
      url = "/assets/CCBYNCND.svg";
      break;
    case "CC BY-NC-SA":
      url = "/assets/CCBYNCSA.svg";
      break;
    case "CC BY-ND":
      url = "/assets/CCBYND.svg";
      break;
    case "CC BY-SA":
      url = "/assets/CCBYSA.svg";
      break;
    default:
      url = "/assets/CCBYSA.svg";
  }
  return (
    <img
      width={w}
      height={h}
      src={url}
      style={{position:'absolute', right:'0', bottom:'0'}}
    />
  );
};

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
    requestedPhotos: state.home.requestedPhotos
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
    removeRequestPhoto: value => dispatch(requestPhoto.removeRequestPhoto(value)),
    sendRequest: (info) => {
      return dispatch() //enviar informacion formulario
    }
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(RequestPhoto);
