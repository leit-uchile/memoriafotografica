import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  ButtonGroup,
  Row,
  Col,
  Input,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { webadmin } from "../../../../actions";
import { LeitSpinner, Pagination } from "../../../../components";
import ContactRow from "./ContactRow";
import ContactEmailModal from "./ContactEmailModal";
import ContactPhoneModal from "./ContactPhoneModal";
import FilterOptions from "../../FilterOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import { bindActionCreators } from "redux";
import {
  selectWebAdminMessages,
  selectWebAdminUpdateMessage,
} from "../../../../reducers";
import "../../styles.css";

const filters = [
  { display: "Recibidos desde", type: "date", name: "createdSince" },
  { display: "Recibidos hasta", type: "date", name: "createdUntil" },
  {
    display: "Estado",
    type: "select",
    options: ["Respondido", "Sin responder"],
    name: "resolved",
  },
  {
    display: "Respondido por",
    type: "select",
    options: ["Correo", "Telefono"],
    name: "emailSent",
  },
];

/**
 * Define different Renders and updates for.
 *
 * @param {Array} messages
 * @param {Function} updateMessage
 */
const ContactTable = ({
  messages,
  getMessages,
  updateMessage,
  updatedMessage,
  active,
}) => {
  const [searchState, setSearchState] = useState("");
  const [filter, setFilter] = useState({
    createdSince: "",
    createdUntil: "",
    resolved: "",
    emailSent: "",
  });
  const [pagination, setPagination] = useState({ page: 0, page_size: 12 });

  useEffect(() => {
    let url = "&sort=updated_at-desc";
    if (active) {
      if (filter.createdSince && filter.createdSince !== "") {
        url = url + `&created_at=${filter.createdSince}`;
      }
      if (filter.createdUntil && filter.createdUntil !== "") {
        url = url + `&created_at_until=${filter.createdUntil}`;
      }
      if (filter.resolved && filter.resolved !== "") {
        url = url + `&resolved=${filter.resolved}`;
      }
      if (filter.emailSent.length !== 0) {
        url = url + `&resolved=${true}&email_sent=${filter.emailSent}`;
      }
      getMessages(searchState, pagination.page + 1, pagination.page_size, url);
    }
  }, [active, filter, searchState, pagination, updatedMessage, getMessages]);

  const setPage = (p) => {
    setPagination((pag) => ({ ...pag, page: p }));
  };

  const resolveButton = (msg) => (
    <ButtonGroup>
      <ContactEmailModal
        buttonLabel="Correo"
        message={msg}
        send={updateMessage}
      />
      <ContactPhoneModal
        buttonLabel="Teléfono"
        message={msg}
        send={updateMessage}
      />
    </ButtonGroup>
  );

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>Mensajes Recibidos</h2>
        </Col>
      </Row>
      <Row style={{ marginBottom: "10px" }}>
        <Col sm={6}>
          <ButtonGroup>
            <Button disabled>Filtrar</Button>
            <Button color="primary" id="toggler">
              <FontAwesomeIcon icon={faFilter} />
            </Button>
            <Input
              type="select"
              className="btn btn-secondary"
              onChange={(e) =>
                setPagination({ page: 0, page_size: Number(e.target.value) })
              }
            >
              <option value="12">12 por p&aacute;gina</option>
              <option value="25">25 por p&aacute;gina</option>
              <option value="50">50 por p&aacute;gina</option>
            </Input>
          </ButtonGroup>
        </Col>
        <Col sm={6}>
          <ButtonGroup className="mr-auto">
            <Input
              type="text"
              name="search-curador"
              placeholder="Filtrar por nombre"
              value={searchState}
              onChange={(e) => {
                setPagination((p) => ({ ...p, page: 0 }));
                setSearchState(e.target.value);
              }}
            />
            <Button color="primary">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FilterOptions
            id="#toggler"
            params={filters}
            setState={(name, value) => setFilter({ ...filter, [name]: value })}
          />
        </Col>
      </Row>
      <div>
        {messages.results ? (
          messages.results.length !== 0 ? (
            <Row>
              <Col>
                <Table responsive striped className="statBox">
                  <thead>
                    <tr>
                      <th>Estado</th>
                      <th>Nombre</th>
                      <th>Mensaje</th>
                      <th>Respuesta</th>
                      <th>Recibido el</th>
                      <th>Respondido el</th>
                      <th>Responder por</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.results.map((e) => (
                      <ContactRow message={e} actions={resolveButton} />
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          ) : null
        ) : (
          <Row>
            <Col style={{ textAlign: "center" }}>
              <LeitSpinner />
            </Col>
          </Row>
        )}
        {messages.count === 0 ? (
          "No hay mensajes disponibles"
        ) : (
          <Pagination
            count={messages.count}
            page_size={pagination.page_size}
            page={pagination.page}
            setStatePage={setPage}
            size="md"
            label="messages-pagination"
            displayFirst
            displayLast
          />
        )}
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  messages: selectWebAdminMessages(state),
  updatedMessage: selectWebAdminUpdateMessage(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      getMessages: webadmin.getMessages,
      updateMessage: webadmin.updateMessage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(ContactTable);
