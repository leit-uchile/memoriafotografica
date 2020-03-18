import React, { Component } from 'react';

class Avatar extends Component{

    render(){
        return(
        <div className={this.props.isComment ? "col-2" : null}>
            <h3 style={{textAlign: 'center'}}>{this.props.name}</h3>
            <img src={this.props.avatarurl} alt={"Avatar "+this.props.name} height="50" width="50" style={{borderRadius: "25px",
            border: "black solid 1px", marginLeft: 'auto', marginRight: 'auto',display: 'block'}}/>
        </div>)
    }
}

export default Avatar;