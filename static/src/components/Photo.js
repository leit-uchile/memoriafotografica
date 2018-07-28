import React, { Component } from 'react';

class Photo extends Component {
    constructor(props){
        super(props);
        this.props = props;
    }
    render() {
        const imgStyle = {height: '100px', width: '100px'};
        return(
            <div className='col-sm-6 col-md-4'>
                <div className='thumbnail'>
                    <a className='lightbox' href={this.props.url}>
                        <img style={imgStyle} src={this.props.url} alt={this.props.name}/>
                    </a>
                    <div className='caption'>
                        <h3>{this.props.name}</h3>
                        <p>{this.props.desc}</p>
                        <ul>
                            {this.props.tags.map( (el) => {
                                return <li>{el}</li>
                            })}
                        </ul>
                    </div>
                </div>

            </div>
        );
    }
}

export default Photo;