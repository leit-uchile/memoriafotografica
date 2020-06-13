import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Photo from "../../components/Photo";
import {
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardDeck,
} from "reactstrap";

const photos = [
  {
    source:
      "https://static.u-cursos.cl/r/usuario/27/27f2a6553b5e61f03459368cf07eba7f/datos_usuario/av_5c91a9bcd72a0.jpg",
    altText: "Foto de perfil Victoria Bollo",
    caption: "Victoria Bollo",
    employment: "Estudiante de Astronomía",
  },
  {
    source: "https://avatars2.githubusercontent.com/u/7097907?s=400&v=4",
    altText: "Foto de perfil Darío Palma",
    caption: "Darío Palma",
    employment: "Estudiante de Ingeniería en Computación",
  },
  {
    source:
      "https://avatars1.githubusercontent.com/u/26554728?s=400&u=30a71e6019159edbd3f720b234796319064bef95&v=4",
    altText: "Foto de perfil Darío Cáceres",
    caption: "Darío Cáceres",
    employment: "Estudiante de Ingeniería en Computación",
  },
  {
    source: "http://www.unfv.edu.pe/facultades/fiei/images/cono_a.png",
    altText: "Foto de perfil Fernanda Carvajal",
    caption: "Fernanda Carvajal",
    employment: "Abogada",
  },
  {
    source: "http://www.unfv.edu.pe/facultades/fiei/images/cono_a.png",
    altText: "Foto de perfil Natalia Durán",
    caption: "Natalia Durán",
    employment: "Estudiante de Enfermería",
  },
  {
    source:
      "https://static.u-cursos.cl/r/usuario/e1/e16c6bc0ec3ad08209c24ea04f33e26f/datos_usuario/av_5b8f24c2e022d.jpg",
    altText: "Foto de perfil Isaías Venegas",
    caption: "Isaías Venegas",
    employment: "Estudiante de Ingeniería en Computación",
  },
];

const former_photos = [
  {
    source: "http://www.unfv.edu.pe/facultades/fiei/images/cono_a.png",
    altText: "Foto de perfil Nicolás Varas",
    caption: "Nicolás Varas",
    employment: "Ingeniero en Computación",
  },
  {
    source: "http://www.unfv.edu.pe/facultades/fiei/images/cono_a.png",
    altText: "Foto de perfil Rosa Leal",
    caption: "Rosa Leal",
    employment: "Directora de la Biblioteca Central FCFM",
  },
  {
    source: "http://www.unfv.edu.pe/facultades/fiei/images/cono_a.png",
    altText: "Foto de perfil -",
    caption: "1",
    employment: "Bibliotecaria de la Biblioteca Central FCFM",
  },
  {
    source: "http://www.unfv.edu.pe/facultades/fiei/images/cono_a.png",
    altText: "Foto de perfil -",
    caption: "2",
    employment: "Bibliotecaria de la Biblioteca Central FCFM",
  },
];
const About = () => {
  let project = React.createRef();
  let leit = React.createRef();
  let joinUs = React.createRef();

  useEffect(() => {
    if (joinUs.current !== null) {
      joinUs.current.focus({
        block: "start",
        behavior: "smooth",
      });
    }
  }, [joinUs]);

  const team = photos.map((el) => {
    return (
      <Card key={el.caption}>
        <img
          src={el.source}
          alt={el.altText}
          style={{ textAlign: "center" }}
          width="100%"
        />
        <CardBody style={{ textAlign: "center" }}>
          <CardText>
            {el.caption}

            <p style={{ textAlign: "center", color: "rgb(151, 135, 143)" }}>
              {el.employment}
            </p>
          </CardText>
        </CardBody>
      </Card>
    );
  });
  const formerteam = former_photos.map((el) => {
    return (
      <Card key={el.caption}>
        <img
          src={el.source}
          alt={el.altText}
          style={{ textAlign: "center" }}
          width="100%"
        />
        <CardBody style={{ textAlign: "center" }}>
          <CardText>
            {el.caption}

            <p style={{ textAlign: "center", color: "rgb(151, 135, 143)" }}>
              {el.employment}
            </p>
          </CardText>
        </CardBody>
      </Card>
    );
  });
  return (
    <Container fluid className="add-rows-mtop">
      <Row forwardref={project}>
        <Col>
          <h2>Acerca del Proyecto</h2>
          <Row>
            <Col>
              <Photo
                url={
                  "https://www.cec.uchile.cl/cinetica/pcordero/recordando/FotosFCFM/FCFM_1921.jpg"
                }
                height="200px"
                hover={true}
                hoverText={
                  "Edificio Beauchef 850 en construcción, enero 1921. Recuperada desde sitio web del Profesor Patricio Cordero"
                }
                useLink
                redirectUrl="#"
                style={{ backgroundPositionY: "55%" }}
              />
              <p
                style={{
                  textAlign: "justify",
                  textJustify: "inter-word",
                  marginTop: "2em",
                }}
              >
                El proyecto Memoria Fotográfica busca acercar y mejorar el
                acceso a la documentación que contiene la historia de nuestra
                casa de estudios, rescatando y sistematizando dicha información
                para así permitir a la comunidad imbuirse de la trayectoria que
                ha construido el carácter e identidad de la Escuela de
                InJeniería de la Universidad de Chile. Toda persona
                perteneciente a la comunidad universitaria, ya sea alumno, ex
                alumno, funcionario, académico o externo, es libre de aportar el
                material que desee. Si tienes dudas de qué contenido puedes
                subir, los derechos de propiedad u otras inquietudes, puedes
                solucionarlas en la sección
                <Link to="/misc/resources/faq" style={{ marginLeft: "0.2em" }}>
                  Preguntas Frecuentes (FAQ).
                </Link>
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row forwardref={leit}>
        <Col>
          <h2>Equipo de Desarrollo</h2>
          <p>
            La Plataforma es desarrollada por el equipo multidisciplinario LEIT
            (Laboratorio Estudiantil de Info Tecnologías) con la ayuda de
            distintas personas pertenecientes a la facultad de Ciencias Físicas
            y Matemáticas de la Universidad de Chile.{" "}
          </p>
          <h3>Integrantes del equipo LEIT</h3>
          <CardDeck>{team}</CardDeck>
          <h3>Colaboradores</h3>
          <CardDeck>{formerteam}</CardDeck>
        </Col>
      </Row>

      <Row forwardref={joinUs}>
        <Col>
          <h2>Forma parte</h2>
          <p>
            Como equipo LEIT, queremos impulsar a alumnos de distintas áreas a
            desarrollar proyectos en conjunto con la Universidad de Chile;
            pudiendo desarrollar nuevas herramientas para su futuro. Si quieres
            ser parte, puedes enviarnos un mensaje en la página de
            <Link
              to="/misc/resources/contact-us"
              style={{ marginLeft: "0.2em" }}
            >
              Contacto.
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
