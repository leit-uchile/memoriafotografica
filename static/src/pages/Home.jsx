import React, {Component} from 'react';
import {connect} from 'react-redux'
import {home, misc} from '../actions';
import Photo from '../components/Photo';
import {Container, Row, Col, Card, CardImg, CardBody, CardText} from 'reactstrap';

class Home extends Component{

    componentWillMount(){
        this.props.setRoute('/gallery/')
        this.props.onLoad()
    }

    render(){
        const {photos} = this.props
        return(
            <Container>
                    <Row>
                        <Col>
                            <h1 style={{fontSize:'25px', textAlign:'center', marginLeft:'auto', marginRight:'auto', paddingTop:'40px', paddingBottom:'40px'}}>Descubre las fotografias de la Facultad y sus personajes</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2 style={{fontSize:'20px'}}>Busqueda por tag</h2>
                            <Container>

                            </Container>
                        </Col>
                        <div style={{borderLeft:'2px solid rgb(239,112,117)', marginTop:'40px', marginLeft:'10px', marginRight:'10px', height:'200px'}}></div>
                        <Col>
                            <h2 style={{fontSize:'20px'}}>Busqueda por categoria</h2>
                            <Container>
                                
                            </Container>
                        </Col>
                    </Row>
                    <Row style={{marginTop:'50px'}}>
                        <Col>
                            <h2 style={{fontSize:'20px'}}>Fotografias mas populares</h2>
                            <Container fluid>
                                <Gallery photoList={photos} />
                            </Container>
                        </Col>
                        
                    </Row>
            </Container>
        
        )
    }
}

const Gallery = ({photoList}) => (
    <Row>
        {photoList.map((el, index) => (
            <Card style={{marginTop:'30px', marginRight:'15px'}}>
                <Photo key={index} name={el.title} url={el.image} tags={el.metadata} url2={el.image} height="150px" useLink redirectUrl={`/photo/${el.id}`}/>
                <CardBody style={{backgroundColor:'#ebeeef'}}>
                <CardText>{el.description}</CardText>
                </CardBody>
          </Card>
        ))}
    </Row>
)

const mapStateToProps = state => {
    return {
        photos: state.home.photos
    }
}

const mapActionsToProps = dispatch =>{
    return {
        onLoad: () => {
            return dispatch(home.home());
        },
        setRoute: (route) => {
            return dispatch(misc.setCurrentRoute(route));
        }
    }
}

export default connect(mapStateToProps,mapActionsToProps)(Home);