import React, {Component} from 'react';
import UploadUnregister from './UploadUnregister';
import UploadPhoto from './UploadPhoto';
import UploadDetails from './UploadDetails';

import {connect} from 'react-redux';
import {auth} from '../../actions';
import {Redirect} from 'react-router-dom';

class Upload extends Component{
    constructor(Props){
        super(Props)
        this.state = {
            currentPage: 0,
            loginInfo: null
        }
        this.volver = this.volver.bind(this);
        this.saveUserInfo = this.saveUserInfo.bind(this);
        this.saveUserLogin = this.saveUserLogin.bind(this);
        this.uploadToBack = this.uploadToBack.bind(this);

    }

    volver(){
        if(this.state.currentPage !=0){
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
            currentPage : this.state.currentPage + 1,
            userInfo: {...info}
        })
    }

    uploadToBack(){
        console.log("Called the API")
        this.props.upload(this.state.loginInfo.name,this.state.loginInfo.password)
    }

    render(){
        if (this.props.isAuthenticated) {
            this.setState.currentPage = 2
        }

        var subupload;
        console.log(this.state.currentPage)
        switch (this.state.currentPage){ 
            case 0: 
                subupload = <div class="container" style={{backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"}}>
                    <h1 style={{textAlign: "center", fontWeight: "bold"}}>¡Ayudanos aportando material!</h1>
                    <div>
                        <button className="btn btn-primary">Iniciar sesion</button>
                        <button className="btn btn-secundary">Continuar sin registrar</button>
                    </div>
                    <span style={{textAlign: "center", display: "block", margin: "auto 1em auto 1em"}}>Tendras que ingresar tus datos cada vez que subas una foto</span>
                </div> ;  
            case 1:
                subupload = <UploadUnregister/>
            case 2:
                subupload = <UploadPhoto/>
            case 3:
                subupload = <UploadDetails/>
            case 4:
                subupload = <div class="container" style={{backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"}}>
                    <h1 style={{textAlign: "center", fontWeight: "bold"}}>¡Aporte enviado!</h1>
                    <span style={{textAlign: "center", display: "block", margin: "auto 1em auto 1em"}}>La foto tendra que ser aprobada para que la comunidad la vea. Puedes ver en que estado se encuentra en tu perfil. Muchas gracias!</span>
        </div> ; 

        }

            return(
                <div>
                    {subupload}
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


export default connect(mapStateToProps)(Upload);
   