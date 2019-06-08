import React, {Component} from 'react';
import ReactTags from 'react-tag-autocomplete'
import {upload} from '../../actions';
import {connect} from 'react-redux';
import { Container, Row, Col, Button, CustomInput, ButtonGroup, Form, FormGroup, Label, Input, Collapse, Card, CardBody } from 'reactstrap';

var autosave_desc=null;

class UploadDetails extends Component{
    constructor(Props){
        super(Props);
        this.state = {
                ...Props.meta,
        }
        
        this.toggle = this.toggle.bind(this);

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
    updateDesc =  e => {
        this.setState({description : e.target.value});
        clearTimeout(autosave_desc);
        autosave_desc = setTimeout(
          function(){
            this.props.save(this.state);
          }
          .bind(this),
          500
          );
      }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    additionTag(tag) {
        const tags = [].concat(this.state.tags, tag)
        this.setState({ tags: tags })
    }

    deleteTag(i) {
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        this.setState({ tags })
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
    onSubmit = e => {
        e.preventDefault()
        if (this.state.collapse===true){
            this.toggle()
        }
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
            <Container style={{marginTop:'20px', backgroundColor:'#dceaf7', borderRadius:'10px', border:'1px solid rgb(156,158,159)', boxShadow: '2px 2px 4px rgb(156,158,159)'}}>
                <Row>
                    <Col md='3' style={{display:'flex'}}>
                        <img style={styles.thumb} src={this.state.src} id='thumb'/>
                    </Col>                  
                    <Col md='9' style={{padding:'20px'}}>   
                        <Form>
                            <FormGroup>
                                <Label style={{color: '#848687'}}>Descripcion:</Label>
                                <Input type='textarea' placeholder='Historia asociada a la foto' onChange={this.updateDesc} value={this.state.description} required/>                                
                            </FormGroup>
                            <Button color='danger' onClick={this.onDelete}>Eliminar</Button>                            
                            <Button color='primary' style={{marginLeft:'10px'}} onClick={this.toggle}>Informacion por separado</Button>
                        </Form>
                    </Col>                    
                </Row>
                <Row>
                    <Collapse isOpen={this.state.collapse} style={{width: '100%', marginBottom: "1em"}}>
                        <Container fluid>
                            <Row>
                                <Col md='4'>
                                    <ReactTags placeholder={'Añadir etiquetas'} autoresize={false} allowNew={true} tags={this.state.tags} suggestions={this.props.suggestions} handleDelete={this.deleteTag.bind(this)} handleAddition={this.additionTag.bind(this)} />
                                </Col>
                                <Col md='8'>                             
                                    <FormGroup>
                                        <div style={styles.hr}>
                                            <Label style={{color: '#848687'}} for='CreativeCommons'>Permisos de acceso e intercambio</Label>
                                        </div>
                                        <div style={{marginTop:'10px'}}>
                                            <CustomInput type='checkbox' id={this.props.id+1} label='CC BY' onClick={() => this.updateCC('CC BY')}/>
                                            <CustomInput type='checkbox' id={this.props.id+2} label='CC BY-SA' onClick={() => this.updateCC('CC BY-SA')} />
                                            <CustomInput type='checkbox' id={this.props.id+3} label='CC BY-ND' onClick={() => this.updateCC('CC BY-ND')}/>
                                            <CustomInput type='checkbox' id={this.props.id+4} label='CC BY-NC' onClick={() => this.updateCC('CC BY-NC')} />
                                            <CustomInput type='checkbox' id={this.props.id+5} label='CC BY-NC-SA' onClick={() => this.updateCC('CC BY-NC-SA')} />
                                            <CustomInput type='checkbox' id={this.props.id+6} label='CC BY-NC-ND' onClick={() => this.updateCC('CC BY-NC-ND')} />
                                        </div>
                                    </FormGroup>
                                    <Button color='primary' style={{display:'flex', marginLeft:'auto'}} onClick={this.onSubmit}>Guardar cambios</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Collapse>
                </Row>
            </Container>
        )
    }
}

const styles={
    thumb:{
        height: '85px',
        marginTop: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '5px 5px 5px #3c4145',
    },
    hr:{
        borderBottom:'1px solid rgb(156,158,159)'
      }
}

export default UploadDetails;