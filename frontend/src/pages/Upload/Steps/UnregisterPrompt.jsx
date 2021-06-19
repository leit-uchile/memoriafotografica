import React from "react";
import { Container, Button, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./unregisterPrompt.css";
import PropTypes from "prop-types"

const UnregisteredPrompt = ({ nextStep }) => (
  <Container>
    <Row>
      <Col>
        <h2 className="page-title">Subir Fotograf&iacute;a / Registro</h2>
      </Col>
    </Row>
    <Container className="white-box form-container">
      <Row>
        <Col style={{ borderRight: "1px solid rgb(210,214,218)" }}>
          <Row className="unregister-prompt-item">
            <FontAwesomeIcon icon={faSignInAlt} size="6x" />
          </Row>
          <Row className="unregister-prompt-item">
            <Button color="primary" tag={Link} to="/login">
              Iniciar sesion
            </Button>
          </Row>
        </Col>
        <Col>
          <Row className="unregister-prompt-item">
            <FontAwesomeIcon icon={faUserPlus} size="6x" />
          </Row>
          <Row className="unregister-prompt-item">
            <Button color="primary" tag={Link} to="/register">
              Registrarme
            </Button>
          </Row>
          <Row className="unregister-prompt-item">
            <Button color="link" onClick={nextStep}>
                Continuar sin registrar
            </Button>
          </Row>
          <Row className="unregister-prompt-item">
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

UnregisteredPrompt.propTypes = {
  nextStep: PropTypes.func.isRequired
}

export default UnregisteredPrompt;
