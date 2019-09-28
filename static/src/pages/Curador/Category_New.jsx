import React, { Component } from "react";
import { connect } from "react-redux";
import { auth, home, curador } from "../../actions";
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
import PhotoSelector from "../../components/PhotoSelector";
import LeitSpinner from "../../components/LeitSpinner";

class Category_New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      title: ""
    };
    if (this.props.photos.length === 0) {
      this.props.getPhotos();
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
    const {id} = obj.photo;
    const newList = this.state.pictures.filter(el => el !== id);
    this.setState({pictures: [...newList, id]});
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
                  name="categoryName"></Input>
              </FormGroup>
              <Button color="success" type="submit">
                Crear
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col style={{marginTop: "2em"}}>
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
    photos: state.curador.photos,
    loading: state.curador.loading
  };
};
const mapActionsToProps = dispatch => ({
  createCategory: data => dispatch(curador.createCategory(data)),
  getPhotos: () => dispatch(curador.getPhotos())
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Category_New);
