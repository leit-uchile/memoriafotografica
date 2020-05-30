import React, { Fragment } from "react";
import { Table, Button } from "reactstrap";
import { connect } from "react-redux";
import { webadmin } from "../../../actions";
import ContactRow from "./ContactRow";
import ContactModal from "./ContactModal";

/**
 * Define different Renders and updates for.
 *
 * @param {Array} messages
 * @param {Function} updateMessage
 */
const ContactTable = ({ messages, updateMessage }) => {
  const resolve = (msg, formData) => {
    let msgCopy = { ...msg };
    msgCopy.resolved = true;
    msgCopy.email_sent = true;
    updateMessage(msgCopy, formData);
  };

  const resolveButton = msg => (
    <ContactModal buttonLabel="Correo" message={msg} send={resolve}/>
  );

  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>Responder por</th>
          <th>Estado</th>
          <th>Fecha</th>
          <th>Nombre completo</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th>Contenido</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((e) => (
          <ContactRow
            message={e}
            actions={resolveButton}
          />
        ))}
      </tbody>
    </Table>
  );
};

const mapActionsToProps = dispatch => ({
  updateMessage: (msg,formData) => dispatch(webadmin.updateMessage(msg,formData)) 
});

export default connect(null, mapActionsToProps)(ContactTable);
