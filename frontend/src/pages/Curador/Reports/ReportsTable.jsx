import React from "react";
import { Table } from "reactstrap";
import ReportRow from "./ReportRow";
import ResolveButtons from "./ResolveButtons";

/**
 * Define different Renders and updates for
 * each report.
 *
 * @param {Array} reports
 */
const ReportsTable = ({ reports }) => {
  const actions = (rep) =>
    rep.resolved ? (
      <b>{rep.resolution_details || "-"}</b>
    ) : (
      <ResolveButtons report={rep} />
    );

  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Detalles</th>
          <th>Motivo</th>
          <th>Estado</th>
          <th>Reportado el</th>
          <th>&Uacute;ltima actualizaci&oacute;n</th>
          <th>Acci&oacute;n</th>
        </tr>
      </thead>
      <tbody>
        {reports.length !== 0
          ? reports.map((r) => (
              <ReportRow report={r} actions={actions} key={r.id} />
            ))
          : null}
      </tbody>
    </Table>
  );
};
export default ReportsTable;
