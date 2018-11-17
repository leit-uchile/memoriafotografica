import React, { Component } from 'react';

class Avatar extends Component{

    render(){
        return(
        <div class="comment-avatar">
            <h3>{this.props.name}</h3>
            <img src={this.props.avatarurl} alt={"Avatar "+this.props.name} height="100" width="100"/>
        </div>)
    }
}

export default Avatar;