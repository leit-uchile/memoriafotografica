import React, { Component } from 'react';
import Photo from '../../components/Photo';
import {Button, ButtonGroup, Row, Col, Container} from 'reactstrap';

var imgs = [
    {
        name: "img1",
        url: "https://www.ssbwiki.com/images/thumb/2/2b/Isabelle_SSBU.png/250px-Isabelle_SSBU.png",
        tags: ["tag1","tag2"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc1",
        reason: "Foto de perfil inapropiada",
        state: "uploaded"
    },
    {
        name: "img2",
        url: "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc2",
        reason: "Bot",
        state: "uploaded"
    },
    {
        name: "img3",
        url: "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc3",
        reason: "Comentarios ofensivos",
        state: "uploaded"
    },
    {
        name: "img4",
        url: "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc4",
        reason: "Usuario duplicado",
        state: "uploaded"
    },
    {
        name: "img5",
        url: "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc5",
        reason: "Usuario duplicado",
        state: "uploaded"
    },
    {
        name: "img6",
        url: "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc6",
        reason: "Usuario duplicado",
        state: "uploaded"
    }
];

class Reported_Photos extends Component{

    constructor(){
        super()
        this.getLatestPhotos = this.getLatestPhotos.bind(this)
        this.removePhoto = this.removePhoto.bind(this)
        this.updatePhotoState = this.updatePhotoState.bind(this)
    }

    componentWillMount(){
        this.getLatestPhotos()
    }

    getLatestPhotos(){
        // Call API
        this.setState({
            photos: imgs
        })
    }

    updatePhotoState(){
        // Send update to API

        // Update
        // remove
        this.removePhoto()
        // getLatestPhotos

    }

    removePhoto(){
        // Fake call to API
        imgs = imgs.slice(1,imgs.length)
        this.getLatestPhotos()
    }

    render(){

        var latest = []
        for (var i = 1; i < 4 && i < imgs.length; i++) {
            latest.push(
                <Photo name={this.state.photos[i].name} url={this.state.photos[i].url} tags={this.state.photos[i].tags} state={this.state.photos[i].state} width='150px' style={styles.latest}/>
            )
        }
        var actually = ''
        var reason = ''
        if(imgs.length<1) {
            actually = 'Has filtrado todas las solicitudes'
        }
        else{
            actually= <Photo name={this.state.photos[0].name} url={this.state.photos[0].url} tags={this.state.photos[0].tags}
                       desc={this.state.photos[0].desc} state={this.state.photos[0].state} style={styles.actual} height='350px'/>
            reason = <p style={{textAlign:'center'}}>Motivo del reporte: {this.state.photos[0].reason}</p>
        }
        return(
            <Container>
            <Row>
                <Col>
                    <h2>Usuarios reportados</h2>
                </Col>
            </Row>
            <div style={{backgroundColor: 'rgb(245,245,245)', border:'1px solid rgb(156,158,159)', borderRadius:'10px', marginTop: '2em', padding: '2em 0'}}>    
                <Row>   
                    <Col md='8'>
                        {actually}
                        {reason}
                        {imgs.length===0 ? null: 
                            <Row>
                                <ButtonGroup style={{marginTop:'10px',marginLeft:'auto',marginRight:'auto'}}>
                                    <Button color="danger" onClick={this.updatePhotoState}>Eliminar</Button>
                                    <Button color="secondary" onClick={this.removePhoto}>Descartar reporte</Button>
                                </ButtonGroup>
                            </Row>
                        }
                    </Col>
                    <Col md='4'>
                        {latest}
                    </Col>
                </Row>
            </div>
        </Container>
        );
    }
}
const styles={
    latest:{
        width:'150px',
        marginBottom: '20px',
        boxShadow: '5px 5px 5px #3c4145',
    },
    actual:{
        height:'350px',
        textAlign:'center'
    }
}
Reported_Photos.props = {
    gallery: imgs
}

export default Reported_Photos