import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, Redirect } from "react-router-dom";
import {
  faUserFriends,
  faEnvelope,
  faChevronCircleRight,
  faChevronCircleLeft,
  faFileExcel,
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
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from "react-redux";
import { webadmin } from "../../../actions";

const UploadUnregister = ({
  cache,
  previousStep,
  nextStep,
  guestVerify,
  guestState,
  saveToken,
}) => {
  const history = useHistory();

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
  const [captchaValue, setCaptchaValue] = useState();

  useEffect(() => {
    console.log(guestState);
    if (guestState) {
      if (!guestState.redirect) {
        saveToken(guestState.token);
        nextStep();
      } else {
        switch (guestState.redirect) {
          case "login":
            setModalTitle("Usuario ya existente");
            setModalBody(
              "Detectamos que ya tienes una cuenta registrada, porfavor dirigete al login y sube tus fotografías una vez logeado."
            );
            setModalFooter(
              <Button
                color="primary"
                onClick={() => {
                  history.push("/login");
                }}
              >
                Ir a login
              </Button>
            );
            setModal(true);
            break;
          case "activate_user":
            setModalTitle("Usuario inactivo");
            setModalBody(
              "Detectamos que ya tienes una cuenta registrada pero inactiva, porfavor revisa tu correo y activa tu cuenta."
            );
            setModalFooter(
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <Button
                  color="primary"
                  onClick={() => {
                    //TODO reenviar correo de activacion
                    setModalBody("Te hemos reenviado el correo de actvacion");
                    setModalFooter(
                      <Button
                        color="primary"
                        onClick={() => {
                          history.push("/");
                        }}
                      >
                        Volver al inicio
                      </Button>
                    );
                  }}
                >
                  Reenviar correo de activacion
                </Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Volver al inicio
                </Button>
              </div>
            );
            setModal(true);
            // history.push('/')
            break;
          case "guest_complete_registration":
            // history.push('/')
            break;
          default:
            return;
        }
      }
    }
  }, [guestState]);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrorMessages();
    if (captchaValue && !rolError) {
      guestVerify({ ...formData, recaptchaToken: captchaValue });
    }
  };

  const setErrorMessages = () => {
    captchaValue ? setCaptchaError(false) : setCaptchaError(true);
    formData.rol === "" ? setRolError(true) : setRolError(false);
  };

  const [modal, setModal] = useState(false);
  const [modalBody, setModalBody] = useState("HABER");
  const [modalTitle, setModalTitle] = useState("ola joben");
  const [modalFooter, setModalFooter] = useState("");

  const toggle = () => setModal(!modal);

  return (
    <Container>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        <ModalBody>{modalBody}</ModalBody>
        <ModalFooter>{modalFooter}</ModalFooter>
      </Modal>

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
          onChange={(value) => setCaptchaValue(value)}
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
  guestState: state.webadmin.guestState,
});

const mapActionsToProps = (dispatch) => ({
  guestVerify: (value) => dispatch(webadmin.GuestVerify(value)),
});

export default connect(mapStateToProps, mapActionsToProps)(UploadUnregister);
