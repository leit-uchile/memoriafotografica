import React, { Component } from "react";
import { Row, Col, Button, Container, ButtonGroup } from "reactstrap";
import { connect } from "react-redux";
import { gallery } from "../../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThLarge,
  faThList,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { LeitSpinner, Pagination } from "../../../components";
import PhotoList from "./PhotoList";
import PhotoCards from "./PhotoCards";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listView: 1,
      page: 0,
      pageSize: 25,
    };
    this.props.getPhotosAuth();
  }

  /**
   * 0 for list
   * 1 for cards
   */
  swapView = (num) => {
    this.setState({ listView: num });
  };

  setCurrentPage = (number) => {
    console.log("Page set:", number);
    this.setState(
      {
        page: number,
      },
      () => this.props.getPhotosAuth(number, this.state.pageSize)
    );
  };

  render() {
    console.log(this.props.photos);
    const { photos, photoCount } = this.props;
    const { pageSize, page } = this.state;
    const pageLimit = Math.floor(photoCount / pageSize);
    return (
      <Container fluid>
        <h2>Filtrar Fotografías</h2>
        <Row style={{ marginBottom: "10px" }}>
          <Col xs="2">
            <ButtonGroup>
              <Button disabled>Filtrar</Button>
              <Button>
                <FontAwesomeIcon icon={faFilter} />
              </Button>
            </ButtonGroup>
          </Col>
          <Col xs="7"></Col>
          <Col xs="3">
            <ButtonGroup>
              <Button disabled>Ver como</Button>
              <Button
                outline={this.state.listView ? true : false}
                disabled={this.state.listView ? true : false}
                onClick={() => this.swapView(1)}
              >
                <FontAwesomeIcon icon={faThList} />
              </Button>
              <Button
                outline={this.state.listView ? false : true}
                disabled={this.state.listView ? false : true}
                onClick={() => this.swapView(0)}
              >
                <FontAwesomeIcon icon={faThLarge} />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          {this.props.loading ? (
            <Col style={{ textAlign: "center" }}>
              <LeitSpinner />
            </Col>
          ) : (
            <Col>
              {this.state.listView ? (
                <PhotoList photos={photos} editPhoto={this.props.editPhoto} />
              ) : (
                <PhotoCards photos={photos} editPhoto={this.props.editPhoto} />
              )}
            </Col>
          )}
        </Row>
        <Row style={{ marginTop: "2em" }}>
          <Col>
            <Pagination
              maxPage={pageLimit}
              page={this.state.page}
              setStatePage={this.setCurrentPage}
              size="lg"
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
    isAuthenticated: state.user.isAuthenticated,
    meta: state.webadmin.all_tags,
    photos: state.photos.photos,
    photoCount: state.photos.count,
    loading: state.site_misc.curador.loading,
    refresh: state.site_misc.curador.refresh,
  };
};
const mapActionsToProps = (dispatch) => ({
  getPhotosAuth: (pageNum, pageSize) =>
    dispatch(gallery.photos.getPhotosAuth(pageNum, pageSize)),
  editPhoto: (photoID, data) =>
    dispatch(gallery.photos.editPhoto(photoID, data)),
});

export default connect(mapStateToProps, mapActionsToProps)(Filter);
