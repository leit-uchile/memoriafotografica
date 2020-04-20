import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "reactstrap";
import { connect } from "react-redux";
import { gallery } from "../../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { LeitSpinner } from "../../../components";
import ReportsTable from "./ReportsTable";

/**
 * Load reports and call actions to filter them.
 * Manage provided to the table.
 * 
 * @param {Boolean} loading
 * @param {Array} reports
 * @param {Function} getReports
 */
const Reports = ({ loading, reports, getReports, updatedReports }) => {

  const [state, setState] = useState({
    currentPage: 0,
    reportsPerPage: 6,
    pages: 0,
    sort: "desc",
    sortOption: "created_at",
    filterOption: "all", // one of all resolved not_resolved
  })

  useEffect(() => {
    getReports();
  }, [getReports, updatedReports]);

  return (
    <Container fluid>
      <h2>Reportes de contenido</h2>
      <Row>
        <Col md="2">
          <ButtonGroup>
            <Button disabled>Filtrar</Button>
            <Button>
              <FontAwesomeIcon icon={faFilter} />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? <LeitSpinner /> : <ReportsTable reports={reports} />}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = state => ({
  loading: state.site_misc.curador.loading,
  reports: state.reports.reports,
  updatedReports: state.reports.reportUpdate,
});

const mapActionsToProps = dispatch => ({
  getReports: () => dispatch(gallery.reports.getReportes())
});

export default connect(mapStateToProps, mapActionsToProps)(Reports);
