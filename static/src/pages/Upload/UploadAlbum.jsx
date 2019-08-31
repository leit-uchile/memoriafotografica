import React, {Component} from 'react';
import {Form, FormGroup, Input} from 'reactstrap';

var autosave_name=null;
var autosave_desc=null;

class UploadAlbum extends Component{
  constructor(Props) {
    super(Props);
    this.state = {
      albumName:"",
      albumDesc:"",
    }
  }

  updateAlbumName =  e => {
    this.setState({albumName : e.target.value});
    clearTimeout(autosave_name)
    autosave_name = setTimeout(
      function(){
        this.props.save(this.state);
      }.bind(this), 500);
  }
  updateAlbumDesc =  e => {
    this.setState({albumDesc : e.target.value});
    clearTimeout(autosave_desc);
    autosave_desc = setTimeout(
      function(){
        this.props.save(this.state);
      }
      .bind(this),
      500
      );
  }

  render() {
    return (
      <div> 
        <Form>
          <FormGroup>
            <Input type="text" placeholder="Nombre del album" onKeyUp={this.updateAlbumName} required/>
            <Input type="textarea" placeholder="Descripcion (Opcional)" onKeyUp={this.updateAlbumDesc}/>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default UploadAlbum