import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import PhotoRow from "./PhotoRow";
import { webadmin } from "../../../actions";
import PhotoUserModal from "./PhotoUserModal";

class PhotoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
    this.props.getRequests();
  }

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
      <Table responsive striped className="statBox">
        <thead>
          <tr>
            <th>Acciones</th>
            <th>Estado</th>
            <th>Solicitado el</th>
            <th>&Uacute;ltima actualizaci&oacute;n</th>
            <th>Finalidad</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <PhotoRow
              request={r}
              key={r.id}
              actions={this.doRedirect}
              render={(info) => (
                <Fragment>
                  <PhotoUserModal
                    buttonLabel="Ver datos solicitante"
                    request={info}
                  />
                </Fragment>
              )}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state) => ({
  requests: state.webadmin.requests,
});

const mapActionsToProps = (dispatch) => ({
  getRequests: () => dispatch(webadmin.getRequests()),
  getPhotos: (id) => dispatch(webadmin.getRequest(id)),
});

export default connect(mapStateToProps, mapActionsToProps)(PhotoTable);
