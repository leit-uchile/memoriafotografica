import React, { useState, useCallback } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector, useDispatch } from "react-redux";
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
import { selectWebAdminContacted } from "../../reducers";
import "./styles.css";

const ContactUs = () => {
  const [formData, setData] = useState({});

  const contacted = useSelector(selectWebAdminContacted);
  const dispatch = useDispatch();

  const updateData = (e) => {
    setData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateCaptcha = () => {
    setData({ ...formData, recaptchaToken: recaptchaRef.getValue() });
  };

  const contactUs = useCallback(
    (form) => dispatch(webadmin.contactUs(form)),
    []
  );

  let recaptchaRef;

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="page-title">Contáctenos</h2>
        </Col>
      </Row>
      <Row>
        <Col className="white-box form-container">
          {!contacted ? (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                contactUs(formData);
                recaptchaRef.reset();
              }}
            >
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
              <hr />
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                ref={(el) => {
                  recaptchaRef = el;
                }}
                onChange={updateCaptcha}
              />
              <Button color="primary" tabIndex="5" type="submit">
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

export default ContactUs;
