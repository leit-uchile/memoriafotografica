import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {auth} from '../actions';
import {connect} from 'react-redux';

class Login extends Component{

    constructor(){
        super();
        this.state = {
            email : "",
            password : "",
        }
    }

    updateEmail = e => {this.setState({email : e.target.value})}

    updatePassword = e => {this.setState({password : e.target.value})}

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password);
    }

    render(){

        if (this.props.isAuthenticated) {   
            return <Redirect to="/" />
        }

        return(
            <div className='modal-dialog text-center'>
                    <div className='col-sm-9 main-section'>
                        <div className='modal-content'>
                                <h1>Inicia sesión</h1>
                                <form onSubmit={this.onSubmit}>
                                    <fieldset>
                                        {this.props.errors.length > 0 && (
                                            <ul>
                                            {this.props.errors.map(error => (
                                                <li key={error.field}>{error.message}</li>
                                            ))}
                                            </ul>
                                        )}
                                            <div className='col-12 form-input'>
                                                <div className='form-group'>
                                                    <div className='input-group'>
                                                        <div className='input-group-prepend'>
                                                            <span className='input-group-text'>
                                                                <i className="fas fa-user"></i>
                                                            </span>
                                                        </div>
                                                            <input type="text" className='form-control' onChange={this.updateEmail} placeholder='Correo Electronico'/>
                                                    </div>
                                                </div>
                                                <div className='form-group'>
                                                    <div className='input-group'>
                                                        <div className='input-group-prepend'>
                                                            <span className='input-group-text'>
                                                                <i className="fas fa-unlock"></i>
                                                            </span>
                                                        </div>
                                                            <input type="password" className='form-control' onChange={this.updatePassword} placeholder='Contraseña'/>
                                                    </div>
                                                </div>
                                                <div className='form-group'>
                                                    <button className='btn btn-danger' type="submit">Entrar</button>
                                                </div>
                                            </div>
                                    </fieldset>
                                </form>

                            <div className='col-12 forgot'>
                                <Link to={"/register"}>¿No tienes cuenta? Regístrate</Link>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
        return {field, message: state.auth.errors[field]};
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated
    };
  }
  
const mapActionsToProps = dispatch => {
    return {
        login: (email, password) => {
          return dispatch(auth.login(email, password));
        }
    };
}

export default connect(mapStateToProps, mapActionsToProps)(Login);