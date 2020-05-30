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
  const resolve = (mss, formData) => {
    let mssCopy = { ...mss };
    mssCopy.resolved = true;
    updateMessage(mssCopy, formData);
  };

  const resolveButton = mss => (
    <ContactModal buttonLabel="Correo" message={mss} send={resolve} />
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
  updateMessage: (mss,formData) => dispatch(webadmin.updateMessage(mss,formData)) 
});

export default connect(null, mapActionsToProps)(ContactTable);
