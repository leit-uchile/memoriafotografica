import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button, Col, Row, Alert} from 'reactstrap';

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
                avatarPreview: "",
                rol: 1,
                difusion: ""
            }
        }
        this.checkPassword = this.checkPassword.bind(this);
        this.props = Props
        this.genericChangeHandler = this.genericChangeHandler.bind(this)
        this.fr = new FileReader();
        this.fr.onload = (function(theFile) {
            return function(e) {
            // Render thumbnail.
            this.setState({avatarPreview: e.target.result})
            };
        })(Props.photo).bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this)
    }

    genericChangeHandler(event){
        this.setState({ [event.target.id]: event.target.value});
    }

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

    handleFileSelect(e){
        var image; 
        var files = e.target.files;
        for(var i=0,f;f=files[i];i++){
            if (!f.type.match('image.*')) {
                continue;
            }else{
                image = f
                break;
            }
        }
        if(image){
            this.setState({avatar: image})
            this.fr.readAsDataURL(image)
        }else{
            this.setState({avatarPreview: "", avatar: ""})
        }
    }

    render(){
        var errorMessage;
        if(this.state.error !== undefined && this.state.error !== null){
            errorMessage = <Alert color="warning">{this.state.error}</Alert>
        }else{
            errorMessage = null;
        }

        var avatarPreview = this.state.avatarPreview === "" ? null : 
            <img src={this.state.avatarPreview} width="200px" height="200px"
            style={{borderRadius: "50%", margin: "0 auto", display: "block", objectFit: "cover"}}/>

        return (
            <div className="container" style={{backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"}}>
                
                <h1>Register</h1>
                
                <Form onSubmit={this.onSubmit}>
                    {errorMessage}
                    {avatarPreview}
                    <FormGroup>
                        <Label for="avatar">Avatar</Label>
                        <Input id="avatar" type="file" multiple={false} onChange={this.handleFileSelect}>Subir imagen</Input>
                    </FormGroup>
                    <Row form>
                        <Col sm={6}>
                            <FormGroup>
                                <Label for="name">Nombre: </Label>
                                <Input id="name" type="text" placeholder="Jose" 
                                onChange={this.genericChangeHandler} required value={this.state.name}></Input>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <Label for="lastname">Apellido: </Label>
                                <Input id="lastname" type="text" placeholder="Aguirre" 
                                onChange={this.genericChangeHandler} required value={this.state.lastname}></Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="date">Fecha de nacimiento</Label>
                        <Input id="date" type="date" onChange={this.genericChangeHandler} required
                        value={this.state.date}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Correo electronico</Label>
                        <Input id="email" type="email" placeholder="jose.medina@memoria-uchile.cl"
                        onChange={this.genericChangeHandler} value={this.state.email} required></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Contraseña</Label>
                        <Input id="password" type="password" onChange={this.genericChangeHandler} required></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="passwordCheck">Repetir Contraseña</Label>
                        <Input id="passwordCheck" type="password" onChange={this.genericChangeHandler} required></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="rol">Rol en la facultad</Label>
                        <Input id="rol" type="select" onChange={this.genericChangeHandler} value={this.state.rol} required>
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