import React from 'react';
//import Gallery from '../components/Gallery';
import {connect} from 'react-redux'
import {home} from '../actions';
//import Photo from '../components/Photo';

import history from '../history'

const Home = ({photos, onLoad}) => (
    <div className='col-md-12'>
        <div className='container-fluid'>
            <button onClick={onLoad}>Click</button>
            <div className='row'>
             <Gallery photoList={photos} />
            </div>
        </div>
    </div>
)

const Photo = ({name,url,url2,tags}) => {
            const detailsFunc = () => history.push('/photo')
            if(url === undefined){
                return(
                <div className='col-md-4 mt-3'>
                    <h2>{name}</h2>
                    <img className='img-fluid' src={url2}/>
                </div>)
            }else{
                return (
                <div className='col-md-4 mt-3'>
                    <h2>{name}</h2>
                    <img className='img-fluid' src={url} onClick={detailsFunc}/>
                </div>)
            }
        }

const Gallery = ({photoList}) => (
    <div className='row'>
        {photoList.map((el, index) => (
            <Photo key={index} name={el.name} url={el.url} tags={el.tags} url2={el.image}/>
        ))}
    </div>
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