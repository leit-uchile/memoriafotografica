import React, {Component} from 'react';
import {upload} from '../../actions';
import {connect} from 'react-redux';
import uploadPhoto from '../../css/uploadPhoto.css'

import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class UploadDetails extends Component{
    constructor(Props){
        super(Props);
        this.state = {
            photo: Props.photo,
            title: "",
            date: "",
            description: "",
            tags: [],
        };
    }

    updateTitle = e => {this.setState({title : e.target.value})}
    updateDate = e => {this.setState({date : e.target.value})}
    updateDescription = e =>{this.setState({description : e.target.value})}
    updateTags = e =>{this.setState({tags : e.target.value})}

    onSubmit = e => {
        e.preventDefault()
        this.props.save(this.state)
    }

    onDelete = e => {
        this.props.delete(this.state)
    }

    onTagSelect(selected) {
        const index = this.state.tags.indexOf(selected);
        if (index < 0) {
          this.state.tags.push(selected);
        } else {
          this.state.tags.splice(index, 1);
        }
        this.setState({ tags: [...this.state.tags] });
      }

    render(){
    
        const {photo} = this.props
        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
            // Render thumbnail.
            this.setState({src: e.target.result})
            };
        })(photo).bind(this);
        // Read in the image file as a data URL.
        reader.readAsDataURL(photo);
        return(
            <div>
                <Row>
                    <Col sm='6'>
                    <Form>
                        <FormGroup>
                            <Label>Titulo de la foto</Label>
                            <Input type="text" name="title" id="title" onChange={this.updateTitle} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Fecha en que se tomo la foto</Label>
                            <Input type="date" name="date" id="date" placeholder="date placeholder" onChange={this.updateDate}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Historia de la foto</Label>
                            <Input type="textarea" name="description" id="description" onChange={this.updateDescription}/>
                        </FormGroup>
                        
                        <Label>Etiquetas</Label>
                        <FormGroup check inline>                            
                            <Label check>
                                <Input type="checkbox" onClick={() => this.onTagSelect(1)} active={this.state.tags.includes(1)}/>Etiqueta1
                            </Label>
                        </FormGroup>

                        <FormGroup check inline>                            
                            <Label check>
                                <Input type="checkbox" onClick={() => this.onTagSelect(2)} active={this.state.tags.includes(2)}/>Etiqueta1
                            </Label>
                        </FormGroup>

                        <FormGroup check>
                        <Label check>
                            <Input type="checkbox" required/>
                            {' '}
                            Acepto los terminos y condiciones
                        </Label>
                        </FormGroup>
                        <Button onClick={this.onSubmit}>Guardar</Button>
                        <Button onClick={this.onDelete}>Eliminar</Button>
                    </Form>

                    </Col>
                    <Col sm='6'>
                        <h3>FOTO</h3>
                        <img src={this.state.src} id='thumb'/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default UploadDetails;