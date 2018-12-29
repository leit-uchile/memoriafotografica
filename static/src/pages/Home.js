import React, { Component } from 'react';
import Gallery from '../components/Gallery';
import {home} from '../actions';
import galleryHome from '../css/galleryHome.css';

let imgs = [
    {
        name: "img1",
        url: "https://mott.pe/noticias/wp-content/uploads/2016/11/Janette-Asche.jpg",
        tags: ["tag1","tag2"],
        // Lorem ipsum Dolor Sit Amet
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. Nunc at vestibulum elit. Vivamus id ipsum eros. Curabitur pulvinar nulla eu magna euismod iaculis. Nulla facilisi. Vestibulum euismod augue vel semper condimentum. Mauris laoreet, quam quis finibus malesuada, tellus tellus ultrices odio, quis commodo nulla nulla vestibulum arcu. Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. ",
        state: "published"
    },
    {
        name: "img2",
        url: "https://i.pinimg.com/736x/27/8a/2e/278a2e7cdc2f3d04df099a3802b301f1--chile-villa.jpg",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. Nunc at vestibulum elit. Vivamus id ipsum eros. Curabitur pulvinar nulla eu magna euismod iaculis. Nulla facilisi. Vestibulum euismod augue vel semper condimentum. Mauris laoreet, quam quis finibus malesuada, tellus tellus ultrices odio, quis commodo nulla nulla vestibulum arcu. Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. ",
        state: "published"
    },
    {
        name: "img3",
        url: "https://enviajes.cl/wp-content/uploads/2014/10/Chile-Fotos-Catedral-de-Marmol.jpg",
        tags: ["tag1","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. Nunc at vestibulum elit. Vivamus id ipsum eros. Curabitur pulvinar nulla eu magna euismod iaculis. Nulla facilisi. Vestibulum euismod augue vel semper condimentum. Mauris laoreet, quam quis finibus malesuada, tellus tellus ultrices odio, quis commodo nulla nulla vestibulum arcu. Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. ",
        state: "published"
    },
    {
        name: "img4",
        url: "https://i3.visitchile.com/img/GalleryContent/8867/01_nuestra_vina.jpg",
        tags: ["tag1","tag2"],
        // Lorem ipsum Dolor Sit Amet
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. Nunc at vestibulum elit. Vivamus id ipsum eros. Curabitur pulvinar nulla eu magna euismod iaculis. Nulla facilisi. Vestibulum euismod augue vel semper condimentum. Mauris laoreet, quam quis finibus malesuada, tellus tellus ultrices odio, quis commodo nulla nulla vestibulum arcu. Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. ",
        state: "published"
    },
    {
        name: "img5",
        url: "https://i3.visitchile.com/img/GalleryContent/8874/IMG_2227.jpg",
        tags: ["tag1","tag2"],
        // Lorem ipsum Dolor Sit Amet
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. Nunc at vestibulum elit. Vivamus id ipsum eros. Curabitur pulvinar nulla eu magna euismod iaculis. Nulla facilisi. Vestibulum euismod augue vel semper condimentum. Mauris laoreet, quam quis finibus malesuada, tellus tellus ultrices odio, quis commodo nulla nulla vestibulum arcu. Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. ",
        state: "published"
    },
    {
        name: "img6",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXNHwd_dZRBXjRWzvbEXwqOFLTQ1U98bQGNQogaJu94I7mENue",
        tags: ["tag1","tag2"],
        // Lorem ipsum Dolor Sit Amet
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. Nunc at vestibulum elit. Vivamus id ipsum eros. Curabitur pulvinar nulla eu magna euismod iaculis. Nulla facilisi. Vestibulum euismod augue vel semper condimentum. Mauris laoreet, quam quis finibus malesuada, tellus tellus ultrices odio, quis commodo nulla nulla vestibulum arcu. Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. ",
        state: "published"
    },
    {
        name: "img7",
        url: "https://i4.visitchile.com/img/GalleryContent/8877/santa_cruz_hotel_noche.jpg",
        tags: ["tag1","tag2"],
        // Lorem ipsum Dolor Sit Amet
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. Nunc at vestibulum elit. Vivamus id ipsum eros. Curabitur pulvinar nulla eu magna euismod iaculis. Nulla facilisi. Vestibulum euismod augue vel semper condimentum. Mauris laoreet, quam quis finibus malesuada, tellus tellus ultrices odio, quis commodo nulla nulla vestibulum arcu. Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. ",
        state: "published"
    },
    {
        name: "img8",
        url: "https://i4.visitchile.com/img/GalleryContent/8891/santa_rita.jpg",
        tags: ["tag1","tag2"],
        // Lorem ipsum Dolor Sit Amet
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. Nunc at vestibulum elit. Vivamus id ipsum eros. Curabitur pulvinar nulla eu magna euismod iaculis. Nulla facilisi. Vestibulum euismod augue vel semper condimentum. Mauris laoreet, quam quis finibus malesuada, tellus tellus ultrices odio, quis commodo nulla nulla vestibulum arcu. Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. ",
        state: "published"
    },
    {
        name: "img9",
        url: "https://i4.visitchile.com/img/GalleryContent/8873/Parque.jpg",
        tags: ["tag1","tag2"],
        // Lorem ipsum Dolor Sit Amet
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. Nunc at vestibulum elit. Vivamus id ipsum eros. Curabitur pulvinar nulla eu magna euismod iaculis. Nulla facilisi. Vestibulum euismod augue vel semper condimentum. Mauris laoreet, quam quis finibus malesuada, tellus tellus ultrices odio, quis commodo nulla nulla vestibulum arcu. Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. ",
        state: "published"
    }
];

let tags = [
    "tag1",
    "tag2",
    "tag3"
];

class Home extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div style={{marginTop: '10%'}}>
                <div classname='container'>
                    <div classname='row'>
                        <div classname='col-md-12'>
                            <div classname='banner-text'>
                                <p>Ayudanos a recuperar la memoria de la U</p>

                            </div>
                        </div>
                    </div>
                </div>
                <div classname='container' style={{marginLeft: '130px'}}>
                    <div classname='grid-padding'>
                        <div class='row'>                            
                            <Gallery imageList={this.props.gallery} />
                        </div>
                    </div>                   
                </div>
            </div>
            
        );
    }

}

Home.defaultProps = {
    gallery : imgs,
    tags : tags
}

export default Home;