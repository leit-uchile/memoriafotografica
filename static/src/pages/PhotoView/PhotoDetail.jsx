import React, { Component } from 'react';

import Comment from "./Comment";
import ReportModal from "./ReportModal"
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Row, Col, Form, Container} from 'reactstrap';

import {photoDetails, home} from '../../actions';
import Photo from '../../components/Photo';

class PhotoDetails extends Component{

    constructor(props){
        super(props);
        this.state = {
            commentsLoaded : 0,
            suggestionsLoaded : false,
            auth: this.props.auth,
            newCommentInfo: "",
            myPhotoID: this.props.match.params.id,
        };

        this.sendComment = this.sendComment.bind(this);
        this.storeComment = this.storeComment.bind(this);
        this.getDataFromBack = this.getDataFromBack.bind(this);
    }

    getUserDetails(){
        console.log("Called the API for user details")
        this.setState({
            userinfo: {
                id : 1,
                name: "Juan",
                avatar: "http://www.icare3d.org/images/AvatarTransp.png"
            }
        })
    }

    getComments(){
        this.props.fetchComments(this.state.myPhotoID, this.props.auth.token);
    }

    getSuggestedContent(){
        this.props.loadSuggestions();
    }


    storeComment(e){
        this.setState({ newCommentInfo: e.target.value})
    }

    sendComment(e){
        e.preventDefault()
        if(this.state.newCommentInfo !== ""){
            this.props.newComment(this.state.myPhotoID, this.state.newCommentInfo, this.props.auth.token)
        }
    }

    getDataFromBack(){
        this.props.onLoad(this.state.myPhotoID);
        this.getComments();
        this.getSuggestedContent();
        this.getUserDetails();
    }

    componentDidMount(){
        this.getDataFromBack()
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.setState({myPhotoID: this.props.match.params.id}, function(){
                this.getDataFromBack()
            })
        }
    }

    render(){
        const {photoInfo, suggestions} = this.props;
        var permissions = [];
        // permission
        //metadata

        var commentDivs = [];
        console.log(this.state)
        if(photoInfo.commentsLoaded){
            for (let i = 0; i < photoInfo.comments.length; i++) {
                commentDivs.push(
                    <Comment id={photoInfo.comments[i].id} content={photoInfo.comments[i].content}/>
                )   
            }
        }

        var imageTags = [];
        /* for (let i = 0; i < this.state.image.tags.length; i++) {
            imageTags.push(
                <span style={{color: "white", backgroundColor: "blue", padding: "0.7em", margin: "1em", borderRadius: "1em"}}>
                    {this.state.image.tags[i]}
                </span>
            )   
        } */

        var Suggestions;
        if(suggestions){
            Suggestions = suggestions.slice(0,10).map( (im,k) => 
                <Photo key={k} url={im.image} name={"Foto relacionada"} useLink redirectUrl={"/photo/"+im.id}/>
            )
        }

        var userProfile;
        if(this.state.userinfo !== undefined){
            userProfile = 
            <div style={{marginRight: "auto", marginLeft: "auto"}}>
                <span style={{marginRight: "auto", marginLeft: "auto", display: "block", textAlign: 'center', padding: '1em'}}>Subido por {this.state.userinfo.name}</span>
                <img alt="Foto de usuario" src={this.state.userinfo.avatar} style={{borderRadius: "50%", width: "70px", height: "70px", marginRight: "auto", marginLeft: "auto", display: "block"}}/>
            </div>
        }

        var newComment;
        if(this.state.auth.isAuthenticated === true){
            newComment = 
            <Row  style={{margin: "0 1em"}}>
                <Form onSubmit={this.sendComment} style={{width: "100%"}}>
                    <h5>Escribe aqui tu comentario</h5>
                    <textarea rows="4" required onChange={this.storeComment}
                    style={{width: "calc(100% - 2em)", margin: "1em"}}></textarea>
                    <br></br>
                    <Button color="primary" style={{marginLeft: "1em"}} type='submit'>Comentar</Button>
                </Form>
            </Row>
        }

        return (
            <Row style={{padding: "2em"}}>                
                <Col md={9} style={{backgroundColor: "rgb(240,240,240)",borderRadius: "1em"}}>
                    <div style={{padding: "2em"}}>
                        <img alt={photoInfo.details.title} src={photoInfo.details.image} style={{marginRight: "auto", marginLeft: "auto", display: "block", maxWidth: "100%"}}/>
                        <div>
                            <h1>{photoInfo.details.title}</h1>
                            <h2>Descripcion</h2>
                            <p>{photoInfo.details.desc}</p>
                            {imageTags}
                            {userProfile}
                        </div>
                        <Link to="/" >Si quieres pedir esta imagen ingresa aqui</Link>
                        <ReportModal/>
                    </div>
                    <Container fluid>
                        {commentDivs}
                        {newComment}
                    </Container>
                </Col>
                <Col md={3}>
                    {Suggestions}
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        photoInfo: state.photoDetails,
        suggestions: state.home.photos,
    }
}

const mapActionsToProps = dispatch => {
    return {
        onLoad: id => {
            return dispatch(photoDetails.getPhoto(id))
        },
        fetchComments: (id, auth) => {
            return dispatch(photoDetails.getComments(id,auth));
        },
        loadSuggestions: () => {
            return dispatch(home.home());
        },
        newComment: (id, comment, auth) =>{
            return dispatch(photoDetails.putComment(id, comment, auth))
        }
    }
}

export default connect(mapStateToProps,mapActionsToProps)(PhotoDetails);