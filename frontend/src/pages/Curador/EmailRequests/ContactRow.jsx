import React from "react";

/**
 * Render design pattern
 * @param {Object} email
 * @param {Function} render how to render details
 * @param {Function} actions how to render actions
 */
const ContactRow = ({ email, actions }) => {
  return (
    <tr>
      <td>{actions(email)}</td>
      <td style={email.resolved ? { color: "green" } : { color: "red" }}>
        {email.resolved ? "Respondido" : "Sin responder"}
      </td>
      <td>{new Date(email.created_at).toLocaleDateString("es")}</td>
      <td>{email.first_name} {email.last_name}</td>
      <td>{email.phone_number}</td>
      <td>{email.email}</td>
      <td>{email.message}</td>
    </tr>
  );
};

export default ContactRow;
