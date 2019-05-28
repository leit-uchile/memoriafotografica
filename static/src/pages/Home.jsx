import React, {Component} from 'react';
import {connect} from 'react-redux'
import {home, misc} from '../actions';
import Photo from '../components/Photo';
import {Container, Row, Col, Card, CardImg, CardBody, CardText} from 'reactstrap';

const tags = [{tag:'Ingenieria'},{tag:'Geofisica'},{tag:'TorreChica'},{tag:'NicanorParra'},{tag:'idiem'},{tag:'MariaTeresaSanz'}]
const categorias = [{categoria:'Departamento'}, {categoria:'Deportes'}, {categoria:'Arte'}, {categoria:'Biblioteca'}, {categoria:'Eventos'}, {categoria:'Otros'},]

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
                        <Col style={{maxWidth:'520px', borderRight:'1px solid rgb(239,112,117)'}}>
                            <h2 style={{fontSize:'20px'}}>Busqueda por tag</h2>
                            <Container fluid>
                                <Tags tags={tags}/>
                            </Container>
                        </Col>
                        <Col style={{maxWidth:'580px', borderLeft:'1px solid rgb(239,112,117)'}}>
                            <h2 style={{fontSize:'20px'}}>Busqueda por categoria</h2>
                            <Container fluid>
                                <Categories categorias={categorias}/>
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

const Tags = ({tags}) => (
    <Row>
        {tags.map((el, index) => (
            <span style={styles.tags}>#{el.tag}</span>
        ))}
    </Row>
)

const Categories = ({categorias}) => (
    <Row>
        {categorias.map((el, index) => (
            <div style={styles.categories}>{el.categoria}</div>
        ))}
    </Row>
)

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

const styles = {
    tags:{
        color:'white', 
        borderRadius:'10px', 
        backgroundColor:'#9a9e9d', 
        margin:'2px', 
        padding:'4px 12px 4px 12px'
    },
    categories: {
        fontSize: '11px',
        textAlign:'center',
        width:'90px', 
        height:'90px',
        border:'1px solid rgb(208,208,208)', 
        borderRadius:'9px', 
        backgroundColor:'#dcdddd',
        margin:'2px 20px 20px 0px', 
        paddingTop:'34px'
    }
}
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