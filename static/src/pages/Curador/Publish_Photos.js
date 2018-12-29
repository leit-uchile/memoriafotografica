import React, { Component } from 'react';
import Photo from '../../components/Photo';

var list = [
    {
        name: "img1",
        url: "https://www.ssbwiki.com/images/thumb/2/2b/Isabelle_SSBU.png/250px-Isabelle_SSBU.png",
        tags: ["tag1","tag2"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc1",
        state: "uploaded"
    },
    {
        name: "img2",
        url: "https://vignette.wikia.nocookie.net/fantendo/images/b/b6/Waluigi_Artwork_-_Super_Smash_Bros._Brawl.png/revision/latest?cb=20160503203605",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc2",
        state: "uploaded"
    },
    {
        name: "img3",
        url: "https://vignette.wikia.nocookie.net/fantendo/images/b/b6/Waluigi_Artwork_-_Super_Smash_Bros._Brawl.png/revision/latest?cb=20160503203605",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc3",
        state: "uploaded"
    },
    {
        name: "img4",
        url: "https://vignette.wikia.nocookie.net/fantendo/images/b/b6/Waluigi_Artwork_-_Super_Smash_Bros._Brawl.png/revision/latest?cb=20160503203605",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc4",
        state: "uploaded"
    },
    {
        name: "img5",
        url: "https://vignette.wikia.nocookie.net/fantendo/images/b/b6/Waluigi_Artwork_-_Super_Smash_Bros._Brawl.png/revision/latest?cb=20160503203605",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc5",
        state: "uploaded"
    },
    {
        name: "img6",
        url: "https://vignette.wikia.nocookie.net/fantendo/images/b/b6/Waluigi_Artwork_-_Super_Smash_Bros._Brawl.png/revision/latest?cb=20160503203605",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc6",
        state: "uploaded"
    }
];

class Publish_Photos extends Component{

    constructor(props){
        super(props)
        this.getLatestElements = this.getLatestElements.bind(this)
        this.removeElement = this.removeElement.bind(this)
        this.updateElementState = this.updateElementState.bind(this)
        this.state = {
            ...this.list=list
            
        }
    }

    componentWillMount(){
        this.getLatestElements()
    }

    getLatestElements(){
        // Call API
        this.setState({
            elements: list
        })
    }

    updateElementState(){
        // Send update to API

        // Update
        // remove
        this.removeElement()
        // getLatestElements

    }

    removeElement(){
        // Fake call to API
        list = list.slice(1,list.length)
        this.getLatestElements()
    }

    render(){

        var latest = []
        for (var i = 1; i < 4 && i < list.length; i++) {
            latest.push(
                <Photo name={this.state.elements[i].name} url={this.state.elements[i].url} tags={this.state.elements[i].tags} state={this.state.elements[i].state}/>
            )
        }
        var actually = ''

        if(list.length<1) {
            actually = 'Has filtrado todas las solicitudes'
        }
        else{
            actually= <Photo name={this.state.elements[0].name} url={this.state.elements[0].url} tags={this.state.elements[0].tags}
                             desc={this.state.elements[0].desc} state={this.state.elements[0].state}/>

        }
        return(
            <div>
                {actually}
                <div className='btn-group' role='group' aria-label='Accions'>
                    <button type="button" className="btn btn-primary active" onClick={this.updateElementState}>this.checkIn</button>
                    <button type="button" className="btn btn-secondary active" onClick={this.removeElement}>Rechazar</button>
                </div>
                {latest}
            </div>
        );
    }

}
Publish_Photos.props = {
    gallery: list
}

export default Publish_Photos