import React, { Component } from "react";
import { user, site_misc } from "../../../actions";
import { connect } from "react-redux";
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
} from "reactstrap";
import UserPicture from "../../../components/UserPicture";
import CropPhoto from "../../../components/CropPhoto";
import "../styles.css";
import { bindActionCreators } from "redux";
import { selectUserData} from "../../../reducers";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      user: { ...props.user },
      modal_pass: false,
      modal_crop: false,
    };
    this.fr = new FileReader();
    this.fr.onload = (function (theFile) {
      return function (e) {
        this.setState({
          user: { ...this.state.user, avatar: e.target.result },
        });
        this.props.update(
          { id: this.state.user.id, avatar: this.state.avatar },
          false
        );
      };
    })(props.photo).bind(this);
  }

  toggleDropdown = (e) => {
    if (e.target.name === "untoggle") {
      return;
    }
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  toggleModalpass = () => {
    this.setState((prevState) => ({
      modal_pass: !prevState.modal_pass,
    }));
  };

  toggleModalCrop = () => {
    this.setState((prevState) => ({
      modal_crop: !prevState.modal_crop,
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

  genericChangeHandler = (event) => {
    this.setState({
      user: { ...this.state.user, [event.target.id]: event.target.value },
    });
  };
  checkboxChangeHandler = (event) => {
    this.setState({
      user: { ...this.state.user, [event.target.id]: event.target.checked },
    });
  };

  checkPassword = () => {
    if (this.state.user.password === "") {
      this.setState({ error: "Por favor ingrese su contraseña" });
      this.props.sendAlert("Por favor ingrese su contraseña", "warning");
      return false;
    } else if (this.state.user.password !== this.state.user.newPasswordCheck) {
      this.setState({ error: "Las contraseñas son diferentes" });
      this.props.sendAlert("Las contraseñas son diferentes", "warning");
      return false;
    } else if (this.state.user.password.length < 8) {
      this.setState({
        error: "La contraseña es demasiado corta. Minimo 8 caracteres",
      });
      this.props.sendAlert(
        "La contraseña es demasiado corta. Minimo 8 caracteres",
        "warning"
      );
      return false;
    } else {
      return true;
    }
  };

  /**
   * Submit user updates without avatar nor password
   */
  onSubmit = (e) => {
    e.preventDefault();

    let user_copy = { ...this.state.user };
    delete user_copy.avatar;
    delete user_copy.password;
    this.props.update(user_copy);
  };

  handleFileSelect = (e) => {
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
    this.handleUploadAvatar(image);
  };

  handleUploadAvatar = (newAvatar) => {
    if (newAvatar) {
      this.setState({ avatar: newAvatar });
      this.fr.readAsDataURL(newAvatar);
    } else {
      this.setState({ avatar: "" });
    }
  };

  render() {
    var { user } = this.state;

    return (
      <Container fluid className="dashboard">
        <Row>
          <Col>
            <h2
              style={{
                textAlign: "left",
              }}
            >
              Ajustes
            </h2>
          </Col>
        </Row>
        <Row>
          <Col md="3" style={{ padding: "0" }}>
            <Container fluid>
              <Row>
                <Col>
                  <div className="stat-box">
                    <Container fluid>
                      <Card className="user-dashboard-card">
                        <UserPicture
                          user={user}
                          dims={200}
                          render={(user) => (
                            <CardImg
                              top
                              height="200"
                              width="200"
                              src={user.avatar}
                            />
                          )}
                        />
                        <CardBody>
                          <ButtonDropdown
                            isOpen={this.state.dropdownOpen}
                            toggle={this.toggleDropdown}
                            className="btn-block"
                          >
                            <DropdownToggle caret>
                              Cambiar foto de perfil
                            </DropdownToggle>
                            <DropdownMenu className="edit-profile-dropdown">
                              <DropdownItem
                                hidden={user.avatar === null}
                                onClick={this.toggleModalCrop}
                              >
                                Editar fotografía
                                <CropPhoto
                                  isOpen={this.state.modal_crop}
                                  src={user.avatar}
                                  handleToggle={this.toggleModalCrop}
                                  saveAvatar={(newAvatar) =>
                                    this.handleUploadAvatar(newAvatar)
                                  }
                                />
                              </DropdownItem>
                              <DropdownItem
                                divider
                                hidden={user.avatar === null}
                              />
                              <DropdownItem
                                className="upload-btn-wrapper"
                                name="untoggle"
                                onClick={() =>
                                  document
                                    .getElementById("upload-avatar")
                                    .click()
                                }
                              >
                                Subir fotografía
                                <input
                                  id="upload-avatar"
                                  type="file"
                                  style={{ display: "none" }}
                                  multiple={false}
                                  onChange={this.handleFileSelect}
                                  name="untoggle"
                                />
                              </DropdownItem>
                              <DropdownItem>
                                Elegir foto de mi galería
                              </DropdownItem>
                            </DropdownMenu>
                          </ButtonDropdown>
                        </CardBody>
                      </Card>
                    </Container>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="stat-box">
                    <Container fluid className="stat-box-header">
                      <h2>Seguridad</h2>
                    </Container>
                    <hr />
                    <Container fluid>
                      <Button
                        color="primary"
                        onClick={this.toggleModalpass}
                        block
                      >
                        Cambiar contraseña{" "}
                      </Button>
                    </Container>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col>
            <div className="stat-box">
              <Container fluid className="stat-box-header">
                <h2>Mis datos</h2>
              </Container>
              <hr />
              <Container fluid>
                <Row>
                  <Col className="edit-profile">
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
                      <FormGroup row>
                        <Label sm={3}>Perfil público</Label>
                        <Col sm={9}>
                          <input
                            type="checkbox"
                            class="toggle-button"
                            id="public_profile"
                            checked={this.state.user.public_profile}
                            onChange={this.checkboxChangeHandler}
                          />
                          <label for="public_profile"></label>
                          <Row>
                            <Col style={{ paddingTop: "0" }}>
                              <p style={{ margin: "0" }}>
                                Si activas esta opción, los demás podrán ver tu
                                información personal como las fotografías que
                                has subido y tus álbumes
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </FormGroup>
                      <hr />
                      <Button color="primary">Guardar cambios</Button>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </div>
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
            <Button color="primary" onClick={this.changePassword}>
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

const mapStateToProps = (state) => ({
  user: selectUserData(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      update: user.editProfile,
      updatePassword: user.updatePassword,
      sendAlert: site_misc.setAlert,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(EditProfile);
