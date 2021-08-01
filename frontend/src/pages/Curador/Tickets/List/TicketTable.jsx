import React from "react";
import { Container } from "reactstrap";
import TicketRow from "./TicketRow";

const TicketTable = ({ tickets }) => {
  return (
    <Container>
      {tickets.length !== 0
        ? tickets.map((t) => <TicketRow ticket={t} key={t.id} />)
        : null}
    </Container>
  );
};
export default TicketTable;
