import React from "react";
import { Container, Row, Col, Input, Button } from "reactstrap";

const Footer = () => {
  const componentDidMount = () =>
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });

  return (
    <footer style={styles.contenedor}>
      <Container style={styles.contenido}>
        <Row style={{ paddingBottom: "50px" }}>
          <Col>
            <img style={{ marginTop: "-15px" }} src={"/mf.ico"} alt={"logo"} />
            <div style={{ display: "inline-block", margin: "10px" }}>
              <h5 style={{ fontSize: "20px", fontWeight: "bold" }}>
                El Proyecto
              </h5>
              <h2 style={{ fontSize: "15px", color: "gray" }}>
                Memoria Fotografica
              </h2>
            </div>
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
            <h5 style={{ fontSize: "12px" }}>
              <b>Equipo</b>
            </h5>
            <ul>
              <li>Acerca de</li>
              <li>LEIT</li>
              <li>Integrate al Proyecto</li>
            </ul>
          </Col>
          <Col md="3">
            <h5 style={{ fontSize: "12px" }}>
              <b>Enlaces</b>
            </h5>
            <ul>
              <li>Preguntas Frecuentes</li>
              <li>Contactenos</li>
              <li>Mapa del Sitio</li>
            </ul>
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
              color: "#9fa4a5"
            }}>
            <p style={{ marginLeft: "auto", marginRight: "auto" }}>
              Todos los derechos reservados. Biblioteca Central - Facultad de
              Ciencias Fisicas y Matematicas - Universidad de Chile
            </p>
            <Button color="link" onClick={componentDidMount}>
              volver al inicio
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
    width: "100%",
    backgroundColor: "#dee1e2",
    background: "linear-gradient(top, #fbfcfc 0%, #dee1e2 100%), -moz-linear-gradient(top, #fbfcfc 0%, #dee1e2 100%) -webkit-linear-gradient(top, #fbfcfc 0%, #dee1e2 100%)",
    marginTop: "2em"
  },
  contenido: {
    fontSize: "12px",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "1370px",
    paddingTop: "50px",
    paddingLeft: "125px",
    paddingRight: "125px"
  }
};
export default Footer;
