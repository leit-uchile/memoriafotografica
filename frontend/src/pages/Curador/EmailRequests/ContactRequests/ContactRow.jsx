import React from "react";

/**
 * Render design pattern
 * @param {Object} message
 * @param {Function} actions how to render actions
 */
const ContactRow = ({ message, actions }) => {
  return (
    <tr>
      <td style={message.resolved ? { color: "green" } : { color: "red" }}>
        {message.resolved
          ? message.email_sent
            ? "Respondido por correo"
            : "Respondido por teléfono"
          : "Sin responder"}
      </td>
      <td>
        {message.first_name} {message.last_name}
      </td>
      <td>{message.message}</td>
      <td>
        {message.reply}
      </td>
      <td>{new Date(message.created_at).toLocaleDateString("es")}</td>
      <td>{new Date(message.updated_at).toLocaleDateString("es")}</td>
      <td>{actions(message)}</td>
    </tr>
  );
};

export default ContactRow;
