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
    let msgCopy = { ...msg };
    msgCopy.resolved = true;
    msgCopy.email_sent = bool;
    updateMessage(msgCopy, formData);
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
          <th>Responder por</th>
          <th>Estado</th>
          <th>Recibido el</th>
          <th>Respondido el</th>
          <th>Nombre completo</th>
          <th>Mensaje</th>
          <th>Detalles</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((e) => (
          <ContactRow
            message={e}
            actions={resolveButton}
            render={() => (
              <Fragment>
                <p>Ver respuesta (Actualizar modelo)</p>
              </Fragment>
            )}
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
