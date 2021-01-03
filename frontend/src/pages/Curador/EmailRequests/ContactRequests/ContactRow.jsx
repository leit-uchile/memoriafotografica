import React from "react";
import { Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const check = <FontAwesomeIcon icon={faCheckCircle} />;

/**
 * Render design pattern
 * @param {Object} message
 * @param {Function} actions how to render actions
 */
const ContactRow = ({ message, actions }) => {
  return (
    <tr>
      <td>
        {message.first_name} {message.last_name}
      </td>
      <td>{message.message}</td>
      <td style={{ fontSize: "1.2em" }}>
        {message.resolved ? (
          <Badge pill color="success">
            Resuelto {check}
          </Badge>
        ) : (
          <Badge pill color="warning">
            Pendiente
          </Badge>
        )}
      </td>
      <td>{message.reply}</td>
      <td>{new Date(message.created_at).toLocaleDateString("es")}</td>
      <td>{new Date(message.updated_at).toLocaleDateString("es")}</td>
      <td>
        {message.resolved ? (
          message.email_sent ? (
            <b>Respondido por correo</b>
          ) : (
            <b>Respondido por teléfono</b>
          )
        ) : (
          actions(message)
        )}
      </td>
    </tr>
  );
};

export default ContactRow;
