import React, {Component} from 'react';
import UploadUnregister from './UploadUnregister';
import UploadPhoto from './UploadPhoto';
import {connect} from 'react-redux';
import {auth, misc} from '../../actions';
import {Link, Redirect} from 'react-router-dom';
import {Container, Button} from 'reactstrap';

class UploadPage extends Component{
    constructor(Props){
        super(Props)
        this.state = {
            currentPage: 0,
            userInfo: null,
            photos: null,
        }
        this.back = this.back.bind(this);
        this.siguiente = this.siguiente.bind(this);
        this.saveUserInfo = this.saveUserInfo.bind(this);
        this.savePhotos = this.savePhotos.bind(this); 
    }

    back(){
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
            photos: {...photos}
        })
    }

    componentWillMount(){
        this.props.setRoute('/upload')
    }

    render(){
        var subupload;
        var current = this.props.isAuthenticated ? 2 : this.state.currentPage;
        switch (current){ 
            case 0: 
                subupload = <Container style={{backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"}}>
                    <h1 style={{textAlign: "center", fontWeight: "bold"}}>¡Ayudanos aportando material!</h1>
                    <div style={{textAlign: "center"}}>
                        <Button color='primary' tag={Link} to="/login">Iniciar sesion</Button>
                        <Button color='link' onClick={this.siguiente}>Continuar sin registrar</Button>
                    </div>
                    <p style={{textAlign: "center", display: "block", margin: "auto 1em auto 1em"}}>Si no inicias sesion tendras que ingresar tus datos cada vez que subas una foto</p>
                </Container> ;
                break;
            case 1:
                subupload = <UploadUnregister goBack={this.back} saveInfo={this.saveUserInfo} cache={this.state.userInfo}/>
                break;
            case 2:
                subupload = <UploadPhoto goBack={this.back} saveAll={this.savePhotos}/>
                break;
            case 3:
                subupload = <Container style={{backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"}}>
                    <h1 style={{textAlign: "center", fontWeight: "bold"}}>¡Aporte enviado!</h1>
                    <span style={{textAlign: "center", display: "block", margin: "auto 1em auto 1em"}}>La foto tendra que ser aprobada para que la comunidad la vea. Puedes ver el estado en que se encuentra accediento a tu perfil. Muchas gracias!</span>
                    </Container> ;
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

const mapActionsToProps = dispatch => {
    return {
        setRoute: (route) => {
            return dispatch(misc.setCurrentRoute(route));
        }
    }
}


export default connect(mapStateToProps,mapActionsToProps)(UploadPage);
   