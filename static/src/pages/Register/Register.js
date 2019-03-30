import React, {Component} from 'react';
import RegisterLoginInfo from './RegisterLoginInfo';
import RegisterUserInfo from './RegisterUserInfo';

import {connect} from 'react-redux';
import {auth} from '../../actions';
import {Redirect} from 'react-router-dom';

class Register extends Component{
    constructor(Props){
        super(Props)
        this.state = {
            currentPage: 0,
            loginInfo: null
        }
        this.volver = this.volver.bind(this);
        this.saveUserInfo = this.saveUserInfo.bind(this);
        this.saveUserLogin = this.saveUserLogin.bind(this);
        this.registerToBack = this.registerToBack.bind(this);

    }

    volver(){
        if(this.state.currentPage !== 0){
            this.setState({
                currentPage : this.state.currentPage -1
            })
        }
    }

    saveUserLogin(info){
        this.setState({
            currentPage : this.state.currentPage + 1,
            loginInfo: {...info}
        })
    }

    saveUserInfo(info){

        this.setState({
            userInfo: {...info}
        })

        this.registerToBack();


        this.setState({
            currentPage : this.state.currentPage + 1,
        })
    }

    registerToBack(){
        console.log("Called the API")
        this.props.register(
            this.state.loginInfo.email,
            this.state.loginInfo.password)
    }

    render(){
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }

        var subRegister;
        switch (this.state.currentPage){
            case 0:
                subRegister = <RegisterLoginInfo saveInfo={this.saveUserLogin} cache={this.state.loginInfo}/>
                break;
            case 1:
                subRegister = <RegisterUserInfo goBack={this.volver} saveInfo={this.saveUserInfo}/>
                break;  
            case 2: 
                subRegister = <div class="container" style={{backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"}}>
                    <h1 style={{textAlign: "center", fontWeight: "bold"}}>¡Registro con éxito!</h1>
                    <span style={{textAlign: "center", display: "block", margin: "auto 1em auto 1em"}}>Por favor confirma tu correo electronico</span>
                </div> ;
                break;
            default:
                subRegister = <RegisterLoginInfo saveInfo={this.saveUserLogin} cache={this.state.loginInfo}/>
                break;
            }

            return(
                <div>
                    {subRegister}
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
        register: (username, password) => {
            return dispatch(auth.register(username, password));
        }
    };
}

export default connect(mapStateToProps,mapActionsToProps)(Register);
   