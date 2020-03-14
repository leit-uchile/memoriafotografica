import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Container,
  ButtonGroup,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import { connect } from "react-redux";
import { curador } from "../../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThLarge,
  faThList,
  faFilter
} from "@fortawesome/free-solid-svg-icons";
import { LeitSpinner } from "../../../components";
import PhotoList from "./PhotoList";
import PhotoCards from "./PhotoCards";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listView: 1,
      currentPage: 0,
      pageSize: 25,
      pages: 0,
      list: []
    };
    //Computes pages:
    this.props.getPhotos().then(() => {
      let totalDocs = this.props.photos.count;
      console.log(this.props)
      let pages = Math.ceil(totalDocs / this.state.pageSize);
      this.setState({
        list: [...this.props.photos.results],
        pages: pages
      });
    });
  }

  updateElementState = () => {
    // Send update to API
    // Update
    // remove
    this.removeElement();
    // getLatestElements
  };

  removeElement = () => {
    // Fake call to API
    const largo = this.state.list.length;
    var list = [...this.state.list.slice(1, largo)];
    console.log(list);
    this.setState({
      list: [...list]
    });
  };

  /**
   * 0 for list
   * 1 for cards
   */
  swapView = num => {
    this.setState({ listView: num });
  };

  setCurrentPage = (e, p) => {
    this.setState({
      currentPage: p
    });
  };

  approvePhoto = (pid, val) => {
    this.props.switchPhotoApproval(pid, val).then(() => {
      window.location.reload();
    });
  };
  render() {
    let pageLowerBound = this.state.currentPage * this.state.pageSize;
    let pageUpperBound = Math.min(
      pageLowerBound + this.state.pageSize,
      this.state.list.length
    );

    let paginators = Array.from(Array(this.state.pages)).map(
      (arg, index) => index
    );
    paginators = paginators.map(ind => (
      <PaginationItem active={ind === this.state.currentPage ? true : false}>
        <PaginationLink onClick={e => this.setCurrentPage(e, ind)}>
          {ind + 1}
        </PaginationLink>
      </PaginationItem>
    ));
    return (
      <Container fluid>
        <h2>Filtrar Fotografías</h2>
        <Row style={{marginBottom:"10px"}}>
          <Col xs="2">
            {/* <ButtonGroup>
              <Button disabled>Filtrar</Button>
              <Button>
                <FontAwesomeIcon icon={faFilter} />
              </Button>
            </ButtonGroup> */}
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
                <PhotoList
                  photos={this.state.list.slice(pageLowerBound, pageUpperBound)}
                  editPhoto={this.props.editPhoto}
                />
              ) : (
                <PhotoCards
                  photos={this.state.list.slice(pageLowerBound, pageUpperBound)}
                  editPhoto={this.props.switchPhotoApproval}
                />
              )}
            </Col>
          )}
        </Row>
        <Row>
          <Pagination aria-label="Page navigation example">
            <PaginationItem disabled>
              <PaginationLink first href="#" />
            </PaginationItem>
            <PaginationItem disabled>
              <PaginationLink previous href="#" />
            </PaginationItem>
            {paginators}
            <PaginationItem>
              <PaginationLink next href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink last href="#" />
            </PaginationItem>
          </Pagination>
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
    meta: state.home.all_tags,
    photos: state.curador.photos,
    loading: state.curador.loading,
    refresh: state.curador.refresh
  };
};
const mapActionsToProps = dispatch => ({
  getPhotos: () => dispatch(curador.getPhotos()),
  editPhoto: (photoID, data) => dispatch(curador.editPhoto(photoID, data)),
});

export default connect(mapStateToProps, mapActionsToProps)(Filter);
