import React, { Component } from 'react';
import Avatar from './Avatar'

class Comment extends Component{
    
    constructor(Props){
        super()
        this.props = Props
        this.state = {
            userdata: null
        }
        this.getUserData = this.getUserData.bind(this);
    }
    
    getUserData(){
        // Call the API
        console.log("Called the API")
        this.setState({
            userdata: {
                id : 1,
                name: "Juan",
                avatar: "http://www.icare3d.org/images/AvatarTransp.png"
            }
        })
    }

    componentWillMount(){
        this.getUserData();
    }

    render(){

        console.log("Bla")

        return (
        <div>
            <Avatar avatarurl={this.state.userdata.avatar} name={this.state.userdata.name}/>
            <p>
                {this.props.content}
            </p>
        </div>)
    }
}

export default Comment;