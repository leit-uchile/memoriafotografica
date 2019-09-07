import React, { Component } from 'react';

import Comment from "./Comment";
import ReportModal from "./ReportModal"
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Row, Col, Form, Container} from 'reactstrap';
import {Helmet} from "react-helmet";

import {photoDetails, home} from '../../actions';
import Photo from '../../components/Photo';

const getPermissionLogo = (name, w,h, offset) => {
    switch(name){
        case 'CC BY':
            return (<img width={w} height={h} src="/assets/CCBY.svg" style={{...styles.cc, right: `${offset*w}px`}}/>);
        case 'CC BY-NC':
            return (<img width={w} height={h} src="/assets/CCBYNC.svg" style={{...styles.cc, right: `${offset*w}px`}}/>)
        case 'CC BY-NC-ND':
            return (<img width={w} height={h} src="/assets/CCBYNCND.svg" style={{...styles.cc, right: `${offset*w}px`}}/>)
        case 'CC BY-NC-SA':
            return (<img width={w} height={h} src="/assets/CCBYNCSA.svg" style={{...styles.cc, right: `${offset*w}px`}}/>)
        case 'CC BY-ND':
            return (<img width={w} height={h} src="/assets/CCBYND.svg" style={{...styles.cc, right: `${offset*w}px`}}/>)
        case 'CC BY-SA':
            return (<img width={w} height={h} src="/assets/CCBYSA.svg" style={{...styles.cc, right: `${offset*w}px`}}/>)
        default:
            return null;
    }
}

const Tags = ({tags}) => (
    <Row>
        <Col sm={{offset: 2, size: 10}}>
        {tags.length == 0 ? <p>No hay tags asociados</p> : tags.map((el, index) => (
            <span key={el.id} style={styles.tags}>#{el.value}</span>
        ))}
        </Col>
    </Row>
)

class PhotoDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            commentsLoaded : 0,
            suggestionsLoaded : false,
            auth: this.props.auth,
            newCommentInfo: "",
            myPhotoID: this.props.match.params.id,
            newCommentID: "0",
            firstLoad: true,
        };
        this.sendComment = this.sendComment.bind(this);
        this.storeComment = this.storeComment.bind(this);
        this.getDataFromBack = this.getDataFromBack.bind(this);
        this.getMetadataNames = this.getMetadataNames.bind(this);
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

    getMetadataNames(){
        this.props.loadMetadata(this.props.photoInfo.details.metadata)
    }

    getDataFromBack(){
        // Load elements once props arrive
        this.getUserDetails();
        this.getMetadataNames();
        this.getComments();
        this.props.loadSuggestions();
    }
    componentWillMount(){
        this.imageContainer = React.createRef();
    }

    componentDidMount(){
        this.imageContainer.current.scrollIntoView({block: "start", behavior: "smooth"});
        // Load info the first time
        this.setState({loadingPhoto: true}, () => this.props.onLoad(this.state.myPhotoID));
    }

    componentDidUpdate(prevProps){
        // Load info when new props arrive or it is the first load
        if(this.state.firstLoad && this.props.photoInfo.details.id !== undefined || 
            (prevProps.photoInfo.details.id !== this.props.photoInfo.details.id)){
            this.imageContainer.current.scrollIntoView({block: "start", behavior: "smooth"});
            this.setState({
                firstLoad: false}, function(){
                this.getDataFromBack()})
        }

        // Reload component with new ID
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.imageContainer.current.scrollIntoView({block: "start", behavior: "smooth"});
            this.setState({
                myPhotoID: this.props.match.params.id, loadingPhoto: true}, 
                    () => {this.props.onLoad(this.state.myPhotoID)}
                )
        }

        // Refresh comment list
        if(this.props.photoInfo.new_comment && this.props.photoInfo.new_comment.id !== this.state.newCommentID){
            this.setState({
                newCommentID: this.props.photoInfo.new_comment.id,
            })
            this.getComments();
        }

    }

    render(){
        const {photoInfo, suggestions, metadata} = this.props;
        var permissions = photoInfo.details.permission.map((el,i) => getPermissionLogo(el,90,32,i));

        var imageTags = metadata ? metadata : []
        imageTags = <Container fluid>
            <Tags tags={imageTags} />
        </Container>
        
        var commentDivs = [];
        if(photoInfo.commentsLoaded){
            for (let i = 0; i < photoInfo.comments.length; i++) {
                commentDivs.push(
                    <Comment leftProportion={1} id={photoInfo.comments[i].id}
                    style={{marginBottom: '1em'}} content={photoInfo.comments[i].content} user={photoInfo.comments[i].usuario}/>
                )   
            }
        }

        var Suggestions = suggestions && photoInfo ? suggestions.slice(0,10).map( (im,k) => im.id !== photoInfo.details.id ?
            <Photo style={ this.props.auth.isAuthenticated ? {marginBottom: '1em'} : 
                {marginRight: '1em', display: 'inline-block'}} key={k} 
            url={im.thumbnail} name={"Foto relacionada"} useLink redirectUrl={"/photo/"+im.id} 
            hover hoverText={im.title} hoverStyle={{fontSize: '1.5em'}}/> : null ) : null

        var userProfile = this.state.userinfo ? 
            <Container fluid>
                <Row>
                    <Col sm={2}>
                        <div style={{...styles.avatarStyle.avatarImg, backgroundImage: `url(${this.state.userinfo.avatar})`}}></div>
                    </Col>
                    <Col sm={10}>
                        <b>{this.state.userinfo.name}</b>
                        <p>
                            Generacion 2013
                        </p>
                    </Col>
                </Row>
            </Container>: null

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
            <Container fluid>
                <div ref={this.imageContainer} style={{width: "100%"}}>
                    <Helmet>
                        <meta property="og:title" content={photoInfo.details.title} />
                        <meta property="og:type" content="website" />
                        <meta property="og:url" content=" http://memoriafotografica.ing.fcfm.cl/" />
                        <meta property="og:image" content=" http://example.com/image.jpg" />
                        <meta property="og:description" content="Descripcion" />
                        <title>{photoInfo.details.title}</title>
                    </Helmet>
                    <Row style={styles.imageContainer}>
                        <Col md={{offset: 3, size: 6}}>
                            <h2 style={styles.center}>{photoInfo.details.title}</h2>
                            <img alt={photoInfo.details.title} src={photoInfo.details.thumbnail} style={{display: "block", margin: "0 auto 0 auto",maxHeight: "60vh", maxWidth: "100%"}}/>
                        </Col>
                        {permissions}
                    </Row>
                    <Container fluid>
                        <Row>
                            <Col md={5}>
                                {userProfile}
                                {imageTags}
                            </Col>
                            <Col md={7} >
                                <p style={styles.description.text}>{photoInfo.details.description}</p>
                                <Button tag={Link} to="/" className="float-left">
                                    ¿Quieres usar la foto?
                                </Button>
                                <ReportModal style={{display: 'inline-block'}} className="float-left"/>
                            </Col>
                        </Row>
                        <hr style={{backgroundColor: 'gray'}}/>
                        {this.props.auth.isAuthenticated ? 
                            <Row>
                                <Col md={9} style={{borderRight: '1px solid gray'}}>
                                    <Container>
                                        {commentDivs}
                                        {newComment}
                                    </Container>                                
                                </Col>
                                <Col md={3}>
                                    <Container>
                                    {Suggestions}
                                    </Container>
                                </Col>
                            </Row> :
                            <Row>
                                <Col>
                                    {Suggestions}
                                </Col>
                            </Row>
                        }
                    </Container>
                </div>
            </Container>    
        );
    }
}

const styles={
    imageContainer: {
        backgroundColor: "#212124",
        color: "white",
        padding: "3em",
        marginBottom: "2em",
        position: "relative",
        minHeight: "40vh",
    },
    center: {
        textAlign: "center",
    },
    avatarStyle:{
        avatarImg: {
            width: "50px",
            height: "50px",
            borderRadius: "25px",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        },
        avatarText: {

        }
    },
    description: {
        text: {
            padding: "15px",
        }
    },tags:{
        color:'white', 
        borderRadius:'10px', 
        backgroundColor:'#9a9e9d', 
        margin:'2px', 
        padding:'4px 12px 4px 12px'
    },
    cc: {
        position: 'absolute',
        bottom: '0'
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        photoInfo: state.photoDetails,
        suggestions: state.home.photos,
        metadata: state.photoDetails.metadataNames,
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
        },
        loadMetadata: (ids) => {
            return dispatch(photoDetails.getMetadataNames(ids));
        }
    }
}

export default connect(mapStateToProps,mapActionsToProps)(PhotoDetails);