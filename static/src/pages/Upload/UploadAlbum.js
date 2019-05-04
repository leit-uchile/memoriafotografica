import React, {Component} from 'react';
import UploadDetails from './UploadDetails.js'
import { Container, Row, Col, Button, ButtonGroup, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {v4} from 'uuid';

class UploadAlbum extends Component{
  constructor(Props) {
    super();
    this.props = Props
    this.state = {
      albumName: "",
      albumDesc:"",
      albumDate:"",
      albumTags:"",
      cc:[],
      photosList: Array()
    }
    this.saveMeta = this.saveMeta.bind(this);
    this.handleErase = this.handleErase.bind(this);
  }

  updateAlbumName =  e => {this.setState({albumName : e.target.value})}
  updateAlbumDesc =  e => {this.setState({albumDesc : e.target.value})}
  updateAlbumDate =  e => {this.setState({albumDate : e.target.value})}
  
  updateCC(selected) {
      const index = this.state.cc.indexOf(selected);
      if (index < 0) {
        this.state.cc.push(selected); //agrega
      } else {
        this.state.cc.splice(index, 1);//elimina 1 elemento
      }
      this.setState({ cc: [...this.state.cc] });//actualiza
  }

  handleFileSelect= e=>{
    var images = []; 
    var files = e.target.files;
    for(var i=0,f;f=files[i];i++){
      if (!f.type.match('image.*')) {
        continue;
      }else{
        images.push(f)}
    }
    this.handleUpload(images)
  }

  handleUpload(file){
    var f = file.map((el)=>{
      const uuidv4 = require('uuid/v4')
      return {id: uuidv4(), photo: el, meta: null}
    })
    this.setState({photosList: [...this.state.photosList , ...f]}) ;
  }

  saveMeta(info,key){
    var newPhotosList = []
    for (var i=0; i<this.state.photosList.length; i++){
      if (i==key){
        var el = {id: this.state.photosList[key].id, photo: this.state.photosList[key].photo, meta: info}
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
        newPhotosList = newPhotosList.concat(this.state.photosList[i])
      }
    }
    this.setState({photosList: newPhotosList}) ;
  }

  onSubmit = e => {
    e.preventDefault()   
    var count = 0;
    for(var i=0; i<this.state.photosList.length; i++){
      if(this.state.photosList[i].meta!==null){
        count+=1}
    }
    if(count===this.state.photosList.length && this.state.photosList.length!==0){
        this.props.saveAll(this.state)
      }else{
        console.log('aun hay nulos')}
  }

  render() {
    return (
      <Container>
        
          
            <Form>
              <FormGroup>
                <Input type="text" name="album-name" placeholder="Nombre del album" onChange={this.updateAlbumName} required/>
                <Input type="date" name="date" id="date" onChange={this.updateAlbumDate} required/>
                <Input type="textarea" name="album-description" placeholder="Descripcion" onChange={this.updateAlbumDesc}/>
                <Input type="search" name="album-tags" placeholder="Etiquetas"/>
                <Label>Creative Commons</Label>
                <FormGroup check inline>                            
                  <Label check><Input type='checkbox' onClick={() => this.updateCC('CC BY')} active={this.state.cc.includes('CC BY')} />CC BY</Label>
                  <Label check><Input type='checkbox' onClick={() => this.updateCC('CC BY-SA')} active={this.state.cc.includes('CC BY-SA')} />CC BY-SA</Label>
                  <Label check><Input type='checkbox' onClick={() => this.updateCC('CC BY-ND')} active={this.state.cc.includes('CC BY-ND')} />CC BY-ND</Label>
                  <Label check><Input type='checkbox' onClick={() => this.updateCC('CC BY-NC')} active={this.state.cc.includes('CC BY-NC')} />CC BY-NC</Label>
                  <Label check><Input type='checkbox' onClick={() => this.updateCC('CC BY-NC-SA')} active={this.state.cc.includes('CC BY-NC-SA')} />CC BY-NC-SA</Label>
                  <Label check><Input type='checkbox' onClick={() => this.updateCC('CC BY-NC-ND')} active={this.state.cc.includes('CC BY-NC-ND')} />CC BY-NC-ND</Label>
                </FormGroup>
              </FormGroup>
            </Form>            
          
        
      </Container>
    )
  }
}

export default UploadAlbum