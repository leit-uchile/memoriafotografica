import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Col,
  Row,
  Container,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { gallery } from "../../../actions";
import { Pagination } from "../../../components";
import { CategoryTable } from "./CategoryTable";
import { ModifyModal } from "./ModifyModal";
import Collapse from "reactstrap/lib/Collapse";
import Form from "reactstrap/lib/Form";
import FormGroup from "reactstrap/lib/FormGroup";
import Label from "reactstrap/lib/Label";
import Spinner from "reactstrap/lib/Spinner";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDelete: [],
      page: 0,
      page_size: 10,
      isOpen: false,
      creating: false,
    };
    this.props.getCategories(
      this.state.page,
      this.state.page_size,
      "&sort=updated_at-desc"
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.refresh) {
      setTimeout(() => window.location.reload(), 1000);
    }
    if (
      prevProps.newCat.id !== this.props.newCat.id ||
      prevProps.catError !== this.props.catError
    ) {
      this.setState({ creating: false });
      this.props.resetErrors();
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ creating: true });
    this.props.createCategory({
      pictures: [],
      title: this.state.title,
    });
  };

  updateToDelete = (i, isCheck) => {
    // Send update to API
    if (isCheck) {
      this.setState({ toDelete: [...this.state.toDelete, i] });
    } else {
      this.setState({ toDelete: this.state.toDelete.filter((el) => el !== i) });
    }
  };

  removeCategories = () => {
    this.props.deleteCategories(this.state.toDelete);
  };

  setPage = (p) => {
    this.setState({ page: p });
    this.props.getCategories(p, this.state.page_size, "&sort=updated_at-desc");
  };

  doRedirect = (id) => {
    this.setState({ redirect: id });
  };

  render() {
    const { cats, total } = this.props;

    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={`/curador/dashboard/categories/${this.state.redirect}/add`}
        />
      );
    }

    return (
      <Container fluid>
        <h2>Administrar Categorías</h2>
        <Row>
          <Col xs="8">
            <ButtonGroup>
              <Button
                color="primary"
                onClick={() => this.setState({ isOpen: !this.state.isOpen })}
              >
                Crear categorias
              </Button>
              <ModifyModal
                toDelete={this.state.toDelete}
                loading={this.props.loading}
                removeCategories={this.removeCategories}
              />
              <select
                className="btn-secondary btn"
                onChange={(e) => {
                  this.setState({ page: 0, page_size: Number(e.target.value) });
                  this.props.getCategories(
                    0,
                    Number(e.target.value),
                    "&sort=updated_at-desc"
                  );
                }}
              >
                <option value="10">10 por p&aacute;gina</option>
                <option value="20">20 por p&aacute;gina</option>
                <option value="40">40 por p&aacute;gina</option>
              </select>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Collapse isOpen={this.state.isOpen}>
              <Card>
                <CardBody>
                  <Form onSubmit={this.handleSubmit} inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <Label for="catName" className="mr-sm-2">
                        Nombre
                      </Label>
                      <Input
                        onChange={this.handleChange}
                        id="catName"
                        type="text"
                        placeholder="Categoria Nueva"
                        name="title"
                        maxLength="30"
                      />
                    </FormGroup>
                    {this.state.creating ? (
                      <Button color="success" type="submit">
                        Creando{" "}
                        <Spinner style={{ width: "1rem", height: "1rem" }} />
                      </Button>
                    ) : (
                      <Button color="success" type="submit">
                        Crear
                      </Button>
                    )}
                  </Form>
                </CardBody>
              </Card>
            </Collapse>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <CategoryTable
              cats={cats}
              updateToDelete={this.updateToDelete}
              toDelete={this.state.toDelete}
              onAdd={this.doRedirect}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Pagination
              count={total}
              page_size={this.state.page_size}
              page={this.state.page}
              setStatePage={this.setPage}
              size="md"
              label="metadata-pagination"
              displayFirst
              displayLast
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  cats: state.categories.categories,
  total: state.categories.total,
  loading: state.site_misc.curador.loading,
  refresh: state.site_misc.curador.refresh,
  newCat: state.categories.newCat,
  catError: state.categories.error,
});
const mapActionsToProps = (dispatch) => ({
  getCategories: (page, pageSize, extra) =>
    dispatch(gallery.category.getCategories(page, pageSize, extra)),
  deleteCategories: (catArray) =>
    dispatch(gallery.category.deleteCategories(catArray)),
  createCategory: (data) => dispatch(gallery.category.createCategory(data)),
  resetErrors: () => dispatch(gallery.category.resetErrors()),
});

export default connect(mapStateToProps, mapActionsToProps)(Categories);
