import React, {Component} from 'react';
import { Container, Row, Col, Button, ButtonGroup, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class UploadAlbum extends Component{
  constructor(Props) {
    super(Props);
    this.state = {
      albumName: "",
      albumDesc:"",
    }
  }

  updateAlbumName =  e => {
    e.preventDefault();
    this.setState({albumName : e.target.value});
    this.props.save(this.state)
  }
  updateAlbumDesc =  e => {
    e.preventDefault();
    this.setState({albumDesc : e.target.value});
    this.props.save(this.state)
  }

  render() {
    return (
      <Container> 
        <Form>
          <FormGroup>
            <Input type="text" name="album-name" placeholder="Nombre del album" onChange={this.updateAlbumName} required/>
            <Input type="textarea" name="album-description" placeholder="Descripcion" onChange={this.updateAlbumDesc}/>
          </FormGroup>
        </Form>
      </Container>
    )
  }
}

export default UploadAlbum