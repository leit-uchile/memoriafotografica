import React, {Component} from 'react';
import RegisterLoginInfo from './RegisterLoginInfo';
import RegisterUserInfo from './RegisterUserInfo';

class Register extends Component{
    constructor(){
        super()
        this.state = {
            currentPage: 1,
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
                  subRegister = <div class="container" style={{backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"}}>
                      <h1 style={{textAlign: "center", fontWeight: "bold"}}>¡Registro con éxito!</h1>
                      <span style={{textAlign: "center", display: "block", margin: "auto 1em auto 1em"}}>Por favor confirma tu correo electronico</span>
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
   