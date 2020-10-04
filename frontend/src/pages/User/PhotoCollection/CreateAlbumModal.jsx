import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Input,
  Form,
} from "reactstrap";

import { metadata, gallery, albumcollection } from "../../../actions";

const CC_INFO = [
  { name: "CC BY", text: "Atribución" },
  { name: "CC BY-SA", text: "Atribución, Compartir Igual" },
  { name: "CC BY-ND", text: "Atribución, Sin Derivadas" },
  { name: "CC BY-NC", text: "Atribución, No Comercial" },
  { name: "CC BY-NC-SA", text: "Atribución, No Comercial, Compartir Igual" },
  { name: "CC BY-NC-ND", text: "Atribución, No Comercial, Sin Derivadas" },
];



function CreateAlbumModal(props){    
    const [toggle, setToggle] = useState(false);  
    const handleToggle = () => {
        setToggle(!toggle);
        props.isOpen(!toggle); //permite el refresh una vez cerrado
      };
    
    useEffect(()=>{
        setName("")
        setDescription("")
        setCollection(false)
    }, [toggle])

    useEffect(() => {
        if(props.albumStatus.sent && props.albumStatus.success){
            setShouldRedirect(true)
        }
    }, [props.albumStatus])
    
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [collection, setCollection] = useState(false)
    const [shouldRedirect, setShouldRedirect] = useState(false)
    
    const createAlbum = (event) => {
        event.preventDefault();
        props.newAlbum({name, description, collection, pictures : props.photosID})

    }
    return shouldRedirect ? (<Redirect to="/user/dashboard/albums" />) : (
        <div>
            <Button 
                disabled={props.photosID.length === 0}
                color="primary"
                onClick={handleToggle}>
                    Crear Nuevo Álbum ({props.photosID.length})
            </Button>
            <Modal isOpen={toggle} toggle={handleToggle} size={"lg"}>
                <ModalHeader>
    <h3>Creando {collection ? "Colección" : "Álbum"} {name ? (": "+name) : ""}</h3>
                </ModalHeader>
                <Form onSubmit={createAlbum}>
                    <ModalBody>
                        <FormGroup>
                            <Label>Nombre del Álbum</Label>
                            <Input name="name" onChange={e=>setName(e.target.value)} required="true"/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Descripción del Álbum</Label>
                            <Input type="text" name="description" onChange={e=>setDescription(e.target.value)} />
                        </FormGroup> 
                        <FormGroup check >
                            <Label check >
                                <Input type="checkbox" checked={collection} name="collection" onChange={e=>setCollection(!collection)} />{' '}
                                Crear como Colección
                            </Label>
                        </FormGroup> 

                        {/* <Row>
                            <Col>
                                El álbum incluirá las siguientes fotos:
                            </Col>
                        </Row> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button>Crear {collection ? "Colección" : "Álbum"}</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}


const mapStateToProps = (state) => ({
    albumStatus : state.albumcollection.createAlbum
  });
  
  const mapActionsToProps = (dispatch) => ({
    newAlbum: (formData) => dispatch(gallery.album.createAlbum(formData)),
  });
  
  export default connect(mapStateToProps, mapActionsToProps)(CreateAlbumModal);