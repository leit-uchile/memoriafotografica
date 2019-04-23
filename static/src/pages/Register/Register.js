import React, {Component} from 'react';
import RegisterLoginInfo from './RegisterLoginInfo';

import {connect} from 'react-redux';
import {auth} from '../../actions';
import ReactLoading from 'react-loading';
import {Button} from 'reactstrap';
import {Redirect} from 'react-router-dom'

class Register extends Component{
    constructor(Props){
        super(Props)
        this.state = {
            currentPage: 0,
            loginInfo: null,
            calledResgister: false
        }
        this.volver = this.volver.bind(this);
        this.saveUserLogin = this.saveUserLogin.bind(this);
        this.registerToBack = this.registerToBack.bind(this);

    }

    volver(){
        if(this.state.currentPage !== 0){
            this.setState({
                currentPage : this.state.currentPage - 1
            })
        }
        // Clear errors
        this.props.cleanErrors();
        this.setState({
            calledResgister: false
        })
    }

    saveUserLogin(info){
        this.setState({
            currentPage : this.state.currentPage + 1,
            loginInfo: {...info}
        })
    }

    registerToBack(){
        console.log("Called the API")
        this.setState({calledResgister: true})
        setTimeout(this.props.register, 2000,
            this.state.loginInfo.email,
            this.state.loginInfo.password,
            this.state.loginInfo.name,
            this.state.loginInfo.lastname,
            this.state.loginInfo.date,
            this.state.loginInfo.rol)
        
    }

    render(){
        if (this.props.isAuthenticated) {   
            return <Redirect to="/" />
        }

        const divStyle = {backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"};
        const h1Style = {textAlign: "center", fontWeight: "bold"}

        var subRegister;
        switch (this.state.currentPage){
            case 0:
                subRegister = <RegisterLoginInfo saveInfo={this.saveUserLogin} cache={this.state.loginInfo}/>
                break;
            case 1:
                // Call the API
                if(!this.state.calledResgister){
                    this.registerToBack()
                }

                if(this.props.isAuthenticated){
                    this.setState({currentPage: this.state.currentPage + 1})
                }

                if(this.props.errors.length > 0){
                    subRegister = <div className="container" style={divStyle} >
                        <h2> No pudimos realizar tu registro </h2>
                        <Button color="warning" onClick={this.volver}>Volver</Button>
                    </div>
                }else{
                    subRegister = <div className="container" style={divStyle} >
                        <h1 style={h1Style}>
                            Completando registro
                        </h1>
                        <ReactLoading type="spin" color="red" height={'100px'} width={'100px'} className="centering"/>
                    </div>
                }
                break;
            case 2: 
                subRegister = <div className="container" style={divStyle}>
                    <h1 style={h1Style}>¡Registro con éxito!</h1>
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
        register: (username, password, name, lastname, date, rol) => {
            return dispatch(auth.register(username, password, name, lastname, date, rol));
        },
        cleanErrors: () => {
            return dispatch(auth.cleanErrors())
        }
    };
}

export default connect(mapStateToProps,mapActionsToProps)(Register);
   