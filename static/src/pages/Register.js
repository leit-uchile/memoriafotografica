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
            <div class="container">
                <h1>Register</h1>
                <form onSubmit={this.onSubmit}>
                    {errorMessage}

                    <p>
                    <div>
                        <label> Nombre : </label>
                    </div>

                    <div >
                        <input type="text" placeholder="Rosa" class="form-control"onChange={this.updateName}></input>
                    </div>
                    </p>
                    <br/>


                    <p>
                    <div>
                        <label> Apellido : </label>
                    </div>

                     <div>
                        <input type="text" placeholder="Leal" class="form-control" onChange={this.updateLastName}></input>
                     </div>
                    </p>
                        <br/>


                    <p>
                        <div>
                        <label>
                            Rut :
                        </label>
                        </div>

                    <div>
                         <input type="text" placeholder="11111112" class="form-control" onChange={this.updateRut}></input>
                        </div>
                    </p>
                         <br/>

                    <p>
                        <div>
                        <label>
                            Correo electronico :
                        </label>
                        </div>
                        <div>
                        <input type="email" placeholder="usuario@leit.cl" class="form-control" onChange={this.updateEmail}></input>
                        </div>
                    </p>
                            <br/>


                    <p>
                       <div>
                        <label>
                            Contraseña :
                        </label>
                        </div>
                        <div>
                        <input type="password" class="form-control" onChange={this.updatePassword}></input>
                        </div>
                    </p>
                        <br/>

                    <p>
                        <div>
                        <label>
                            Repita su contraseña:
                        </label>
                        </div>
                        <div> <input type="password" class="form-control" onChange={this.updatePasswordCheck}></input> </div>
                    </p>
                        <br/>
                    <button type="submit" className='btn btn-danger' >Registrar</button>
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