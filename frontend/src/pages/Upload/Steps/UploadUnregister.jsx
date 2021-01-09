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
} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from "react-redux";
import { webadmin } from "../../../actions";

const UploadUnregister = ({
  cache,
  previousStep,
  nextStep,
  sendAlert,
  validateFormBackend,
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

  const [info, setInfo] = useState(
    cache === null
      ? { ...cache.info }
      : {
          estudiante: false,
          generation: "",
        }
  );

  const updateForm = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const updateInfo = (e) =>
    setInfo({ ...info, [e.target.name]: e.target.checked });

  const checkGeneration = (e) => {
    setFormData({ ...formData, student: e.target.checked });
    setInfo({ ...info, estudiante: e.target.checked });
  };

  const updateGeneration = (e) =>
    setInfo({ ...info, generation: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isCaptchaEmpty()) {
      const captchaValue = recaptchaRef.getValue();
      // TODO refactor redux logic to make sense with the changes done in refactored UploadUnregister

      // TODO send the form to backend , make a user and login with that user
      validateFormBackend({ ...formData, recaptchaToken: captchaValue });
      recaptchaRef.reset();
      nextStep();
    } else {
      sendAlert("Debe rellenar el captcha", "warning");
    }
  };

  const isCaptchaEmpty = () => {
    const recaptchaValue = recaptchaRef.getValue();
    if (recaptchaValue == null || recaptchaValue == "") {
      return true;
    } else {
      return false;
    }
  };

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
        <FormGroup>
          <Label>¿Cuál o cuáles fueron sus roles (o son)?</Label>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="academico" onChange={updateInfo} />{" "}
              Académico
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="funcionario" onChange={updateInfo} />{" "}
              Funcionario
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="externo" onChange={updateInfo} />{" "}
              Externo a la comunidad
            </Label>
          </FormGroup>
          <Row form>
            <Col sm={3} form>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="estudiante"
                    onChange={checkGeneration}
                  />{" "}
                  Estudiante
                </Label>{" "}
              </FormGroup>
            </Col>
            <Col form>
              {formData.student ? (
                <label>
                  Generación:{" "}
                  <Input
                    type="Number"
                    max="3000"
                    onChange={updateGeneration}
                    min="1920"
                    placeholder="1920"
                  />{" "}
                </label>
              ) : null}
            </Col>
          </Row>
        </FormGroup>

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
  answerFormBackend: state.webadmin.recaptchaState,
});

const mapActionsToProps = (dispatch) => ({
  validateFormBackend: (value) => dispatch(webadmin.validateRecaptcha(value)),
});

export default connect(mapStateToProps, mapActionsToProps)(UploadUnregister);
