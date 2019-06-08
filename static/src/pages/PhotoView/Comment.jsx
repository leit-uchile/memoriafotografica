import React, { Component } from 'react';
import Avatar from './Avatar'
import {Row, Col} from 'reactstrap';

class Comment extends Component{
    
    constructor(props){
        super(props)
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
                avatar: "https://lithespeed.com/wp-content/uploads/2019/04/listermann-profile-picture-e1556572036426.jpg"
            }
        })
    }

    componentWillMount(){
        this.getUserData();
    }

    render(){

        const {leftProportion, style, avatarHeight} = this.props
        return (
            <Row style={style}>
                {/* <Avatar avatarurl={this.state.userdata.avatar} name={this.state.userdata.name} isComment={true}/> */}
                <Col sm={leftProportion} xs={3}>
                    <img width="100%" style={{maxHeight: avatarHeight}}src={this.state.userdata.avatar} alt={this.state.userdata.name}/>
                </Col>
                <Col sm={12 - leftProportion} xs={9}>
                    <div style={{display: 'inline-block', borderRight: '1px solid gray', padding: '0 15px'}}>
                        {this.state.userdata.name}
                    </div>
                    <div style={{display: 'inline-block', padding: '0 15px'}}>
                        {this.state.userdata.name}
                    </div>
                    <p style={{display: 'block'}}>
                        {this.props.content}
                    </p>
                </Col>
            </Row>)
    }
}

export default Comment;