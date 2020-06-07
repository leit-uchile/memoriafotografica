import React, {useState, useEffect} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
            Form, FormGroup, Label, Input, Row, Col} from "reactstrap";
import { connect } from "react-redux";
import { gallery, user} from "../../../actions";
import LeitSpinner from "../../../components/Layout/LeitSpinner"

const EditUserForm = () => {
  return (
    <div>
      Edit User
    </div>
  )
}

const EditPhotoForm = ({photo}) => {
  
  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    let editedPhoto = {...newphoto}
    editedPhoto[target.name] = value;
    setNewphoto(editedPhoto);
  }

  useEffect(()=>{
    if(photo != originalphoto){
      setOriginalphoto(photo)
      setNewphoto(photo)
    }
  })

  const [newphoto, setNewphoto] = useState(photo)
  const [originalphoto, setOriginalphoto] = useState(photo)
  return (
    <Row>
      <FormGroup>
                  <Label>Editar Título</Label>
                  <Input type="text" name="title" value={newphoto.title} onChange={handleChange}/>
      </FormGroup>
      <FormGroup>
                  <Label>Editar Descripción</Label>
                  <Input type="textarea" name="description" value={newphoto.description} onChange={handleChange}/>
      </FormGroup> 
    </Row>
  )
}


const ResolveModal = (props) => {
    const {
      buttonLabel,
      className,
      report,     
      censureContent,
      photo,
      getPhoto,
      user,
      getUser,
    } = props;
  
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [spinner, setSpinner] = useState(true)
    const [shouldMail, setShouldMail] = useState(true)
    const [newreport, setNewreport] = useState({...report});
    const toggle = () => {setNewreport(report); setLoading(false); setModal(!modal)};

    const censure = () => {
      setLoading(!loading);
      console.log(newreport)
      censureContent(newreport).then(response => {
        setLoading(!loading)
        window.location.reload()
      })
      

    }
    
    useEffect(() => {
      console.log(!photo.image)
      console.log(photo.image)
      if (modal) switch(newreport.type){
        case 1:
          if(true) getUser(report.content_id.id).then(
            setSpinner(false)
          )
        case 2:
          if(!photo.image) getPhoto(newreport.content_id.id).then(
            setSpinner(false)
          )      
      }
    })
    return (
        <div>
          <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Resolver Reporte</ModalHeader>
            <ModalBody>    
              <Row>
                <Col xs-12 md-6>
                  <Button color="danger" onClick={censure} >Censurar Contenido</Button>
                </Col>
                <Col xs-12 md-6>
                  <Button color="success">Descartar Reporte</Button>
                </Col>
              </Row>
              {/* Si corresponde, editar contenido */}
              {newreport.type < 3 ? (
                <Col xs-12>
                  <Row>
                    Editar {newreport.type == 1 ? "Foto" : "Usuario" } :
                  </Row>
                  <Row>
                      Formulario de edición
                  </Row>
                  {spinner ? (<LeitSpinner/>) : (newreport.type == 2 ? (<EditPhotoForm photo={photo}/>) : (<EditUserForm />))}
                </Col>
              ) : "" }
            </ModalBody>
            <ModalFooter>
              <Button color="primary">{!loading ? "Guardar Cambios" : "enviando..."}</Button>{' '}           
              <Button color="secondary" onClick={toggle}>Cancelar</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }

const mapStateToProps = state => ({
  photo : state.photos.details
});

const mapActionsToProps = dispatch => ({
  getPhoto: pk => dispatch(gallery.photos.getPhoto(pk)),
  getUser: pk => dispatch(user.loadAUser(pk))
});

export default connect(mapStateToProps, mapActionsToProps)(ResolveModal);