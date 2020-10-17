import React, { Fragment, useState, useEffect } from "react";
import { Table, ButtonGroup, Row, Col, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import { webadmin } from "../../../../actions";
import { Pagination } from "../../../../components";
import ContactRow from "./ContactRow";
import ContactEmailModal from "./ContactEmailModal";
import ContactPhoneModal from "./ContactPhoneModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import { bindActionCreators } from "redux";
import {selectWebAdminMessages,
        selectWebAdminUpdateMessage} from "../../../../reducers"
import "../../styles.css";

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
  const [pagination, setPagination] = useState({ page: 0, page_size: 12 });

  useEffect(() => {
    if (active) {
      getMessages(
        searchState,
        pagination.page + 1,
        pagination.page_size,
        "&sort=updated_at-desc"
      );
    }
  }, [pagination, searchState, updatedMessage, active]);

  const setPage = (p) => {
    setPagination((pag) => ({ ...pag, page: p }));
  };

  const resolve = (msg, formData, bool) => {
    let msgUpdate = { ...msg };
    msgUpdate.resolved = true;
    msgUpdate.email_sent = bool;
    updateMessage(msgUpdate, formData);
  };

  const resolveButton = (msg) => (
    <ButtonGroup>
      <ContactEmailModal buttonLabel="Correo" message={msg} send={resolve} />
      <ContactPhoneModal buttonLabel="Teléfono" message={msg} send={resolve} />
    </ButtonGroup>
  );

  return (
    <Fragment>
      <Row>
        <Col>
          <h2>Mensajes Recibidos</h2>
        </Col>
      </Row>
      <Row>
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
              <option value="11">12 por p&aacute;gina</option>
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
            <Button
              type="button"
              color="primary"
              onClick={() => {}} //this.swapPage}
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row style={{ marginTop: "1em" }}>
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
              {messages.length !== 0
                ? messages.results.map((e) => (
                    <ContactRow message={e} actions={resolveButton} />
                  ))
                : null}
            </tbody>
          </Table>
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
        </Col>
      </Row>
    </Fragment>
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
