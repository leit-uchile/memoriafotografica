import React from "react";
import {
  Container,
  Row,
  Col,
  UncontrolledCollapse,
  Button,
  CardBody,
  Card,
  CardLink,
  CardText,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

const QA = [
  {
    title: "Sobre el proyecto",
    list: [
      {
        q: "¿Quién financia este proyecto?",
        a:
          "El proyecto se encuentra financiado por la biblioteca central de la facultad de ciencias físicas y matemáticas de la Universidad de Chile. Esto incluye servidores, espacio de trabajo y recursos.",
      },
      {
        q: "¿Cuándo empezó la iniciativa?",
        a:
          "La inciativa comenzó a mediados del 2018 con el Centro de Estudiantes de Ingenieria. Se hizo un llamado a la comunidad universitaria y se seleccionó un equipo multidisciplinario de estudiantes.",
      },
      {
        q: "¿Este proyecto es OpenSource?",
        a:
          "Si, el proyecto es de código abierto y se rige bajo una licencia MIT. Puedes encontrar el repositorio en github.",
        l: "Repositorio en Github",
        ref: "https://github.com/leit-uchile/memoriafotografica",
      },
    ],
  },
  {
    title: "Sobre las licencias",
    list: [
      {
        q: "¿Las fotografías son todas de la biblioteca?",
        a:
          "La Biblioteca Central cuenta con un archivo histórico de fotografías, recopilado en conjunto con los diferentes departamentos de la facultad. Como la plataforma es de uso abierto a la comunidad contamos con diferentes donaciones de material histórico. Para más información referirse a los términos de uso.",
      },
      {
        q: "¿Por qué utilizar Creative Commons?",
        a:
          "Las licencias de CC cubren la mayoría de los casos de uso que necesitamos para la plataforma.",
      },
    ],
  },
  {
    title: "Necesito ayuda",
    list: [
      {
        q: "Alguien esta se adjudicó mis fotografías ¿Qué puedo hacer?",
        a:
          "Puedes señalar la fotografía directamente en el sitio. Si son más de una fotografía puedes indicarnos el usuario mediante el formulario de contacto o directamente en su perfil. Nos pondremos en contacto contigo a la brevedad.",
        l: "Formulario de contacto",
        ref: "/misc/resources/contact-us",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Preguntas frecuentes</h2>
          <h5>Apreta los links para revelar más preguntas</h5>
        </Col>
      </Row>
      {QA.map((t, key) => (
        <Row>
          <Col>
            <Button
              color="primary"
              id={`ucmacro${key}`}
              style={{
                backgroundColor: "inherit",
                color: "blue",
                borderColor: "white",
                marginBottom: "0.2em",
              }}
            >
              <FontAwesomeIcon
                icon={faQuestionCircle}
                style={{ color: "var(--leit-pink)" }}
              />
               {t.title}
            </Button>
            <UncontrolledCollapse toggler={`#ucmacro${key}`}>
              <Container>
                {t.list.map((el, k) => (
                  <Row key={k}>
                    <Col>
                      <Button
                        color="primary"
                        id={`uc-${key}-${k}`}
                        style={{
                          backgroundColor: "inherit",
                          color: "blue",
                          borderColor: "white",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faQuestionCircle}
                          style={{ color: "var(--leit-pink)" }}
                        />
                         {el.q}
                      </Button>
                      <UncontrolledCollapse toggler={`#uc-${key}-${k}`}>
                        <Card
                          style={{
                            margin: "1rem 0",
                          }}
                        >
                          <CardBody>
                            <CardText>{el.a}</CardText>
                            <CardLink href={el.ref}>{el.l}</CardLink>
                          </CardBody>
                        </Card>
                      </UncontrolledCollapse>
                    </Col>
                  </Row>
                ))}
              </Container>
            </UncontrolledCollapse>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default FAQ;
