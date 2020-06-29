import React, { Fragment } from "react";
import { Table, ButtonGroup } from "reactstrap";
import { connect } from "react-redux";
import { webadmin } from "../../../actions";
import ContactRow from "./ContactRow";
import ContactEmailModal from "./ContactEmailModal";
import ContactPhoneModal from "./ContactPhoneModal";

/**
 * Define different Renders and updates for.
 *
 * @param {Array} messages
 * @param {Function} updateMessage
 */
const ContactTable = ({ messages, updateMessage }) => {
  const resolve = (msg, formData, bool) => {
    let msgUpdate = { ...msg };
    msgUpdate.resolved = true;
    msgUpdate.email_sent = bool;
    updateMessage(msgUpdate, formData);
  };

  const resolveButton = (msg) => (
    <ButtonGroup>
      <ContactEmailModal buttonLabel="Correo" message={msg} send={resolve} />
      <ContactPhoneModal buttonLabel="Teléfono" message={msg} send={resolve} />
    </ButtonGroup>
  );

  return (
    <Table responsive striped className="statBox">
      <thead>
        <tr>
          <th>Estado</th>
          <th>Nombre completo</th>
          <th>Mensaje</th>
          <th>Respuesta</th>
          <th>Recibido el</th>
          <th>Respondido el</th>
          <th>Responder por</th>
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

const mapActionsToProps = (dispatch) => ({
  updateMessage: (msg, formData) =>
    dispatch(webadmin.updateMessage(msg, formData)),
});

export default connect(null, mapActionsToProps)(ContactTable);
