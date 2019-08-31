import React, {Component} from 'react';
import UploadUnregister from './UploadUnregister';
import UploadPhoto from './UploadPhoto';
import {connect} from 'react-redux';
import {auth, misc, upload, home} from '../../actions';
import {Link} from 'react-router-dom';
import {Container, Button, Row} from 'reactstrap';
import ReactLoading from 'react-loading';
import {Helmet} from 'react-helmet';

class UploadPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentPage: 0,
            userInfo: null,
            photos: null,
            uploading: false,
        }
        this.back = this.back.bind(this);
        this.withoutRegister = this.withoutRegister.bind(this);
        this.saveUserInfo = this.saveUserInfo.bind(this);
        this.savePhotos = this.savePhotos.bind(this); 
    }

    back(){
        if(this.state.currentPage !==0){
            this.setState({
                currentPage : this.state.currentPage -1
            })
        }
    }
    withoutRegister(){
        if(this.state.currentPage !==4){
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
            photos: {...photos},
            uploading: true
        }, () => {
            this.props.setUploading();
            this.props.uploadPhotos(this.state.photos, this.props.token);
        })
    }

    componentWillMount(){
        this.props.setRoute('/upload');
        this.props.recoverMetadata();
    }

    componentDidUpdate(prevProps){
        if(prevProps.uploading && !this.props.uploading){
            this.setState({uploading: false})
        }
    }

    render(){
        var subupload;
        var current;
        if (this.props.isAuthenticated && this.state.currentPage===0){
            current = this.props.isAuthenticated ? 2 : this.state.currentPage
        }else if (this.props.isAuthenticated && this.state.currentPage===1){
            current = 3
        }else{
            current = this.state.currentPage
        }
        switch (current){  
            case 0: 
                subupload = <Container style={{backgroundColor: 'rgb(245,245,245)', borderRadius: '1em', marginTop: '2em', padding: '2em'}}>
                    <h1 style={{textAlign: 'center', fontWeight: 'bold'}}>¡Ayudanos aportando material!</h1>
                    <div style={{textAlign: 'center'}}>
                        <Button color='primary' tag={Link} to='/login'>Iniciar sesion</Button>
                        <Button color='link' onClick={this.withoutRegister}>Continuar sin registrar</Button>
                    </div>
                    <p style={{textAlign: 'center', display: 'block', margin: 'auto 1em auto 1em'}}>Si no inicias sesion tendras que ingresar tus datos cada vez que subas una foto</p>
                </Container> ;
                break;
            case 1:
                subupload = <UploadUnregister goBack={this.back} saveInfo={this.saveUserInfo} cache={this.state.userInfo}/>
                break;
            case 2:
                subupload = <UploadPhoto goBack={this.back} saveAll={this.savePhotos} meta={this.props.meta}/>
                break;
            case 3:
                subupload = this.state.uploading ? 
                <Container style={{backgroundColor: 'rgb(245,245,245)', borderRadius: '1em', marginTop: '2em', padding: '2em'}}>
                    <Row>
                        <h1 style={{textAlign: 'center', fontWeight: 'bold'}}>Enviando aporte...</h1>
                    </Row>
                    <Row>
                        <ReactLoading type="spin" color="red" height={'100px'} width={'100px'} className="centering"/>
                    </Row>
                </Container>
                    :
                <Container style={{backgroundColor: 'rgb(245,245,245)', borderRadius: '1em', marginTop: '2em', padding: '2em'}}>
                    <Row>
                        <h1 style={{textAlign: 'center', fontWeight: 'bold'}}>¡Aporte enviado!</h1>
                        <span style={{textAlign: 'center', display: 'block', margin: 'auto 1em auto 1em'}}>La foto tendra que ser aprobada para que la comunidad la vea. Puedes ver el estado en que se encuentra accediendo a tu perfil. Muchas gracias!</span>
                    </Row>
                </Container>
                break;
        }
        return(
        <div>
            <Helmet>
                <meta property="og:title" content="Aportar material"/>
                <meta property="og:type" content="Subir contenido a la plataforma" />
                <meta property="og:url" content=" http://memoriafotografica.ing.fcfm.cl/" />
                <meta property="og:image" content=" http://example.com/image.jpg" />
                <meta property="og:description" content="Descripcion" />
                <title>Aportar material</title>
            </Helmet>
            {subupload}
        </div>);
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
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token,
        uploading: state.upload.uploading,
        meta: state.home.all_tags,
    };
}

const mapActionsToProps = dispatch => {
    return {
        setRoute: (route) => {
            return dispatch(misc.setCurrentRoute(route));
        },
        uploadPhotos: (info,auth) => {
            return dispatch(upload.uploadImages(info,auth));
        },
        setUploading: () => {
            return dispatch(upload.setUploading());
        },
        recoverMetadata: () => {
            return dispatch(home.tags());
        }
    }
}


export default connect(mapStateToProps,mapActionsToProps)(UploadPage);
   