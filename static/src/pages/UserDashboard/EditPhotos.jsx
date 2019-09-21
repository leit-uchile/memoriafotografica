import React from "react";
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
    FormGroup,
    Label, 
    Input } from "reactstrap";

const EditPhotos = ({ isOpen, photos, onClick }) => (
    <Modal isOpen={isOpen}>
      {photos.length===1
      ? <ModalHeader><h4 style={{fontWeight:'bold'}}>Editando 1 foto</h4></ModalHeader>
      : <ModalHeader><h4 style={{fontWeight:'bold'}}>Editando {photos.length} fotos</h4></ModalHeader>}
      <ModalBody>
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
                <Button onClick={onClick}>Guardar</Button>
            </Col>
        </Row> 
      </ModalBody>
    </Modal>
  );

export default EditPhotos;