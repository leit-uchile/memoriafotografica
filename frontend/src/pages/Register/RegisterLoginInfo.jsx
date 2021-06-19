import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faUser,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Row,
  Alert,
  Container,
} from "reactstrap";
import FormTermsOfUse from "../../components/TermsOfUse/FormTermsOfUse";

class RegisterLoginInfo extends Component {
  constructor(Props) {
    super(Props);
    if (Props.cache != null) {
      this.state = {
        ...Props.cache,
        error: null,
      };
    } else {
      this.state = {
        email: "",
        password: "",
        name: "",
        lastname: "",
        passwordCheck: "",
        date: "",
        avatar: "",
        avatarPreview: "",
        rol: 1,
        difusion: "",
        cropModal: false,
        termsOfUseModal: false,
        termsOfUseAcepted: false,
        recaptchaToken: "",
      };
    }
    this.checkPassword = this.checkPassword.bind(this);
    this.props = Props;
    this.genericChangeHandler = this.genericChangeHandler.bind(this);
    this.fr = new FileReader();
    this.fr.onload = (function (theFile) {
      return function (e) {
        // Render thumbnail.
        this.setState({ avatarPreview: e.target.result });
      };
    })(Props.photo).bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.toggleCropModal = this.toggleCropModal.bind(this);
    this.toggleTerms = this.toggleTerms.bind(this);
    this.acceptTerms = this.acceptTerms.bind(this);
    this.toggleTermsValue = this.toggleTermsValue.bind(this);
    this.onChangeCaptcha = this.onChangeCaptcha.bind(this);
  }

  toggleCropModal(e) {
    this.setState({ cropModal: !this.state.cropModal });
  }

  onChangeCaptcha() {
    const recaptchaToken = this.recaptcharef.getValue();
    this.setState({ recaptchaToken: recaptchaToken });
  }

  toggleTerms(e) {
    e.preventDefault();
    this.setState({ termsOfUseModal: !this.state.termsOfUseModal });
  }

  acceptTerms() {
    this.setState({ termsOfUseAcepted: true });
  }

  toggleTermsValue() {
    this.setState({ termsOfUseAcepted: !this.state.termsOfUseAcepted });
  }

  genericChangeHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  checkPassword() {
    if (this.state.password === "") {
      this.setState({ error: "Por favor ingrese su contraseña" });
      return false;
    } else if (this.state.password !== this.state.passwordCheck) {
      this.setState({ error: "Las contraseñas son diferentes" });
      return false;
    } else if (this.state.password.length < 8) {
      this.setState({
        error: "La contraseña es demasiado corta. Minimo 8 caracteres",
      });
      return false;
    } else {
      return true;
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.checkPassword()) {
      if (this.recaptcharef.getValue() == "") {
        this.setState({
          error: "Debe rellenar el recaptcha",
        });
      } else {
        this.setState({ error: null });
        this.props.saveInfo(this.state);
        // From StepWizard
        this.recaptcharef.reset();
        this.props.nextStep();
      }
    }
  };

  handleFileSelect(e) {
    var image;
    var files = e.target.files;
    for (var i = 0, f; (f = files[i]); i++) {
      if (!f.type.match("image.*")) {
        continue;
      } else {
        image = f;
        break;
      }
    }
    if (image) {
      this.setState({ avatar: image });
      this.fr.readAsDataURL(image);
    } else {
      this.setState({ avatarPreview: "", avatar: "" });
    }
  }

  render() {
    var errorMessage;
    if (this.state.error !== undefined && this.state.error !== null) {
      errorMessage = <Alert color="warning">{this.state.error}</Alert>;
    } else {
      errorMessage = null;
    }

    var avatarPreview =
      this.state.avatarPreview === "" ? null : (
        <img
          alt="avatar preview"
          src={this.state.avatarPreview}
          width="200px"
          height="200px"
          style={{
            borderRadius: "50%",
            margin: "0 auto",
            display: "block",
            objectFit: "cover",
          }}
        />
      );

    return (
      <Container>
        <Row>
          <Col>
            <h2 className="page-title">
              Subir Fotograf&iacute;a / Datos del usuario{" "}
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.onSubmit} className="white-box form-container">
              <div className="form-title">
                <FontAwesomeIcon icon={faUserCircle} />
                <Label for="avatar"> Avatar</Label>
              </div>
              {errorMessage}
              {avatarPreview}
              {this.state.avatar !== "" ? (
                <h4
                  className="form-subtitle"
                  style={{ textAlign: "center", marginTop: "4px" }}
                >
                  Podrás editarla en tu perfil
                </h4>
              ) : (
                <span></span>
              )}
              <FormGroup>
                <Input
                  type="file"
                  name="avatar"
                  multiple={false}
                  onChange={this.handleFileSelect}
                >
                  Subir imagen
                </Input>
              </FormGroup>
              <Row>
                <Col>
                  <div className="form-title">
                    <FontAwesomeIcon icon={faUser} />
                    <Label> Datos personales</Label>
                  </div>
                </Col>
              </Row>
              <Row form>
                <Col sm={6}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Nombre"
                      onChange={this.genericChangeHandler}
                      required
                      value={this.state.name}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col sm={6}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="lastname"
                      placeholder="Apellido"
                      onChange={this.genericChangeHandler}
                      required
                      value={this.state.lastname}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="date">Fecha de nacimiento</Label>
                <Input
                  type="date"
                  name="date"
                  onChange={this.genericChangeHandler}
                  required
                  value={this.state.date}
                ></Input>
              </FormGroup>
              <Row>
                <Col>
                  <div className="form-title">
                    <FontAwesomeIcon icon={faUserTag} />
                    <Label> Datos de usuario</Label>
                  </div>
                </Col>
              </Row>
              <FormGroup>
                <Label for="email">Correo electronico</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="ejemplo@leit.cl"
                  onChange={this.genericChangeHandler}
                  value={this.state.email}
                  required
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="password">Contraseña</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={this.genericChangeHandler}
                  required
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="passwordCheck">Repetir Contraseña</Label>
                <Input
                  type="password"
                  name="passwordCheck"
                  onChange={this.genericChangeHandler}
                  required
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="rol">Rol en la facultad</Label>
                <Input
                  type="select"
                  name="rol"
                  onChange={this.genericChangeHandler}
                  value={this.state.rol}
                  required
                >
                  <option value="1">Alumno</option>
                  <option value="2">Ex-Alumno</option>
                  <option value="3">Acad&eacute;mico</option>
                  <option value="4">Ex-Acad&eacute;mico</option>
                  <option value="5">Funcionario</option>
                  <option value="6">Externo</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="difusion">¿Como te enteraste de esta página?</Label>
                <Input
                  type="select"
                  name="difusion"
                  onChange={this.updateDif}
                  value={this.state.difusion}
                  required
                >
                  <option>internet</option>
                  <option>poster</option>
                  <option value="Correo">correo electrónico</option>
                  <option value="Amigo">un amigo</option>
                </Input>
              </FormGroup>

              <FormTermsOfUse
                termsValue={this.state.termsOfUseAcepted}
                setTermsValue={this.toggleTermsValue}
                isTermsModalOpen={this.state.termsOfUseModal}
                toggleTermsModal={this.toggleTerms}
              />

              <ReCAPTCHA
                ref={(r) => (this.recaptcharef = r)}
                sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                onChange={this.onChangeCaptcha}
              />

              <FormGroup>
                <Button color="primary">¡Reg&iacute;strame!</Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default RegisterLoginInfo;
