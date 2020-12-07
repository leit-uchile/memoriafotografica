import React from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import "./footer.css";

const Footer = () => {
  const goUp = () =>
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

  return (
    <footer>
      <Container>
        <Row id="footer-logos">
          <Col sm="4">
            <img
              src={"/assets/logo01.svg"}
              alt={"logo"}
              height="60px"
              style={{ marginTop: "2em" }}
            />
          </Col>
          <Col sm="4">
            <img
              src={"/assets/bcentral.svg"}
              alt={"logobcentral"}
              height="100px"
            />
          </Col>
          <Col sm="4">
            <img src={"/fcfm_header.png"} alt={"logofcfm"} height="100px" />
          </Col>
        </Row>
        <Row>
          <Col md="3">
            <h2>
              <b>Biblioteca Central FCFM</b>
            </h2>
            <p>Beauchef 850</p>
            <p>Santiago</p>
            <p>Chile</p>
            <p>+56 22 978 4074</p>
          </Col>
          <Col md="3">
            <p>
              <b>Acerca de</b>
            </p>
            <Nav vertical>
              <NavItem>
                <NavLink tag={Link} to={"/misc/about"}>
                  El Proyecto
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to={"/misc/about"}>
                  LEIT
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to={"/misc/about"}>
                  Intégrate
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="3">
            <p>
              <b>Enlaces</b>
            </p>
            <Nav vertical>
              <NavItem>
                <NavLink tag={Link} to={"/misc/resources/faq"}>
                  Preguntas frecuentes
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to={"/misc/resources/contact-us"}>
                  Contáctenos
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to={"/misc/resources/sitemap"}>
                  Mapa del sitio
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="3">
            <h2>
              <b>Suscripciones</b>
            </h2>
            <p>
              Para obtener novedades puede registrarse en nuestro Newsletter
            </p>
            <Input
              id="newsletter"
              type="email"
              placeholder="Ingrese su correo"
            />
          </Col>
        </Row>
        <Row>
          <Col sm="8" id="copyright">
            <p>
              Todos los derechos reservados. Biblioteca Central - Facultad de
              Ciencias Fisicas y Matematicas - Universidad de Chile - 2020
            </p>
          </Col>
          <Col sm="4">
            <Button id="goUp" color="link" onClick={goUp}>
              Volver al Inicio <FontAwesomeIcon icon={faArrowCircleUp} />
            </Button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
