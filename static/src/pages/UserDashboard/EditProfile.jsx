import React, { Component, Fragment } from 'react';
import { user, misc } from "../../actions";
import { connect } from "react-redux";
import {
    Container, Row, Col, Button, Card, CardImg, ButtonGroup,
    CardText, CardBody, Alert, ButtonDropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Form, FormGroup, Label, Input
} from 'reactstrap';

import UserDashboard from './UserDashboard';


class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false

        };
        this.genericChangeHandler = this.genericChangeHandler.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.fr = new FileReader();
        this.fr.onload = (function (theFile) {
            return function (e) {
                this.setState({ avatarPreview: e.target.result });
            };
        })(props.photo).bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    componentWillMount() {
        const { user, auth } = this.props;

        this.props.setRoute("/userDashboard/");
    }
    genericChangeHandler(event) {
        this.setState({ [event.target.id]: event.target.value });
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
        const { user } = this.props;
        var errorMessage;
        if (this.state.error !== undefined && this.state.error !== null) {
          errorMessage = <Alert color="warning">{this.state.error}</Alert>;
        } else {
          errorMessage = null;
        }
        return (
            <Container fluid>
                <h2> Editar mi perfil</h2>
                <Row style={{ marginTop: "1em" }}>
                    <Col sm="4" style={{ marginTop: "1em" }}>
                        <Card>
                            <CardImg top width="100%"  src={user.avatar} />
                            <CardBody style={{ backgroundColor: '#ebeeef' }}>
                                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle caret>
                                        Cambiar foto de perfil
                                     </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Remover foto actual</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem >
                                            <div class="file-upload-btn" style={{ display: "inline-block" }}>
                                                <label for="file-upload-1">Subir foto</label>
                                                <input id="file-upload-1" type="file" name="uploaded" 
                                                overflow="hidden" display="inline-block" />
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
                                    <h2 style={{ margin: "0.5em" }}> Editar mis datos</h2>
                                </Col>
                            </Row>
                            <Form onSubmit={this.onSubmit}>
                                {errorMessage}
                                <FormGroup row>
                                    <Label for="name" sm={2}> Nombre</Label>
                                    <Col sm={8}>
                                        <Input
                                            id="name"
                                            type="text"

                                            onChange={this.genericChangeHandler}
                                            required
                                            value={user.first_name} >
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="lastname" sm={2}>Apellido </Label>
                                    <Col sm={8}>
                                        <Input
                                            id="lastname"
                                            type="text"
                                            onChange={this.genericChangeHandler}
                                            required
                                            value={user.last_name}></Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="date" sm={2}>Fecha de nacimiento</Label>
                                    <Col sm={8}>
                                        <Input
                                            id="date"
                                            type="date"
                                            onChange={this.genericChangeHandler}
                                            required
                                            value={user.birth_date}></Input>
                                    </Col>

                                </FormGroup>
                                <FormGroup row>
                                    <Label for="email" sm={2}>Correo electronico</Label>
                                    <Col sm={8}>
                                        <Input
                                            id="email"
                                            type="email"
                                            onChange={this.genericChangeHandler}
                                            value={user.email}
                                            required></Input>
                                    </Col>

                                </FormGroup>
                                <FormGroup row>
                                    <Label for="passwordCheck" sm={2}>Actual Contraseña</Label>
                                    <Col sm={8}>
                                        <Input
                                            id="passwordCheck"
                                            type="password"
                                            onChange={this.genericChangeHandler}
                                            placeholder="..."
                                            required></Input>
                                    </Col>

                                </FormGroup>
                                <FormGroup row>
                                    <Label for="password" sm={2}>Nueva Contraseña</Label>
                                    <Col sm={8}>
                                        <Input
                                            id="password"
                                            type="password"
                                            onChange={this.genericChangeHandler}
                                            required></Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="passwordCheck" sm={2}>Repetir Contraseña</Label>
                                    <Col sm={8}>
                                        <Input
                                            id="passwordCheck"
                                            type="password"
                                            onChange={this.genericChangeHandler}
                                            required></Input>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="rol" sm={2}>Rol en la facultad</Label>
                                    <Col sm={8}>
                                        <Input
                                            id="rol"
                                            type="select"
                                            onChange={this.genericChangeHandler}
                                            value={`${user.rol_type}`}
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
                                <Button> Guardar </Button>
                            </Form>
                        </Container>
                    </Col>
                </Row>

            </Container >
        )

    }
};
const mapStateToProps = state => {
    return {
        data: state.user,
        user: state.auth.user,
        auth: state.auth.token
    };
};
const mapActionsToProps = dispatch => {
    return {
        onLoadGetPhotos: (auth, user_id, limit, offset) => {
            return dispatch(user.getUserPhotos(auth, user_id, limit, offset));
        },
        setRoute: route => {
            return dispatch(misc.setCurrentRoute(route));
        }
    };
};
export default connect(
    mapStateToProps,
    mapActionsToProps)
    (EditProfile);