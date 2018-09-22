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
                <div className='row'>
                    <div className='col-sm-6 col-md-offset-4'>
                        <div className='panel panel-default'>
                            <div className='panel-body'>
                                <h1>Inicia sesion</h1>
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
                                                            <input type="text" className='form-control' onChange={this.updateUserName} placeholder='Nombre de Usuario'/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='form-group'>
                                                    <div className='input-group'>
                                                        <div className='input-group-prepend'>
                                                            <span className='input-group-text'>
                                                                <i className="fas fa-unlock"></i>
                                                            </span>
                                                            <input type="password" className='form-control' onChange={this.updatePassword} placeholder='Contraseña'/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <button type="submit">Entrar</button>
                                </form>
                            </div>
                            <div className='panel-footer'>
                                <Link to={"/register"}>¿No tienes cuenta? Registrate</Link>
                            </div>
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