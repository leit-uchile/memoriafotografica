import React, { Component } from 'react';
import Category_New from './Category_New'
import {Link, Route} from 'react-router-dom';
import {Col, Row, Container, Button, ButtonGroup, Input,
    Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { Table } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import Photo from '../../components/Photo';

var cates = [
    {
        name: "DCC",
        url: "https://pbs.twimg.com/profile_images/3410185634/3b7db5e3effe3286920338b1c8b2cfab_400x400.jpeg",
        tags: ["tag1","tag2"],
        count: 3
    },
    {
        name: "DFI",
        url: "https://pbs.twimg.com/profile_images/634838310989529088/-iiRAsLm_400x400.png",
        tags: ["tag2","tag3"],
        count: 18
    },
    {
        name: "Facultad de Derecho",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR17c1V96m-TXcg75FL3Cez4NjACHlJmU74Oeb2Hs0xIiHO9Mlf",
        tags: ["tag2","tag3"],
        count: 2
    },
    {
        name: "DIM",
        url: "http://www.dim.uchile.cl/u/ImageServlet?idDocumento=110986&indice=3&nocch=20181018153621.0",
        tags: ["tag2","tag3"],
        count: 9
    }
];

class Categories extends Component{

    constructor(){
        super()
        this.state = {
            toDelete : [],
            deleteModal: false,
        }
        this.getLatestCategories = this.getLatestCategories.bind(this);
        this.removeCategories = this.removeCategories.bind(this);
        this.updateToDelete = this.updateToDelete.bind(this);
        this.toggleRemoveConfirmation = this.toggleRemoveConfirmation.bind(this);
    }

    componentWillMount(){
        this.getLatestCategories()
    }
    getLatestCategories(){
        // Call API
        this.setState({
            categories: [...cates]
        })
    }

    updateToDelete(i,isCheck){
        // Send update to API
        console.log("updated checkbox "+i)
        if (isCheck){
            this.setState({toDelete: [...this.state.toDelete, i]})
        }else{
            this.setState({toDelete: this.state.toDelete.filter( el => el != i)})
        }
        // Update
    }

    removeCategories(){
        // Fake call to API : stub function
        const arr = this.state.categories.filter( (el,i) => {
            for(var j=0; j<this.state.toDelete.length; j++){
                if(this.state.toDelete[j] === i){return false}
            } return true
        })
        // Arr should come from redux with a reducer
        this.setState({toDelete: [], categories: arr, deleteModal: false})
        //this.getLatestCategories()
    }

    toggleRemoveConfirmation(){
        this.setState({deleteModal: !this.state.deleteModal})
    }

    render(){
        const {match} = this.props
        var latest = []
        // Put 3 per row
        for (let i = 0; i < this.state.categories.length; i++){
            latest.push(<tr>
                          <th>
                            <input type="checkbox" aria-label="Checkbox for delete Categories"
                            onClick={e => this.updateToDelete(i,e.target.checked)}
                            checked={false}></input>
                          </th>
                          <th>{this.state.categories[i].name}</th>
                          <td>{this.state.categories[i].count}</td>
                          <td>
                            <Button><FontAwesomeIcon icon={faEdit} /></Button>
                          </td>
                        </tr>)
        }
        if(latest.length<1){
            latest = <span>No existen categorias</span>
        }
        return(
            <Container>
                <h1>Administrar Categorías</h1>
                <Row>
                  <Col xs="12">
                    <ButtonGroup>
                        <Button tag={Link} to={match.url + "/new-category"}>Crear categorias</Button>
                        <Button onClick={this.toggleRemoveConfirmation}>Eliminar</Button>
                        <Modal isOpen={this.state.deleteModal} toggle={this.toggleRemoveConfirmation}>
                            <ModalHeader>¿Est&aacute;s seguro(a) que quieres eliminar la(s) categoría(s)?</ModalHeader>
                            <ModalBody>
                                No se eliminar&aacute;n las fotos asociadas, sólo la categoría. Esta acción no se puede deshacer.
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={this.removeCategories}>Eliminar</Button>
                                <Button onClick={this.toggleRemoveConfirmation}>Volver</Button>
                            </ModalFooter>
                        </Modal>
                    </ButtonGroup>
                  </Col>
                </Row>
                <br/>
                <Table>
                  <thead>
                    <th></th>
                    <th>Nombre</th>
                    <th># Fotos</th>
                    <th>Editar</th>
                  </thead>
                  <tbody>
                    {latest}
                  </tbody>
                </Table>
            </Container>
        );
    }

}
Categories.props = {
    categories: cates
}

export default Categories
