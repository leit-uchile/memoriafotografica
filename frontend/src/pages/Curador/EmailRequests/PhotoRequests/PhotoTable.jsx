import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Row, Col, ButtonGroup, Button, Input } from "reactstrap";
import PhotoRow from "./PhotoRow";
import { webadmin } from "../../../../actions";
import { Pagination } from "../../../../components";
import PhotoRequesterModal from "./PhotoRequesterModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import "../../styles.css";

class PhotoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      page_size: 12,
    };
    this.props.getRequests(
      this.state.page + 1,
      this.state.page_size,
      "&sort=updated_at-desc"
    );
  }

  setPage = (p) => {
    this.setState({ page: p });
    this.props.getRequests(
      p + 1,
      this.state.page_size,
      "&sort=updated_at-desc"
    );
  };

  doRedirect = (id) => {
    this.props.getPhotos(id);
    this.setState({ redirect: id });
  };

  render() {
    const { requests } = this.props;

    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={`/curador/dashboard/email/photos/${this.state.redirect}/`}
        />
      );
    }

    return (
      <Fragment>
        <Row>
          <Col>
            <h2>Solicitudes Recibidas</h2>
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
                  this.setState(
                    { page: 0, page_size: Number(e.target.value) },
                    () => {
                      this.props.getRequests(
                        this.state.page + 1,
                        this.state.page_size,
                        "&sort=updated_at-desc"
                      );
                    }
                  )
                }
              >
                <option value="12">12 por p&aacute;gina</option>
                <option value="25">25 por p&aacute;gina</option>
                <option value="50">50 por p&aacute;gina</option>
              </Input>
            </ButtonGroup>
          </Col>
        </Row>
        <Row style={{ marginTop: "1em" }}>
          <Col>
            <Table responsive striped className="statBox">
              <thead>
                <tr>
                  <th>Estado</th>
                  <th>Detalles</th>
                  <th>Finalidad</th>
                  <th>Solicitado el</th>
                  <th>&Uacute;ltima actualizaci&oacute;n</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {requests.length !== 0
                  ? requests.results.map((r) => (
                      <PhotoRow
                        request={r}
                        key={r.id}
                        actions={this.doRedirect}
                        render={(info) => (
                          <Fragment>
                            <PhotoRequesterModal
                              buttonLabel="Ver datos solicitante"
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
                page_size={this.state.page_size}
                page={this.state.page}
                setStatePage={this.setPage}
                size="md"
                label="photos-pagination"
                displayFirst
                displayLast
              />
            )}
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  requests: state.webadmin.requests,
});

const mapActionsToProps = (dispatch) => ({
  getRequests: (page, pageSize, extra) =>
    dispatch(webadmin.getRequests(page, pageSize, extra)),
  getPhotos: (id) => dispatch(webadmin.getRequest(id)),
});

export default connect(mapStateToProps, mapActionsToProps)(PhotoTable);
