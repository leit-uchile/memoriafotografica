import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { gallery } from "../../../actions";
import {
  Button,
  Form,
  FormGroup,
  Row,
  Col,
  Input,
  Label,
  Container,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faChevronCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
//import Category_Photos from './Category_Photos'
import { PhotoSelector, LeitSpinner, Pagination } from "../../../components";
import { Link } from "react-router-dom";

class Category_New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      title: "",
      page: 0,
      page_size: 10,
    };
    this.props.getPhotosAuth(this.state.page, this.state.page_size);
  }

  handleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createCategory(this.state);
  };

  handleOnClick = (obj) => {
    const { id } = obj.photo;
    // If its there remove it
    const newList = this.state.pictures.filter((el) => el !== id);
    if (this.state.pictures.filter((el) => el === id).length != 0) {
      this.setState({ pictures: [...newList] });
    } else {
      this.setState({ pictures: [...newList, id] });
    }
  };

  selectAll = (add) => {
    if (add) {
      let filter = this.state.pictures.filter((el) => {
        for (let index = 0; index < this.props.photos.length; index++) {
          if (this.props.photos[index].id === el) {
            return false;
          }
        }
        return true;
      });
      let mappedIds = this.props.photos.map((el) => el.id);
      this.setState({ pictures: [...filter, ...mappedIds] });
    } else {
      let filter = this.state.pictures.filter((el) => {
        for (let index = 0; index < this.props.photos.length; index++) {
          if (this.props.photos[index].id === el) {
            return false;
          }
        }
        return true;
      });
      this.setState({ pictures: [...filter] });
    }
  };

  setPage = (p) => {
    this.setState({ page: p });
    this.props.getPhotosAuth(p, this.state.page_size);
  };

  filterPhotos = (e) => {
    console.log(e.currentTarget.value);
  };

  render() {
    var mapped = this.props.photos.map((el) => ({
      src: el.thumbnail,
      height: el.aspect_h,
      width: el.aspect_w,
      id: el.id,
    }));

    const maxPage = Math.floor(this.props.photo_count / this.state.page_size);

    return (
      <Container>
        <Row>
          <Col>
            <h2>Crear Categoria</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link
              push
              to="/curador/dashboard/categories"
              className="btn btn-secondary"
            >
              <FontAwesomeIcon icon={faChevronCircleLeft} /> Atras
            </Link>
          </Col>
        </Row>
        <Row style={{ marginTop: "1em" }}>
          <Col>
            <h3>Datos</h3>
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
                  name="categoryName"
                />
              </FormGroup>
              <Button color="success" type="submit">
                Crear <FontAwesomeIcon icon={faCheckCircle} />
              </Button>
            </Form>
          </Col>
        </Row>
        <Row style={{ marginTop: "2em" }}>
          <Col sm={6}>
            <h3>
              {this.state.pictures.length == 0 ? (
                "Seleccionar fotografías"
              ) : (
                <Fragment>
                  <b>{this.state.pictures.length}</b> Fotograf&iacute;as
                  seleccionadas
                </Fragment>
              )}
            </h3>
          </Col>
          <Col sm={6}>
            <Input
              type="text"
              placeholder="Buscar fotos por etiquetas"
              onChange={(e) => this.filterPhotos(e)}
            />
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }}>
            {this.props.loading ? (
              <LeitSpinner />
            ) : (
              <PhotoSelector
                photos={mapped}
                targetRowHeight={200}
                onClick={(e, index) => this.handleOnClick(index)}
                putAll={(add) => this.selectAll(add)}
              />
            )}
          </Col>
        </Row>
        <Row style={{ marginTop: "1em" }}>
          <Col>
            <Pagination
              maxPage={maxPage}
              page={this.state.page}
              setStatePage={this.setPage}
              size="lg"
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

const mapStateToProps = (state) => {
  let errors = [];
  if (state.user.errors) {
    errors = Object.keys(state.user.errors).map((field) => {
      return { field, message: state.user.errors[field] };
    });
  }
  return {
    errors,
    meta: state.webadmin.all_tags,
    photos: state.photos.photos,
    photo_count: state.photos.count,
    loading: state.site_misc.curador.loading,
  };
};
const mapActionsToProps = (dispatch) => ({
  createCategory: (data) => dispatch(gallery.category.createCategory(data)),
  getPhotosAuth: (page, page_size) =>
    dispatch(gallery.photos.getPhotosAuth(page, page_size)),
});

export default connect(mapStateToProps, mapActionsToProps)(Category_New);
