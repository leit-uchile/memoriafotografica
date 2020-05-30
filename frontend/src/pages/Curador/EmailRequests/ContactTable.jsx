import React, { Fragment } from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { gallery } from "../../../actions";
import ContactRow from "./ContactRow";
import ContactModal from "./ContactModal";
import webadmin from "../../../reducers/webadmin";

/**
 * Define different Renders and updates for.
 *
 * @param {Array} messages
 * @param {Function} updateMessage
 */
const ContactTable = ({ messages }) => {
  const resolve = (mss) => {
    let mssCopy = { ...mss };
    delete mssCopy.content_id;
    mssCopy.resolved = !mss.resolved;
    // contact(mssCopy);
  };

  const resolveButton = (mss) => (
    <ContactModal email={mss.email} /> //corregir
  );

  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>Acciones</th>
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
            email={e}
            actions={resolveButton}
          />
        ))}
      </tbody>
    </Table>
  );
};

const mapActionsToProps = dispatch => ({
  updateMessage: mss => dispatch(webadmin.updateMessage(mss)) 
});

export default connect(null, mapActionsToProps)(ContactTable);
