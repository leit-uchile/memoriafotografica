import React, { Component } from 'react';

class Photo extends Component {
    constructor(props){
        super(props);
        this.props = props;
    }
    render() {

        const center = {display: 'flex',  justifyContent:'center', alignItems:'center'}
        return(
            <div style={{top:'10px'}} className='col-sm-6 col-md-4'>
                <div className='thumbnail'>
                    <a style={center} className='lightbox' href={this.props.url}>
                        <img style={{height: '200px', width: 'auto'}} src={this.props.url} alt={this.props.name}/>
                    </a>
                    <div className='caption'>
                        <h3 style={center}>{this.props.name}</h3>
                        {/*<p>{this.props.desc}</p>*/}
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