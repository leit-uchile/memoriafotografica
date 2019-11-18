import React, { Component } from "react";
import Category_New from "./Category_New";
import { Link, Route } from "react-router-dom";
import {
  Col,
  Row,
  Container,
  Button,
  ButtonGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner
} from "reactstrap";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { auth, home, curador } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import Photo from "../../components/Photo";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDelete: [],
      deleteModal: false
    };
    this.props.getCategories();
  }

  componentWillUpdate() {
    if (this.props.refresh) {
      window.location.reload();
    }
  }

  updateToDelete = (i, isCheck) => {
    // Send update to API
    console.log("updated checkbox " + i);
    if (isCheck) {
      this.setState({ toDelete: [...this.state.toDelete, i] });
    } else {
      this.setState({ toDelete: this.state.toDelete.filter(el => el != i) });
    }
    // Update
  }

  removeCategories = () => {
    this.props.deleteCategories(this.props.token, this.state.toDelete);
  }

  toggleRemoveConfirmation = () => {
    this.setState({ deleteModal: !this.state.deleteModal });
  }

  render() {
    const { match, cats } = this.props;

    // Put 3 per row
    var latest = cats.map(el => <tr>
      <th>
        <input
          type="checkbox"
          aria-label="Checkbox for delete Categories"
          onClick={e =>
            this.updateToDelete(el.id, e.target.checked)
          }
          checked={this.state.toDelete.includes(
            el.id
          )}></input>
      </th>
      <th>{el.title}</th>
      <td>{new Date(el.created_at).toLocaleString()}</td>
      <td>{new Date(el.updated_at).toLocaleString()}</td>
      <td>{el.count}</td>
      <td>
        <Button>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </td>
    </tr>);
    
    if (latest.length < 1) {
      latest = <span>No existen categorias</span>;
    }
    return (
      <Container>
        <h2>Administrar Categorías</h2>
        <Row>
          <Col xs="12">
            <ButtonGroup>
              <Button tag={Link} to={match.url + "/new-category"}>
                Crear categorias
              </Button>
              <Button
                onClick={this.toggleRemoveConfirmation}
                color={this.state.toDelete.length ? "danger" : "secondary"}
                disabled={!this.state.toDelete.length}>
                Eliminar ({this.state.toDelete.length}) Categorías
              </Button>
              <Modal
                isOpen={this.state.deleteModal}
                toggle={this.toggleRemoveConfirmation}>
                <ModalHeader>
                  ¿Est&aacute;s seguro(a) que quieres eliminar la(s)
                  categoría(s)?
                </ModalHeader>
                <ModalBody>
                  No se eliminar&aacute;n las fotos asociadas, sólo la
                  categoría. Esta acción no se puede deshacer.
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={this.removeCategories}>
                    {" "}
                    Eliminar{" "}
                    <Spinner
                      size="sm"
                      color="light"
                      style={{
                        display: this.props.loading ? "inline-block" : "none"
                      }}
                    />{" "}
                  </Button>
                  <Button onClick={this.toggleRemoveConfirmation}>
                    Volver
                  </Button>
                </ModalFooter>
              </Modal>
            </ButtonGroup>
          </Col>
        </Row>
        <br />
        <Table>
          <thead>
            <th></th>
            <th>Nombre</th>
            <th>Fecha Creación</th>
            <th>Fecha Actualización</th>
            <th># Fotos</th>
            <th>Editar</th>
          </thead>
          <tbody>{latest}</tbody>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return { field, message: state.auth.errors[field] };
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    meta: state.home.all_tags,
    cats: state.curador.categories,
    loading: state.curador.loading,
    refresh: state.curador.refresh
  };
};
const mapActionsToProps = dispatch => {
  return {
    getCategories: route => {
      return dispatch(curador.getCategories(route));
    },
    deleteCategories: (auth, catArray) => {
      return dispatch(curador.deleteCategories(auth, catArray));
    }
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Categories);
