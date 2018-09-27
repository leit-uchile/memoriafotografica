import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../actions';
import {connect} from 'react-redux';

class Login extends Component{

    constructor(){
        super();
        this.state = {
            username : "",
            password : "",
        }
    }

    updateUserName = e => {this.setState({username : e.target.value})}

    updatePassword = e => {this.setState({password : e.target.value})}

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    render(){
        return(
            <div className='container'>

                    <div className='mx-5'>
                        <div className='card'>
                            <div className='card-body'>
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
                                        <div className='row'>
                                            <div className='col-sm-12 col-md-10 col-md-offset-1'>
                                                <div className='form-group'>
                                                    <div className='input-group'>
                                                        <div className='input-group-prepend'>
                                                            <span className='input-group-text'>
                                                                <i className="fas fa-user"></i>
                                                            </span>
                                                        </div>
                                                            <input type="text" className='form-control' onChange={this.updateUserName} placeholder='Nombre de Usuario'/>
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
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                            <div className='card-footer'>
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
        login: (username, password) => {
          return dispatch(auth.login(username, password));
        }
    };
}

export default connect(mapStateToProps, mapActionsToProps)(Login);