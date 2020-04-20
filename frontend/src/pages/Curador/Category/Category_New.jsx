import React, { Component } from "react";
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
  Container
} from "reactstrap";
//import Category_Photos from './Category_Photos'
import {PhotoSelector, LeitSpinner} from "../../../components";

class Category_New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      title: ""
    };
    if (this.props.photos.length === 0) {
      this.props.getPhotosAuth();
    }
  }

  handleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createCategory(this.state);
  };

  handleOnClick = obj => {
    const { id } = obj.photo;
    const newList = this.state.pictures.filter(el => el !== id);
    this.setState({ pictures: [...newList, id] });
  };

  render() {
    var mapped = this.props.photos.map(el => ({
      src: el.thumbnail,
      height: el.aspect_h,
      width: el.aspect_w,
      id: el.id
    }));

    return (
      <Container>
        <Row>
          <Col>
            <h2>Crear Categoria</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="catName">Nombre</Label>
                <Input
                  onChange={this.handleChange}
                  id="catName"
                  type="text"
                  placeholder="Categoria Nueva"
                  name="categoryName"
                ></Input>
              </FormGroup>
              <Button color="success" type="submit">
                Crear
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col style={{ marginTop: "2em" }}>
            <h3>Seleccionar fotografias</h3>
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
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.user.errors) {
    errors = Object.keys(state.user.errors).map(field => {
      return { field, message: state.user.errors[field] };
    });
  }
  return {
    errors,
    isAuthenticated: state.user.isAuthenticated,
    token: state.user.token,
    meta: state.webadmin.all_tags,
    cats: state.categories.categories,
    photos: state.photos.photos,
    loading: state.site_misc.curador.loading
  };
};
const mapActionsToProps = dispatch => ({
  createCategory: data => dispatch(gallery.category.createCategory(data)),
  getPhotosAuth: () => dispatch(gallery.photos.getPhotosAuth())
});

export default connect(mapStateToProps, mapActionsToProps)(Category_New);
