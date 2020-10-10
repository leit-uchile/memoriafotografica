import React, { useState, Fragment } from "react";
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
import EditUserModal from "./EditUserModal";
import EditPhotosModal from "../../User/PhotoCollection/EditPhotosModal";
import EditCommentModal from "../../User/PhotoCollection/EditPhotosModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashAlt, faCamera, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "./resolveModal.css";

const ResolveModal = (props) => {
  const {
    buttonLabel,
    className,
    report,
    censureContent,
    updateReport,
    editPhoto,
    //user,
    getUser,
  } = props;

  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(true);
  //const [shouldMail, setShouldMail] = useState(true)
  const [newreport, setNewreport] = useState({ ...report });

  const toggle = () => {
    setNewreport(report);
    setLoading(false);
    setModal(!modal);
  };

  const discardReport = () => {
    setLoading(!loading);
    let discardedReport = newreport;
    discardedReport.resolved = true;
    discardedReport.resolution_details = "descarted";
    updateReport(discardedReport).then((r) => {
      setLoading(!loading);
      window.location.reload();
    });
  };

  const censure = () => {
    setLoading(!loading);
    censureContent(newreport).then((response) => {
      setLoading(!loading);
      window.location.reload();
    });
  };

  // const editAndSave = (editedPhoto) => {
  //   editPhoto(newreport, editedPhoto).then((r) => {
  //     window.location.reload();
  //   });
  // };

  const editOption =
    newreport.type === 1 ? (
      <EditUserModal
        report={newreport}
        isOpen={editModal}
        handleToggle={()=>setEditModal(!editModal)}
      />
    ) : (newreport.type === 2 ? (
      <EditPhotosModal
        photosId={[newreport.content_id.id]}
        isOpen={editModal}
        handleToggle={()=>setEditModal(!editModal)}
        editPhoto={(photoId, newData) => editPhoto(newreport, newData)}
        isCurator={true}
      />
    ) : (
      <EditCommentModal
        comment={newreport}
        isOpen={editModal}
        handleToggle={()=>setEditModal(!editModal)}
      />
    ));
    
  const modalContent = (
    <Fragment>
      <Modal isOpen={modal} toggle={() => setModal()} size={"lg"}>
        <ModalHeader toggle={() => setModal()}>
          Resolver Reporte
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Row>
                <Col>
                  <Label>Descartar reporte</Label>
                </Col>
                <Col>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    onClick={discardReport}
                    style={{
                      color: "var(--leit-red)",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label>Censurar</Label>
                </Col>
                <Col>
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={censure}
                    style={{
                      color: "var(--leit-red)",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label>Editar contenido reportado</Label>
                </Col>
                <Col>
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    onClick={()=> setEditModal(true)}
                    style={{
                      color: "var(--leit-red)",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  />
                </Col>
              </Row>
              {editOption}
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        {buttonLabel}
      </Button>
      {modalContent}
    </div>
  );
};

const mapActionsToProps = (dispatch) => ({
  editPhoto: (rep, cont) => dispatch(gallery.reports.updateContent(rep, cont)),
  getUser: (pk) => dispatch(user.loadAUser(pk)),
});

export default connect(null, mapActionsToProps)(ResolveModal);
