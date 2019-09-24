import React, { Component, Fragment } from "react";
import { user, misc } from "../../actions";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardImg,
  ButtonGroup,
  CardText,
  CardBody,
  Alert,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import UserDashboard from "./UserDashboard";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      dropdownOpen: false,
      user: { ...props.user },
      modal: false
    };
    this.genericChangeHandler = this.genericChangeHandler.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.fr = new FileReader();
    this.fr.onload = (function(theFile) {
      return function(e) {
        this.setState({ avatarPreview: e.target.result });
      };
    })(props.photo).bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !this.state.dropdownOpen,
      modal: !prevState.modal
    }));
  }
  componentWillMount() {
    const { user, auth } = this.props;

    this.props.setRoute("/userDashboard/");
  }
  genericChangeHandler(event) {
    this.setState({
      user: { ...this.state.user, [event.target.id]: event.target.value }
    });
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
        error: "La contraseña es demasiado corta. Minimo 8 caracteres"
      });
      return false;
    } else {
      return true;
    }
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.checkPassword()) {
      this.setState({ error: null });
      this.props.saveInfo(this.state);
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
    var { user } = this.state;
    var errorMessage;
    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );
    if (this.state.error !== undefined && this.state.error !== null) {
      errorMessage = <Alert color="warning">{this.state.error}</Alert>;
    } else {
      errorMessage = null;
    }
    return (
      <Container>
        <Row>
          <Col>
            <h2 style={styles.title}> Editar mi perfil</h2>
          </Col>
        </Row>
        <Row style={{ marginTop: "1em" }}>
          <Col sm="4" style={{ marginTop: "1em" }}>
            <Card>
              <CardImg top width="100%" src={user.avatar} />
              <CardBody style={{ backgroundColor: "#ebeeef" }}>
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}>
                  <DropdownToggle caret>Cambiar foto de perfil</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Remover foto actual</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <div
                        class="file-upload-btn"
                        style={{ display: "inline-block" }}>
                        <label for="file-upload-1">Subir foto</label>
                        <input
                          id="file-upload-1"
                          type="file"
                          name="uploaded"
                          overflow="hidden"
                          display="inline-block"
                        />
                      </div>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Elegir foto de mi galería </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </CardBody>
            </Card>
          </Col>
          <Col sm="8">
            <Container fluid>
              <Row>
                <Col>
                  <h2 style={{ margin: "0.5em 0" }}> Editar mis datos</h2>
                </Col>
              </Row>
              <Form onSubmit={this.onSubmit}>
                {errorMessage}
                <FormGroup row>
                  <Label for="name" sm={3}>
                    {" "}
                    Nombre
                  </Label>
                  <Col sm={9}>
                    <Input
                      id="first_name"
                      type="text"
                      onChange={this.genericChangeHandler}
                      required
                      value={this.state.user.first_name}></Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="lastname" sm={3}>
                    Apellido{" "}
                  </Label>
                  <Col sm={9}>
                    <Input
                      id="last_name"
                      type="text"
                      onChange={this.genericChangeHandler}
                      required
                      value={this.state.user.last_name}></Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="date" sm={3}>
                    Fecha de nacimiento
                  </Label>
                  <Col sm={9}>
                    <Input
                      id="birth_date"
                      type="date"
                      onChange={this.genericChangeHandler}
                      required
                      value={this.state.user.birth_date}></Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="email" sm={3}>
                    Correo electronico
                  </Label>
                  <Col sm={9}>
                    <Input
                      id="email"
                      type="email"
                      onChange={this.genericChangeHandler}
                      value={this.state.user.email}
                      required></Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="passwordCheck" sm={3}>
                    Actual Contraseña
                  </Label>
                  <Col sm={9}>
                    <Input
                      id="passwordCheck"
                      type="password"
                      onChange={this.genericChangeHandler}
                      value={this.state.user.passwordCheck}
                      required></Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="password" sm={3}>
                    Nueva Contraseña
                  </Label>
                  <Col sm={9}>
                    <Input
                      id="password"
                      type="password"
                      onChange={this.genericChangeHandler}
                      value={this.state.user.password}
                      required></Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="newPasswordCheck" sm={3}>
                    Repetir Contraseña
                  </Label>
                  <Col sm={9}>
                    <Input
                      id="newPasswordCheck"
                      type="password"
                      onChange={this.genericChangeHandler}
                      value={this.state.user.newPasswordCheck}
                      required></Input>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="rol" sm={3}>
                    Rol en la facultad
                  </Label>
                  <Col sm={9}>
                    <Input
                      id="rol_type"
                      type="select"
                      onChange={this.genericChangeHandler}
                      value={`${this.state.user.rol_type}`}
                      required>
                      <option value="1">Alumno</option>
                      <option value="2">Ex-Alumno</option>
                      <option value="3">Acad&eacute;mico</option>
                      <option value="4">Ex-Acad&eacute;mico</option>
                      <option value="5">Funcionario</option>
                      <option value="6">Externo</option>
                    </Input>
                  </Col>
                </FormGroup>
                <Button color="danger" onClick={this.toggle}>
                  Guardar Cambios
                </Button>
                <Modal
                  isOpen={this.state.modal}
                  fade={false}
                  toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle} close={closeBtn}>
                    Editar mis datos
                  </ModalHeader>
                  <ModalBody>
                    <FormGroup row style={{ textAlign: "center", offset: 2 }}>
                      <Label
                        for="passwordCheck"
                        sm={4}
                        style={{ textAlign: "center" }}>
                        Ingresa tu constraseña
                      </Label>
                      <Col sm={{ size: 6, offset: 0.5 }}>
                        <Input
                          id="passwordCheck"
                          type="password"
                          onChange={this.genericChangeHandler}
                          value={this.state.user.passwordCheck}
                          required
                          block></Input>
                      </Col>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>
                      Guardar
                    </Button>{" "}
                    <Button color="secondary" onClick={this.toggle}>
                      Cancelar
                    </Button>
                  </ModalFooter>
                </Modal>
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

const styles = {
  title: {
    color: "#ff5a60",
    textAlign: "center",
    margin: "1em"
  }
};

const mapStateToProps = state => {
  return {
    user: state.user.userData
  };
};

const mapActionsToProps = dispatch => {
  return {
    update: (first_name, last_name, password, birth_date, rol_type) => {
      return dispatch(
        user.update(first_name, last_name, password, birth_date, rol_type)
      );
    },
    setRoute: route => {
      return dispatch(misc.setCurrentRoute(route));
    }
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(EditProfile);
