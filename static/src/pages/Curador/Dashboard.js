import React, { Component } from 'react';
import Filter from './Filter';
import Publish_Photos from './Publish_Photos';
import Categories from './Categories';
import Reported_Photos from './Reported_Photos';

var filtrar = [
    {
        name: "img1",
        url: "https://www.ssbwiki.com/images/thumb/2/2b/Isabelle_SSBU.png/250px-Isabelle_SSBU.png",
        tags: ["tag1","tag2"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc1",
    },
    {
        name: "img2",
        url: "https://vignette.wikia.nocookie.net/fantendo/images/b/b6/Waluigi_Artwork_-_Super_Smash_Bros._Brawl.png/revision/latest?cb=20160503203605",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc2",
    },
    {
        name: "img3",
        url: "https://vignette.wikia.nocookie.net/fantendo/images/b/b6/Waluigi_Artwork_-_Super_Smash_Bros._Brawl.png/revision/latest?cb=20160503203605",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc3",
    },
    {
        name: "img4",
        url: "https://vignette.wikia.nocookie.net/fantendo/images/b/b6/Waluigi_Artwork_-_Super_Smash_Bros._Brawl.png/revision/latest?cb=20160503203605",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc4",
    },
    {
        name: "img5",
        url: "https://vignette.wikia.nocookie.net/fantendo/images/b/b6/Waluigi_Artwork_-_Super_Smash_Bros._Brawl.png/revision/latest?cb=20160503203605",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc5",
    },
    {
        name: "img6",
        url: "https://vignette.wikia.nocookie.net/fantendo/images/b/b6/Waluigi_Artwork_-_Super_Smash_Bros._Brawl.png/revision/latest?cb=20160503203605",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc6",
    }
];
var fotos_denunciadas = [
    {
        name: "img1",
        url: "https://www.smashbros.com/wiiu-3ds/images/character/koopa/main.png",
        tags: ["tag1","tag2"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc1",
        reason: "me cae mal",
    },
    {
        name: "img2",
        url: "https://i.kym-cdn.com/photos/images/newsfeed/001/141/079/8f3.jpg",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc2",
        reason: "foto inapropiada",
    },
    {
        name: "img3",
        url: "https://vignette.wikia.nocookie.net/fantendo/images/b/b6/Waluigi_Artwork_-_Super_Smash_Bros._Brawl.png/revision/latest?cb=20160503203605",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc3",
        reason: "ninguna",
    },
    {
        name: "img4",
        url: "https://vignette.wikia.nocookie.net/fantendo/images/b/b6/Waluigi_Artwork_-_Super_Smash_Bros._Brawl.png/revision/latest?cb=20160503203605",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc4",
        reason: "foto duplicada",
    }
];

class Dashboard extends Component{
    constructor(){
        super();
        this.state={
            page: 0
        };
    }
    changePage = e =>{this.setState({page: e})}

    render(){
        var currentpage;
        switch (this.state.page){
            case 0:
                currentpage = <Filter list={filtrar} action1={"Subir"} action2={"Descartar"}/>
                break;
            case 1:
                currentpage = <Categories/>
                break;
            case 2:
                currentpage = <Filter list={fotos_denunciadas} action1={"Filtrar"} action2={"Descartar"}/>
                break;
            case 3:
                currentpage = <Filter />
                break;
        }

        return(
            <div className='container'>
                <h1>DASHBOARD Curador</h1>
                <div className='btn-group' role='group' aria-label='Botones'>
                    <button type="button" className="btn btn-secondary active" onClick={()=>this.changePage(0)}>Filtrar <span className="badge bandge-pill badge-light">N</span></button>
                    <button type="button" className="btn btn-secondary active" onClick={()=>this.changePage(1)}>Categorizar</button>
                    <button type="button" className="btn btn-secondary active" onClick={()=>this.changePage(2)}>Denuncias</button>
                    <button type="button" className="btn btn-secondary active" onClick={()=>this.changePage(3)}>Reportes</button>
                </div>
                <div style={{marginTop: '10px'}}>
                    {currentpage}
                </div>
            </div>
        )
    }
}

export default Dashboard;