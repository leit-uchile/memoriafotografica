import React, {Component, Fragment} from "react";
import { 
    Button, 
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, 
    Row, 
    Col, 
    Modal, 
    ModalHeader, 
    ModalBody,
    ModalFooter, 
    FormGroup,
    Label, 
    Input,
    Form,
    CustomInput } from "reactstrap";
import ReactTags from "react-tag-autocomplete"; 

const CC_INFO = [
    { name: "CC BY", text: "Atribución" },
    { name: "CC BY-SA", text: "Atribución, Compartir Igual" },
    { name: "CC BY-ND", text: "Atribución, Sin Derivadas" },
    { name: "CC BY-NC", text: "Atribución, No Comercial" },
    { name: "CC BY-NC-SA", text: "Atribución, No Comercial, Compartir Igual" },
    { name: "CC BY-NC-ND", text: "Atribución, No Comercial, Sin Derivadas" }
    ];
class EditPhotosModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            sent: false,
            formData:{
                name : '',
                description: '',
                created_date: '',
                tags:'',
                permissions: ''
            }
        }
        this.toggle = this.toggle.bind(this);
        this.updateData = this.updateData.bind(this);
        this.additionTag = this.additionTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        this.sendChanges = this.sendChanges.bind(this);
    };

    toggle(){
        this.setState({
          modal: !this.state.modal,
          sent: false,
        });
    }

    updateData = e => this.setState({ formData: {...this.state.formData, [e.target.name]: e.target.value }});
    
    additionTag(tag) {
        const tags = [].concat(this.state.formData.tags, tag);
        this.setState({ tags: tags });
      }
    deleteTag(i) {
    const tags = this.state.formData.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
    }
    sendChanges(){
        this.setState({
            sent: true});
        // this.props.updatePhoto(this.state.formData);
    }
    render(){
        const { style, className } = this.props;
        var PhotosForm = (
            <Fragment>
              <Form>
                <FormGroup>
                <Row style={{marginBottom:'0.5em'}}>
                    <Col>
                        <p>Título</p>
                    </Col>
                    <Col>
                        <Input 
                            type="text"
                            placeholder="Título de la fotografía"
                            name="name"
                            onChange={this.updateData}
                        />
                    </Col>
                </Row>
                <Row style={{marginBottom:'0.5em'}}>
                    <Col>
                        <p>Descripción</p>
                    </Col>
                    <Col>
                        <Input 
                            type="textarea"
                            placeholder="Historia asociada a la foto"
                            name="description"
                            onChange={this.updateData}
                        />
                    </Col>
                </Row>
                <Row style={{marginBottom:'0.5em'}}>
                    <Col>
                        <p>Fecha de captura</p>
                    </Col>
                    <Col>
                        <Input 
                            type="date"
                            name="created_date"
                            onChange={this.updateData}
                        />
                    </Col>
                </Row>
                <Row style={{marginBottom:'0.5em'}}>
                    <Col>
                        <p>Etiquetas</p>
                    </Col>
                    <Col>
                        {/* <ReactTags
                            style={{ width: "auto" }}
                            placeholder={"Añadir etiquetas"}
                            autoresize={false}
                            allowNew={true}
                            tags={this.state.formData.tags}
                            
                            handleDelete={()=>this.deleteTag()}
                            handleAddition={()=>this.additionTag()}
                        /> */}
                    </Col>
                </Row>
                <Row style={{marginBottom:'0.5em'}}>
                    <Col>
                        <p>Permisos de acceso e intercambio</p>
                    </Col>
                    <Col>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle
                                caret
                                color="link"
                                style={{padding:'0',margin:'0'}}
                                name="permissions"
                                >
                                {this.state.formData.permissions === ''
                                ? "Seleccionar"
                                : this.state.formData.permissions}
                            </DropdownToggle>
                            <DropdownMenu>
                                {CC_INFO.map((el, k) => (
                                    <DropdownItem 
                                        name="permissions" 
                                        value={el.name} 
                                        onClick={this.updateData}>
                                        {el.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </Col>
                </Row>
                <Row style={{marginBottom:'0.5em'}}>
                    <Col>
                        <p>Quíen puede comentar</p>
                    </Col>
                    <Col>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle
                                caret
                                color="link"
                                style={{padding:'0',margin:'0'}}>
                                Seleccionar
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Usuarios registrados</DropdownItem>
                                <DropdownItem>Nadie</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </Col>
                </Row>
                <Row>
                    <Col style={{textAlign:'right', display: 'inline-block'}}>
                        <p>Recuerda que los cambios deberán ser aprobados</p>
                    </Col>
                </Row> 
                </FormGroup>
              </Form>
            </Fragment>
          );

        return(
            <div className={className} style={style}>
                <Button 
                    disabled={this.props.photos.length == 0} 
                    onClick={this.toggle}>
                    Editar selección
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    {this.props.photos.length===1
                    ? <ModalHeader><h4 style={{fontWeight:'bold'}}>Editando 1 foto</h4></ModalHeader>
                    : <ModalHeader><h4 style={{fontWeight:'bold'}}>Editando {this.props.photos.length} fotos</h4></ModalHeader>}
                    <ModalBody>
                        {PhotosForm}
                    </ModalBody>
                    <ModalFooter>
                        {!this.state.sent ? (
                        <Fragment>
                            <Button color="success" onClick={this.sendChanges}>
                            Guardar cambios
                            </Button>
                            <Button color="secondary" onClick={this.toggle}>
                            Cancelar
                            </Button>
                        </Fragment>
                        ) : (
                        <Button color="secondary" onClick={this.toggle}>
                            Cerrar
                        </Button>
                        )}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default EditPhotosModal;