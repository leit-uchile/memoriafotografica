import React, { Component } from "react";
import { user, misc, alert } from "../../actions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardImg,
  CardBody,
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
  ModalFooter,
  FormText
} from "reactstrap";
import UserPicture from "../../components/UserPicture";
import CropPhoto from "../../components/CropPhoto";
import "./style.css";
import "./Profile/userDashboard.css";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      user: { ...props.user },
      modal_pass: false,
      modal_crop: false,
      newAvatar: null
    };
    this.fr = new FileReader();
    this.fr.onload = (function(theFile) {
      return function(e) {
        this.setState({
          user: { ...this.state.user, avatar: e.target.result }
        });
        this.props.update(
          { id: this.state.user.id, avatar: this.state.avatar },
          false
        );
      };
    })(props.photo).bind(this);
  }

  handleFileSelect = e => {
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
      this.fr.readAsDataURL(image);
    }
  };

  toggleDropdown = e => {
    if (e.target.name === "untoggle") {
      return;
    }
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  toggleModalpass = () => {
    this.setState(prevState => ({
      modal_pass: !prevState.modal_pass
    }));
  };

  toggleModalCrop = () => {
    this.setState(prevState => ({
      modal_crop: !prevState.modal_crop
    }));
  };

  changePassword = () => {
    if (this.state.modal_pass && this.checkPassword()) {
      this.props.updatePassword(
        this.state.user.passwordCheck,
        this.state.user.newPasswordCheck
      );
    }
    this.toggleModalpass();
  };

  componentWillMount() {
    this.props.setRoute("/userDashboard/");
  }

  genericChangeHandler = event => {
    this.setState({
      user: { ...this.state.user, [event.target.id]: event.target.value }
    });
  };

  checkPassword = () => {
    if (this.state.user.password === "") {
      this.setState({ error: "Por favor ingrese su contraseña" });
      this.props.sendAlert("Por favor ingrese su contraseña");
      return false;
    } else if (this.state.user.password !== this.state.user.newPasswordCheck) {
      this.setState({ error: "Las contraseñas son diferentes" });
      this.props.sendAlert("Las contraseñas son diferentes");
      return false;
    } else if (this.state.user.password.length < 8) {
      this.setState({
        error: "La contraseña es demasiado corta. Minimo 8 caracteres"
      });
      this.props.sendAlert(
        "La contraseña es demasiado corta. Minimo 8 caracteres"
      );
      return false;
    } else {
      return true;
    }
  };

  /**
   * Submit user updates without avatar nor password
   */
  onSubmit = e => {
    e.preventDefault();

    let user_copy = { ...this.state.user };
    delete user_copy.avatar;
    delete user_copy.password;
    this.props.update(user_copy);
  };

  handleFileSelect = e => {
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
      this.setState({ avatar: "" });
    }
  };

  handleCrop(newPhoto) {
    this.setState({ newAvatar: newPhoto });
    this.props.update(
      { id: this.state.user.id, avatar: this.state.newAvatar },
      false
    );
  }

  render() {
    var { user } = this.state;

    return (
      <Container style={{ marginBottom: "2em" }}>
        <Row>
          <Col sm="3" style={{ marginTop: "2em" }}>
            <Button
              style={{ margin: "0 auto" }}
              color="secondary"
              tag={Link}
              to="./dashboard"
            >
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />{" "}Volver
            </Button>
          </Col>
          <Col sm="9">
            <h2 style={styles.title}> Editar mi perfil</h2>
          </Col>
        </Row>
        <Row>
          <Col md="3">
            <Card className="user-dashboard-card">
              <UserPicture
                user={user}
                dims={200}
                render={user => <CardImg top width="100%" src={user.avatar} />}
              />
              <CardBody>
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggleDropdown}
                  className="btn-block"
                >
                  <DropdownToggle caret>Cambiar foto de perfil</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.toggleModalCrop}>
                      Editar fotografía
                      <CropPhoto
                        src={user.avatar}
                        isOpen={this.state.modal_crop}
                        handleToggle={this.toggleModalCrop}
                        save={newAvatar => this.handleCrop(newAvatar)}
                      />
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      className="upload-btn-wrapper"
                      name="untoggle"
                    >
                      Subir fotografia
                      <input
                        id="file-upload-1"
                        type="file"
                        style={{ cursor: "pointer" }}
                        multiple={false}
                        onChange={this.handleFileSelect}
                        name="untoggle"
                      ></input>
                    </DropdownItem>
                    <DropdownItem>Elegir foto de mi galería</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                <Button color="primary" onClick={this.toggleModalpass} block>
                  Cambiar contraseña{" "}
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col sm="9">
            <Container fluid>
              <Row className="user-dashboard-row">
                <Col style={{marginBottom: "1em"}}>
                  <h2 style={{ margin: "0.5em 0" }}> Editar mis datos</h2>
                  <Form onSubmit={this.onSubmit}>
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
                          value={this.state.user.first_name}
                        ></Input>
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
                          value={this.state.user.last_name}
                        ></Input>
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
                          value={this.state.user.birth_date}
                        ></Input>
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
                          required
                        ></Input>
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
                          required
                        >
                          <option value="1">Alumno</option>
                          <option value="2">Ex-Alumno</option>
                          <option value="3">Acad&eacute;mico</option>
                          <option value="4">Ex-Acad&eacute;mico</option>
                          <option value="5">Funcionario</option>
                          <option value="6">Externo</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <Button color="success">Guardar Cambios</Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Modal isOpen={this.state.modal_pass} toggle={this.toggleModalpass}>
          <ModalHeader toggle={this.toggleModalpass}>
            Actualizar Contraseña
          </ModalHeader>
          <ModalBody>
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
                  required
                ></Input>
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
                  required
                ></Input>
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
                  required
                ></Input>
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.changePassword}>
              Actualizar
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleModalpass}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

const styles = {
  title: {
    textAlign: "center",
    margin: "1em"
  }
};

const mapStateToProps = state => ({
  user: state.user.userData
});

const mapActionsToProps = dispatch => ({
  update: (userInfo, doJSON = true) =>
    dispatch(user.editProfile(userInfo, doJSON)),
  updatePassword: (old_p, new_p) => dispatch(user.updatePassword(old_p, new_p)),
  setRoute: route => dispatch(misc.setCurrentRoute(route)),
  sendAlert: text => dispatch(alert.setAlert(text, "warning"))
});

export default connect(mapStateToProps, mapActionsToProps)(EditProfile);
