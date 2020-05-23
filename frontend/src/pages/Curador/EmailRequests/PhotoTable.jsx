import React, { Fragment } from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import PhotoRow from "./PhotoRow";

/**
 * Define different Renders and updates for
 * each report.
 *
 * @param {Array} requests
 * @param {Function} updateReport
 */
const PhotoTable = ({ requests, updateReport }) => {
  const resolve = (rep) => {
    let repCopy = { ...rep };
    delete repCopy.content_id;
    repCopy.resolved = !rep.resolved;
    // updateReport(repCopy);
  };

  const resolveButton = (rep) => (
    <Button onClick={() => resolve(rep)}>Resolver</Button>
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
            render={(photos) => (
              <Fragment>
                <Link to={`/photo/${photos}`}>Ver fotos</Link>
              </Fragment>
            )}
            actions={resolveButton}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default PhotoTable;
