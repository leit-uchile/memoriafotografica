import React from "react";
import Photo from "../../components/Photo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const photos =  [
  {
    source :"http://www.unfv.edu.pe/facultades/fiei/images/cono_a.png",
    altText:'Foto de perfil Darío Cáceres',
    caption:'Darío Cáceres'
  },
  {
    source :"http://www.unfv.edu.pe/facultades/fiei/images/cono_a.png",
    altText:'Foto de perfil Isaias Venegas',
    caption:'Isaias Venegas'
  },
]

const About = () => {
  const team =
    photos.map(el => {
    return (
      <Col>
        <img
          src={el.source}
          alt={el.altText}
          style={{textAlign:'center'}}
          width='100px'
          height='100px'
        />
        <p style={{textAlign:'center'}}>{el.caption}</p>
      </Col>
    )});
  return(
    <Container>
      <Row>
        <Col>
          <h2>Acerca del Proyecto</h2>
          <Row>
            <Col>
              <Photo 
                url={"https://www.cec.uchile.cl/cinetica/pcordero/recordando/FotosFCFM/FCFM_1921.jpg"} 
                height='200px' hover={true} 
                hoverText={'Edificio Beauchef 850 en construcción, enero 1921. Recuperada desde sitio web del Profesor Patricio Cordero'} 
                useLink
                redirectUrl='#' 
                style={{backgroundPositionY: '55%'}}
              />
              <p style={{textAlign: 'justify', textJustify: 'inter-word', marginTop:'2em'}}>
                El proyecto Memoria Fotográfica busca acercar y mejorar el acceso a la documentación que contiene la historia de nuestra casa de estudios,
                institución de relevancia nacional, rescatando y sistematizando dicha información para así permitir a la comunidad imbuirse de la trayectoria 
                que ha construido el carácter e identidad de la Escuela de InJeniería de la Universidad de Chile.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>El equipo</h2>
          <p>Memoria Fotográfica es desarrollado por el equipo multidisciplinario conformado por el proyecto LEIT (Laboratorio Estudiantil de Info Tecnologias)</p>
          <Row>{team}</Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Forma parte</h2>
          <p>Laboratorio Estudiantil de Info Tecnologias</p>
        </Col>
      </Row>
    </Container>
  )
}

export default About;
