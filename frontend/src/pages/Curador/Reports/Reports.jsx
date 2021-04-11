import React, { useState, useEffect } from "react";
import { Container, Row, Col, Input, Button, ButtonGroup } from "reactstrap";
import { connect } from "react-redux";
import { gallery } from "../../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { LeitSpinner, Pagination } from "../../../components";
import { bindActionCreators } from "redux";
import ReportsTable from "./ReportsTable";
import FilterOptions from "../FilterOptions";
import { selectReportReport, selectReportUpdate } from "../../../reducers";
import HelpMessages from "../HelpMessages";

const messages = [
  {
    action: `Editar`,
    helpMessage: `Puede modificar el contenido que inflinge las normas. Tras guardar sus cambios el reporte quedará resuelto.`,
  },
  {
    action: `Censurar`,
    helpMessage: `Al censurar el contenido éste ya no será visible y el reporte quedará resuelto.`,
  },
  {
    action: `Descartar`,
    helpMessage: `El contenido no será modificado y el reporte quedará resuelto.`,
  },
];

const filters = [
  { display: "Reportes desde", type: "date", name: "createdSince" },
  { display: "Reportes hasta", type: "date", name: "createdUntil" },
  {
    display: "Tipo",
    type: "select",
    options: ["Usuario", "Foto", "Comentario"],
    name: "type",
  },
  {
    display: "Estado",
    type: "select",
    options: ["Resuelta", "Sin resolver"],
    name: "resolved",
  },
];
/**
 * Load reports and call actions to filter them.
 * Manage provided to the table.
 *
 * @param {Array} reports
 * @param {Function} getReports
 */
const Reports = ({ reports, getReports, updatedReport }) => {
  const [filter, setFilter] = useState({
    createdSince: "",
    createdUntil: "",
    type: "",
    resolved: "",
  });

  const [pagination, setPagination] = useState({
    page: 0,
    page_size: 12,
    loading: true,
  });

  useEffect(() => {
    setPagination((pag) => ({ ...pag, loading: true }));
    let url = "&sort=updated_at-desc";
    if (filter.createdSince && filter.createdSince !== "") {
      url = url + `&created_at=${filter.createdSince}`;
    }
    if (filter.createdUntil && filter.createdUntil !== "") {
      url = url + `&created_at_until=${filter.createdUntil}`;
    }
    if (filter.type && filter.type !== "") {
      url = url + `&type=${filter.type}`;
    }
    if (filter.resolved && filter.resolved !== "") {
      url = url + `&resolved=${filter.resolved}`;
    }
    getReports("", pagination.page + 1, pagination.page_size, url).then((r) => {
      setPagination((pag) => ({ ...pag, loading: false }));
    });
  }, [
    filter,
    pagination.page,
    pagination.page_size,
    getReports,
    updatedReport,
  ]);

  const setPage = (p) => {
    setPagination((pag) => ({ ...pag, page: p }));
  };

  return (
    <Container fluid>
      <h2>Reportes de contenido</h2>
      <Row style={{ marginBottom: "10px" }}>
        <Col sm={6}>
          <ButtonGroup>
            <Button id="help">¿Ayuda?</Button>
            <Button disabled>Filtrar</Button>
            <Button color="primary" id="filter">
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
      </Row>
      <Row>
        <Col>
          <HelpMessages id="#help" messages={messages} />
          <FilterOptions
            id="#filter"
            params={filters}
            setState={(name, value) => setFilter({ ...filter, [name]: value })}
          />
        </Col>
      </Row>
      <div>
        {!pagination.loading ? (
          reports.results.length !== 0 ? (
            <Row>
              <Col>
                <ReportsTable reports={reports} />
              </Col>
            </Row>
          ) : (
            "No hay reportes disponibles"
          )
        ) : (
          <Row>
            <Col style={{ textAlign: "center" }}>
              <LeitSpinner />
            </Col>
          </Row>
        )}
        {reports.count !== 0 ? (
          <Pagination
            count={reports.count}
            page_size={pagination.page_size}
            page={pagination.page}
            setStatePage={setPage}
            size="md"
            label="reports-pagination"
            displayFirst
            displayLast
          />
        ) : null}
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  reports: selectReportReport(state),
  updatedReport: selectReportUpdate(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      getReports: gallery.reports.getReportes,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(Reports);
