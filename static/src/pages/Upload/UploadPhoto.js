import React, {Component} from 'react';
import UploadDetails from './UploadDetails.js'
import UploadAlbum from './UploadAlbum.js'
import {CustomInput, Container, Row, Col, Button, ButtonGroup, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {v4} from 'uuid';

class UploadPhoto extends Component{
  constructor(Props) {
    super();
    this.props = Props
    this.onAlbum = true
    if(this.onAlbum){
      this.state = {
        date:"",
        tags:"",
        cc:[],
        albumName: "",
        albumDesc:"",
        photosList: Array()
      }
    }else{
      this.state = {
        date:"",
        tags:"",
        cc:[],
        photosList: Array()
      }
    }
    this.handleErase = this.handleErase.bind(this);
  }

  isAlbum(){
    this.onAlbum = true;
    console.log(this.onAlbum)}

  updateDate =  e => {this.setState({date : e.target.value})}
  //updateTags
  updateCC(selected) {
      const index = this.state.cc.indexOf(selected);
      if (index < 0) {
        this.state.cc.push(selected); //agrega
      } else {
        this.state.cc.splice(index, 1);//elimina 1 elemento
      }
      this.setState({ cc: [...this.state.cc] });//actualiza
  }

  saveAlbum(info){
    this.setState({albumName: info.albumName, albumDesc: info.albumDesc})
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
    if (this.onAlbum){
      var left = <UploadAlbum save={(info) => this.saveAlbum(info) }/>}
    return (
      <Container style={{backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"}}>
        <Row>
          <Col md='3'>
            <Button color="primary" onClick={() => this.isAlbum()}>+ Album</Button>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input type='file' multiple onChange={this.handleFileSelect}/>
                <hr />
                <Label>Configuración general</Label>
                <Input type="date" name="date" id="date" onChange={this.updateDate} required/>
                <Input type="search" name="album-tags" placeholder="Etiquetas"/>
              </FormGroup>
              <FormGroup>
                <Label>Creative Commons</Label>                         
                <div>
                  <CustomInput type='checkbox' label='CC BY' onClick={() => this.updateCC('CC BY')} active={this.state.cc.includes('CC BY')} />
                  <CustomInput type='checkbox' label='CC BY-SA' onClick={() => this.updateCC('CC BY-SA')} active={this.state.cc.includes('CC BY-SA')}  />
                  <CustomInput type='checkbox' label='CC BY-ND' onClick={() => this.updateCC('CC BY-ND')} active={this.state.cc.includes('CC BY-ND')} />
                  <CustomInput type='checkbox' label='CC BY-NC' onClick={() => this.updateCC('CC BY-NC')} active={this.state.cc.includes('CC BY-NC')} />
                  <CustomInput type='checkbox' label='CC BY-NC-SA' onClick={() => this.updateCC('CC BY-NC-SA')} active={this.state.cc.includes('CC BY-NC-SA')} />
                  <CustomInput type='checkbox' label='CC BY-NC-ND' onClick={() => this.updateCC('CC BY-NC-ND')} active={this.state.cc.includes('CC BY-NC-ND')} />
                </div>
              </FormGroup>
              <ButtonGroup>
                  <Button onClick={this.props.goBack}>Atras</Button>
                  <Button type="submit">Continuar</Button>
              </ButtonGroup>          
            </Form>
          </Col>
          <Col md='9'>
            {left}
            {details}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default UploadPhoto