import React, {Component} from 'react';
import {connect} from 'react-redux'
import {home, misc} from '../actions';
import Photo from '../components/Photo';
import {Container, Row, Col, Button, Nav, DropdownItem, DropdownMenu} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import gallery from '../css/galleryHome.css';
import {Helmet} from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


class Home extends Component{

    constructor(props){
        super(props)
        this.state = {
            selectedCategories: [],
            maxAllowedCategories: 8,
            maxPhotos: 40,
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
        var currentCats1 = currentCats ? currentCats.slice(0,currentCats.length/2).map(el => {
            return {...el, selected: isSelected(el.id,this.state.selectedCategories)}
        }) : []
        var currentCats2 = currentCats ? currentCats.slice(currentCats.length/2,currentCats.length).map(el => {
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
        var numberSelectedCats = this.state.selectedCategories.length>0 ? <span style={styles.numberSelectedCats}>{this.state.selectedCategories.length}</span> : null
        if (this.state.redirect) {
            return <Redirect push to={this.state.link} />;
          }
        return(
            <div>
                <Helmet>
                    <meta property="og:title" content="Buscar fotografias"/>
                    <meta property="og:type" content="Motor de búsqueda" />
                    <meta property="og:url" content=" http://memoriafotografica.ing.fcfm.cl/" />
                    <meta property="og:image" content=" http://example.com/image.jpg" />
                    <meta property="og:description" content="Descripcion" />
                    <title>Buscar fotografias</title>
                </Helmet>
                    <div style={styles.galleryMenu}>

                        <ul style={styles.menuMain}>

                            <li className='menu-list'><a href='#'>Categorias {numberSelectedCats}</a>
                                <div id='cat' className='menu-sub'>
                                    <div style={styles.menu2Col}>
                                        <Categories categorias={currentCats1} onClick={this.toggleCategory}/>
                                    </div>
                                    <div style={styles.menu2Col}>
                                        <Categories categorias={currentCats2} onClick={this.toggleCategory}/>
                                    </div>
                                </div>
                            </li>

                            <li className='menu-list'><a href='#'>Ordenar</a>
                                <div id='sort' className='menu-sub'>
                                    <div style={styles.menu1Col}>
                                        <h3 style={styles.menuSubTitle}>Por orden cronológico</h3>
                                        <ul>
                                            <li><a href='#'>Más antiguas primero</a></li>
                                            <li><a href='#'>Más nuevas primero</a></li>
                                        </ul>
                                        <h3 style={styles.menuSubTitle}>Por fecha de subida</h3>
                                        <ul>
                                            <li><a href='#'>Más antiguas primero</a></li>
                                            <li><a href='#'>Más nuevas primero</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                <Container fluid style={styles.galleryContainer}>
                    <Gallery photoList={currentPhotos} handleOnClick={this.handleOnClick}/>
                </Container>
            </div>
        )
    }
}

const Categories = ({categorias, onClick}) => (
    <ul>
        {categorias.length == 0 ? '-' : categorias.map((el, index) => (
            <li><a href='#' style={el.selected ? styles.Selected: styles.unSelected} key={el.id} onClick={() => onClick(el.id)}>{el.title}{el.selected ? <FontAwesomeIcon icon={faCheck}/>: ''}</a></li>
        ))}
    </ul>
)

const Gallery = ({photoList, handleOnClick}) => (
    <div style={styles.galleryGrid}>
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
    galleryMenu:{
        height: '5em',
        width: '100%', /*mio, antes max-width*/
        margin: '0 auto',
        borderBottom: '1px solid rgb(210,214,218)', /*mio*/
        background: 'white'
    },
    menuMain:{
        marginRight:'10em',
        listStyle: 'none',
        textAlign: 'right',
    },
    unSelected: {
        padding: '0',
        color: '#97878f',
        textDecoration: 'none',
        display: 'block',
        marginBottom: '.35em'
    },
    Selected:{
        padding: '0',
        color: '#97878f',
        textDecoration: 'none',
        display: 'inline',
        marginBottom: '.35em',
        fontWeight: 'bold'
    },
    numberSelectedCats:{
        backgroundColor: '#f2f2f2',
        color:'red',
        padding:'0.5em',
        borderRadius: '0.5em'
    },
    menuSubTitle:{
        display: 'flex',
        fontSize: '1.1em',
        fontWeight: 'bold',
        color:'#97878f',
        justifyContent: 'center'
    },
    menu1Col:{
        float: 'left',
        width: '100%',
    },
    menu2Col:{
        float: 'left',
        width:'50%'
    },
    galleryContainer:{
        width:'100%',
        minHeight: '100vh', 
        padding:'1.25em 3.1em',
        backgroundColor:'#f7f8fa'
    },
    galleryGrid:{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', /*repeat(veces, tamaño)*/
        gridTemplateRows: 'repeat(auto-fit, minmax(150px,1fr))',
        gridAutoColumns: 'minmax(150px,1fr)',
        gridAutoRows: 'minmax(150px,1fr)',
        gridAutoFlow: 'row dense',
        gridGap: '0.75em'
    }    
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