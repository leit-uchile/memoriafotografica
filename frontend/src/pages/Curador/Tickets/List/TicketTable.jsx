import React from "react";
import { Table } from "reactstrap";
import TicketRow from "./TicketRow";

const TicketTable = ({ tickets }) => {
  return (
    <Table responsive striped className="statBox">
      <thead>
        <th>Ticket</th>
        <th>Estado</th>
        <th>Creado el</th>
        <th>&Uacute;ltima modificaci&oacute;n</th>
        <th></th>
      </thead>
      <tbody>
        {tickets.length !== 0
          ? tickets.map((t) => <TicketRow ticket={t} key={t.id} />)
          : null}
      </tbody>
    </Table>
  );
};
export default TicketTable;
