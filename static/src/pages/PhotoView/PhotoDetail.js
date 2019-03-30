import React, { Component } from 'react';

import Comment from "./Comment";
import ReportModal from "./ReportModal"
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';

class PhotoDetails extends Component{

    constructor(props){
        super(props);
        this.state = {
            image : {
                ownerid: 0,
                name: "img1",
                url: "https://mott.pe/noticias/wp-content/uploads/2016/11/Janette-Asche.jpg",
                tags: ["facultad de quimica","1992"],
                // Lorem ipsum Dolor Sit Amet
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. Nunc at vestibulum elit. Vivamus id ipsum eros. Curabitur pulvinar nulla eu magna euismod iaculis. Nulla facilisi. Vestibulum euismod augue vel semper condimentum. Mauris laoreet, quam quis finibus malesuada, tellus tellus ultrices odio, quis commodo nulla nulla vestibulum arcu. Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. ",
                permissions: 0
            },
            commentsLoaded : false,
            suggestionsLoaded : false,
            auth: this.props.auth,
            newCommentInfo: null
        }

        this.sendComment = this.sendComment.bind(this)
    }

    async getUserDetails(){
        console.log("Called the API")
        this.setState({
            userinfo: {
                id : 1,
                name: "Juan",
                avatar: "http://www.icare3d.org/images/AvatarTransp.png"
            }
        })
    }

    async getComments(){
        console.log("Called the API")
        this.setState({
            comments : [
                {
                    id: 0,
                    userid : 0,
                    photoid: 0,
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. "
                },
                {
                    id: 0,
                    userid : 0,
                    photoid: 0,
                    content: "Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. "
                }
            ],
            commentsLoaded: true
        })
    }

    async getSuggestedContent(){
        console.log("Called the APi")
        this.setState({
            imageSuggestions: [{
                name: "img1",
                url: "https://mott.pe/noticias/wp-content/uploads/2016/11/Janette-Asche.jpg",
                tags: ["tag1","tag2"],
                // Lorem ipsum Dolor Sit Amet
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. Nunc at vestibulum elit. Vivamus id ipsum eros. Curabitur pulvinar nulla eu magna euismod iaculis. Nulla facilisi. Vestibulum euismod augue vel semper condimentum. Mauris laoreet, quam quis finibus malesuada, tellus tellus ultrices odio, quis commodo nulla nulla vestibulum arcu. Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. "
            },
            {
                name: "img2",
                url: "https://i.pinimg.com/736x/27/8a/2e/278a2e7cdc2f3d04df099a3802b301f1--chile-villa.jpg",
                tags: ["tag2","tag3"],
                // Lorem ipsum Dolor Sit Amet
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. Nunc at vestibulum elit. Vivamus id ipsum eros. Curabitur pulvinar nulla eu magna euismod iaculis. Nulla facilisi. Vestibulum euismod augue vel semper condimentum. Mauris laoreet, quam quis finibus malesuada, tellus tellus ultrices odio, quis commodo nulla nulla vestibulum arcu. Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. "
            },
            {
                name: "img3",
                url: "https://enviajes.cl/wp-content/uploads/2014/10/Chile-Fotos-Catedral-de-Marmol.jpg",
                tags: ["tag1","tag3"],
                // Lorem ipsum Dolor Sit Amet
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. Nunc at vestibulum elit. Vivamus id ipsum eros. Curabitur pulvinar nulla eu magna euismod iaculis. Nulla facilisi. Vestibulum euismod augue vel semper condimentum. Mauris laoreet, quam quis finibus malesuada, tellus tellus ultrices odio, quis commodo nulla nulla vestibulum arcu. Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. "
            }],
            suggestionsLoaded: true
            }
        )
    }

    async sendComment(e){
        e.preventDefault()
        if(this.state.newCommentInfo != null){
            console.log("Call the API")
        }
    }

    componentDidMount(){
        this.getComments();
        this.getUserDetails();
        this.getSuggestedContent();
    }

    render(){

        var commentDivs = [];
        if(this.state.commentsLoaded){
            for (let i = 0; i < this.state.comments.length; i++) {
                commentDivs.push(
                    <Comment userid={this.state.comments[i].userid} content={this.state.comments[i].content} />
                )   
            }
        }

        var imageTags = [];
        for (let i = 0; i < this.state.image.tags.length; i++) {
            imageTags.push(
                <span style={{color: "white", backgroundColor: "blue", padding: "0.7em", margin: "1em", borderRadius: "1em"}}>
                    {this.state.image.tags[i]}
                </span>
            )   
        }

        var Suggestions;
        if(this.state.suggestionsLoaded){
            Suggestions = this.state.imageSuggestions.map( (im,k) => <div style={{margin: "0 1em 1em 1em"}}> <
                img alt="Foto relacionada" key={k} src={im.url} style={{maxWidth: "90%"}}/> </div>)
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
            newComment = <div className="row" style={{margin: "0 1em"}}>
                <form onSubmit={this.sendComment} style={{width: "100%"}}>
                    <h3>Escribe aqui tu comentario</h3>
                    <textarea rows="4" required style={{width: "calc(100% - 2em)", margin: "1em"}}></textarea>
                    <br></br>
                    <Button color="primary" style={{marginLeft: "1em"}}>Comentar</Button>
                </form>
            </div>
        }

        return (
            <div className="row" style={{padding: "2em"}}>
                <div className="col-9" style={{backgroundColor: "rgb(240,240,240)",borderRadius: "1em"}}>
                    <div style={{padding: "2em"}}>
                        <h1 style={{textAlign: "center"}}>{this.state.image.name}</h1>
                        <img alt="" src={this.state.image.url} style={{marginRight: "auto", marginLeft: "auto", display: "block", maxWidth: "100%"}}/>
                        <div>
                            <h2>Descripcion</h2>
                            <p>{this.state.image.desc}</p>
                            {imageTags}
                            {userProfile}
                        </div>
                        <Link to="/" >Si quieres pedir esta imagen ingresa aqui</Link>
                        <ReportModal/>
                    </div>
                    {commentDivs}
                    {newComment}
                </div>
                <div className="col-3" style={{padding: "1em"}}>
                    {Suggestions}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(PhotoDetails);