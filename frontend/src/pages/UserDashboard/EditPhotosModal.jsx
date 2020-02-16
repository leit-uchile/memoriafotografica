import React, {Component, Fragment, useEffect, useState} from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
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
    CustomInput, 
    ButtonDropdown} from "reactstrap";
import ReactTags from "react-tag-autocomplete"; 
import { photoDetails } from "../../actions";

const CC_INFO = [
    { name: "CC BY", text: "Atribución" },
    { name: "CC BY-SA", text: "Atribución, Compartir Igual" },
    { name: "CC BY-ND", text: "Atribución, Sin Derivadas" },
    { name: "CC BY-NC", text: "Atribución, No Comercial" },
    { name: "CC BY-NC-SA", text: "Atribución, No Comercial, Compartir Igual" },
    { name: "CC BY-NC-ND", text: "Atribución, No Comercial, Sin Derivadas" }
    ];

const EditPhotosModal = (props) =>{
    const [toggle, setToggle] = useState(false);
    const [sent, setSent] = useState(false); 
    const [formData, setData] = useState({
        name : '',
        description: '',
        created_date: '',
        tags:'',
        permission: ''
    });

    useEffect( () => {
        props.onLoad(props.photos)
    }, [props.photos]);

    const updateData = e => setData({...formData, [e.target.name]: e.target.value });
    
    const { style, className, photoInfo } = props;
    const PhotosForm = (
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
                        placeholder={photoInfo.title}
                        name="name"
                        onChange={updateData}
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
                        placeholder={photoInfo.description}
                        name="description"
                        onChange={updateData}
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
                        onChange={updateData}
                    />
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
                                
                                name="permission"
                                >
                                {formData.permission === ''
                                ? "Seleccionar"
                                : formData.permission}
                            </DropdownToggle>
                            <DropdownMenu>
                                {CC_INFO.map((el, k) => (
                                    <DropdownItem 
                                        name="permission" 
                                        value={el.name} 
                                        onClick={updateData}>
                                        {el.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </Col>
            </Row>
            </FormGroup>
            </Form>
        </Fragment>
        );

        return(
            <div>
                <Button 
                    disabled={props.photos.length == 0} 
                    color='success'
                    onClick={()=>setToggle(!toggle)}>
                    Editar selección ({props.photos.length})
                </Button>
                <Modal isOpen={toggle} toggle={()=>setToggle(!toggle)}>
                    {props.photos.length===1
                    ? <ModalHeader><h4 style={{fontWeight:'bold'}}>Editando 1 foto</h4></ModalHeader>
                    : <ModalHeader><h4 style={{fontWeight:'bold'}}>Editando {props.photos.length} fotos</h4></ModalHeader>}
                    <ModalBody>
                        {!sent ?
                        PhotosForm
                        : 'Estado de la solicitud (Cambios guardados, Error, etc)'}
                    </ModalBody>
                    <ModalFooter>
                        {!sent ? (
                        <Fragment>
                            <Button color="success">
                            Guardar cambios
                            </Button>
                            <Button color="secondary" onClick={()=>setToggle(!toggle)}>
                            Cancelar
                            </Button>
                            <Button color="danger" onClick={()=>setToggle(!toggle)}>
                            Eliminar
                            </Button>
                        </Fragment>
                        ) : (
                        <Button color="secondary" onClick={()=>setToggle(!toggle)}>
                            Cerrar
                        </Button>
                        )}
                    </ModalFooter>
                </Modal>
            </div>
        )
};

const mapStateToProps = state => {
    return {
        photoInfo: state.photoDetails.details,
    };
};

const mapActionsToProps = dispatch => ({
    onLoad: id => dispatch(photoDetails.getPhoto(id))
  });
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(EditPhotosModal);