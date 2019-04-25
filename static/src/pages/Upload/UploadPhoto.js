import React, {Component} from 'react';
import UploadDetails from '../Upload/UploadDetails.js'
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {v4} from 'uuid';

class UploadPhoto extends Component{
  constructor(Props) {
    super();
    this.props = Props
    this.state = {
      photosList: Array()
    }
    this.saveInfo = this.saveInfo.bind(this);
    this.handleErase = this.handleErase.bind(this);
  }

  handleFileSelect= e=>{
    var files= e.target.files;
    // Loop through the FileList and render image files as thumbnails.
    for(var i=0,f;f=files[i];i++){
      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }
      this.handleUpload(f)
    }
  } 

  onSubmit = e => {    
    e.preventDefault()
    this.props.saveAll(this.state.photosList)
  }

  saveInfo(info,key){
    var newPhotosList = []
    for (var i=0; i<this.state.photosList.length;i++){
      if (i==key){
        var el = {id: this.state.photosList[key].id, photo: this.state.photosList[key].photo, info: info}
        newPhotosList = newPhotosList.concat(el)
      }
      else{
        newPhotosList = newPhotosList.concat(this.state.photosList[i])
      }
    }
    this.setState({photosList: newPhotosList}) ;
  }

  handleErase(info,key){
    var newPhotosList = []
    for (var i=0; i<this.state.photosList.length;i++){
      if (i!==key){
        console.log('no debo borrarlo, agrego el',i)
        newPhotosList = newPhotosList.concat(this.state.photosList[i])
        console.log(newPhotosList)
      }
    }
    this.setState({photosList: newPhotosList}) ;
  }

  render() {
    var details = this.state.photosList.map( (el, key) => 
      <UploadDetails key={`${key}-${el.id}`} photo={el.photo} save={(info) => this.saveInfo(info, key)} delete={(info) => this.handleErase(info,key)}/>)
    
    return (
      <div>
        <input type='file' id='file' multiple onChange={this.handleFileSelect}         />
        <output id='list'></output>
        <Button onClick={this.props.goBack}>Atras</Button>
        <Button onClick={this.onSubmit}>Continuar</Button>
        {details}
      </div>
    )
  }

  handleUpload(file){
    const uuidv4 = require('uuid/v4')
    var el = {id: uuidv4(),photo: file, info: null}
    this.setState({photosList: [...this.state.photosList , el ]}) ;
  }

}

export default UploadPhoto