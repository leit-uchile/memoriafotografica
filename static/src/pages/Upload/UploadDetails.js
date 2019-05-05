import React, {Component} from 'react';
import {upload} from '../../actions';
import {connect} from 'react-redux';
import uploadPhoto from '../../css/uploadPhoto.css'
import { Container, Row, Col, Button, ButtonGroup, Form, FormGroup, Label, Input, Collapse, Card, CardBody } from 'reactstrap';

class UploadDetails extends Component{
    constructor(Props){
        super(Props);
        this.toggle = this.toggle.bind(this)
        this.otherConfig = false
        if(Props.meta != null){
            this.state = {
                ...Props.meta,
            }
        }else{
            if(this.otherConfig){
                this.state = {
                    description: "",
                    tags: "",
                    cc: [],
                    previewCalled: false,
                    collapse: false
                } 
            }else{
                this.state = {
                    description: "",
                    previewCalled: false,
                    collapse: false
                }
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
    updateDescription = e =>{
        this.setState({description : e.target.value});
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.save(this.state)
    }

    onDelete = e => {
        this.props.delete(this.state)
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }
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

    componentWillMount(){
        this.fr.readAsDataURL(this.props.photo)
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col md='6'>
                        <img src={this.state.src} id='thumb'/>
                    </Col>                  
                    <Col md='6'>    
                        <Form onChange={this.onSubmit}>
                            <FormGroup>
                                <Input type="textarea" name="description" placeholder="Historia asociada a la foto"id="description" onChange={this.updateDescription} value={this.state.description} required/>                                
                            </FormGroup>
                            <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Configurar por separado</Button>
                            <Collapse isOpen={this.state.collapse}>
                                <Card>
                                    <CardBody>
                                    <FormGroup>
                                        <Input type="search" name="album-tags" placeholder="Etiquetas"/>
                                    </FormGroup>
                                    <Label>Creative Commons</Label>
                                    <FormGroup check inline>                            
                                        <Label check><Input type='checkbox' onClick={() => this.updateCC('CC BY')} active={this.state.cc.includes('CC BY')} />CC BY</Label>
                                        <Label check><Input type='checkbox' onClick={() => this.updateCC('CC BY-SA')} active={this.state.cc.includes('CC BY-SA')} />CC BY-SA</Label>
                                        <Label check><Input type='checkbox' onClick={() => this.updateCC('CC BY-ND')} active={this.state.cc.includes('CC BY-ND')} />CC BY-ND</Label>
                                        <Label check><Input type='checkbox' onClick={() => this.updateCC('CC BY-NC')} active={this.state.cc.includes('CC BY-NC')} />CC BY-NC</Label>
                                        <Label check><Input type='checkbox' onClick={() => this.updateCC('CC BY-NC-SA')} active={this.state.cc.includes('CC BY-NC-SA')} />CC BY-NC-SA</Label>
                                        <Label check><Input type='checkbox' onClick={() => this.updateCC('CC BY-NC-ND')} active={this.state.cc.includes('CC BY-NC-ND')} />CC BY-NC-ND</Label>
                                    </FormGroup>
                                    </CardBody>
                                </Card>
                            </Collapse>
                            <Button onClick={this.onDelete}>Eliminar</Button>
                        </Form>
                    </Col>
                    
                </Row>
            </Container>
        )
    }
}

export default UploadDetails;