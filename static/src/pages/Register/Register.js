import React, {Component} from 'react';
import RegisterLoginInfo from './RegisterLoginInfo';
import RegisterUserInfo from './RegisterUserInfo';

class Register extends Component{
    constructor(){
        super()
        this.state = {
            currentPage: 0,
            loginInfo: null
        }
        this.volver = this.volver.bind(this);
        this.saveUserInfo = this.saveUserInfo.bind(this);
        this.saveUserLogin = this.saveUserLogin.bind(this);
    }

    volver(){
        if(this.state.currentPage !=0){
            this.setState({
                currentPage : this.state.currentPage -1
            })
        }
    }

    avanzar(){
        if(this.state.currentPage <2){
            this.setState({
                currentPage : this.state.currentPage +1
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
            currentPage : this.state.currentPage + 1,
            userInfo: {...info}
        })
    }

    render(){
        var subRegister;
          switch (this.state.currentPage){
              case 0:
                  subRegister = <RegisterLoginInfo saveInfo={this.saveUserLogin}/>
                  break;
              case 1:
                  subRegister = <RegisterUserInfo goBack={this.volver} saveInfo={this.saveUserInfo}/>
                  break;  
              case 2: 
                  subRegister = <div>
                      <h1>¡Registro con éxito!</h1>
                  </div>
            }

            return(
                <div>
                    {subRegister}
                </div>
            );
         }
       }

  export default Register;
   