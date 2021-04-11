import React, { useState, useEffect, Fragment } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { gallery } from "../../../actions";
import EditUserModal from "./EditUserModal";
import EditPhotosModal from "../../User/PhotoCollection/EditPhotosModal";
import EditCommentModal from "./EditCommentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faEyeSlash,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./resolveModal.css";
import { bindActionCreators } from "redux";

const ResolveModal = ({
  className,
  report,
  censureContent,
  updateReport,
  editReport,
}) => {
  const [newreport, setNewreport] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [discarting, setDiscarting] = useState(false);
  const [censuring, setCensuring] = useState(false);

  useEffect(() => {
    let info = { ...report };
    setNewreport(info);
  }, [report]);

  const discardReport = () => {
    let discardedReport = { ...newreport };
    discardedReport.resolved = true;
    discardedReport.resolution_details = "Reporte descartado";
    setDiscarting(true);
    updateReport(discardedReport).then((r) => {
      setDiscarting(false);
    });
  };

  const censure = () => {
    setCensuring(true);
    censureContent(newreport).then((r) => {
      setCensuring(false);
    });
  };

  return (
    <Fragment>
      {newreport.type === 1 ? (
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
      )}
      <Button className="action" onClick={() => setEditModal(!editModal)}>
        <FontAwesomeIcon icon={faPencilAlt} />
      </Button>
      <Button className="action" onClick={censure}>
        <FontAwesomeIcon icon={faEyeSlash} />
      </Button>
      <Button className="action" onClick={discardReport}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </Fragment>
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
