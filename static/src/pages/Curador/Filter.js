import React, { Component } from 'react';
import Photo from '../../components/Photo';

var imgs = [
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

class Filter extends Component{

    constructor(){
        super()
        this.getLatestPhotos = this.getLatestPhotos.bind(this)
        this.removePhoto = this.removePhoto.bind(this)
        this.updatePhotoState = this.updatePhotoState.bind(this)
    }

    componentWillMount(){
        this.getLatestPhotos()
    }

    getLatestPhotos(){
        // Call API
        this.setState({
            photos: imgs
        })
    }

    updatePhotoState(){
        // Send update to API

        // Update
        // remove
        this.removePhoto()
        // getLatestPhotos

    }

    removePhoto(){
        // Fake call to API
        imgs = imgs.slice(1,imgs.length)
        this.getLatestPhotos()
    }

    render(){

        var latest = []
        for (var i = 1; i < 4 && i < imgs.length; i++) {
            latest.push(
                <Photo name={this.state.photos[i].name} url={this.state.photos[i].url} tags={this.state.photos[i].tags} state={this.state.photos[i].state}/>
            )
        }
        var actually = ''

        if(imgs.length<1) {
            actually = 'Has filtrado todas las solicitudes'
        }
        else{
            actually= <Photo name={this.state.photos[0].name} url={this.state.photos[0].url} tags={this.state.photos[0].tags}
                             desc={this.state.photos[0].desc} state={this.state.photos[0].state}/>

        }
        return(
            <div>
                {actually}
                <div className='btn-group' role='group' aria-label='Accions'>
                    <button type="button" className="btn btn-primary active" onClick={this.updatePhotoState}>Publicar</button>
                    <button type="button" className="btn btn-secondary active" onClick={this.removePhoto}>Rechazar</button>
                </div>
                {latest}
            </div>
        );
    }

}
Filter.props = {
    gallery: imgs
}

export default Filter