import React, {Component} from 'react';
import uploadPhoto from '../../css/uploadPhoto.css'
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class UploadPhoto extends Component{
  constructor(Props) {
    super();
    this.props = Props
    this.state = {
      photosList: Array(
      )
    }
    this.state.photosList = this.state.photosList.bind(this)
  }

  errorHandler= e=> {
    switch(e.target.error.code) {
      case e.target.error.NOT_FOUND_ERR:
        alert('File Not Found!');
        console.log('File Not Found!');
        break;
      case e.target.error.NOT_READABLE_ERR:
        alert('File is not readable');
        console.log('File is not readable');
        break;
      case e.target.error.ABORT_ERR:
        break; // noop
      default:
        alert('An error occurred reading this file.');
        console.log('An error occurred reading this file.');
    };
  }


  handleFileSelect= e=>{
    var files= e.target.files;
    // Loop through the FileList and render image files as thumbnails.
    for(var i=0,f;f=files[i];i++){
      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onerror = (this.errorHandler);
      reader.onload = (function(theFile) {
        this.handleUpload(f,this.state.fileList)
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          console.log(span.innerHTML);
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  onSubmit = e => {    
    e.preventDefault()
    this.props.savePhotos(this.state.photosList)
}
  
  render() {
    return (
      <div>
        <input type='file' id='file' multiple onChange={this.handleFileSelect}/>
        <output id='list'></output>
        <Button onClick={this.props.goBack}>Atras</Button>
        <Button onClick={this.onSubmit}>Continuar</Button>
      </div>
    )
  }

  handleUpload(file,fileList){
    this.setState({photosList: [...this.state.photosList , fileList ]}) ;
    console.log(this.state.photosList);
    console.log('yeah')
  }

}

export default UploadPhoto