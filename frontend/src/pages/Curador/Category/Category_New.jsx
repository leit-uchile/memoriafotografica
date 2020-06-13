import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { gallery, metadata } from "../../../actions";
import {
  Button,
  Form,
  FormGroup,
  Row,
  Col,
  Input,
  Label,
  Container,
  Spinner,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { PhotoSelector, LeitSpinner, Pagination } from "../../../components";
import { Link } from "react-router-dom";
import ReactTags from "react-tag-autocomplete";

class Category_New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      title: "",
      page: 0,
      page_size: 10,
      creating: false,
      tags: [],
    };
    this.props.getPhotosAuth(this.state.page, this.state.page_size);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ creating: true });
    this.props.createCategory({
      pictures: this.state.pictures,
      title: this.state.title,
    });
  };

  // This is awfull
  handleSearch = (e) => {
    e.preventDefault();
    const {
      photo_title,
      description,
      uploaded_on,
      taken_on,
      tags,
    } = this.state;
    let url = "";
    if (photo_title && photo_title !== "") {
      url = url + `&title=${photo_title}`;
    }
    if (description && description !== "") {
      url = url + `&desc=${description}`;
    }
    if (uploaded_on && uploaded_on !== "") {
      url = url + `&uploaded=${uploaded_on}`;
    }
    if (taken_on && taken_on !== "") {
      url = url + `&taken=${taken_on}`;
    }
    if (tags.length !== 0) {
      url = url + `&metadata=${tags.map((el) => el.id).join(",")}`;
    }
    this.props.getPhotosAuth(this.state.page, this.state.page_size, url);
  };

  handleOnClick = (obj) => {
    const { id } = obj.photo;
    // If its there remove it
    const newList = this.state.pictures.filter((el) => el !== id);
    if (this.state.pictures.filter((el) => el === id).length !== 0) {
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

  deleteTag = (i) => {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags: [...tags] });
  };

  additionTag = (tag) => {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags: [...tags] });
  };

  handleInputChange = (query) => {
    if (query.length >= 2) {
      console.log("I should call the backend");
      this.props.recoverTags(query, 1, 10);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.newCat.id !== this.props.newCat.id ||
      prevProps.catError !== this.props.catError
    ) {
      this.setState({ creating: false });
      this.props.resetErrors();
    }
  }

  render() {
    var mapped = this.props.photos.map((el) => ({
      src: el.thumbnail,
      height: el.aspect_h,
      width: el.aspect_w,
      id: el.id,
    }));

    // BUGFIX: there's a border case like
    // pageLimit = floor(50/25) = 2 and gives pages (0,1,2)
    // but pageLimit should be 1 so we can have the pages (0,1)
    const maxPage =
      Math.floor(this.props.photo_count / this.state.page_size) ===
      this.props.photo_count / this.state.page_size
        ? Math.floor(this.props.photo_count / this.state.page_size) - 1
        : Math.floor(this.props.photo_count / this.state.page_size);

    return (
      <Container>
        <Row>
          <Col>
            <h2>
              <Link
                to="/curador/dashboard/categories"
                className="btn btn-secondary"
              >
                <FontAwesomeIcon icon={faChevronCircleLeft} />
              </Link>{" "}
              Crear Categoria
            </h2>
          </Col>
        </Row>
        <Row style={{ marginTop: "1em" }}>
          <Col md={4}>
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
                  name="title"
                />
              </FormGroup>
              {this.state.creating ? (
                <Button color="success" type="submit">
                  Creando <Spinner style={{ width: "1rem", height: "1rem" }} />
                </Button>
              ) : (
                <Button color="success" type="submit">
                  Crear
                </Button>
              )}
            </Form>
          </Col>
        </Row>
        <Row style={{ marginTop: "2em" }}>
          <Col>
            <h3>
              {this.state.pictures.length === 0 ? (
                "Seleccionar fotografías"
              ) : (
                <Fragment>
                  <b>{this.state.pictures.length}</b> Fotograf&iacute;as
                  seleccionadas
                </Fragment>
              )}
            </h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="metadata_category">Etiqueta</Label>
                    <ReactTags
                      style={{ width: "auto" }}
                      placeholder={"Contiene etiqueta..."}
                      autoresize={false}
                      allowNew={true}
                      tags={this.state.tags}
                      suggestions={this.props.tags.results.map((e) => ({
                        name: e.value,
                        id: e.id,
                      }))}
                      handleDelete={this.deleteTag}
                      handleAddition={this.additionTag}
                      handleInputChange={this.handleInputChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="title_category">Titulo</Label>
                    <Input
                      type="text"
                      placeholder="Titulo contiene..."
                      onChange={this.handleChange}
                      id="title_category"
                      name="photo_title"
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="description_category">Descripci&oacute;n</Label>
                    <Input
                      type="text"
                      placeholder="Descripcion contiene..."
                      onChange={this.handleChange}
                      id="description_category"
                      name="description"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="uploaded_on">Subida desde</Label>
                    <Input
                      type="date"
                      placeholder="Contiene etiqueta..."
                      onChange={this.handleChange}
                      id="uploaded_on"
                      name="uploaded_on"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="taken_on">Tomada desde</Label>
                    <Input
                      type="date"
                      placeholder="Titulo contiene..."
                      onChange={this.handleChange}
                      id="taken_on"
                      name="taken_on"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }}>
            {this.props.loading ? (
              <LeitSpinner />
            ) : (
              <Fragment>
                <Button color="primary" onClick={this.handleSearch}>
                  Buscar
                </Button>{" "}
                <PhotoSelector
                  useContainer={false}
                  photos={mapped}
                  targetRowHeight={200}
                  onClick={(e, index) => this.handleOnClick(index)}
                  putAll={(add) => this.selectAll(add)}
                />
              </Fragment>
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

const mapStateToProps = (state) => ({
  photos: state.photos.photos,
  photo_count: state.photos.count,
  loading: state.site_misc.curador.loading,
  newCat: state.categories.newCat,
  catError: state.categories.error,
  tags: state.metadata.general_tags,
});
const mapActionsToProps = (dispatch) => ({
  createCategory: (data) => dispatch(gallery.category.createCategory(data)),
  resetErrors: () => dispatch(gallery.category.resetErrors()),
  getPhotosAuth: (page, page_size, search = "") =>
    dispatch(gallery.photos.getPhotosAuth(page, page_size, search)),
  recoverTags: (query, page, pageSize) =>
    dispatch(metadata.searchMetadataByValueGeneral(query, page, pageSize)),
});

export default connect(mapStateToProps, mapActionsToProps)(Category_New);
