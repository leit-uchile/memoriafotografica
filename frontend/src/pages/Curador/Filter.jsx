import React, { Component } from "react";
import Photo from "../../components/Photo";
import {
  Row,
  Col,
  Button,
  Container,
  ButtonGroup,
  Pagination,
  PaginationItem,
  PaginationLink,
  Card,
  CardFooter,
  CardBody,
  Badge
} from "reactstrap";
import { connect } from "react-redux";
import { curador } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThLarge,
  faThList,
  faFilter
} from "@fortawesome/free-solid-svg-icons";
import LeitSpinner from "../../components/LeitSpinner";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listView: 1,
      currentPage: 0,
      pageSize: 6,
      pages: 0,
      list: []
    };
    this.getLatestElements = this.getLatestElements.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.updateElementState = this.updateElementState.bind(this);
    this.cardView = this.cardView.bind(this);
    this.listView = this.listView.bind(this);
    this.approvePhoto = this.approvePhoto.bind(this);
  }

  componentWillMount() {
    this.props.getPhotos().then(() => {
      console.log(this.props);
      let totalDocs = this.props.photos.length;
      let pages = Math.ceil(totalDocs / this.state.pageSize);
      this.setState({
        list: [...this.props.photos],
        pages: pages
      });
    });
    //Calculate pages:
  }

  getLatestElements() {
    console.log(this.props);
    let totalDocs = this.props.photos.length;
    let pages = Math.ceil(totalDocs / this.state.pageSize);
    this.setState({
      list: [...this.props.photos],
      pages: pages
    });
  }

  updateElementState() {
    // Send update to API
    // Update
    // remove
    this.removeElement();
    // getLatestElements
  }

  removeElement() {
    // Fake call to API
    const largo = this.state.list.length;
    var list = [...this.state.list.slice(1, largo)];
    console.log(list);
    this.setState({
      list: [...list]
    });
    //this.getLatestElements()
  }

  listView(e) {
    e.preventDefault();
    console.log("ahora quiero ver como lista");
    this.setState({ listView: 1 });
  }

  cardView(e) {
    e.preventDefault();
    console.log("ahora quiero ver como cartitas");
    this.setState({ listView: 0 });
  }

  setCurrentPage(e, p) {
    console.log(p);
    this.setState({
      currentPage: p
    });
  }

  approvePhoto(auth, pid, val) {
    this.props.switchPhotoApproval(auth, pid, val).then(() => {
      window.location.reload();
    });
  }
  render() {
    var latest = [];
    for (var i = 1; i < 6 && i < this.state.list.length; i++) {
      latest.push(
        <Photo
          key={this.state.list[i].id}
          name={this.state.list[i].name}
          url={this.state.list[i].url}
          tags={this.state.list[i].tags}
          state={this.state.list[i].state}
          width="150px"
          style={styles.latest}
        />
      );
    }
    latest = latest.slice(0, 3).map(el => el);

    let photolist = this.state.list.map(e => (
      <Card style={{ width: "100%", margin: "10px 0px" }}>
        <CardBody>
          <Row>
            <Col>
              <img alt={e.title} src={e.thumbnail} width="200px" />
            </Col>
            <Col xs="9">
              <h5>{e.name}</h5>
              <h6>
                Subida por{" "}
                <b>
                  {e.usuario
                    ? `${e.usuario.first_name} ${e.usuario.last_name}`
                    : "Juanito"}
                </b>{" "}
                el {new Date(e.created_at).toLocaleString()}
              </h6>
              <h5>
                Tags:{" "}
                {e.metadata.map(t => (
                  <Badge style={{ margin: "0px 2px" }}>#{t}</Badge>
                ))}
              </h5>
            </Col>
          </Row>
          {
            // <CardTitle>Special Title Treatment</CardTitle>
            // <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          }
        </CardBody>
        <CardFooter>
          <Col xs="2" style={{ display: "inline" }}>
            <a href="#">Editar Foto</a>
          </Col>
          <Col xs="8" style={{ display: "inline" }}>
            {e.approved ? (
              <div style={{ display: "inline" }}>
                Aprobada{" "}
                <Button
                  onClick={() =>
                    this.approvePhoto(this.props.token, e.id, e.approved)
                  }
                  color="danger"
                >
                  Quitar Aprobación
                </Button>
              </div>
            ) : (
              <div style={{ display: "inline" }}>
                No Aprobada{" "}
                <Button
                  onClick={() =>
                    this.approvePhoto(this.props.token, e.id, e.approved)
                  }
                  color="success"
                >
                  Aprobar
                </Button>
              </div>
            )}
          </Col>
        </CardFooter>
      </Card>
    ));

    let photocards = this.state.list.map(e => (
      <Card style={{ width: "45%", margin: "10px 10px" }}>
        <CardBody style={{ paddingTop: "0px" }}>
          <Row>
            <img
              alt={e.title}
              src={e.thumbnail}
              width="100%"
              style={{ borderRadius: "2.5px" }}
            />
          </Row>
          <Row>
            <h5>{e.name}</h5>
            <h5>
              Tags:{" "}
              {e.metadata.map(t => (
                <Badge style={{ margin: "0px 2px" }}>#{t}</Badge>
              ))}
            </h5>
          </Row>
        </CardBody>
        <CardFooter>
          <Col style={{ display: "inline" }}>
            <a href="#">Editar Foto</a>
          </Col>
          <Col style={{ display: "inline" }}>
            {e.approved ? (
              <div style={{ display: "inline" }}>
                Aprobada{" "}
                <Button
                  color="danger"
                  onClick={() =>
                    this.approvePhoto(this.props.token, e.id, e.approved)
                  }
                >
                  Quitar Aprobación
                </Button>
              </div>
            ) : (
              <div style={{ display: "inline" }}>
                No Aprobada{" "}
                <Button
                  color="success"
                  onClick={() =>
                    this.approvePhoto(this.props.token, e.id, e.approved)
                  }
                >
                  Aprobar
                </Button>
              </div>
            )}
          </Col>
        </CardFooter>
      </Card>
    ));
    let pageLowerBound = this.state.currentPage * this.state.pageSize;
    let pageUpperBound = Math.min(
      pageLowerBound + this.state.pageSize,
      this.state.list.length
    );
    let renderphotos = (this.state.listView ? photolist : photocards).slice(
      pageLowerBound,
      pageUpperBound
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
      <Container>
        <h2>Filtrar Fotografías</h2>
        <Row>
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
                onClick={this.listView}
              >
                <FontAwesomeIcon icon={faThList} />
              </Button>
              <Button
                outline={this.state.listView ? false : true}
                disabled={this.state.listView ? false : true}
                onClick={this.cardView}
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
            renderphotos
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
const styles = {
  latest: {
    width: "150px",
    marginBottom: "20px",
    boxShadow: "5px 5px 5px #3c4145"
  },
  actual: {
    height: "350px",
    textAlign: "center"
  }
};

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
    photos: state.curador.photos,
    loading: state.curador.loading,
    refresh: state.curador.refresh
  };
};
const mapActionsToProps = dispatch => ({
  getPhotos: () => dispatch(curador.getPhotos()),
  switchPhotoApproval: (auth, pID, val) =>
    dispatch(curador.switchPhotoApproval(auth, pID, val))
});

export default connect(mapStateToProps, mapActionsToProps)(Filter);
