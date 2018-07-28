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
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>Login</h1>
                    <fieldset>
                        {this.props.errors.length > 0 && (
                            <ul>
                            {this.props.errors.map(error => (
                                <li key={error.field}>{error.message}</li>
                            ))}
                            </ul>
                        )}
                        <p>
                            <label htmlFor="username">Nombre de usuario</label>
                            <input type="text" onChange={this.updateUserName}/>
                        </p>
                        <p>
                            <label htmlFor="username">Nombre de usuario</label>
                            <input type="password" onChange={this.updatePassword}/>
                        </p>
                    </fieldset>
                    <button type="submit">Entrar</button>
                </form>
                <div>
                    <Link to={"/register"}>¿No tienes cuenta? Registrate</Link>
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