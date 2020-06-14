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
import "../../css/footer.css";

const Footer = () => {
  const goUp = () =>
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

  return (
    <footer style={styles.contenedor}>
      <Container style={styles.contenido}>
        <Row style={{ paddingBottom: "50px" }}>
          <Col sm={4}>
            <img
              src={"/assets/logo01.svg"}
              alt={"logo"}
              height="60px"
              style={{ maxWidth: "100%" }}
              id="logo-footer"
            />
          </Col>
          <Col sm={4}>
            <img
              src={"/assets/bcentral.svg"}
              alt={"logobcentral"}
              height="100px"
              style={{ maxWidth: "100%" }}
            />
          </Col>
          <Col sm={4}>
            <img
              src={"/fcfm_header.png"}
              alt={"logofcfm"}
              height="100px"
              style={{ maxWidth: "100%" }}
            />
          </Col>
        </Row>
        <Row>
          <Col md="3">
            <h5 style={{ fontSize: "12px" }}>
              <b>Biblioteca Central FCFM</b>
            </h5>
            <p style={{ margin: "0px", paddingBottom: "0px" }}>Beauchef 850</p>
            <p style={{ margin: "0px", paddingBottom: "0px" }}>Santiago</p>
            <p>Chile</p>
            <p>+56 22 978 4074</p>
          </Col>
          <Col md="3">
            <p style={{ fontSize: "12px" }}>
              <b>Acerca de</b>
            </p>
            <Nav vertical>
              <NavItem>
                <NavLink tag={Link} to={"/misc/about"} active>
                  El Proyecto
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to={"/misc/about"} active>
                  LEIT
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to={"/misc/about"} active>
                  Intégrate
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="3">
            <p style={{ fontSize: "12px" }}>
              <b>Enlaces</b>
            </p>
            <Nav vertical>
              <NavItem>
                <NavLink tag={Link} to={"/misc/resources/faq"} active>
                  Preguntas frecuentes
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to={"/misc/resources/contact-us"} active>
                  Contáctenos
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to={"/misc/resources/sitemap"} active>
                  Mapa del sitio
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="3">
            <h5 style={{ fontSize: "12px" }}>
              <b>Suscripciones</b>
            </h5>
            <ul>
              <li>
                Para obtener novedades puede registrarse en nuestro Newsletter
              </li>
              <Input type="email" placeholder="Ingrese su correo" />
            </ul>
          </Col>
        </Row>
        <Row style={{ paddingTop: "100px", paddingBottom: "100px" }}>
          <Col
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#9fa4a5",
            }}
          >
            <p style={{ margin: "0 auto" }}>
              Todos los derechos reservados. Biblioteca Central - Facultad de
              Ciencias Fisicas y Matematicas - Universidad de Chile - 2020
            </p>
            <Button color="link" onClick={goUp}>
              Volver al Inicio <FontAwesomeIcon icon={faArrowCircleUp} />
            </Button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

const styles = {
  contenedor: {
    borderTop: "1px solid rgb(210,214,218)",
    background:
      "linear-gradient(top, #fbfcfc 0%, #dee1e2 100%), -moz-linear-gradient(top, #fbfcfc 0%, #dee1e2 100%) -webkit-linear-gradient(top, #fbfcfc 0%, #dee1e2 100%)",
  },
  contenido: {
    fontSize: "12px",
    paddingTop: "50px",
  },
};
export default Footer;
