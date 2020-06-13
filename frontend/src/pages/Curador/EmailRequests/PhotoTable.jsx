import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import PhotoRow from "./PhotoRow";
import { webadmin } from "../../../actions";
import PhotoModal from "./PhotoModal";

/**
 * Define different Renders and updates for
 * each request.
 *
 * @param {Array} requests
 * @param {Function} updateRequest
 */
const PhotoTable = ({ requests, updateRequest }) => {
  const resolve = (req, bool) => {
    let originalPhotos = req.photos.map(el=>el.image)
    let reqCopy = { ...req, originalPhotos };
    delete reqCopy.photos
    reqCopy.resolved = !req.resolved;
    reqCopy.email_sent = bool; //Approved or Denied
    updateRequest(reqCopy);
  };

  const resolveButton = (req, bool) => (
    <Button color={bool ?"success" :"danger"} onClick={() => resolve(req, bool)} disabled={req.resolved}>{bool ?"Aprobar" :"Rechazar"}</Button>
  );

  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>Acciones</th>
          <th>Estado</th>
          <th>Solicitado el</th>
          <th>&Uacute;ltima actualizaci&oacute;n</th>
          <th>Finalidad</th>
          <th>Detalles</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((r) => (
          <PhotoRow
            request={r}
            key={r.id}
            actions={resolveButton}
            render={(info) => (
              <Fragment>
                <PhotoModal
                buttonLabel="Ver datos solicitante"
                request={info}
                />
              </Fragment>
            )}
          />
        ))}
      </tbody>
    </Table>
  );
};

const mapActionsToProps = dispatch => ({
  updateRequest: req => dispatch(webadmin.updateRequest(req))
});

export default connect(null, mapActionsToProps)(PhotoTable);
