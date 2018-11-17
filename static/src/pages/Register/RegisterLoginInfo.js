import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';


class RegisterLoginInfo extends Component{
    constructor(Props){
        super()
        this.state = {
            email : "",
            password: "",
            rut: "",
            name: "",
            lastname: "",
            passwordCheck: "",
            date: "",
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

    onSubmit = e => {
        e.preventDefault();
        if(this.checkPassword()){
            this.setState({error: null})
            this.props.saveInfo(this.state)
        }
    }

    render() {

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
            <div class="container">
                <div class="container"><h1>Register</h1></div>
                <form onSubmit={this.onSubmit}>
                    {errorMessage}
                 <div>
                    <p>
                        <label>
                            Nombre : <input type="text" placeholder="Rosa" onChange={this.updateName} required></input>
                        </label>
                    </p>
                    <p>
                        <label>
                            Apellido : <input type="text" placeholder="Leal" onChange={this.updateLastName}required></input>
                        </label>
                    </p>
                     <p>
                        <label>
                            Fecha de nacimiento : <input type="date" onChange={this.updateDate} id="date" required></input>
                        </label>
                    </p>
                    <p>
                        <label>
                            Correo electronico : <input type="email" placeholder="usuario@leit.cl" onChange={this.updateEmail}required></input>
                        </label>
                    </p>
                    <p>
                        <label>
                            Contraseña : <input type="password" onChange={this.updatePassword} method="post"required></input>
                        </label>
                    </p>
                    <p>
                        <label>
                            Repita su contraseña: <input type="password" onChange={this.updatePasswordCheck} method="post"required></input>
                        </label>
                    </p>
                  
                </div>
                <button type="submit">Continuar</button>    
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

export default RegisterLoginInfo;