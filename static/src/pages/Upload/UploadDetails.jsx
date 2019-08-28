import React, {Component} from 'react';
import ReactTags from 'react-tag-autocomplete'
import {Container, Row, Col, Button, ButtonGroup, Form, FormGroup, Label, Input, Collapse} from 'reactstrap';

var autosave_desc=null;

const CC_INFO = [
    {name: 'CC BY', text: 'Atribución'},
    {name: 'CC BY-SA', text: 'Atribución, Compartir Igual'},
    {name: 'CC BY-ND', text: 'Atribución, Sin Derivadas'},
    {name: 'CC BY-NC', text: 'Atribución, No Comercial'},
    {name: 'CC BY-NC-SA', text: 'Atribución, No Comercial, Compartir Igual'},
    {name: 'CC BY-NC-ND', text: 'Atribución, No Comercial, Sin Derivadas'},
  ];

class UploadDetails extends Component{
    constructor(Props){
        super(Props);
        this.state = {
            ...Props.meta,
            collapse: false,    
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

        this.updateTitle = this.updateTitle.bind(this);
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
    updateTitle(e){ this.setState({title: e.target.value}); }
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
                    <Col md='3'>
                        <img style={styles.thumb} src={this.state.src}/>
                    </Col>                  
                    <Col md='9' style={{padding:'20px'}}>   
                        <Form>
                            <FormGroup>
                                <Label style={{color: '#848687'}}>Descripcion:</Label>
                                <Input type='textarea' placeholder='Historia asociada a la foto' onChange={this.updateDesc} value={this.state.description} required/>                                
                            </FormGroup>
                            <ButtonGroup>
                                <Button color='danger' onClick={this.onDelete}>Eliminar</Button>                            
                                <Button color='primary' onClick={this.toggle}>{this.state.collapse ? "Descartar cambios" : "Información por separado"} </Button>
                                {this.state.collapse ? <Button color='success' onClick={this.onSubmit}>Guardar cambios</Button> : null}
                            </ButtonGroup>
                        </Form>
                    </Col>                    
                </Row>
                <Row>
                    <Collapse isOpen={this.state.collapse} style={{width: '100%', marginBottom: "1em"}}>
                        <Container fluid>
                            <Row>
                                <Col sm='12' md='4'>
                                    <div style={styles.hr}>
                                        <Label style={{color: '#848687'}}>Informaci&oacute;n adicional</Label>
                                    </div>
                                    <ReactTags placeholder={'Añadir etiquetas'} autoresize={false} allowNew={true} 
                                        tags={this.state.tags} suggestions={this.props.suggestions} 
                                        handleDelete={this.deleteTag.bind(this)} 
                                        handleAddition={this.additionTag.bind(this)}/>
                                </Col>
                                <Col sm='6' md='4'>
                                    <FormGroup>
                                        <div style={styles.hr}>
                                            <Label style={{color: '#848687'}} for='CreativeCommons'>Permisos de acceso e intercambio</Label>
                                        </div>
                                        <FormGroup tag="fieldset">
                                            {CC_INFO.map( (el,k) => 
                                            <FormGroup check key={k} style={{marginTop: "5px"}}>
                                                <Label check>
                                                    <Input type="radio" name="CC" id={"CreativeCommonsCheckbox"+(k+1)} onClick={() => this.updateCC(el.name)}/>{' '}
                                                    {el.name+' '}
                                                </Label>
                                            </FormGroup>
                                            )}
                                        </FormGroup>
                                    </FormGroup>
                                </Col>
                                <Col sm='6' md='4'>
                                    <div style={styles.hr}>
                                        <Label style={{color: '#848687'}} for='imageTitle'>Titulo de la fotograf&iacute;a</Label>
                                    </div>
                                    <Input type="text" name="imageTitle" placeholder="Ceremonia de premiación..." onChange={this.updateTitle}/>
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
        borderBottom:'1px solid rgb(156,158,159)',
        marginBottom: "10px"
      }
}

export default UploadDetails;