import React, { useState, Fragment, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { LeitSpinner } from "../../../components";
import { selectTicketStatus, selectTicketTickets } from "../../../reducers";
import { webadmin } from "../../../actions";
import Item from "../Metadata/DragNCategorize/Item";
import DropWrapper from "../Metadata/DragNCategorize/DropWrapper";
import HighLight from "../Metadata/DragNCategorize/HighlightWrapper";
import "../Metadata/styles.css";

const Tickets = ({ tickets, getTickets, putCurator, ticketsStatus }) => {
  // Item copies
  const [items, setItems] = useState([]);
  // Ready count
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    getTickets(10);
  }, [getTickets]);

  useEffect(() => {
    setItems(tickets.results);
    setDoneCount(0);
  }, [tickets]);

  // Drag & Drop Behavior methods
  const onDrop = (item, monitor, name, iptc_id) => {
    console.log("OnDrop", item);
    const itemCopy = { ...item, assigned: true };
    putCurator(itemCopy);
    // Only add if the original wasnt classfied already
    if (item.assigned === false) {
      setDoneCount(doneCount + 1);
    }
    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...itemCopy, name });
      return [...newItems];
    });
  };

  // Move Item
  const moveItem = (dragIndex, hoverIndex) => {
    console.log("MoveItems");
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>Clasificador de tareas</h2>
          <p>
            Escoga las tareas pendientes que desee arrastrándolas a la casilla
            de abajo. La tarea asignada estará disponible en su pestaña
            correspondiente para ser completada.
          </p>
        </Col>
      </Row>
      <Row>
        {ticketsStatus === "idle" ? (
          <span></span>
        ) : ticketsStatus === "loading" ? (
          <Col style={{ textAlign: "center" }}>
            <LeitSpinner />
          </Col>
        ) : ticketsStatus === "success" ? (
          tickets.count !== 0 ? (
            <Col className="metadata-classifier">
              <Fragment>
                <Row>
                  <Col key={"nochanges-photos"} md={3}>
                    <div className="col-wrapper no-category">
                      <h2 className={"col-header"}>
                        {"Fotos sin aprobar".toUpperCase()}{" "}
                        <span>(por vaciar)</span>
                      </h2>
                      <DropWrapper onDrop={onDrop} name={"Fotos sin aprobar"}>
                        <HighLight>
                          {items
                            .filter((i) => !i.assigned)
                            .map((i, idx) => (
                              <Item
                                key={i.id}
                                item={i}
                                index={idx}
                                moveItem={moveItem}
                                name={`Foto ${i.id}`}
                              />
                            ))}
                        </HighLight>
                      </DropWrapper>
                    </div>
                  </Col>
                  <Col key={"nochanges-reports"} md={3}>
                    <div className="col-wrapper no-category">
                      <h2 className={"col-header"}>
                        {"Reportes pendientes".toUpperCase()}{" "}
                        <span>(por vaciar)</span>
                      </h2>
                      <DropWrapper onDrop={onDrop} name={"Reportes pendientes"}>
                        <HighLight></HighLight>
                      </DropWrapper>
                    </div>
                  </Col>
                  <Col key={"nochanges-tags"} md={3}>
                    <div className="col-wrapper no-category">
                      <h2 className={"col-header"}>
                        {"Etiquetas sin aprobar".toUpperCase()}{" "}
                        <span>(por vaciar)</span>
                      </h2>
                      <DropWrapper
                        onDrop={onDrop}
                        name={"Etiquetas sin aprobar"}
                      >
                        <HighLight></HighLight>
                      </DropWrapper>
                    </div>
                  </Col>
                  <Col key={"nochanges-emails"} md={3}>
                    <div className="col-wrapper no-category">
                      <h2 className={"col-header"}>
                        {"Correos pendientes".toUpperCase()}{" "}
                        <span>(por vaciar)</span>
                      </h2>
                      <DropWrapper onDrop={onDrop} name={"Correos pendientes"}>
                        <HighLight></HighLight>
                      </DropWrapper>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="metadata-classifier">
                    <div key={"assigned"}>
                      <div className="col-wrapper">
                        <h2 className={"col-header"}>Seleccionadas</h2>
                        <DropWrapper onDrop={onDrop} name={"Seleccionadas"}>
                          <HighLight>
                            {items
                              .filter((i) => i.assigned)
                              .map((i, idx) => (
                                <Item
                                  key={i.id}
                                  item={i}
                                  index={idx}
                                  moveItem={moveItem}
                                  name={`Foto ${i.id}`}
                                />
                              ))}
                          </HighLight>
                        </DropWrapper>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Fragment>
            </Col>
          ) : (
            <p>No hay tickets disponibles</p>
          )
        ) : (
          <p>Ha ocurrido un error</p>
        )}
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  ticketsStatus: selectTicketStatus(state),
  tickets: selectTicketTickets(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      getTickets: webadmin.getTickets,
      putCurator: webadmin.putTicket,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(Tickets);
