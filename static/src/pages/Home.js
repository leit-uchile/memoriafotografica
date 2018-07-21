import React, { Component } from 'react';
import Gallery from '../components/Gallery';

let imgs = [
    {
        name: "img1",
        url: "",
        tags: ["tag1","tag2"],
        // Lorem ipsum Dolor Sit Amet
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. Nunc at vestibulum elit. Vivamus id ipsum eros. Curabitur pulvinar nulla eu magna euismod iaculis. Nulla facilisi. Vestibulum euismod augue vel semper condimentum. Mauris laoreet, quam quis finibus malesuada, tellus tellus ultrices odio, quis commodo nulla nulla vestibulum arcu. Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. "
    },
    {
        name: "img2",
        url: "",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. Nunc at vestibulum elit. Vivamus id ipsum eros. Curabitur pulvinar nulla eu magna euismod iaculis. Nulla facilisi. Vestibulum euismod augue vel semper condimentum. Mauris laoreet, quam quis finibus malesuada, tellus tellus ultrices odio, quis commodo nulla nulla vestibulum arcu. Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. "
    },
    {
        name: "img3",
        url: "",
        tags: ["tag1","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat leo vitae felis iaculis, sit amet placerat tellus tincidunt. Nunc at vestibulum elit. Vivamus id ipsum eros. Curabitur pulvinar nulla eu magna euismod iaculis. Nulla facilisi. Vestibulum euismod augue vel semper condimentum. Mauris laoreet, quam quis finibus malesuada, tellus tellus ultrices odio, quis commodo nulla nulla vestibulum arcu. Nullam aliquet, quam id porttitor consectetur, arcu velit congue arcu, non sollicitudin nunc dolor id enim. Nunc ultricies eget mauris id dapibus. Praesent magna lorem, lacinia id tristique vel, fringilla eget urna. Sed velit elit, rhoncus at ligula ac, porta dapibus nunc. Morbi eu nulla vel lectus porta egestas sit amet vitae dui. "
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
            <div><h1>Gallery Home</h1>
            <Gallery imageList={this.props.gallery} />
            </div>


        );
    }

}

Home.defaultProps = {
    gallery : imgs,
    tags : tags
}

export default Home;