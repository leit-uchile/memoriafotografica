import React, { Fragment, useState } from "react";
import { Container, Button, Collapse, Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faHistory } from "@fortawesome/free-solid-svg-icons";

const TicketRow = ({ ticket }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Fragment>
      <tr>
        <td>{ticket.id}</td>
        <td>
          {ticket.resolved ? (
            <Badge pill color="success">
              Resuelto <FontAwesomeIcon icon={faCheckCircle} />
            </Badge>
          ) : (
            <Badge pill color="warning">
              Pendiente
            </Badge>
          )}
        </td>
        <td>{new Date(ticket.created_at).toLocaleDateString("es")}</td>
        <td>{new Date(ticket.updated_at).toLocaleDateString("es")}</td>
        <td>
          <Button className="action" onClick={toggle} title="Ver historial">
            <FontAwesomeIcon icon={faHistory} />
          </Button>
        </td>
      </tr>
      <Container fluid>
        <Collapse isOpen={isOpen}>
          <h2>Historial</h2>
        </Collapse>
      </Container>
    </Fragment>
  );
};

export default TicketRow;
