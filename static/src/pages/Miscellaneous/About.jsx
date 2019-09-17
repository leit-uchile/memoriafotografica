import React from "react";
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

const About = () => {
  return(
    <Container>
      <Row>
        <Col>
          <h2>Acerca del Proyecto</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>LEIT</h2>
          <p>Laboratorio Estudiantil de Info Tecnologias</p>
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
