import React, {Component} from 'react';
import {connect} from 'react-redux'
import {home} from '../actions';
import Photo from '../components/Photo';
import {Container, Row} from 'reactstrap';

import history from '../history'

class Home extends Component{

    constructor(props){
        super(props)
        this.state = {
            photos: undefined
        }
    }

    componentWillMount(){
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
            <Photo key={index} name={el.title} url={el.image} tags={el.metadata} url2={el.image} height="200px" onClick={() =>history.push('/photo')}/>
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
        }
    }
}

export default connect(mapStateToProps,mapActionsToProps)(Home);