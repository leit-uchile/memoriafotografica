import React, {useState, useEffect} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
            Form, FormGroup, Label, Input, Row, Col} from "reactstrap";
import { connect } from "react-redux";
import { gallery, user} from "../../../actions";
import LeitSpinner from "../../../components/Layout/LeitSpinner"
import "./styles.css"
import { updateReport } from "../../../actions/gallery_api/reports";

const EditUserForm = () => {
  return (
    <div>
      Edit User
    </div>
  )
}

const EditPhotoForm = ({photo, saveAction}) => {
  
  const handleChange = (event) => {
    const target = event.target;
    let value = target.value;
    let editedPhoto = {...newphoto}
    editedPhoto[target.name] = value;
    setNewphoto(editedPhoto);
  }

  const submitChanges = (event) => {
    event.preventDefault()
    saveAction({title : newphoto.title, description:newphoto.description, upload_date:newphoto.upload_date})
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
    <Form>
        <FormGroup>
          <Label>Editar Título</Label>
          <Input type="text" name="title" value={newphoto.title} onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label>Editar Descripción</Label>
          <Input type="textarea" name="description" value={newphoto.description} onChange={handleChange}/>
        </FormGroup>       
        <FormGroup>
          <Label>Editar Fecha</Label>  
          <Input type="date" name="upload_date" value={newphoto.upload_date ? newphoto.upload_date.substring(0,10) : ""} onChange={handleChange}/>
        </FormGroup>

        <FormGroup>
          ** Editar Tags **
        </FormGroup>

        <Button color="primary" onClick={submitChanges} >Guardar Cambios</Button>
    </Form>
  )
}


const ResolveModal = (props) => {
    const {
      buttonLabel,
      className,
      report,     
      censureContent,
      updateReport,
      photo,
      getPhoto,
      editPhoto,
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
      censureContent(newreport).then(response => {
        setLoading(!loading)
        window.location.reload()
      })
    }

    const discardReport = () => {
      setLoading(!loading);
      let discardedReport = newreport;
      discardedReport.resolved = true;
      updateReport(discardedReport).then(r => {
        setLoading(!loading)
        window.location.reload()
      })
    }
    
    const editAndSave = (editedPhoto) => {
      editPhoto(newreport, editedPhoto).then( r => {
        alert("ready")
        window.location.reload()
      })
    }
    useEffect(() => {
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
              <Col>
                <Row>
                  <Col xs-12 md-6>
                    <Button color="danger" onClick={censure} >Censurar Contenido</Button>
                  </Col>
                  <Col xs-12 md-6>
                    <Button color="success" onClick={discardReport} >Descartar Reporte</Button>
                  </Col>
                </Row>            
              </Col>
              {/* Si corresponde, editar contenido */}
              {newreport.type < 3 ? (
                <Col xs-12>
                  <Row className="spacerTop10px">
                    <Col xs-12>
                      Editar {newreport.type == 2 ? "Foto" : "Usuario" } :
                    </Col>
                  </Row>
                  {spinner ? (<LeitSpinner/>) : (newreport.type == 2 ? (<EditPhotoForm photo={photo} saveAction={editAndSave}/>) : (<EditUserForm />))}
                </Col>
              ) : "" }
            </ModalBody>
            <ModalFooter>                        
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
  editPhoto: (rep, cont) => dispatch(gallery.reports.updateContent(rep, cont)),
  getPhoto: pk => dispatch(gallery.photos.getPhoto(pk)),
  getUser: pk => dispatch(user.loadAUser(pk))
});

export default connect(mapStateToProps, mapActionsToProps)(ResolveModal);