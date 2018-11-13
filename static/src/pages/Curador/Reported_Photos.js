import React, { Component } from 'react';
import Photo from '../../../src/components/Photo';

var imgs = [
    {
        name: "img1",
        url: "https://www.smashbros.com/wiiu-3ds/images/character/koopa/main.png",
        tags: ["tag1","tag2"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc1",
        reason: "me cae mal",
        state: "marked"
    },
    {
        name: "img2",
        url: "https://i.kym-cdn.com/photos/images/newsfeed/001/141/079/8f3.jpg",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc2",
        reason: "foto inapropiada",
        state: "marked"
    },
    {
        name: "img3",
        url: "https://vignette.wikia.nocookie.net/fantendo/images/b/b6/Waluigi_Artwork_-_Super_Smash_Bros._Brawl.png/revision/latest?cb=20160503203605",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc3",
        reason: "niguna",
        state: "marked"
    },
    {
        name: "img4",
        url: "https://vignette.wikia.nocookie.net/fantendo/images/b/b6/Waluigi_Artwork_-_Super_Smash_Bros._Brawl.png/revision/latest?cb=20160503203605",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc4",
        reason: "foto duplicada",
        state: "marked"
    }
];

class Reported_Photos extends Component{

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
        var reason = ''
        if(imgs.length<1) {
            actually = 'Has filtrado todas las solicitudes'
        }
        else{
            actually= <Photo name={this.state.photos[0].name} url={this.state.photos[0].url} tags={this.state.photos[0].tags}
                       desc={this.state.photos[0].desc} state={this.state.photos[0].state}/>
            reason = <p>Motivo del reporte: {this.state.photos[0].reason}</p>
        }
        return(
            <div>
                {actually}
                {reason}
                <div className='btn-group' role='group' aria-label='Accion'>
                    <button type="button" className="btn btn-primary active" onClick={this.updatePhotoState}>Dar de baja</button>
                    <button type="button" className="btn btn-secondary active" onClick={this.removePhoto}>Descartar</button>
                </div>
                {latest}
            </div>
        );
    }

}
Reported_Photos.props = {
    gallery: imgs
}

export default Reported_Photos