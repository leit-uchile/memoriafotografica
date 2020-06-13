import React, { useState } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faPhoneAlt,
  faEnvelope,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import { webadmin } from "../../actions";

const ContactUs = ({ contacted, contactUs }) => {
  const [formData, setData] = useState({});

  const updateData = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Container>
      <Row>
        <Col>
          <h2 style={styles.title}>Contáctenos</h2>
        </Col>
      </Row>
      <Row>
        <Col md={10}>
          {!contacted ? (
            <Form style={styles.form}>
              <div style={styles.formTitle}>
                <FontAwesomeIcon
                  icon={faAddressCard}
                  style={{ marginRight: "1em" }}
                />
                <Label>Identificación de contacto</Label>
              </div>
              <FormGroup row>
                <Col>
                  <Input
                    type="text"
                    name="name"
                    style={{ marginBottom: "0.5em", order: "1" }}
                    placeholder="Nombre"
                    required
                    onChange={updateData}
                  />
                  <Input
                    type="text"
                    name="phone"
                    style={{ marginBottom: "0.5em", order: "3" }}
                    placeholder="Teléfono"
                    required
                    onChange={updateData}
                  />
                </Col>
                <Col>
                  <Input
                    type="text"
                    name="lastname"
                    style={{ marginBottom: "0.5em", order: "2" }}
                    placeholder="Apellidos"
                    required
                    onChange={updateData}
                  />
                  <Input
                    type="email"
                    name="email"
                    style={{ marginBottom: "0.5em", order: "4" }}
                    placeholder="Correo"
                    required
                    onChange={updateData}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <div style={styles.formTitle}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ marginRight: "1em" }}
                  />
                  <Label>Motivo</Label>
                </div>
                <Input
                  type="textarea"
                  name="message"
                  placeholder="Mensaje"
                  required
                  onChange={updateData}
                />
              </FormGroup>
              <Button onClick={() => contactUs(formData)}>Enviar</Button>
            </Form>
          ) : (
            <div style={styles.form}>
              <FontAwesomeIcon
                icon={faCheckSquare}
                style={{
                  color: "var(--leit-pink)",
                  fontSize: "40px",
                  display: "inline-block",
                  width: "100%",
                  textAlign: "center",
                  marginBottom: "2vh",
                }}
              />
              <h4 style={{ textAlign: "center" }}>
                {" "}
                Correo enviado. Nos contactaremos con usted a la brevedad
              </h4>
            </div>
          )}
        </Col>
      </Row>
      <Row style={{ marginTop: "3em" }}>
        <Col md={5}>
          <Map
            source={
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d832.1722723612256!2d-70.66411451184945!3d-33.457405879914106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI3JzI2LjciUyA3MMKwMzknNDguOCJX!5e0!3m2!1ses!2sus!4v1568426455672!5m2!1ses!2sus"
            }
          />
        </Col>
        <Col md={5} style={{ margin: "0 1em" }}>
          <p style={styles.info}>
            Para más información puede visitarnos en la Biblioteca Central de la
            Facultad de Ciencias Físicas y Matemáticas ubicada en Beauchef 850,
            Santiago
          </p>
          <div style={styles.phoneInfo}>
            <FontAwesomeIcon
              icon={faPhoneAlt}
              style={{ marginRight: "0.2em" }}
            />
            Biblioteca Central +56 22 978 4074
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const Map = ({ source }) => {
  if (!source) {
    return <div style={styles.mapError}>No se ha podido cargar el mapa</div>;
  }
  const src = source;
  return (
    <div>
      <iframe src={src} style={styles.map} title="Location Map"></iframe>
    </div>
  );
};

const styles = {
  form: {
    backgroundColor: "#f7f7f7",
    padding: "2em",
    border: "1px solid rgb(210,214,218)",
  },
  title: {
    color: "var(--leit-pink)",
    margin: "1em 28% 1em",
  },
  formTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    padding: "0.5em",
    borderBottom: "1px solid rgb(210,214,218)",
    marginBottom: "10px",
  },
  mapError: {
    width: "460px",
    height: "300px",
    border: "1px solid black",
  },
  map: {
    width: "100%",
    height: "300px",
    border: "0",
    allowFullScreen: "",
  },
  info: {
    textAlign: "justify",
    textJustify: "inter-word",
  },
  phoneInfo: {
    display: "block",
    backgroundColor: "#f7f7f7",
    textAlign: "center",
    padding: "0.2em",
  },
};
const mapStateToProps = (state) => ({
  contacted: state.webadmin.contacted,
});

const mapActionsToProps = (dispatch) => ({
  contactUs: (form) => dispatch(webadmin.contactUs(form)),
});

export default connect(mapStateToProps, mapActionsToProps)(ContactUs);
