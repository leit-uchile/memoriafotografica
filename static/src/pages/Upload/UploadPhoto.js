import React, {Component} from 'react';
import UploadDetails from './UploadDetails.js'
import UploadAlbum from './UploadAlbum.js'
import { Container, Row, Col, Button, ButtonGroup, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {v4} from 'uuid';

class UploadPhoto extends Component{
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
    var details = this.state.photosList.map( (el, key) => 
      <UploadDetails key={`${key}-${el.id}`} photo={el.photo} save={(info) => this.saveMeta(info, key)} delete={(info) => this.handleErase(info,key)} meta={el.meta}/>)
    var createAlbum = true
    if (createAlbum===true){
      var left = <UploadAlbum />}
    return (
      <Container>
        <Row>
          <Col md='3'>
            <FormGroup check>  
              <Label check><Input type='checkbox' onClick={() => createAlbum=true} />Subir como Album</Label>
            </FormGroup>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input type='file' multiple onChange={this.handleFileSelect}/>
                <output id='list'></output>
              </FormGroup>
              <ButtonGroup>
                  <Button onClick={this.props.goBack}>Atras</Button>
                  <Button type="submit">Continuar</Button>
              </ButtonGroup>                
            </Form>   
            {left}
          </Col>
          <Col md='9'>
            {details}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default UploadPhoto