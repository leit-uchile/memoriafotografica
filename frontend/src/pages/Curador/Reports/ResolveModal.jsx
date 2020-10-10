import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import { gallery, user } from "../../../actions";
import LeitSpinner from "../../../components/Layout/LeitSpinner";
import EditPhotosModal from "../../User/PhotoCollection/EditPhotosModal";
import "./resolveModal.css";

const EditUserForm = () => {
  return <div>Edit User</div>;
};

const ResolveModal = (props) => {
  const {
    buttonLabel,
    className,
    report,
    censureContent,
    updateReport,
    photo,
    getPhoto,
    mtPhoto,
    editPhoto,
    //user,
    getUser,
  } = props;

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(true);
  //const [shouldMail, setShouldMail] = useState(true)
  const [newreport, setNewreport] = useState({ ...report });
  const toggle = () => {
    mtPhoto();
    setNewreport(report);
    setLoading(false);
    setModal(!modal);
  };

  const censure = () => {
    setLoading(!loading);
    censureContent(newreport).then((response) => {
      setLoading(!loading);
      window.location.reload();
    });
  };

  const discardReport = () => {
    setLoading(!loading);
    let discardedReport = newreport;
    discardedReport.resolved = true;
    updateReport(discardedReport).then((r) => {
      setLoading(!loading);
      window.location.reload();
    });
  };

  const editAndSave = (editedPhoto) => {
    editPhoto(newreport, editedPhoto).then((r) => {
      window.location.reload();
    });
  };
  useEffect(() => {
    if (modal)
      switch (newreport.type) {
        case 1:
          if (true) getUser(report.content_id.id).then(setSpinner(false));
          break;
        case 2:
          console.log(photo);
          if (!photo.image)
            getPhoto(newreport.content_id.id).then(setSpinner(false));
          break;
        default:
      }
  }, [
    modal,
    newreport.type,
    newreport.content_id.id,
    getUser,
    report.content_id.id,
    photo,
    photo.image,
    getPhoto,
  ]);
  const display =
    newreport.type === 2 ? (
      <EditPhotosModal
        photosId={[1]}
        isOpen={modal}
        handleToggle={toggle}
        isCurator={true}
      />
    ) : (
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Resolver Reporte</ModalHeader>
        <ModalBody>
          <Col>
            <Row>
              <Col xs-12="true" md-6="true">
                <Button color="danger" onClick={censure}>
                  Censurar Contenido
                </Button>
              </Col>
              <Col xs-12="true" md-6="true">
                <Button color="primary" onClick={discardReport}>
                  Descartar Reporte
                </Button>
              </Col>
            </Row>
          </Col>
          {/* Si corresponde, editar contenido */}
          {newreport.type < 3 ? (
            <Col xs-12>
              <Row className="spacerTop10px">
                <Col xs-12>
                  Editar {newreport.type === 2 ? "Foto" : "Usuario"} :
                </Col>
              </Row>
              {spinner ? (
                <LeitSpinner />
              ) : newreport.type === 2 ? (
                // <EditPhotoForm photo={photo} saveAction={editAndSave} />
                <p>NUEVO MODAL</p>
              ) : (
                <EditUserForm />
              )}
            </Col>
          ) : (
            ""
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    );
  return (
    <div>
      <Button color="danger" onClick={toggle}>
        {buttonLabel}
      </Button>
      {display}
    </div>
  );
};

const mapStateToProps = (state) => ({
  photo: state.photos.details,
});

const mapActionsToProps = (dispatch) => ({
  editPhoto: (rep, cont) => dispatch(gallery.reports.updateContent(rep, cont)),
  getPhoto: (pk) => dispatch(gallery.photos.getPhoto(pk)),
  mtPhoto: () => dispatch(gallery.photos.mtPhoto()),
  getUser: (pk) => dispatch(user.loadAUser(pk)),
});

export default connect(mapStateToProps, mapActionsToProps)(ResolveModal);
