import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
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
 * @param {Function} actions how to render actions
 */
const ReportRow = ({ report, actions }) => {
  return (
    <tr>
      <td>{typeToText(report.type)}</td>
      <td>
        {report.type === 1 ? (
          <p>
            <Link to={`/user/public/${report.content_id.id}`}>Ver perfil</Link>{" "}
            de {report.content_id.first_name} {report.content_id.last_name}
          </p>
        ) : report.type === 2 ? (
          <Fragment>
            <img
              src={report.content_id.thumbnail}
              height="100px"
              alt="content"
            />
            <div>
              <Link to={`/photo/${report.content_id.id}`}>Ver imagen</Link>
            </div>
          </Fragment>
        ) : report.type === 3 ? (
          <Fragment>
            <p>{report.content_id.content}</p>
            <Link to={`/curador/comment/${report.content_id.id}/`}>
              Ver comentario
            </Link>
          </Fragment>
        ) : (
          <span></span>
        )}
      </td>
      <td>{report.content}</td>
      <td style={{ fontSize: "1.2em" }}>
        {report.resolved ? (
          <Badge pill color="success">
            Resuelto {check}
          </Badge>
        ) : (
          <Badge pill color="warning">
            Pendiente
          </Badge>
        )}
      </td>
      <td>{new Date(report.created_at).toLocaleDateString("es")}</td>
      <td>{new Date(report.updated_at).toLocaleDateString("es")}</td>
      <td>{actions(report)}</td>
    </tr>
  );
};

export default ReportRow;
