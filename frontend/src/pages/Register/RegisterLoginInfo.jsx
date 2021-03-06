import React, { Component } from "react";
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
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Container,
} from "reactstrap";

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
  }

  toggleCropModal(e) {
    this.setState({ cropModal: !this.state.cropModal });
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
      this.setState({ error: null });
      this.props.saveInfo(this.state);
      // From StepWizard
      this.props.nextStep();
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
              <FormGroup check>
                <Input
                  type="checkbox"
                  name="termsOfUse"
                  checked={this.state.termsOfUseAcepted}
                  onClick={this.toggleTermsValue}
                  required
                />
                <Label for="termsOfUse" check onClick={this.toggleTerms}>
                  Acepto los{" "}
                  <span style={{ color: "blue", cursor: "pointer" }}>
                    terminos de uso
                  </span>
                </Label>
              </FormGroup>
              <div style={{ marginTop: "2em", marginBottom: "2em" }}>
                <TermsOfUseModal
                  isOpen={this.state.termsOfUseModal}
                  toggleFunc={this.toggleTerms}
                  acceptTerms={this.acceptTerms}
                />
              </div>

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

const TermsOfUseModal = ({
  isOpen,
  toggleFunc,
  acceptTerms,
  className,
  ...props
}) => (
  <Modal isOpen={isOpen} toggle={toggleFunc} className={className}>
    <ModalHeader toggle={toggleFunc}>T&eacute;rminos de uso</ModalHeader>
    <ModalBody>
      <p>
        La Biblioteca Central de la FCFM, respondiendo a su misión de
        centralizar, sistematizar y poner a disposición información de interés
        para la comunidad, ofrece al público una recopilación de fotografías que
        evocan la historia de la Escuela de InJeniería de la Universidad de
        Chile, de quienes han pasado por ella y de los hitos que han marcado su
        trayectoria desde sus comienzos hasta la actualidad. <br />
        <br />
        El acceso a la información de este sitio web es gratuito y no requiere
        registro previo. Sin perjuicio de ello, es necesario registrarse tanto
        para solicitar información o el uso de las imágenes del sitio, como para
        aportarla. <br />
        <br />
        Esta plataforma tiene por finalidad la consolidación de un espacio
        participativo destinado a preservar la memoria de esta Facultad, por lo
        que cualquier persona puede contribuir mediante la aportación de
        material fotográfico o de los antecedentes que conozca respecto de
        cualquiera de las imágenes expuestas. Para facilitar este proceso, el
        usuario puede crear una cuenta desde la cual interactuar con el sitio.{" "}
        <br />
        <br />
        Los contenidos de este portal están protegidos por la{" "}
        <b>Ley 17.336 sobre Propiedad Intelectual</b>, por lo que la Universidad
        sólo puede conceder licencias de uso respecto de las imágenes sobre las
        que tiene titularidad. Cuando sean solicitadas licencias sobre
        materiales ajenos a la misma, se remitirá al usuario la información de
        su respectivo titular para que este pueda dirigirse ante quien
        corresponda.
        <br />
        <br />
        La Biblioteca se reserva el derecho de administrar, crear y modificar
        los contenidos, las prestaciones y servicios que ofrece esta plataforma,
        siendo todos ellos susceptibles de cambio sin que exista obligación para
        la Biblioteca de comunicarlo a sus usuarios.
      </p>
    </ModalBody>
    <ModalFooter>
      <Button
        color="primary"
        onClick={(e) => {
          acceptTerms();
          toggleFunc(e);
        }}
      >
        Acepto los t&eacute;rminos de uso de la plataforma
      </Button>{" "}
    </ModalFooter>
  </Modal>
);

export default RegisterLoginInfo;
