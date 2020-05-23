import React, { Fragment } from "react";
import { Table, Button } from "reactstrap";
// import ReportRow from "./ReportRow";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { gallery } from "../../../actions";
import ContactRow from "./ContactRow";
import ContactModal from "./ContactModal"

/**
 * Define different Renders and updates for
 * each report.
 *
 * @param {Array} emails
 * @param {Function} contact
 */
const ContactTable = ({ emails,  }) => {
  const resolve = rep => {
    let repCopy = {...rep};
    delete repCopy.content_id
    repCopy.resolved = !rep.resolved
    // contact(repCopy);
  };

  const resolveButton = rep => (
    <ContactModal
    email={rep}
    /> //corregir
  );

  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>Estado</th>
          <th>Acciones</th>
          <th>Fecha</th>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th>Contenido</th>
        </tr>
      </thead>
      <tbody>
        {/* {emails.map(e =>
            <ContactRow
              email={e}
              actions={resolveButton}
              render={content => (
                <p>
                  Ver perfil de{" "}
                  <Link
                    to={`/user/public/${content.id}`}
                  >{`${content.first_name} ${content.last_name}`}</Link>
                </p>
              )}
            />
        )} */}
      </tbody>
    </Table>
  );
};

// const mapActionsToProps = dispatch => ({
//   contact: 
// });

export default connect(null, null)(ContactTable);
