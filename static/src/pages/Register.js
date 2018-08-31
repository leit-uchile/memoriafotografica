import React, {Component} from 'react';
import {auth} from '../actions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Register extends Component{
    constructor(){
        super()
        this.state = {
            email : "",
            password: "",
            rut: "",
            name: "",
            lastname: "",
            passwordCheck: ""
        }
        this.checkPassword = this.checkPassword.bind(this);
        this.checkRut = this.checkRut.bind(this);
    }

    updateName = e => {this.setState({name: e.target.value})};
    updateLastName = e => {this.setState({lastname: e.target.value})};
    updateRut = e => {this.setState({rut: e.target.value})};
    updateEmail = e => {this.setState({email: e.target.value})};
    updatePassword = e => {this.setState({password: e.target.value})};
    updatePasswordCheck = e => {this.setState({passwordCheck: e.target.value})};

    checkPassword(){
        if(this.state.password == ""){
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

    checkRut(){
        var len = this.state.rut.length;
        // -------------------------------------
        // TODO :  Check rut with formula ! 
        // -------------------------------------
        if(len >= 7 && len <9){
            return true;
        }else{
            this.setState({error: "Rut invalido"})
        }
    }

    onSubmit = e => {
        e.preventDefault();
        if(this.checkPassword() && this.checkRut()){
            this.setState({error: null})
            this.props.register(this.state.email,this.state.password);
        }
    }

    render(){
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }

        var errorMessage;
        if(this.state.error != undefined && this.state.error != null){
            errorMessage = <div className="errorMessage">{this.state.error}</div>
        }else{
            errorMessage = null;
        }

        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.onSubmit}>
                    {errorMessage}
                    <p>
                        <label>
                            Nombre : <input type="text" placeholder="Rosa" onChange={this.updateName}></input>
                        </label>
                    </p>
                    <p>
                        <label>
                            Apellido : <input type="text" placeholder="Leal" onChange={this.updateLastName}></input>
                        </label>
                    </p>
                    <p>
                        <label>
                            Rut : <input type="text" placeholder="11111112" onChange={this.updateRut}></input>
                        </label>
                    </p>
                    <p>
                        <label>
                            Correo electronico : <input type="email" placeholder="usuario@leit.cl" onChange={this.updateEmail}></input>
                        </label>
                    </p>
                    <p>
                        <label>
                            Contraseña : <input type="password" onChange={this.updatePassword}></input>
                        </label>
                    </p>
                    <p>
                        <label>
                            Repita su contraseña: <input type="password" onChange={this.updatePasswordCheck}></input>
                        </label>
                    </p>
                    <button type="submit">Registrar</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.isAuthenticated
    }
}

const mapActionsToProps = dispatch => {
    return {
        register: (username, password) => dispatch(auth.register(username, password))
    };
}

export default connect(mapStateToProps,mapActionsToProps)(Register);