import React, {Component} from 'react';
import {upload} from '../../actions';
import {connect} from 'react-redux';
import uploadPhoto from '../../css/uploadPhoto.css'

import { Container, Row, Col, Button, ButtonGroup, Form, FormGroup, Label, Input } from 'reactstrap';

class UploadDetails extends Component{
    constructor(Props){
        super(Props);
        if(Props.meta != null){
            this.state = {
                ...Props.meta,
            }
        }else{
            this.state = {
                description: "",
                previewCalled: false
            }
        };

        // Prepare File Reader for preview management
        this.fr = new FileReader();
        this.fr.onload = (function(theFile) {
            return function(e) {
            // Render thumbnail.
            this.setState({src: e.target.result})
            };
        })(Props.photo).bind(this);

    }
    updateDescription = e =>{this.setState({description : e.target.value})}

    onSubmit = e => {
        e.preventDefault()
        this.props.save(this.state)
    }

    onDelete = e => {
        this.props.delete(this.state)
    }

    
    componentWillMount(){
        this.fr.readAsDataURL(this.props.photo)
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col md='4'>
                        <img src={this.state.src} id='thumb'/>
                    </Col>                  
                    <Col md='6'>    
                        <Form onChange={this.onSubmit}>
                            <FormGroup>
                                <Input type="textarea" name="description" placeholder="Historia asociada a la foto"id="description" onChange={this.updateDescription} value={this.state.description} required/>
                                Editar detalles en esta foto Toggle Card
                            </FormGroup>

                            <ButtonGroup>                                
                                <Button onClick={this.onDelete}>Eliminar</Button>
                            </ButtonGroup>
                            
                        </Form>
                    </Col>
                    
                </Row>
            </Container>
        )
    }
}

export default UploadDetails;