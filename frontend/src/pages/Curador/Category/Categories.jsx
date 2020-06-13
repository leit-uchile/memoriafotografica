import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container, Button, ButtonGroup } from "reactstrap";
import { connect } from "react-redux";
import { gallery } from "../../../actions";
import { Pagination } from "../../../components";
import { CategoryTable } from "./CategoryTable";
import { ModifyModal } from "./ModifyModal";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDelete: [],
      page: 0,
      page_size: 10,
    };
    this.props.getCategories(this.state.page, this.state.page_size);
  }

  componentDidUpdate() {
    if (this.props.refresh) {
      setTimeout(() => window.location.reload(), 1000);
    }
  }

  updateToDelete = (i, isCheck) => {
    // Send update to API
    if (isCheck) {
      this.setState({ toDelete: [...this.state.toDelete, i] });
    } else {
      this.setState({ toDelete: this.state.toDelete.filter((el) => el !== i) });
    }
    // Update
  };

  removeCategories = () => {
    this.props.deleteCategories(this.state.toDelete);
  };

  setPage = (p) => {
    this.setState({ page: p });
    this.props.getCategories(p, this.state.page_size);
  };

  render() {
    const { match, cats, total } = this.props;

    // BUGFIX: there's a border case like
    // pageLimit = floor(50/25) = 2 and gives pages (0,1,2)
    // but pageLimit should be 1 so we can have the pages (0,1)
    const maxPage =
      Math.floor(total / this.state.page_size) === total / this.state.page_size
        ? Math.floor(total / this.state.page_size) - 1
        : Math.floor(total / this.state.page_size);

    return (
      <Container>
        <h2>Administrar Categorías</h2>
        <Row>
          <Col xs="8">
            <ButtonGroup>
              <Button tag={Link} to={match.url + "/new-category"}>
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
                  this.props.getCategories(0, Number(e.target.value));
                }}
              >
                <option value="10">10 por p&aacute;gina</option>
                <option value="20">20 por p&aacute;gina</option>
                <option value="40">40 por p&aacute;gina</option>
              </select>
            </ButtonGroup>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <CategoryTable
              cats={cats}
              updateToDelete={this.updateToDelete}
              toDelete={this.state.toDelete}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Pagination
              maxPage={maxPage}
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
});
const mapActionsToProps = (dispatch) => ({
  getCategories: (page, pageSize) =>
    dispatch(gallery.category.getCategories(page, pageSize)),
  deleteCategories: (catArray) =>
    dispatch(gallery.category.deleteCategories(catArray)),
});

export default connect(mapStateToProps, mapActionsToProps)(Categories);
