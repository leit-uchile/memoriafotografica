import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Table, Row, Col, ButtonGroup, Button, Input } from "reactstrap";
import PhotoRow from "./PhotoRow";
import { webadmin } from "../../../../actions";
import { Pagination } from "../../../../components";
import PhotoRequesterModal from "./PhotoRequesterModal";
import FilterOptions from "../../FilterOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import { bindActionCreators } from "redux";
import { selectWebAdminRequests } from "../../../../reducers";
import "../../styles.css";

const filters = [
  { display: "Solicitadas desde", type: "date", name: "createdSince" },
  { display: "Solicitadas hasta", type: "date", name: "createdUntil" },
  {
    display: "Estado",
    type: "select",
    options: ["Resuelta", "Sin resolver"],
    name: "resolved",
  },
  {
    display: "Aprobación",
    type: "select",
    options: ["Aprobada", "Rechazada"],
    name: "approved",
  },
];

const PhotoTable = ({ requests, getRequests, getPhotosToApprove, active }) => {
  const [searchState, setSearchState] = useState("");
  const [filter, setFilter] = useState({
    createdSince: "",
    createdUntil: "",
    resolved: "",
    approved: "",
  });
  const [pagination, setPagination] = useState({ page: 0, page_size: 12 });
  const [params, setParams] = useState({
    redirect: false,
    id: "",
  });

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
      if (filter.approved.length !== 0) {
        url = url + `&approved=${filter.approved}`;
      }
      getRequests(searchState, pagination.page + 1, pagination.page_size, url);
    }
  }, [active, filter, searchState, pagination]);

  const setPage = (p) => {
    setPagination((pag) => ({ ...pag, page: p }));
  };

  const handleRedirect = (id) => {
    getPhotosToApprove(id); // is it necessary give timeout or useEffect ?
    setParams({
      ...params,
      redirect: true,
      id: id,
    });
  };

  return params.redirect ? (
    <Redirect push to={`/curador/dashboard/email/photos/${params.id}/`} />
  ) : (
    <Container fluid>
      <Row>
        <Col>
          <h2>Solicitudes Recibidas</h2>
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
      <Row>
        <Col>
          <Table responsive striped className="statBox">
            <thead>
              <tr>
                <th>Estado</th>
                <th>Solicitante</th>
                <th>Finalidad</th>
                <th>Solicitado el</th>
                <th>&Uacute;ltima actualizaci&oacute;n</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {requests.length !== 0
                ? requests.results.map((e, k) => (
                    <PhotoRow
                      request={e}
                      key={k}
                      actions={(id) => handleRedirect(id)}
                      render={(info) => (
                        <Fragment>
                          <PhotoRequesterModal
                            buttonLabel="Ver detalles"
                            request={info}
                          />
                        </Fragment>
                      )}
                    />
                  ))
                : null}
            </tbody>
          </Table>
          {requests.count === 0 ? (
            "No hay solicitudes disponibles"
          ) : (
            <Pagination
              count={requests.count}
              page_size={pagination.page_size}
              page={pagination.page}
              setStatePage={setPage}
              size="md"
              label="requests-pagination"
              displayFirst
              displayLast
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  requests: selectWebAdminRequests(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      getRequests: webadmin.getRequests,
      getPhotosToApprove: webadmin.getRequest,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(PhotoTable);
