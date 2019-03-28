import React, {Component} from 'react';
import UploadUnregister from './UploadUnregister';
import UploadPhoto from './UploadPhoto';
import UploadDetails from './UploadDetails';

import {connect} from 'react-redux';
import {auth} from '../../actions';
import {Redirect} from 'react-router-dom';

class UploadPage extends Component{
    constructor(Props){
        super(Props)
        this.state = {
            currentPage: 0,
            userInfo: null,
            photoList: null
        }
        this.volver = this.volver.bind(this);
        this.siguiente = this.siguiente.bind(this);
        this.saveUserInfo = this.saveUserInfo.bind(this);
        this.savePhotos = this.savePhotos.bind(this);
        this.savePhotoInfo = this.savePhotoInfo.bind(this);
        

    }

    volver(){
        if(this.state.currentPage !=0){
            this.setState({
                currentPage : this.state.currentPage -1
            })
        }
    }
    siguiente(){
        if(this.state.currentPage !=4){
            this.setState({
                currentPage : this.state.currentPage +1
            })
        }
    }
    saveUserInfo(info){
        this.setState({
            currentPage : this.state.currentPage + 1,
            userInfo: {...info}
        })
    }
    savePhotos(photos){
        this.setState({
            currentPage : this.state.currentPage + 1,
            photoList: {...photos}
        })
    }
    savePhotoInfo(meta){
        this.setState({
            currentPage : this.state.currentPage + 1,
            metaPhotos: {...meta}
        })
    }

    render(){
        if (this.props.isAuthenticated) {
            this.setState.currentPage = 2
        }

        var subupload;
        switch (this.state.currentPage){ 
            case 0: 
                subupload = <div class="container" style={{backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"}}>
                    <h1 style={{textAlign: "center", fontWeight: "bold"}}>¡Ayudanos aportando material!</h1>
                    <div>
                        <button className="btn btn-primary" onClick="//login">Iniciar sesion</button>
                        <button className="btn btn-secundary" onClick={this.siguiente}>Continuar sin registrar</button>
                    </div>
                    <span style={{textAlign: "center", display: "block", margin: "auto 1em auto 1em"}}>Tendras que ingresar tus datos cada vez que subas una foto</span>
                </div> ;
                break;
            case 1:
                subupload = <UploadUnregister goBack={this.volver} saveInfo={this.saveUserInfo} cache={this.state.userInfo}/>
                break;
            case 2:
                console.log(this.state.userInfo)
                subupload = <UploadPhoto goBack={this.volver} savePhotos={this.savePhotos}/>
                break;
            case 3:
                subupload = <UploadDetails goBack={this.volver} saveInfo={this.savePhotoInfo}/>
                break;
            case 4:
                subupload = <div class="container" style={{backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"}}>
                    <h1 style={{textAlign: "center", fontWeight: "bold"}}>¡Aporte enviado!</h1>
                    <span style={{textAlign: "center", display: "block", margin: "auto 1em auto 1em"}}>La foto tendra que ser aprobada para que la comunidad la vea. Puedes ver el estado en que se encuentra accediento a tu perfil. Muchas gracias!</span>
        </div> ;
        break;
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


export default connect(mapStateToProps)(UploadPage);
   