import React, { Component } from 'react';
import Photo from './Photo';
import {home} from "../actions";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Gallery extends Component {
    constructor(props){
        super(props);
        this.imageList = props.imageList;
        //this.valid = props.tagset;
        this.detail = this.detail.bind(this);
    }

    detail(id){
        var image = this.imageList[id]
        this.props.details(image);

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
            this.imageList.map((el,id) => {
                // si hay un tag de la imagen en los tag validos hacer esto
                //if(this.check(el.tags)) {
                //return <Link onClick={e =>{this.detail(id)}} to='/photo'><Photo name={el.name} url={el.url} tags={el.tags}/></Link>
                return <Photo name={el.name} url={el.url} tags={el.tags}/>
                //}else{
                //    return <span>Filtrada</span>
                //}
            })
        );
    }
}

const mapStateToProps = state => {
    return {
        errors : null
    };
  }

const mapActionsToProps = dispatch => {
    return {
        details: (img) => {
          return dispatch(home.detail(img));
        }
    };
}

export default connect(mapStateToProps,mapActionsToProps)(Gallery);