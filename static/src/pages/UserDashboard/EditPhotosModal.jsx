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

class EditPhotosModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            sent: false,
            formData:{
                title : '',
                description: '',
                created_date: '',
                permissions: ''
            }
        }
        this.toggle = this.toggle.bind(this);
        this.sendChanges = this.sendChanges.bind(this);
    };

    componentWillMount() {}

    toggle(){
        this.setState({
          modal: !this.state.modal,
          sent: false,
        });
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
                        <Input type="text"/>
                    </Col>
                </Row>
                <Row style={{marginBottom:'0.5em'}}>
                    <Col>
                        <p>Descripción</p>
                    </Col>
                    <Col>
                        <Input type="textarea"/>
                    </Col>
                </Row>
                <Row style={{marginBottom:'0.5em'}}>
                    <Col>
                        <p>Fecha</p>
                    </Col>
                    <Col>
                        <Input type="date"/>
                    </Col>
                </Row>
                <Row style={{marginBottom:'0.5em'}}>
                    <Col>
                        <p>Etiquetas</p>
                    </Col>
                    <Col>
                        <Input></Input>
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
                                style={{padding:'0',margin:'0'}}>
                                Seleccionar
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>CC BY</DropdownItem>
                                <DropdownItem>CC BY-SA</DropdownItem>
                                <DropdownItem>CC BY-ND</DropdownItem>
                                <DropdownItem>CC BY-NC</DropdownItem>
                                <DropdownItem>CC BY-NC-SA</DropdownItem>
                                <DropdownItem>CC BY-NC-ND</DropdownItem>
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
                    {/* {this.props.photos.length===1
                    ? <ModalHeader><h4 style={{fontWeight:'bold'}}>Editando 1 foto</h4></ModalHeader>
                    : <ModalHeader><h4 style={{fontWeight:'bold'}}>Editando {this.props.photos.length} fotos</h4></ModalHeader>} */}
                    <ModalBody>
                        {PhotosForm}
                    </ModalBody>
                    <ModalFooter>
                        {!this.state.sent ? (
                        <Fragment>
                            <Button color="primary" onClick={this.sendChanges}>
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