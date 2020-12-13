import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Col,
  Spinner,
} from "reactstrap";
import { connect } from "react-redux";
import { gallery } from "../../../actions";
import EditUserModal from "./EditUserModal";
import EditPhotosModal from "../../User/PhotoCollection/EditPhotosModal";
import EditCommentModal from "./EditCommentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrashAlt,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./resolveModal.css";
import { bindActionCreators } from "redux";

const ResolveModal = ({
  buttonLabel,
  className,
  report,
  censureContent,
  updateReport,
  editReport,
}) => {
  const [modal, setModal] = useState(false);
  const [discarting, setDiscarting] = useState(false);
  const [censuring, setCensuring] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [newreport, setNewreport] = useState({});

  useEffect(() => {
    let info = { ...report };
    setNewreport(info);
  }, [report, modal]);

  const discardReport = () => {
    let discardedReport = { ...newreport };
    discardedReport.resolved = true;
    discardedReport.resolution_details = "descarted";
    setDiscarting(true);
    updateReport(discardedReport).then((r) => {
      setDiscarting(false);
      setModal(!modal);
    });
  };

  const censure = () => {
    setCensuring(true);
    censureContent(newreport).then((r) => {
      setCensuring(false);
      setModal(!modal);
    });
  };

  const editOption =
    newreport.type === 1 ? (
      <EditUserModal
        report={newreport}
        isOpen={editModal}
        handleToggle={() => setEditModal(!editModal)}
        editUser={(newData) => editReport(newreport, newData)}
      />
    ) : newreport.type === 2 ? (
      <EditPhotosModal
        photosId={[newreport.content_id.id]}
        isOpen={editModal}
        handleToggle={() => setEditModal(!editModal)}
        editPhoto={(photoId, newData) => editReport(newreport, newData)}
        isCurator={true}
      />
    ) : (
      <EditCommentModal
        report={newreport}
        isOpen={editModal}
        handleToggle={() => setEditModal(!editModal)}
        editComment={(comment) => editReport(newreport, comment)}
      />
    );

  return (
    <div>
      <Button color="danger" onClick={setModal}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={() => setModal()} size={"lg"}>
        <ModalHeader toggle={() => setModal()}>Resolver Reporte</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="delete" sm={3}>
                Descartar reporte{" "}
              </Label>
              <Col sm={9}>
                {discarting ? (
                  <Spinner
                    style={{
                      width: "1rem",
                      height: "1rem",
                      color: "var(--leit-red)",
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    onClick={discardReport}
                    style={{
                      color: "var(--leit-red)",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  />
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="censure" sm={3}>
                Censurar{" "}
              </Label>
              <Col sm={9}>
                {censuring ? (
                  <Spinner
                    style={{
                      width: "1rem",
                      height: "1rem",
                      color: "var(--leit-red)",
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={censure}
                    style={{
                      color: "var(--leit-red)",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  />
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="edit" sm={3}>
                Editar contenido reportado{" "}
              </Label>
              <Col sm={9}>
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  onClick={() => setEditModal(true)}
                  style={{
                    color: "var(--leit-red)",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                />
              </Col>
            </FormGroup>
            {editOption}
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      editReport: gallery.reports.updateContent,
    },
    dispatch
  );

export default connect(null, mapActionsToProps)(ResolveModal);
