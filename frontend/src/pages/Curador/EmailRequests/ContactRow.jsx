import React from "react";

/**
 * Render design pattern
 * @param {Object} email
 * @param {Function} render how to render details
 * @param {Function} actions how to render actions
 */
const ContactRow = ({ email, render, actions }) => {
  return (
    <tr>
      <td style={email.resolved ? { color: "green" } : { color: "red" }}>
        {email.resolved ? "Respondido" : "Sin responder"}
      </td>
      <td>{actions(email)}</td>
      <td>{new Date(email.created_at).toLocaleDateString("es")}</td>
      <td>{email.name}</td>
      <td>{email.email}</td>
      <td>{render(email.content_id)}</td>
    </tr>
  );
};

export default ContactRow;
