import React, { Component } from 'react';
//import photoInfo from '../css/photoInfo.css';
import galleryHome from '../css/galleryHome.css';

class Photo extends Component {
    constructor(props){
        super(props);
        this.props = props;
    }
    render() {
        return(
            <div>
                <a href={this.props.url}>
                    <img className='fit-image' src={this.props.url} style={{height: '200px', width: 'auto'}} alt={this.props.name}/>
                </a>                    
            </div> 
        );
    }
}

export default Photo;