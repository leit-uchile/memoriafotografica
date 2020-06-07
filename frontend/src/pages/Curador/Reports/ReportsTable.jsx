import React, { Fragment } from "react";
import { Table, Button } from "reactstrap";
import ReportRow from "./ReportRow";
import ResolveModal from "./ResolveModal";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { gallery } from "../../../actions";

/**
 * Define different Renders and updates for
 * each report.
 *
 * @param {Array} reports
 * @param {Function} updateReport
 */
const ReportsTable = ({ reports, updateReport, censureContent}) => {
  const resolve = rep => {
    let repCopy = {...rep};
    delete repCopy.content_id
    repCopy.resolved = !rep.resolved
    updateReport(repCopy);
  };  
  const resolveButton = rep => (
    (rep.resolved) ? "-" : (<ResolveModal buttonLabel="Acciones" report={rep} censureContent={censureContent}/>)
  );

  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Acciones</th>
          <th>Estado</th>
          <th>Fecha del reporte</th>
          <th>&Uacute;ltima actualizaci&oacute;n</th>
          <th>Contenido</th>
          <th>Detalles</th>
        </tr>
      </thead>
      <tbody>
        {reports.map(r =>
          r.type === 1 ? (
            <ReportRow
              report={r}
              render={content => (
                <p>
                  Ver perfil de{" "}
                  <Link
                    to={`/user/public/${content.id}`}
                  >{`${content.first_name} ${content.last_name}`}</Link>
                </p>
              )}
              actions={resolveButton}
              key={r.id}
            />
          ) : r.type === 2 ? (
            <ReportRow
              report={r}
              render={content => (
                <Fragment>
                  <img src={content.thumbnail} height="100px" alt="content"/>
                  <div>
                    <Link to={`/photo/${content.id}`}>Ver imagen</Link>
                  </div>
                </Fragment>
              )}
              actions={resolveButton}
              key={r.id}
            />
          ) : (
            <ReportRow
              report={r}
              render={content => (
                <Fragment>
                  <p>{content.content}</p>
                  <Link to={`/curador/comment/${content.id}/`}>
                    Ver comentario
                  </Link>
                </Fragment>
              )}
              actions={resolveButton}
              key={r.id}
            />
          )
        )}
      </tbody>
    </Table>
  );
};

const mapStateToProps = state => ({});

const mapActionsToProps = dispatch => ({
  updateReport: rep => dispatch(gallery.reports.updateReport(rep)),
  censureContent: rep => dispatch(gallery.reports.censureContent(rep))
});

export default connect(mapStateToProps, mapActionsToProps)(ReportsTable);
