import React, {Component} from 'react';
import UploadDetails from '../Upload/UploadDetails.js'
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class UploadPhoto extends Component{
  constructor(Props) {
    super();
    this.props = Props
    this.state = {
      photosList: Array(
      ),
      photosAndMeta: Array(
      )
    }
    this.saveInfo = this.saveInfo.bind(this);
    //this.handleErase = this.handleErase.bind(this);
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
    this.props.saveAll(this.state.photosAndMeta)
  }

  saveInfo(info,key){
    this.setState({photosAndMeta: [...this.state.photosAndMeta , info ]}) ;
    console.log(this.state.photosAndMeta);
    }

  //handleErase(key){
    
  // }

  render() {
    var details = this.state.photosList.map( (el, key) => 
      <UploadDetails photo={el} save={(info) => this.saveInfo(info, key)}/>)
    
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

  handleUpload(fileList){
    this.setState({photosList: [...this.state.photosList , fileList ]}) ;
    console.log(this.state.photosList);
  }

}

export default UploadPhoto