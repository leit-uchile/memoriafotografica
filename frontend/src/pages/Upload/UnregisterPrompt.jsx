import React from "react";
import { Container, Button, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const UnregisteredPrompt = ({ nextStep }) => (
  <Container>
    <Row>
      <Col>
        <h2 className="upload-title">Subir Fotograf&iacute;a / Registro</h2>
      </Col>
    </Row>
    <Container className="upload-unregister-container white-box">
      <Row>
        <Col style={{ borderRight: "1px solid rgb(210,214,218)" }}>
          <Row style={styles.item}>
            <FontAwesomeIcon icon={faSignInAlt} size="6x" />
          </Row>
          <Row style={styles.item}>
            <Button color="primary" tag={Link} to="/login">
              Iniciar sesion
            </Button>
          </Row>
        </Col>
        <Col>
          <Row style={styles.item}>
            <FontAwesomeIcon icon={faUserPlus} size="6x" />
          </Row>
          <Row style={styles.item}>
            <Button color="success" tag={Link} to="/register">
              Registrarme
            </Button>
            <Button color="link" onClick={nextStep}>
              Continuar sin registrar
            </Button>
          </Row>
          <Row style={styles.item}>
            <p>
              Si continuas sin registrar tendrás que ingresar tus datos cada vez
              que subas una foto
            </p>
          </Row>
        </Col>
      </Row>
    </Container>
  </Container>
);

const styles = {
  title: {
    color: "#ff5a60",
    textAlign: "center",
    margin: "1em"
  },
  item: {
    justifyContent: "center",
    margin: "1em"
  }
};

export default UnregisteredPrompt;
