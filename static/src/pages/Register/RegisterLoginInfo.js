import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button, Col, Row} from 'reactstrap';

class RegisterLoginInfo extends Component{
    constructor(Props){
        super(Props)
        if(Props.cache != null){
            this.state = {
                ...Props.cache,
                error: null
            }
        }else{
            this.state = {
                email : "",
                password: "",
                name: "",
                lastname: "",
                passwordCheck: "",
                date: "",
                avatar: "",
                rol: 1,
                difusion: ""
            }
        }
        this.checkPassword = this.checkPassword.bind(this);
        this.props = Props
    }

    updateName = e => {this.setState({name: e.target.value})};
    updateLastName = e => {this.setState({lastname: e.target.value})};
    updateEmail = e => {this.setState({email: e.target.value})};
    updatePassword = e => {this.setState({password: e.target.value})};
    updatePasswordCheck = e => {this.setState({passwordCheck: e.target.value})};
    updateDate = e => {this.setState({date: e.target.value})};
    updateRol = e => this.setState({rol: e.target.value});
    updateDif = e => this.setState({difusion: e.target.value});

    checkPassword(){
        if(this.state.password === ""){
            this.setState({error: "Por favor ingrese su contraseña"})
            return false;
        }else if(this.state.password !== this.state.passwordCheck){
            this.setState({error: "Las contraseñas son diferentes"})
            return false;
        }else if(this.state.password.length < 8){
            this.setState({error: "La contraseña es demasiado corta. Minimo 8 caracteres"})
            return false;
        }else{
            return true;
        }
    }

    onSubmit = e => {
        e.preventDefault();
        if(this.checkPassword()){
            this.setState({error: null})
            this.props.saveInfo(this.state)
        }
    }

    render(){
        var errorMessage;
        if(this.state.error !== undefined && this.state.error !== null){
            errorMessage = <div className="alert alert-warning">{this.state.error}</div>
        }else{
            errorMessage = null;
        }

        return (
            <div className="container" style={{backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"}}>
                
                <h1>Register</h1>
                
                <Form onSubmit={this.onSubmit}>
                    {errorMessage}
                    <Row form>
                        <Col sm={6}>
                            <FormGroup>
                                <Label for="registerName">Nombre: </Label>
                                <Input id="registerName" type="text" placeholder="Jose" 
                                onChange={this.updateName} required value={this.state.name}></Input>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <Label for="registerLastName">Apellido: </Label>
                                <Input id="registerLastName" type="text" placeholder="Aguirre" 
                                onChange={this.updateLastName} required value={this.state.lastname}></Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="registerBirthdate">Fecha de nacimiento</Label>
                        <Input id="registerBirthdate" type="date" onChange={this.updateDate} required
                        value={this.state.date}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="registerEmail">Correo electronico</Label>
                        <Input id="registerEmail" type="email" placeholder="jose.medina@memoria-uchile.cl"
                        onChange={this.updateEmail} value={this.state.email} required></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Contraseña</Label>
                        <Input id="password" type="password" onChange={this.updatePassword} required></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="passwordRepeat">Repetir Contraseña</Label>
                        <Input id="passwordRepeat" type="password" onChange={this.updatePasswordCheck} required></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="rol">Rol en la facultad</Label>
                        <Input id="rol" type="select" onChange={this.updateRol} value={this.state.rol} required>
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
                        <Input id="difusion" type="select" onChange={this.updateDif} 
                            value={this.state.difusion} required>
                            <option>internet</option>
                            <option>poster</option>
                            <option value="Correo">correo electrónico</option>
                            <option value="Amigo">un amigo</option>
                        </Input>
                    </FormGroup>
                    <Button>Finalizar</Button>
                </Form>
            </div>
        );
    }
}

export default RegisterLoginInfo;