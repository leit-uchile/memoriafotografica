import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Container,
  ButtonGroup
} from "reactstrap";
import { connect } from "react-redux";
import { curador } from "../../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThLarge,
  faThList,
  faFilter
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
      pageSize: 18
    };
    this.props.getPhotos();
  };

  /**
   * 0 for list
   * 1 for cards
   */
  swapView = num => {
    this.setState({ listView: num });
  };

  setCurrentPage = number => {
    this.setState({
      page: number
    });
  };

  approvePhoto = (pid, val) => {
    this.props.switchPhotoApproval(pid, val).then(() => {
      window.location.reload();
    });
  };
  render() {
    const { photos } = this.props;
    const { pageSize, page } = this.state;
    const pageLimit = Math.floor(photos.length / pageSize);

    return (
      <Container fluid>
        <h2>Filtrar Fotografías</h2>
        <Row style={{ marginBottom: "10px" }}>
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
                  photos={photos.slice(page * pageSize, (page + 1) * pageSize)}
                  editPhoto={this.props.editPhoto}
                />
              ) : (
                <PhotoCards
                  photos={photos.slice(page * pageSize, (page + 1) * pageSize)}
                  editPhoto={this.props.switchPhotoApproval}
                />
              )}
            </Col>
          )}
        </Row>
        <Row style={{marginTop: "2em"}}>
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
  editPhoto: (photoID, data) => dispatch(curador.editPhoto(photoID, data))
});

export default connect(mapStateToProps, mapActionsToProps)(Filter);
