import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const check = <FontAwesomeIcon icon={faCheckCircle} />;
const typeToText = (t) => {
  switch (t) {
    case 1:
      return "Usuario";
    case 2:
      return "Foto";
    case 3:
      return "Comentario";
    default:
      return "Otro";
  }
};

/**
 * Render design pattern
 * @param {Object} report
 * @param {Function} render how to render details
 * @param {Function} actions how to render actions
 */
const ReportRow = ({ report, render, actions }) => {
  return (
    <tr>
      <td>{typeToText(report.type)}</td>
      <td>{actions(report)}</td>
      <td>
        {report.resolved ? (
          <span style={{ color: "green" }}>Resuelto{check}</span>
        ) : (
          <span style={{ color: "red" }}>Pendiente{check}</span>
        )}
      </td>
      <td>{new Date(report.created_at).toLocaleDateString("es")}</td>
      <td>{new Date(report.updated_at).toLocaleDateString("es")}</td>
      <td>{report.content}</td>
      <td>{render(report.content_id)}</td>
    </tr>
  );
};

export default ReportRow;
