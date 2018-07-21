import React, { Component } from 'react';
import {Link} from 'react-router-dom';


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

    sendForm = function(){
        alert("Aun no implementado")
        console.log(this.state)
    }

    render(){
        return(
            <div>
                <form onSubmit={this.sendForm}>
                    <h1>Login</h1>
                    <fieldset>
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
            </div>
        );
    }

}

export default Login;