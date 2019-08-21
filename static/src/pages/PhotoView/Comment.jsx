import React, { Component } from 'react';
import Avatar from './Avatar'
import {Row, Col} from 'reactstrap';

class Comment extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            userdata: {
                id : 1,
                name: "Usuario anónimo",
                avatar: "https://lithespeed.com/wp-content/uploads/2019/04/listermann-profile-picture-e1556572036426.jpg",
                context: "Sin información"
            }
        }
    }

    render(){
        const {leftProportion, style, avatarHeight, user} = this.props
        var userName = user.first_name !== "" && user.first_name !== null ? `${user.first_name} ${user.last_name}` : this.state.userdata.name
        var context = user.rol_type !== "" ? user.rol_type : this.state.userdata.context
        var avatarIm = user.avatar != null ? user.avatar : this.state.userdata.avatar

        return (
            <Row style={style}>
                {/* <Avatar avatarurl={this.state.userdata.avatar} name={this.state.userdata.name} isComment={true}/> */}
                <Col sm={leftProportion} xs={3}>
                    <div style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "25px",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundImage: `url(${avatarIm})`
                            }}></div>
                </Col>
                <Col sm={12 - leftProportion} xs={9}>
                    <div style={{display: 'inline-block', borderRight: '2px solid gray', padding: '0 15px 0 0'}}>
                        <b>{userName}</b>
                    </div>
                    <div style={{display: 'inline-block', padding: '0 15px'}}>
                        {context}
                    </div>
                    <p style={{display: 'block'}}>
                        {this.props.content}
                    </p>
                </Col>
            </Row>)
    }
}

export default Comment;