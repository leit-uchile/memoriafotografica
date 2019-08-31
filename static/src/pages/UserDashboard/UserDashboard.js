import React, { Component } from 'react';
import {Container, Row, Col, Button, Card, CardImg, 
    CardText, CardBody, Alert} from 'reactstrap';
import Photo from '../../components/Photo';
import {connect} from 'react-redux'
import {user, misc} from '../../actions';
import {Link} from 'react-router-dom'

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            maxPhotos:10
            }
        
        this.allowMorePics = this.allowMorePics.bind(this)
    }

    componentWillMount(){  
        this.props.setRoute('/gallery/')  
        this.props.onLoadGetPhotos()
    }
    allowMorePics(){
        this.setState({maxPhotos: this.state.maxPhotos + 10})
    }

    render(){
    
        return(
            <Container> 
                <Row>
                    <Col xs="3"> 
                        <Card>
                            <CardImg top width= "10%" src="data:image/jpeg;base64,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"/>
                            <CardBody style={{backgroundColor:'#ebeeef'}}>
                                <CardText>Nombre</CardText>
                                <CardText> Mail </CardText>
                                <Button color="secondary" tag={Link} to="/"> Editar mi perfil</Button>
                            </CardBody>
                        </Card>
                    </Col>
                    
                    <Col xs = "9">
                        <Container> 
                            <Row>
                                <h2 style={{fontSize:'20px'}}> Mis Fotos </h2>
                                <Container fluid>
                                fotos
                                </Container>
                                <Button onClick={this.all}> Ver Todas</Button>  
                            </Row>
                            <Row>
                            <h2 style={{fontSize:'20px'}}> Mis Albumes </h2>
                                <Container fluid>
                                albumes
                                </Container>
                                <Button onClick={this.all}> Ver Todos</Button>  
                            </Row>
                            <Row>
                            <h2 style={{fontSize:'20px'}}> Mis Comentarios </h2>
                                <Container fluid>
                                comentarios
                                </Container>
                                <Button onClick={this.all}> Ver Todos</Button>  
                            </Row>
                        </Container>
                    </Col>
                </Row>

            </Container>
        )
    }
}

const Photos= ({photos}) => (
    <Row>
        {photos.length == 0 ? <h3> No has subido fotos aún </h3> : 
        photos.map((el, index) => ( 
            <Card style={{width: "200px"}}>
                <Photo key={index} name={el.title} url={el.thumbnail} url2={el.image}
                height="150px"useLink redirectUrl={'/photo/${el.id}'}/>
                <CardBody> style={{backgoroundColor:'#ebeeef'}}
                <CardText> {el.description} </CardText>
                </CardBody>
            </Card>
        ))}
    </Row>

)

const mapStateToProps = state => {
    return{
        photos: state.home.photos
    }
}

const mapActionsToProps = dispatch =>{
    return {
        onLoadGetPhotos:() => {
            return dispatch(user.user())
        },
        setRoute: (route) => {
            return dispatch(misc.setCurrentRoute(route));
        }
    }
}

export default connect(mapStateToProps, mapActionsToProps) (Dashboard); 