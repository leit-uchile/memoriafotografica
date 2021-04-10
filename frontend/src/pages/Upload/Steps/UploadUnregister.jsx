import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faEnvelope,
  faChevronCircleRight,
  faChevronCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  ButtonGroup,
  Alert,
} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from "react-redux";
import { webadmin } from "../../../actions";

const UploadUnregister = ({
  cache,
  previousStep,
  nextStep,
  sendAlert,
  guestVerify,
  answerFormBackend,
}) => {
  let recaptchaRef;

  const [formData, setFormData] = useState(
    cache === {}
      ? {
          ...cache,
          error: null,
        }
      : {
          rol: "",
          student: false,
          email: "",
          name: "",
          lastname: "",
          recaptchaToken: "",
        }
  );

  const updateForm = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const updateInfo = (e) => {
    if (e.target.id === "Alumno" && e.target.checked) {
      setFormData({ ...formData, student: true, rol: e.target.value });
    } else {
      setFormData({ ...formData, student: false, rol: e.target.value });
    }
  };

  const [captchaError, setCaptchaError] = useState(false);
  const [rolError, setRolError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrorMessages();
    if (!captchaError && !rolError) {
      const captchaValue = recaptchaRef.getValue();
      // TODO send the form to backend , make a user and login with that user
      guestVerify({ ...formData, recaptchaToken: captchaValue });
      // TODO get token from backend
      recaptchaRef.reset();
      nextStep();
    }
  };

  const setErrorMessages = () => {
    isCaptchaEmpty ? setCaptchaError(true) : setCaptchaError(false);
    formData.rol === "" ? setRolError(true) : setRolError(false);
  };

  const isCaptchaEmpty = () => {
    const recaptchaValue = recaptchaRef.getValue();
    if (recaptchaValue == null || recaptchaValue == "") {
      return true;
    } else {
      return false;
    }
  };

  console.log(formData);
  return (
    <Container>
      <Row>
        <Col>
          <h2 className="page-title">
            Subir Fotograf&iacute;a / Cuentanos un poco sobre ti
          </h2>
        </Col>
      </Row>
      <Form onSubmit={onSubmit} className="white-box form-container">
        <div className="form-title">
          <FontAwesomeIcon icon={faUserFriends} />
          <Label> Acerca de la comunidad FCFM</Label>
        </div>
        <FormGroup tag="fieldset">
          <Label>¿Cuál es/fue su rol?</Label>
          <FormGroup check>
            <Input
              id="Alumno"
              type="radio"
              name="rol"
              onChange={updateInfo}
              value={1}
            />
            <Label check for="Alumno">
              Alumno
            </Label>
          </FormGroup>
          <FormGroup check>
            <Input
              id="Ex-alumno"
              type="radio"
              name="rol"
              onChange={updateInfo}
              value={2}
            />
            <Label check for="Ex-alumno">
              Ex-Alumno
            </Label>
          </FormGroup>
          <FormGroup check>
            <Input
              id="Académico"
              type="radio"
              name="rol"
              onChange={updateInfo}
              value={3}
            />
            <Label check for="Académico">
              Académico
            </Label>
          </FormGroup>
          <FormGroup check>
            <Input
              id="Ex-Académico"
              type="radio"
              name="rol"
              onChange={updateInfo}
              value={4}
            />
            <Label check for="Ex-Académico">
              Ex-Académico
            </Label>
          </FormGroup>
          <FormGroup check>
            <Input
              type="radio"
              name="rol"
              id="Funcionario"
              onChange={updateInfo}
              value={5}
            />
            <Label check for="Funcionario">
              Funcionario
            </Label>
          </FormGroup>
          <FormGroup check>
            <Input
              type="radio"
              name="rol"
              id="Externo"
              onChange={updateInfo}
              value={6}
            />
            <Label check for="Externo">
              Externo a la comunidad
            </Label>
          </FormGroup>
        </FormGroup>
        <Alert color="info" isOpen={rolError} toggle={() => setRolError(false)}>
          Debe seleccionar un rol
        </Alert>
        <div className="form-title">
          <FontAwesomeIcon icon={faEnvelope} />
          <Label> Si necesitamos contactarte</Label>
        </div>
        <FormGroup row>
          <Col sm={2}>
            <Label>Nombre: </Label>
          </Col>
          <Col sm={10}>
            <Input
              type="text"
              placeholder="Jose"
              onChange={updateForm}
              required
              name="name"
              value={formData.name}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={2}>
            <Label>Apellido: </Label>
          </Col>
          <Col sm={10}>
            <Input
              type="text"
              placeholder="Aguirre"
              onChange={updateForm}
              required
              name="lastname"
              value={formData.lastname}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={2}>
            <Label>Correo electronico: </Label>
          </Col>
          <Col sm={10}>
            <Input
              type="email"
              placeholder="jose.medina@memoria-uchile.cl"
              onChange={updateForm}
              required
              name="email"
              value={formData.email}
            />
          </Col>
        </FormGroup>
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
          ref={(el) => {
            recaptchaRef = el;
          }}
        />
        <Alert
          color="info"
          isOpen={captchaError}
          toggle={() => setCaptchaError(false)}
        >
          Debe rellenar el captcha
        </Alert>
        <ButtonGroup style={{ minWidth: "20em" }}>
          <Button onClick={previousStep}>
            <FontAwesomeIcon icon={faChevronCircleLeft} /> Volver
          </Button>
          <Button type="submit" color="primary">
            Continuar <FontAwesomeIcon icon={faChevronCircleRight} />
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  answerFormBackend: state.webadmin.guestState,
});

const mapActionsToProps = (dispatch) => ({
  guestVerify: (value) => dispatch(webadmin.GuestVerify(value)),
});

export default connect(mapStateToProps, mapActionsToProps)(UploadUnregister);
