import React from "react";
import { ButtonGroup } from "reactstrap";

/**
 * Render design pattern
 * @param {Object} message
 * @param {Function} actions how to render actions
 */
const ContactRow = ({ message, actions, render }) => {
  return (
    <tr>
      <td>{actions(message)}</td>
      <td style={message.resolved ? { color: "green" } : { color: "red" }}>
        {message.resolved
          ? message.email_sent
            ? "Respondido por correo"
            : "Respondido por teléfono"
          : "Sin responder"}
      </td>
      <td>{new Date(message.created_at).toLocaleDateString("es")}</td>
      <td>Actualizar modelo</td>
      <td>
        {message.first_name} {message.last_name}
      </td>
      <td>{message.message}</td>
      <td>{render()}</td>
    </tr>
  );
};

export default ContactRow;
