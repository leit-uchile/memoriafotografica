import React, {Component} from 'react';
import {connect} from 'react-redux'
import {home, misc} from '../actions';
import Photo from '../components/Photo';
import {Container, Row, Col, Card, CardImg, 
    Button, CardBody, CardText} from 'reactstrap';

class Home extends Component{

    constructor(props){
        super(props)
        this.state = {
            selected: [],
            maxAllowedTags: 5,
            maxAllowedCategories: 8,
        }
        this.allowMoreCats = this.allowMoreCats.bind(this)
        this.allowMoreTags = this.allowMoreTags.bind(this)
    }

    componentWillMount(){
        this.props.setRoute('/gallery/')
        this.props.onLoadGetPhotos()
        this.props.onLoadGetTags()
        this.props.onLoadGetCats()
    }

    allowMoreTags(){
        this.setState({maxAllowedTags: this.state.maxAllowedTags + 10})
    }

    allowMoreCats(){
        this.setState({maxAllowedCategories: this.state.maxAllowedCategories + 4})
    }

    render(){
        const {photos, tags, cats} = this.props
        return(
            <Container>
                    <Row>
                        <Col>
                            <h1 style={{fontSize:'25px', textAlign:'center', marginLeft:'auto', marginRight:'auto', paddingTop:'40px', paddingBottom:'40px'}}>Descubre las fotografias de la Facultad y sus personajes</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{maxWidth:'520px'}}>
                            <h2 style={{fontSize:'20px'}}>Busqueda por tag</h2>
                            <Container fluid>
                                <Tags tags={tags ? tags : []} maxAllowed={this.state.maxAllowedTags}/>
                            </Container>
                            <Button onClick={this.allowMoreTags} color="secondary">Cargar m&aacute;s</Button>
                        </Col>
                        <div style={styles.verticalLine}></div>
                        <Col style={{maxWidth:'580px'}}>
                            <h2 style={{fontSize:'20px'}}>Busqueda por categoria</h2>
                            <Container fluid>
                                <Categories categorias={cats ? cats : []}/>
                            </Container>
                            <Button onClick={this.allowMoreCats} color="secondary">Cargar m&aacute;s</Button>
                        </Col>
                    </Row>
                    <Row style={{marginTop:'50px'}}>
                        <Col>
                            <h2 style={{fontSize:'20px'}}>Fotografias</h2>
                            <Container fluid>
                                <Gallery photoList={photos} />
                            </Container>
                        </Col>
                        
                    </Row>
            </Container>
        
        )
    }
}

const Tags = ({tags, maxAllowed}) => (
    <Row>
        {tags.length == 0 ? <h3>No hay tags disponibles</h3> : tags.slice(0,maxAllowed).map((el, index) => (
            <span key={el.id} style={styles.tags}>#{el.value}</span>
        ))}
    </Row>
)

const Categories = ({categorias, maxAllowed}) => (
    <Row>
        {categorias.length == 0 ? <h3>No hay categorias disponibles</h3> : categorias.slice(0,maxAllowed).map((el, index) => (
            <div key={el.id} style={styles.categories}>{el.title}</div>
        ))}
    </Row>
)

const Gallery = ({photoList}) => (
    <Row>
        {photoList.length == 0 ? <h3>No hay fotografias disponibles</h3> : photoList.map((el, index) => (
            <Card style={{marginTop:'1em', marginRight:'1em', width: "200px"}}>
                <Photo key={index} name={el.title} url={el.thumbnail} url2={el.image} height="150px"useLink redirectUrl={`/photo/${el.id}`}/>
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
    verticalLine:{
        borderLeft:'2px solid rgb(239,112,117)', 
        marginTop:'32px'
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
        photos: state.home.photos,
        tags: state.home.all_tags,
        cats: state.home.all_cats,
    }
}

const mapActionsToProps = dispatch =>{
    return {
        onLoadGetPhotos: () => {
            return dispatch(home.home());
        },
        onLoadGetTags: () => {
            return dispatch(home.tags());
        },
        onLoadGetCats: () => {
            return dispatch(home.categories());
        },
        setRoute: (route) => {
            return dispatch(misc.setCurrentRoute(route));
        }
    }
}

export default connect(mapStateToProps,mapActionsToProps)(Home);