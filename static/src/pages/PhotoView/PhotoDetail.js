import React, { Component } from 'react';

import Comment from "./Comment";
import ReportModal from "./ReportModal"
import Photo from '../../components/Photo';
import {Link} from 'react-router-dom';

class PhotoDetails extends Component{

    constructor(Props){
        super();
        this.state = {
            image : {
                ownerid: 0,
                name: "img1",
                url: "https://mott.pe/noticias/wp-content/uploads/2016/11/Janette-Asche.jpg",
                tags: ["tag1","tag2"],
                // Lorem ipsum Dolor Sit Amet
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. Nunc at vestibulum elit. Vivamus id ipsum eros. Curabitur pulvinar nulla eu magna euismod iaculis. Nulla facilisi. Vestibulum euismod augue vel semper condimentum. Mauris laoreet, quam quis finibus malesuada, tellus tellus ultrices odio, quis commodo nulla nulla vestibulum arcu. Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. ",
                permissions: 0
            },
            commentsLoaded : false,
            suggestionsLoaded : false,

        }
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
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. Nunc at vestibulum elit. Vivamus id ipsum eros. Curabitur pulvinar nulla eu magna euismod iaculis. Nulla facilisi. Vestibulum euismod augue vel semper condimentum. Mauris laoreet, quam quis finibus malesuada, tellus tellus ultrices odio, quis commodo nulla nulla vestibulum arcu. Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. "
                },
                {
                    id: 0,
                    userid : 0,
                    photoid: 0,
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. Nunc at vestibulum elit. Vivamus id ipsum eros. Curabitur pulvinar nulla eu magna euismod iaculis. Nulla facilisi. Vestibulum euismod augue vel semper condimentum. Mauris laoreet, quam quis finibus malesuada, tellus tellus ultrices odio, quis commodo nulla nulla vestibulum arcu. Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. "
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
                <span>
                    {this.state.image.tags[i]}
                </span>
            )   
        }

        var Suggestions;
        if(this.state.suggestionsLoaded){
            Suggestions = this.state.imageSuggestions.map( (im,k) => <div> <img key={k} src={im.url} style={{maxWidth: "100%"}}/> </div>)
        }

        var userProfile;
        if(this.state.userinfo != undefined){
            userProfile = <div><span>Subido por {this.state.userinfo.name}</span> <img src={this.state.userinfo.avatar}/></div>
        }

        return (
            <div className="row">
                <div >
                    <div>
                        <img src={this.state.image.url}/>
                        <div>
                            <h2>Descripcion</h2>
                            <p>{this.state.image.desc}</p>
                            {imageTags}
                        </div>
                        <Link to="/" >Si quieres pedir la imagen ingresa aqui</Link>
                        <ReportModal/>
                    </div>
                    <div>
                        {userProfile}
                    </div>
                </div>
                <div className="col">
                    {commentDivs}
                </div>
                <div className="col">
                    {Suggestions}
                </div>
            </div>
        );
    }
}

export default PhotoDetails;