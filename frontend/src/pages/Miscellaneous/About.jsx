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
      "https://instagram.fscl10-1.fna.fbcdn.net/v/t51.2885-15/e35/83626955_3133417183549106_7503013508976441377_n.jpg?_nc_ht=instagram.fscl10-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=JSWPaOUDjEkAX9k-HgG&oh=51ae97e9e764913903c83411dc1c1664&oe=5F24487B",
    altText: "Foto de perfil Victoria Bollo",
    caption: "Victoria Bollo",
    employment: "Estudiante de  Magíster en Astronomía",
  },
  {
    source:
      "https://scontent.fscl7-1.fna.fbcdn.net/v/t31.0-8/p960x960/20248254_1604088656270906_1312142107271353514_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_oc=AQlLl-TbPVJupK2cTjO2fcbML42GJJ7AAZ5rdnYVjdR1utMfV3Hbs_ADeXXT35Gdd2w&_nc_ht=scontent.fscl7-1.fna&_nc_tp=6&oh=a37f179e1459af6a5d2f58e5e5deaf68&oe=5F1E56FA",
    altText: "Foto de perfil Darío Palma",
    caption: "Darío Palma",
    employment: "Estudiante de Doble título e Ingeniería Civil en Computación",
  },
  {
    source:
      "https://avatars1.githubusercontent.com/u/26554728?s=400&u=30a71e6019159edbd3f720b234796319064bef95&v=4",
    altText: "Foto de perfil Darío Cáceres",
    caption: "Darío Cáceres",
    employment: "Estudiante de Ingeniería Civil en Computación",
  },
  {
    source:
      "https://scontent.fscl10-1.fna.fbcdn.net/v/t1.0-9/p960x960/94474622_10221722308824635_7192067009398439936_o.jpg?_nc_cat=105&_nc_sid=85a577&_nc_oc=AQlq2u1ZlC181-Dc2zeJxzX2klUVkc-iVEY398LM33lGC53SVsHIyqTNQ4bAYRA-Vy8&_nc_ht=scontent.fscl10-1.fna&_nc_tp=6&oh=737a9933285d776fb8bcbe5bafd94c11&oe=5F20D02E",
    altText: "Foto de perfil Fernanda Carvajal",
    caption: "Fernanda Carvajal",
    employment: "Egresada de Derecho, Licenciada en leyes",
  },
  {
    source:
      "https://instagram.fscl10-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/82617884_213175779823992_1265458396420852989_n.jpg?_nc_ht=instagram.fscl10-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=NlaTgvcEUfAAX_b_jDD&oh=4979af9d1b74a8ac76ed75463b1bdb9f&oe=5F248995",
    altText: "Foto de perfil Natalia Durán",
    caption: "Natalia Durán",
    employment: "Estudiante de Enfermería, Ex estudiante de Ingeniería",
  },
  {
    source:
      "https://instagram.fscl8-1.fna.fbcdn.net/v/t51.2885-15/e35/79947523_2605730699482441_6476856669643730739_n.jpg?_nc_ht=instagram.fscl8-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=opZMWLAn6jAAX-evGF7&oh=5499ee187c902c7059f279239938b440&oe=5F246212",
    altText: "Foto de perfil Isaías Venegas",
    caption: "Isaías Venegas",
    employment: "Estudiante de Ingeniería Civil en Computación",
  },
];

const former_photos = [
  {
    source:
      "https://scontent.fscl7-1.fna.fbcdn.net/v/t1.0-9/92827288_10158101345774326_9069079769152225280_n.jpg?_nc_cat=101&_nc_sid=85a577&_nc_oc=AQkmSSMKL_Wcf1pXGCW7PMsBVvYjUnPMECHySDyvVQK2HofXQ8dv2tF40fHq13dIv1M&_nc_ht=scontent.fscl7-1.fna&oh=3fa5e60a96f17b7e4690992a54f3a3f1&oe=5F1F64B6",
    altText: "Foto de perfil Nicolás Varas",
    caption: "Nicolás Varas",
    employment: "Ingeniero Civil en Computación, Ex miembro CEI",
  },
  {
    source:
      "https://media-exp1.licdn.com/dms/image/C4D03AQGR8bWPEdfq2w/profile-displayphoto-shrink_800_800/0?e=1599091200&v=beta&t=HXL4_hlHpFmGjcRjxIbKq7ouE6votJEE4EAt63gBwKo",
    altText: "Foto de perfil Rafael Castillo",
    caption: "Rafael Castillo",
    employment:
      "Diseñador y Coordinador de Servicios Bibliográficos Electrónicos",
  },
  {
    source:
      "https://ucampus.uchile.cl/d/r/usuario/71/71c114dba2c0fe52dbf6ae0d6ab8c077/perfil/cb871295eba79e33262194660f10d537.jpg",
    altText: "Jorge Concha",
    caption: "Jorge Concha",
    employment: "Ingeniero de Sistemas del Centro de Computación CEC.",
  },
  {
    source:
      "https://ucampus.uchile.cl/d/r/usuario/0c/0c4d8c861f5ba6092fb87f3a1f37a5b7/perfil/239860710ecb1f95193ed0d183db3904.jpg",
    altText: "Fernando Quezada",
    caption: "Fernando Quezada",
    employment: "Soporte y Webmaste de la Biblioteca Central",
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

  const mapToCard = (ar) => {
    return ar.map((el) => {
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
  };

  const team = mapToCard(photos);
  const formerteam = mapToCard(former_photos);
  const rosita = mapToCard([
    {
      source:
        "https://ucampus.uchile.cl/d/r/usuario/9d/9d4438c4ec735ef3b745b3b369a43216/perfil/3ee573197dde61aad94aa26359acb3d6.jpg",
      altText: "Foto de perfil Rosa Leal",
      caption: "Rosa Leal",
      employment: "Directora de la Biblioteca Central FCFM",
    },
  ]);
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
          <CardDeck>{team}</CardDeck>
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: 8 }}>
          <h3>Colaboradores</h3>
          <CardDeck>{formerteam}</CardDeck>
        </Col>
        <Col sm={2}>
          <h3>Gestionadora</h3>
          <CardDeck>{rosita}</CardDeck>
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
