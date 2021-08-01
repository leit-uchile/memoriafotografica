import React, { useState } from "react";
import { Container, Button, Collapse, Row, Col, Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const TicketRow = (ticket) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Row>
      <Col>
        <Button color="secondary" onClick={toggle} style={styles.button}>
          Ticket{" "}
          <FontAwesomeIcon
            icon={ticket.resolved ? faCheckCircle : faInfoCircle}
            className={
              ticket.resolved ? "drag-icon drag-approved" : "drag-icon"
            }
          />
        </Button>
        <Container fluid className="stat-box" style={{ marginBottom: "10px" }}>
          <Collapse isOpen={isOpen}>
            <Row>
              <Col>
                <p style={{ fontWeight: "bold" }}>Estado</p>
                {ticket.resolved ? (
                  <Badge pill color="success">
                    Resuelto <FontAwesomeIcon icon={faCheckCircle} />
                  </Badge>
                ) : (
                  <Badge pill color="warning">
                    Pendiente
                  </Badge>
                )}
              </Col>
              <Col>
                <p style={{ fontWeight: "bold" }}>Creado el</p>
                {new Date(ticket.created_at).toLocaleDateString("es")}
              </Col>
              <Col>
                <p style={{ fontWeight: "bold" }}>Última modificación</p>
                {new Date(ticket.updated_at).toLocaleDateString("es")}
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>Historial</h2>
              </Col>
            </Row>
          </Collapse>
        </Container>
      </Col>
    </Row>
  );
};

const styles = {
  button: {
    textAlign: "left",
    width: "100%",
    fontWeight: "bold",
    marginBottom: "-1px",
  },
  card: {
    backgroundColor: "white",
    marginBottom: "10px",
  },
};

export default TicketRow;
