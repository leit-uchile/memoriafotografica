import React, {Component} from 'react';
import {upload} from '../../actions';
import {connect} from 'react-redux';

import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class UploadDetails extends Component{
    constructor(Props){
        super();
        this.props = Props
        this.state = {
            photo: "",
            title: "",
            date: "",
            description: "",
            tags: "",
        };
    }

    updateTitle = e => {this.setState({title : e.target.value})}
    updateDate = e => {this.setState({date : e.target.value})}
    updateDescription = e =>{this.setState({description : e.target.value})}
    updateTags = e =>{this.setState({tags : e.target.value})}

    onSubmit = e => {
        e.preventDefault()
        this.props.saveInfo(this.state)
    }

    render(){
        return(
            <div>
                <Row>
                    <h1>AÑADIR INFORMACION</h1>
                </Row>
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
                        <FormGroup>
                            <Label>Etiquetas</Label>
                            <Input type="select" name="tags" id="tags" onChange={this.updateTags} multiple>
                                <option>Etiqueta 1</option>
                                <option>Etiqueta 2</option>
                                <option>Etiqueta 3</option>
                                <option>Etiqueta 4</option>
                                <option>Etiqueta 5</option>
                            </Input>
                        </FormGroup>
                        <FormGroup check>
                        <Label check>
                            <Input type="checkbox" />
                            {' '}
                            Acepto los terminos y condiciones
                        </Label>
                        </FormGroup>
                        <Button onClick={this.props.goBack}>Atras</Button>
                        <Button onClick={this.onSubmit}>Continuar</Button>
                    </Form>

                    </Col>
                    <Col sm='6'>
                        <h3>FOTO</h3>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default UploadDetails;