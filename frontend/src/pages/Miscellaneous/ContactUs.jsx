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
import "./styles.css";

const ContactUs = ({ contacted, contactUs }) => {
  const [formData, setData] = useState({});

  const updateData = (e) =>
    setData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="page-title">Contáctenos</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {!contacted ? (
            <Form className="white-box form-container">
              <div className="form-title">
                <FontAwesomeIcon icon={faAddressCard} />
                <Label> Identificación de contacto</Label>
              </div>
              <FormGroup row>
                <Col>
                  <Input
                    type="text"
                    name="name"
                    tabIndex="1"
                    placeholder="Nombre"
                    required
                    onChange={updateData}
                  />
                  <Input
                    type="text"
                    name="phone"
                    tabIndex="3"
                    placeholder="Teléfono"
                    required
                    onChange={updateData}
                  />
                </Col>
                <Col>
                  <Input
                    type="text"
                    name="lastname"
                    tabIndex="2"
                    placeholder="Apellidos"
                    required
                    onChange={updateData}
                  />
                  <Input
                    type="email"
                    name="email"
                    tabIndex="4"
                    placeholder="Correo"
                    required
                    onChange={updateData}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <div className="form-title">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <Label>Motivo</Label>
                </div>
                <Input
                  type="textarea"
                  name="message"
                  tabIndex="5"
                  placeholder="Mensaje"
                  required
                  onChange={updateData}
                />
              </FormGroup>
              <Button color="primary" tabIndex="5" onClick={() => contactUs(formData)}>
                Enviar
              </Button>
            </Form>
          ) : (
            <div className="form-container">
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
        <Col md={7}>
          <Map
            source={
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d832.1722723612256!2d-70.66411451184945!3d-33.457405879914106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI3JzI2LjciUyA3MMKwMzknNDguOCJX!5e0!3m2!1ses!2sus!4v1568426455672!5m2!1ses!2sus"
            }
          />
        </Col>
        <Col md={5}>
          <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
            Para más información puede visitarnos en la Biblioteca Central de la
            Facultad de Ciencias Físicas y Matemáticas ubicada en Beauchef 850,
            Santiago
          </p>
          <div className="contact-success">
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
    return (
      <div
        style={{ width: "460px", height: "300px", border: "1px solid black" }}
      >
        No se ha podido cargar el mapa
      </div>
    );
  }
  const src = source;
  return (
    <div>
      <iframe
        src={src}
        style={{
          width: "100%",
          height: "300px",
          border: "0",
          allowFullScreen: "",
        }}
        title="Location Map"
      ></iframe>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacted: state.webadmin.contacted,
});

const mapActionsToProps = (dispatch) => ({
  contactUs: (form) => dispatch(webadmin.contactUs(form)),
});

export default connect(mapStateToProps, mapActionsToProps)(ContactUs);
