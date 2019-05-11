import React, {Component} from 'react';
import {connect} from 'react-redux'
import {home, misc} from '../actions';
import Photo from '../components/Photo';
import {Container, Row} from 'reactstrap';

class Home extends Component{

    componentWillMount(){
        this.props.setRoute('/gallery/')
        this.props.onLoad()
    }

    render(){
        const {photos} = this.props
        return(
        <Container fluid>
            <Gallery photoList={photos} />            
        </Container>
        )
    }
}

const Gallery = ({photoList}) => (
    <Row>
        {photoList.map((el, index) => (
            <Photo key={index} name={el.title} url={el.image} tags={el.metadata} url2={el.image} height="200px" useLink redirectUrl={`/photo/${el.id}`}/>
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