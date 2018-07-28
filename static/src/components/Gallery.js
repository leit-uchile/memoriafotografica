import React, { Component } from 'react';
import Photo from './Photo';

class Gallery extends Component {
    constructor(props){
        super(props);
        this.imageList = props.imageList;
        //this.valid = props.tagset;
    }

    check(imageTags){
        for (var tag in imageTags){
           if (this.valid.has(imageTags[tag])) {
               return true;
           }
        }
    }

    render() {
        return (
            this.imageList.map((el) => {
                // si hay un tag de la imagen en los tag validos hacer esto
                //if(this.check(el.tags)) {
                return <Photo name={el.name} url={el.url} tags={el.tags} desc={el.desc}/>
                //}else{
                //    return <span>Filtrada</span>
                //}
            })
        );
    }
}

export default Gallery;