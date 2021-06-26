import React, { useEffect, useRef } from "react";
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
  CardHeader,
} from "reactstrap";

const active_members = [
  {
    source:
      "/assets/profiles/20248254_1604088656270906_1312142107271353514_o.jpg",
    altText: "Foto de perfil Darío Palma",
    caption: "Darío Palma",
    employment: "Egresado de Doble título e Ingeniería Civil en Computación",
  },
  {
    source:
      "https://avatars1.githubusercontent.com/u/26554728?s=400&u=30a71e6019159edbd3f720b234796319064bef95&v=4",
    altText: "Foto de perfil Darío Cáceres",
    caption: "Darío Cáceres",
    employment: "Estudiante de Ingeniería Civil en Computación",
  },
  {
    source: "/assets/profiles/isaias.jpg",
    altText: "Foto de perfil Isaías Venegas",
    caption: "Isaías Venegas",
    employment: "Estudiante de Doble título e Ingeniería Civil en Computación",
  },
  {
    source: "/assets/profiles/jastorga.png",
    altText: "Foto de perfil José Astorga",
    caption: "José Astorga",
    employment: "Estudiante de Ingeniería Civil en Computación",
  },
  {
    source: "/assets/profiles/photo_2020-10-24_11-41-25.jpg",
    altText: "Foto de perfil Alejandra Alarcón",
    caption: "Alejandra Alarcón",
    employment: "Estudiante de Ingeniería Civil en Computación",
  },
  {
    source: "/assets/profiles/joaquin.jpg",
    altText: "Foto de perfil Joaquín Díaz",
    caption: "Joaquín Díaz",
    employment: "Estudiante de Ingeniería Civil en Computación",
  },
  {
    source: "/assets/profiles/vicente.jpg",
    altText: "Foto de perfil Vicente Díaz",
    caption: "Vicente Díaz",
    employment: "Estudiante de Ingeniería Civil en Computación",
  },
];

const former_members = [
  {
    source: "/assets/profiles/victoria.jpg",
    altText: "Foto de perfil Victoria Bollo",
    caption: "Victoria Bollo",
    employment: "Estudiante de  Magíster en Astronomía",
  },
  {
    source: "/assets/profiles/fefa.jpg",
    altText: "Foto de perfil Fernanda Carvajal",
    caption: "Fernanda Carvajal",
    employment: "Egresada de Derecho, Licenciada en leyes",
  },
  {
    source: "/assets/profiles/natalia.jpg",
    altText: "Foto de perfil Natalia Durán",
    caption: "Natalia Durán",
    employment: "Estudiante de Enfermería, Ex estudiante de Ingeniería",
  },
];

const colaborators_photos = [
  {
    header: "Organización",
    source: "/assets/profiles/badas.jpg",
    altText: "Foto de perfil Nicolás Varas",
    caption: "Nicolás Varas",
    employment: "Ingeniero Civil en Computación, Ex miembro CEI",
  },
  {
    header: "Diseño",
    source: "/assets/profiles/rafael.jpg",
    altText: "Foto de perfil Rafael Castillo",
    caption: "Rafael Castillo",
    employment:
      "Diseñador y Coordinador de Servicios Bibliográficos Electrónicos",
  },
  {
    header: "Sistemas",
    source:
      "https://ucampus.uchile.cl/d/r/usuario/71/71c114dba2c0fe52dbf6ae0d6ab8c077/perfil/cb871295eba79e33262194660f10d537.jpg",
    altText: "Jorge Concha",
    caption: "Jorge Concha",
    employment: "Ingeniero de Sistemas del Centro de Computación CEC.",
  },
  {
    header: "Sistemas",
    source:
      "https://ucampus.uchile.cl/d/r/usuario/0c/0c4d8c861f5ba6092fb87f3a1f37a5b7/perfil/239860710ecb1f95193ed0d183db3904.jpg",
    altText: "Fernando Quezada",
    caption: "Fernando Quezada",
    employment: "Soporte y Webmaster de la Biblioteca Central",
  },
];
const About = () => {
  let project = useRef();
  let leit = useRef();
  let joinUs = useRef();

  useEffect(() => {
    if (joinUs.current !== null) {
      joinUs.current.focus({
        block: "start",
        behavior: "smooth",
      });
    }
  }, [joinUs]);

  const mapToCard = (ar, doHead = false) => {
    return ar.map((el) => {
      return (
        <Card key={el.caption} className="about-card">
          {doHead ? (
            <CardHeader style={el.headColor}>{el.header}</CardHeader>
          ) : null}
          <img
            src={el.source}
            alt={el.altText}
            style={{ textAlign: "center" }}
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
  };

  const team_1 = mapToCard(active_members.slice(0, 5));
  const team_2 = mapToCard([
    ...active_members.slice(5, active_members.length),
    ...former_members,
  ]);
  const rosita = {
    header: "Sostenedora",
    headColor: {
      backgroundColor: "var(--leit-pink)",
      color: "white",
      fontWeight: "700",
    },
    source:
      "https://ucampus.uchile.cl/d/r/usuario/9d/9d4438c4ec735ef3b745b3b369a43216/perfil/3ee573197dde61aad94aa26359acb3d6.jpg",
    altText: "Foto de perfil Rosa Leal",
    caption: "Rosa Leal",
    employment: "Directora de la Biblioteca Central FCFM",
  };
  const formerteam = mapToCard([...colaborators_photos, rosita], true);
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
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Integrantes del equipo LEIT</h3>
          <CardDeck>
            {team_1}
            {team_2}
          </CardDeck>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Gestión y Colaboradores</h3>
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
