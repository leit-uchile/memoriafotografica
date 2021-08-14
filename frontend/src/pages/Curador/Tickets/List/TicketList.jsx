import React, { useState, useEffect } from "react";
import { Container, Row, Col, Input, Button, ButtonGroup } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { LeitSpinner, Pagination } from "../../../../components";
import {
  selectTicketStatus,
  selectTicketTickets,
  selectUserData,
} from "../../../../reducers";
import { webadmin } from "../../../../actions";
import TicketTable from "./TicketTable";
import FilterOptions from "../../FilterOptions";

const filters = [
  { display: "Tareas desde", type: "date", name: "createdSince" },
  { display: "Tareas hasta", type: "date", name: "createdUntil" },
  {
    display: "Estado",
    type: "select",
    options: ["Resuelta", "Sin resolver"],
    name: "resolved",
  },
  {
    display: 'Ver sólo mis tareas',
    type: "check",
    name: "ticketsFor",
  },
];

const TicketList = ({ active, tickets, getTickets, ticketsStatus, user }) => {
  const [filter, setFilter] = useState({
    resolved: "",
    createdSince: "",
    createdUntil: "",
    ticketsFor: "",
  });
  const [pagination, setPagination] = useState({
    page: 0,
    page_size: 12,
  });

  const setPage = (p) => {
    setPagination((pag) => ({ ...pag, page: p }));
  };

  useEffect(() => {
    if (active) {
      let url = `&sort=created_at-desc`;
      if (filter.resolved !== "") {
        url = url + `&resolved=${filter.resolved}`;
      }
      if (filter.createdSince !== "") {
        url = url + `&created_at=${filter.createdSince}`;
      }
      if (filter.createdUntil !== "") {
        url = url + `&created_at_until=${filter.createdUntil}`;
      }
      if (filter.ticketsFor == true) {
        url = url + `&curator=${user.id}`;
      }
      getTickets(pagination.page + 1, pagination.page_size, url);
    }
  }, [active, filter, pagination.page, pagination.page_size, getTickets]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>Tareas</h2>
          <Row style={{ marginBottom: "10px" }}>
            <Col sm={6}>
              <ButtonGroup>
                <Button disabled>Filtrar</Button>
                <Button color="primary" id="filter">
                  <FontAwesomeIcon icon={faFilter} />
                </Button>
                <Input
                  type="select"
                  className="btn btn-secondary"
                  onChange={(e) =>
                    setPagination({
                      page: 0,
                      page_size: Number(e.target.value),
                    })
                  }
                >
                  <option value="12">12 por p&aacute;gina</option>
                  <option value="25">25 por p&aacute;gina</option>
                  <option value="50">50 por p&aacute;gina</option>
                </Input>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FilterOptions
                id="#filter"
                params={filters}
                setState={(name, value) =>
                  setFilter({ ...filter, [name]: value })
                }
              />
            </Col>
          </Row>
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
            <div style={{ width: "100%" }}>
              <Row>
                <Col>
                  <TicketTable tickets={tickets.results} />
                </Col>
              </Row>
              <Pagination
                count={tickets.count}
                page_size={pagination.page_size}
                page={pagination.page}
                setStatePage={setPage}
                size="md"
                label="tickets"
                displayFirst
                displayLast
              />
            </div>
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
  user: selectUserData(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      getTickets: webadmin.getTickets,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(TicketList);
