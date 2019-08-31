import React, {Component} from 'react';
import {connect} from 'react-redux'
import {home, misc} from '../actions';
import Photo from '../components/Photo';
import {Container, Row, Col, Button, Nav, DropdownItem, DropdownMenu} from 'reactstrap';
import {Redirect} from 'react-router-dom'
import gallery from '../css/galleryHome.css'
import {Helmet} from 'react-helmet';

class Home extends Component{

    constructor(props){
        super(props)
        this.state = {
            selectedCategories: [],
            maxAllowedCategories: 8,
            maxPhotos: 10,
            sortOpen: false,
            catsOpen: false,
            redirect: false,
            link: ''
        }
        this.toggleSort = this.toggleSort.bind(this)
        this.toggleCats = this.toggleCats.bind(this)
        this.handleOnClick = this.handleOnClick.bind(this)
        this.toggleCategory = this.toggleCategory.bind(this)
        this.allowMoreCats = this.allowMoreCats.bind(this)
        this.allowMorePics = this.allowMorePics.bind(this)
    }

    toggleSort() {
        this.setState({
          sortOpen: !this.state.sortOpen
        });
    }

    toggleCats() {
        this.setState({
          catsOpen: !this.state.catsOpen
        });
    }

    handleOnClick = (url) => {
        this.setState({redirect: true, link: url});
    }

    componentWillMount(){
        this.props.setRoute('/gallery/')
        this.props.onLoadGetPhotos()
        this.props.onLoadGetCats()
    }

    allowMoreCats(){
        this.setState({maxAllowedCategories: this.state.maxAllowedCategories + 4})
    }

    allowMorePics(){
        this.setState({maxPhotos: this.state.maxPhotos + 10})
    }

    toggleCategory(id){
        // Remove if in already
        if(this.state.selectedCategories.filter(el => el===id).length !== 0){
            this.setState({selectedCategories: this.state.selectedCategories.filter(el => el!==id)})
        }else{
            this.setState({selectedCategories: [...this.state.selectedCategories, id]})
        }
    }

    render(){
        const {photos, cats, filters} = this.props

        // Utility Function
        var isSelected = (id, array) => {
            return array ? array.filter( el => el === id).length !== 0 : false 
        }

        // arr1 is sorted
        var arraysIntersect = (arr1,arr2) => {
            return arr1.filter(el => arr2.indexOf(el) > -1).length !== 0
        }

        var currentCats = cats ? cats.slice(0,this.state.maxAllowedCategories).map(el => {
            return {...el, selected: isSelected(el.id,this.state.selectedCategories)}
        }) : []

        if (filters && filters.length === 0 && this.state.selectedCategories.length === 0 ){
            var currentPhotos = photos.slice(0,this.state.maxPhotos) //todas las fotos
        }
        else if (filters && filters.length !==0 && this.state.selectedCategories.length !== 0 ){ //hay tag y categoria -> intersectar
            currentPhotos = photos.filter( el =>
                             arraysIntersect(el.category,this.state.selectedCategories) && arraysIntersect(el.metadata,filters)
                         ).slice(0,this.state.maxPhotos)
                         console.log("Intersectar")

        }else{ //cuando falta uno de los dos -> union
            currentPhotos = photos.filter( el =>
                arraysIntersect(el.category,this.state.selectedCategories) || arraysIntersect(el.metadata,filters)
            ).slice(0,this.state.maxPhotos)
        }
        var numberSelectedCats = this.state.selectedCategories.length
        if (this.state.redirect) {
            return <Redirect push to={this.state.link} />;
          }
        return(
            <Container fluid>
                <Helmet>
                    <meta property="og:title" content="Buscar fotografias"/>
                    <meta property="og:type" content="Motor de búsqueda" />
                    <meta property="og:url" content=" http://memoriafotografica.ing.fcfm.cl/" />
                    <meta property="og:image" content=" http://example.com/image.jpg" />
                    <meta property="og:description" content="Descripcion" />
                    <title>Buscar fotografias</title>
                </Helmet>
                <Row className='galleryMenu'>
                    <Col>
                        <Nav className='navbar navbar-default navbar-mob'></Nav>
                            <div className='navbar-header'>
                                
                            </div>
                    </Col>
                </Row>
                <Gallery photoList={currentPhotos} handleOnClick={this.handleOnClick}/>
            </Container>
        )
    }
}

const Categories = ({categorias, onClick}) => (
    <DropdownMenu>
        {categorias.length == 0 ? <h3>No hay categorias disponibles</h3> : categorias.map((el, index) => (
            <DropdownItem><div key={el.id} style={el.selected ? styles.selectedCategory: styles.categories} onClick={() => onClick(el.id)}>{el.title}</div></DropdownItem>
        ))}
    </DropdownMenu>
)

const Gallery = ({photoList, handleOnClick}) => (
    <div className="gallery">
        {photoList.length == 0 ? <h3>No hay fotografias disponibles</h3> : photoList.map((el, index) => (
        <div className="photo" style={{backgroundImage:  'url(' + el.thumbnail + ')'}} onClick={()=>handleOnClick('/photo/'+el.id)}>
            <div className="info">
                <h1 style={{fontSize: '1.5em'}}>{el.title}</h1>
                <h2 style={{fontSize: '1.0em'}}>{el.usuario}</h2>    
            </div>
        </div>
        ))}
    </div>
)

const styles = {
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
    },
    selectedCategory: {
        fontSize: '11px',
        textAlign:'center',
        width:'90px', 
        height:'90px',
        border:'1px solid rgb(208,208,208)', 
        borderRadius:'9px', 
        backgroundColor:'#ce846b',
        margin:'2px 20px 20px 0px', 
        paddingTop:'34px'
    },
}
const mapStateToProps = state => {
    return {
        photos: state.home.photos,
        cats: state.home.all_cats,
        filters: state.search.metaIDs,
    }
}

const mapActionsToProps = dispatch =>{
    return {
        onLoadGetPhotos: () => {
            return dispatch(home.home());
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