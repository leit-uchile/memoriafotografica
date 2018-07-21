import React, { Component } from 'react';

class Photo extends Component {
    constructor(props){
        super(props);
        this.props = props;
    }
    render() {
        const imgStyle = {height: '100px', width: '100px'};
        return(
            <div className='col-lg-4'>
                <h3>{this.props.name}</h3>
                <img style={imgStyle} src={this.props.url} alt={this.props.name}/>
                <p>{this.props.desc}</p>
                <ul>
                    {this.props.tags.map( (el) => {
                        return <li>{el}</li>
                    })}
                </ul>
            </div>
        );
    }
}

export default Photo;