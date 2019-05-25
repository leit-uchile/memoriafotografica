import React, {Component, useCallback} from 'react';
import ReactTags from 'react-tag-autocomplete'
import UploadDetails from './UploadDetails'
import UploadAlbum from './UploadAlbum'
import {CustomInput, Container, Row, Col, Button, ButtonGroup, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
//import {useDropzone} from 'react-dropzone'
import {v4} from 'uuid';

class UploadPhoto extends Component{
  constructor(Props) {
    super(Props);
    this.state = {
        date:"",
        tags: [],
        suggestions: [
          { id: 1, name: "Apples" },
          { id: 2, name: "Pears" }
        ],
        cc:[],
        onAlbum: false,
        albumName: "",
        albumDesc:"",
        photosList: Array()
      }
    this.handleErase = this.handleErase.bind(this);
    this.isAlbum = this.isAlbum.bind(this);
  }

  isAlbum(){
    if(this.state.onAlbum){
      this.setState({onAlbum: false})
    }else{
      this.setState({onAlbum: true})
    }
  }

  updateDate =  e => {this.setState({date : e.target.value})}

  deleteTag(i) {
    const tags = this.state.tags.slice(0)
    tags.splice(i, 1)
    this.setState({ tags })
  }
  additionTag(tag) {
    const tags = [].concat(this.state.tags, tag)
    this.setState({ tags: tags })
  }

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
    var globalTags = this.state.tags
    var globalCC = this.state.cc
    var fillTags = false
    var fillCC = false
    for(var i=0; i<this.state.photosList.length; i++){
      var meta = this.state.photosList[i].meta
      if(meta!==null){
        count+=1        
        if(meta.tags===""){
          fillTags = true
          console.log('Fill Tags',fillTags)
        }
        if(meta.cc.length===0){
          fillCC = true
          console.log('Fill CC',fillCC)
        }
        if(fillTags){
          meta = {description: meta.description, tags:globalTags, cc: meta.cc, previewCalled:meta.previewCalled, collapse:meta.collapse}
        }
        if(fillCC){
          meta = {description: meta.description, tags:meta.tags, cc: globalCC, previewCalled:meta.previewCalled, collapse:meta.collapse}
        }
        this.saveMeta(meta,i)
      }
    }
    if(count===this.state.photosList.length && this.state.photosList.length!==0){
        this.props.saveAll(this.state)
    }else{
        console.log('No hay fotos o alguna no cuenta con descripcion')}
  }

  render() {
    var details = this.state.photosList.map( (el, key) => 
      <UploadDetails key={el.id} id={el.id} photo={el.photo} save={(info) => this.saveMeta(info, key)} delete={(info) => this.handleErase(info,key)} meta={el.meta} suggestions={this.state.suggestions}/>)
    if (this.state.onAlbum){
      var left = <UploadAlbum save={(info) => this.saveAlbum(info) }/>}
    return (
      <Container style={{marginTop:'20px'}}>
        <Row>
          <Col md='3'>
            <div style={styles.albumBox}>
              <Label style={{fontSize:'18px'}}>Crear Album</Label>
              <Button style={styles.plusButton} color="primary" onClick={() => this.isAlbum()}>+</Button>
            </div>            
            <Form onSubmit={this.onSubmit} style={styles.generalInformation}>
              <FormGroup>
                {left}
                <div style={styles.hr}>
                  <Label>Informacion general</Label>
                </div>              
                <Label style={{color: '#848687'}}>Fecha de las fotos:</Label>
                <Input type="date" id="date" onChange={this.updateDate} required/>
                <Label style={{color: '#848687',}}>Etiquetas:</Label>
                <ReactTags placeholder={'Añadir etiquetas'} autoresize={false} allowNew={true} tags={this.state.tags} suggestions={this.state.suggestions} handleDelete={this.deleteTag.bind(this)} handleAddition={this.additionTag.bind(this)} />
              </FormGroup>
              <FormGroup>
                <div style={styles.hr}>
                  <Label style={{color: '#848687'}} for="CreativeCommons">Permisos de acceso e intercambio</Label>
                </div>
                <div style={{marginTop:'10px'}}>
                  <CustomInput type="checkbox" id="CreativeCommonsCheckbox1" label="CC BY" onClick={() => this.updateCC('CC BY')}/>
                  <CustomInput type="checkbox" id="CreativeCommonsCheckbox2" label="CC BY-SA" onClick={() => this.updateCC('CC BY-SA')} />
                  <CustomInput type="checkbox" id="CreativeCommonsCheckbox3" label="CC BY-ND" onClick={() => this.updateCC('CC BY-ND')}/>
                  <CustomInput type="checkbox" id="CreativeCommonsCheckbox4" label="CC BY-NC" onClick={() => this.updateCC('CC BY-NC')} />
                  <CustomInput type="checkbox" id="CreativeCommonsCheckbox5" label="CC BY-NC-SA" onClick={() => this.updateCC('CC BY-NC-SA')} />
                  <CustomInput type="checkbox" id="CreativeCommonsCheckbox6" label="CC BY-NC-ND" onClick={() => this.updateCC('CC BY-NC-ND')} />
                </div>
              </FormGroup>
              <ButtonGroup>
                  <Button onClick={this.props.goBack}>Atras</Button>
                  <Button type="submit">Continuar</Button>
              </ButtonGroup>          
            </Form>
          </Col>
          <Col md='9'>
            {details}
            <Input type='file' multiple onChange={this.handleFileSelect}/>
          </Col>
        </Row>
      </Container>
    )
  }
}
const styles={
  albumBox:{
    display:'flex', 
    width:'94%', 
    height:'auto',
    padding:'2px 10px 0px 10px',
    marginLeft:'auto', 
    marginRight:'auto',
    marginBottom:'-5px',
    justifyContent:'space-between', 
    backgroundColor:'#dceaf7',     
    borderRadius:'10px 10px 0px 0px', 
    borderTop:'1px solid rgb(156,158,159)',
    borderRight:'1px solid rgb(156,158,159)',
    borderLeft:'1px solid rgb(156,158,159)', 
    boxShadow: '2px 2px 3px rgb(156,158,159)'
  },
  plusButton:{
    fontSize:'12px',
    padding:'2px',
    borderRadius:'50%', 
    height:'25px', 
    width:'25px'
  },
  generalInformation:{
    backgroundColor: "white",
    border:'1px solid rgb(156,158,159)', 
    padding:'15px', 
    borderRadius:'0px 0px 10px 10px',
  },
  hr:{
    borderBottom:'1px solid rgb(156,158,159)'
  }
}

export default UploadPhoto