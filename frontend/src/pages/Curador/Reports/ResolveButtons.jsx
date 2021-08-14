import React, { useState, Fragment, useEffect } from "react";
import { Button, Spinner } from "reactstrap";
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
import { selectReportItemStatus } from "../../../reducers/";

const ResolveButtons = ({ report, edit, censure, discard, reportStatus }) => {
  const [editContent, setEditContent] = useState(false);

  useEffect(() => {
    if (reportStatus === "success") {
      setEditContent(false); // This closes EditModal
    }
  }, [reportStatus]);

  const censureContent = () => {
    censure(report);
  };

  const discardReport = () => {
    let discardedReport = { ...report };
    discardedReport.resolved = true;
    discardedReport.resolution_details = "Reporte descartado";
    discard(discardedReport);
  };

  return (
    <Fragment>
      {report.type === 1 ? (
        <EditUserModal
          report={report}
          isOpen={editContent}
          handleToggle={() => setEditContent(!editContent)}
          editUser={(newData) => edit(report, newData)}
          updating={reportStatus}
        />
      ) : report.type === 2 ? (
        <EditPhotosModal
          photosId={[report.content_id.id]}
          isOpen={editContent}
          handleToggle={() => setEditContent(!editContent)}
          editPhoto={(photoId, newData) => edit(report, newData)}
          isCurator={true}
          updating={reportStatus}
        />
      ) : (
        <EditCommentModal
          report={report}
          isOpen={editContent}
          handleToggle={() => setEditContent(!editContent)}
          editComment={(comment) => edit(report, comment)}
          updating={reportStatus}
        />
      )}
      {reportStatus === "loading" ? (
        <Spinner />
      ) : (
        <Fragment>
          <Button
            className="action"
            onClick={() => setEditContent(!editContent)}
            title="Editar"
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </Button>
          <Button className="action" onClick={censureContent} title="Censurar">
            <FontAwesomeIcon icon={faEyeSlash} />
          </Button>
          <Button className="action" onClick={discardReport} title="Descartar">
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  reportStatus: selectReportItemStatus(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      edit: gallery.reports.updateContent,
      censure: gallery.reports.censureContent,
      discard: gallery.reports.updateReport,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(ResolveButtons);
