import React, { Component } from 'react';

import Comment from "./Comment";
import ReportModal from "./ReportModal"
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Row, Col, Form, Container, Card, CardImg, CardText, CardBody, CardFooter} from 'reactstrap';

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
            newCommentID: "0"
        };

        this.sendComment = this.sendComment.bind(this);
        this.storeComment = this.storeComment.bind(this);
        this.getDataFromBack = this.getDataFromBack.bind(this);
    }

    getUserDetails(){
        this.setState({
            userinfo: {
                id : 1,
                name: "Juan",
                avatar: "https://lithespeed.com/wp-content/uploads/2019/04/listermann-profile-picture-e1556572036426.jpg"
            }
        })
    }

    getComments(){
        this.props.fetchComments(this.state.myPhotoID, this.props.auth.token);
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
        this.props.loadSuggestions();
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

        if(this.props.photoInfo.new_comment && this.props.photoInfo.new_comment.id !== this.state.newCommentID){
            this.setState({
                newCommentID: this.props.photoInfo.new_comment.id,
            })
            this.getComments();
        }

    }

    render(){
        const {photoInfo, suggestions} = this.props;
        var permissions = [];
        // permission
        //metadata

        var commentDivs = [];
        if(photoInfo.commentsLoaded){
            for (let i = 0; i < photoInfo.comments.length; i++) {
                commentDivs.push(
                    <Comment leftProportion={3} id={photoInfo.comments[i].id} avatarHeight={"150px"}
                    style={{marginBottom: '1em', height: "150px"}} content={photoInfo.comments[i].content}/>
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

        var Suggestions = suggestions ? suggestions.slice(0,10).map( (im,k) => 
            <Photo style={{marginBottom: '1em'}} key={k} width={"150px"}
            url={im.thumbnail} name={"Foto relacionada"} useLink redirectUrl={"/photo/"+im.id}/> ) : null

        var userProfile = this.state.userinfo ? 
            <Card>
                <CardImg top width="100%" alt="Foto de usuario" src={this.state.userinfo.avatar}/>
                <CardBody>
                    <CardText>
                        {this.state.userinfo.name}
                    </CardText>
                </CardBody>
                <CardFooter>
                    Generacion 2013
                </CardFooter>
            </Card> : null

        var newComment = this.state.auth.isAuthenticated === true ? 
            <Row  style={{margin: "0 1em"}}>
                <Form onSubmit={this.sendComment} style={{width: "100%"}}>
                    <h5>Escribe aqui tu comentario</h5>
                    <textarea rows="4" required onChange={this.storeComment}
                    style={{width: "calc(100% - 2em)", margin: "1em"}}></textarea>
                    <br></br>
                    <Button color="primary" style={{marginLeft: "1em"}} type='submit'>Comentar</Button>
                </Form>
            </Row> : null

        return (
            <Container>
                <h1>{photoInfo.details.title}</h1>
                <Row>
                    <Col md={9}>
                        <img alt={photoInfo.details.title} src={photoInfo.details.image} style={{marginRight: "auto", marginLeft: "auto", display: "block", maxWidth: "100%"}}/>
                        <p style={{backgroundColor: "#ebeeef", padding: "15px"}}>{photoInfo.details.description}</p>
                        <Button tag={Link} to="/" className="float-right">
                            Quieres usar la foto
                        </Button>
                        <ReportModal style={{display: 'inline-block'}} className="float-right"/>
                    </Col>
                    <Col md={3}>
                        {userProfile}
                        {imageTags}
                    </Col>
                </Row>
                <hr style={{backgroundColor: 'gray'}}/>
                <Row>
                    <Col md={9} style={{borderRight: '1px solid gray'}}>
                        {commentDivs}
                        {newComment}
                    </Col>
                    <Col md={3}>
                        {Suggestions}
                    </Col>
                </Row>
            </Container>
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