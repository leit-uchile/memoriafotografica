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
    source :"https://avatars2.githubusercontent.com/u/7097907?s=400&v=4",
    altText:'Foto de perfil Darío Palma',
    caption:'Darío Palma'
  },
  {
    source :"https://static.u-cursos.cl/r/usuario/e1/e16c6bc0ec3ad08209c24ea04f33e26f/datos_usuario/av_5b8f24c2e022d.jpg",
    altText:'Foto de perfil Isaías Venegas',
    caption:'Isaías Venegas'
  },
  {
    source :"https://static.u-cursos.cl/r/usuario/27/27f2a6553b5e61f03459368cf07eba7f/datos_usuario/av_5c91a9bcd72a0.jpg",
    altText:'Foto de perfil Victoria Bollo',
    caption:'Victoria Bollo'
  },
  {
    source :"https://avatars1.githubusercontent.com/u/26554728?s=400&u=30a71e6019159edbd3f720b234796319064bef95&v=4",
    altText:'Foto de perfil Darío Cáceres',
    caption:'Darío Cáceres'
  },

]

const former_photos = [
  {
    source :"http://www.unfv.edu.pe/facultades/fiei/images/cono_a.png",
    altText:'Foto de perfil Natalia Durán',
    caption:'Natalia Durán'
  },
  {
    source :"http://www.unfv.edu.pe/facultades/fiei/images/cono_a.png",
    altText:'Foto de perfil Fernanda Carvajal',
    caption:'Fernanda Carvajal'
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
    const formerteam =
      former_photos.map(el => {
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
          <h2>Equipo de Desarrollo</h2>
          <p>La Plataforma de Memoria Fotográfica es desarrollada por el equipo multidisciplinario conformado por el proyecto LEIT (Laboratorio Estudiantil de Info Tecnologías)</p>
          <h3>Miembros Actuales</h3>
          <Row>{team}</Row>
          <h3>Antiguos Miembros</h3>
          <Row>{formerteam}</Row>
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
