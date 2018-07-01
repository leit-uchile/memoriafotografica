import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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

class Photo extends Component {
    constructor(props){
        super(props);
        this.props = props;
    }
    render() {
        return(
            <div>
                <h3>{this.props.name}</h3>
                <img src={this.props.url} alt={this.props.name}/>
                <p>{this.props.desc}</p>
                <ul>
                    {this.props.tags.map( (el) => {
                        return <li>{el}</li>
                    })}
                </ul>
            </div>
        );
    }
}

class Gallery extends Component {
    constructor(props){
        super(props);
        this.imageList = props.imageList;
    }

    render() {
        return (
            this.imageList.map((el) => {
                return <Photo name={el.name} url={el.url} tags={el.tags} desc={el.desc}/>
            })
        );
    }
}

class Filter extends Component {
    constructor(props){
        super(props);
        this.tags = props.tags;
        this.onClickFilter = props.filterFunc;
        this.onClickReset = props.resetFunc;
    }
    // Agregar funcion onclick
    render() {
        return (
            <div>
                {this.tags.map( (el) => {
                    return <label> {el}
                        <input type="checkbox" name={el} value={el}/>
                    </label>
                })}
                <button onClick={this.onClickFilter}>Mostrar seleccionados</button>
                <button onClick={this.onClickReset}>Mostrat todos</button>
            </div>
        );
    }
}

class App extends Component {
  constructor(props){
      super(props);
      this.props = props;
      this.validTags = new Set();
  }

  handleFilter(){

  }

  resetFilter(){

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
            <Gallery imageList={this.props.gallery}/>
            <Filter tags={this.props.tags} filterFunc={this.handleFilter()} resetFunc={this.resetFilter()}/>
        </div>
      </div>
    );
  }



}

App.defaultProps = {
    gallery : imgs,
    tags : tags
}

export default App;
