import React from "react";

/**
 * Render design pattern
 * @param {Object} message
 * @param {Function} actions how to render actions
 */
const ContactRow = ({ message, actions }) => {
  return (
    <tr>
      <td>{actions(message)}</td>
      <td style={message.resolved ? { color: "green" } : { color: "red" }}>
        {message.resolved ? "Respondido" : "Sin responder"}
      </td>
      <td>{new Date(message.created_at).toLocaleDateString("es")}</td>
      <td>{message.first_name} {message.last_name}</td>
      <td>{message.phone_number}</td>
      <td>{message.email}</td>
      <td>{message.message}</td>
    </tr>
  );
};

export default ContactRow;
