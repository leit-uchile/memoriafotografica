import React, { Component } from 'react';
import photoInfo from '../css/photoInfo.css';

class Photo extends Component {
    constructor(props){
        super(props);
        this.props = props;
    }
    render() {

        return(

                <div className='col-md-4 mt-3'>
                    <a href={this.props.url}>
                        <img className='img-fluid' style={{height: '200px', width: 'auto'}}  src={this.props.url} alt={this.props.name}/>
                    </a>
                    <div className='info-block'>
                        <h3>{this.props.name}</h3>
                        <p>{this.props.desc}</p>
                        <ul>
                            {this.props.tags.map( (el) => {
                                return <span className='fas fa-tag'> {el}</span>
                            })}
                        </ul>
                    </div>
                    <h3>{this.props.state}</h3>
                </div>


        );
    }
}

export default Photo;