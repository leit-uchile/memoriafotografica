import React, { Component } from 'react';
import Category_New from './Category_New'
import {Link, Route} from 'react-router-dom';
import {Col, Row, Container, Button, ButtonGroup, Input,
    Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Photo from '../../components/Photo';

var cates = [
    {
        name: "DCC",
        url: "https://pbs.twimg.com/profile_images/3410185634/3b7db5e3effe3286920338b1c8b2cfab_400x400.jpeg",
        tags: ["tag1","tag2"],
    },
    {
        name: "DFI",
        url: "https://pbs.twimg.com/profile_images/634838310989529088/-iiRAsLm_400x400.png",
        tags: ["tag2","tag3"],
    },
    {
        name: "Facultad de Derecho",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR17c1V96m-TXcg75FL3Cez4NjACHlJmU74Oeb2Hs0xIiHO9Mlf",
        tags: ["tag2","tag3"],
    },
    {
        name: "DIM",
        url: "http://www.dim.uchile.cl/u/ImageServlet?idDocumento=110986&indice=3&nocch=20181018153621.0",
        tags: ["tag2","tag3"],
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
        for (var i = 0; i < this.state.categories.length; i+=3){
            var aRow = []
            for ( var j = 0; j < 3 && i+j < this.state.categories.length; j++){
                const index = i + j
                aRow.push(
                    <Col sm={4} key={this.state.categories[index].name}>
                        <h4>
                            <input type="checkbox" aria-label="Checkbox for delete Categories"
                            onClick={e => this.updateToDelete(index,e.target.checked)}></input>
                            {this.state.categories[index].name}    
                        </h4>
                        <Photo name={this.state.categories[index].name} url={this.state.categories[index].url} tags={this.state.categories[index].tags}
                            height="200px" width="auto" className='fit-image'/>
                    </Col>)
            }
            latest.push(<Row>{aRow}</Row>)
        }
        if(latest.length<1){
            latest = <span>No existen categorias</span>
        }
        return(
            <Container>
                <h2>Administrar Categorias</h2>
                <Row>
                    <ButtonGroup>
                        <Button tag={Link} to={match.url + "/new-category"}>Crear categorias</Button>
                        <Button onClick={this.toggleRemoveConfirmation}>Eliminar</Button>
                        <Modal isOpen={this.state.deleteModal} toggle={this.toggleRemoveConfirmation}>
                            <ModalHeader>¿Est&aacute;s seguro(a) que quieres eliminar la categoria?</ModalHeader>
                            <ModalBody>
                                No se eliminar&aacute;n las fotos, s&oacute;lo la categoria.
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={this.removeCategories}>Eliminar</Button>
                                <Button onClick={this.toggleRemoveConfirmation}>Volver</Button>
                            </ModalFooter>
                        </Modal>
                    </ButtonGroup>
                </Row>
                <h3>Categorias disponibles</h3>
                {latest}
            </Container>
        );
    }

}
Categories.props = {
    categories: cates
}

export default Categories