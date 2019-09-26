import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardImg,
  ButtonGroup,
  CardText,
  CardBody
} from "reactstrap";
import Photo from "../../components/Photo";
import Comment from "../PhotoView/Comment";
import EditPhotos from "./EditPhotos";
import { connect } from "react-redux";
import { user, misc } from "../../actions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faArrowAltCircleLeft
} from "@fortawesome/free-solid-svg-icons";
import { userRolTranslation, userTypeTranslation } from "./utils";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      entering: true,
      toRight: true,
      selectedAlbs: [],
      selectedComs: [],
      maxAllowedAlbums: 4,
      maxAllowedComments: 5
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.allowMorePics = this.allowMorePics.bind(this);
  }

  toggleAlbs() {
    this.setState({
      albsOpen: !this.state.albsOpen
    });
  }
  handleOnClick = url => {
    this.setState({ redirect: true, link: url });
  };
  toggleComments() {
    this.setState({
      comOpen: !this.state.comOpen
    });
  }
  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex + 4 >= this.props.data.photos.length - 1
        ? this.state.activeIndex
        : this.state.activeIndex + 4;
    this.setState({ entering: false, toRight: true }, () =>
      setTimeout(
        function() {
          this.setState({ activeIndex: nextIndex, entering: true });
        }.bind(this),
        1000
      )
    );
    //this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const prevIndex =
      this.state.activeIndex <= 0 ? 0 : this.state.activeIndex - 4;
    this.setState({ entering: false, toRight: false }, () =>
      setTimeout(
        function() {
          this.setState({ activeIndex: prevIndex, entering: true });
        }.bind(this),
        1000
      )
    );
    //this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  componentWillMount() {
    const { user } = this.props;

    this.props.setRoute("/userDashboard/");
    this.props.onLoadGetPhotos(user.id, 15, 0);
    this.props.onLoadGetAlbums(user.id, 15, 0);
    this.props.onLoadGetComments(user.id, 10, 0);
  }
  allowMorePics() {
    this.setState({ maxPhotos: this.state.maxPhotos + 10 });
  }

  componentDidMount() {
    const { user } = this.props;
    if (user.avatar === null) {
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(0, 0, 200, 200);
      ctx.font = "100px Arial";
      ctx.fillStyle = "#FFF";
      ctx.fillText(
        user.first_name.slice(0, 1) + user.last_name.slice(0, 1),
        30,
        130
      );
    }
  }

  render() {
    const { albums, comments, photos } = this.props.data;
    const { user } = this.props;

    var isSelected = (id, array) => {
      return array ? array.filter(el => el === id).length !== 0 : false;
    };
    var currentAlbs = albums
      ? albums.slice(0, this.state.maxAllowedAlbums).map(el => {
          return {
            ...el,
            selected: isSelected(el.id, this.state.selectedAlbs)
          };
        })
      : [];
    var currentComments = comments
      ? comments.slice(0, this.state.maxAllowedComments).map(el => {
          return {
            ...el,
            selected: isSelected(el.id, this.state.selectedComs)
          };
        })
      : [];
    return (
      <Container>
        {/* <EditPhotos isOpen={true} photos={photos} onClick={this.next}/> */}
        <Row style={{ marginTop: "2em" }}>
          <Col style={{ color: "#ff5a60", textAlign: "center" }}>
            <h2>Mi perfil</h2>
          </Col>
        </Row>
        <Row style={{ marginTop: "2em" }}>
          <Col md="3">
            <Card>
              {user.avatar === null ? (
                <canvas id="myCanvas" height="200px" width="200px" />
              ) : (
                <CardImg top width="100%" src={user.avatar} />
              )}
              <CardBody
                style={{ backgroundColor: "#ebeeef", textAlign: "center" }}>
                <CardText>{`${user.first_name} ${user.last_name}`}</CardText>
                <CardText>{user.email}</CardText>
                <CardText>{userTypeTranslation(user.user_type)}</CardText>
                <CardText>{userRolTranslation(user.rol_type)}</CardText>
                <Button
                  style={{ margin: "0 auto" }}
                  color="secondary"
                  tag={Link}
                  to="/user/editProfile">
                  {" "}
                  Editar mi perfil
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col md="9">
            <Container fluid>
              <Row>
                <h2 style={{ fontSize: "20px" }}> Mis Fotos </h2>
                <Container fluid>
                  <Row
                    style={{ margin: "1em auto" }}
                    xs="9"
                    className="text-center"
                    align="center">
                    {photos.length == 0 ? (
                      <h5> No has subido fotos </h5>
                    ) : (
                      photos
                        .slice(
                          this.state.activeIndex,
                          4 + this.state.activeIndex
                        )
                        .map(el => (
                          <img
                            className={
                              this.state.toRight
                                ? this.state.entering
                                  ? "animated slideInRight"
                                  : "animated slideOutLeft"
                                : this.state.entering
                                ? "animated slideInLeft"
                                : "animated slideOutRight"
                            }
                            width="calc(25%-4px)"
                            width="160em"
                            height="130em"
                            style={{
                              display: "inline-block",
                              margin: "1em auto"
                            }}
                            hspace="2em"
                            src={el.image}
                            key={el.id}
                          />
                        ))
                    )}
                  </Row>
                </Container>

                <ButtonGroup style={{ margin: "0 auto" }}>
                  <Button
                    disabled={this.state.activeIndex <= 0 ? true : false}
                    onClick={this.previous}>
                    {" "}
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />{" "}
                  </Button>
                  <Button onClick={this.all}> Ver Todas</Button>
                  <Button
                    disabled={
                      this.state.activeIndex + 4 >=
                      this.props.data.photos.length - 1
                        ? true
                        : false
                    }
                    onClick={this.next}>
                    {" "}
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />{" "}
                  </Button>
                </ButtonGroup>
              </Row>
              <Row>
                <h2 style={{ fontSize: "20px" }}> Mis Albumes </h2>
                <Container fluid>
                  <Albums albumList={currentAlbs} />
                </Container>
                <Button style={{ margin: "1em auto" }} onClick={this.all}>
                  {" "}
                  Ver Todos
                </Button>
              </Row>
              <Row>
                <h2 style={{ fontSize: "20px" }}> Mis Comentarios </h2>
                <Container fluid>
                  <Comments commentList={currentComments} />
                </Container>
                <Button style={{ margin: "1em auto" }} onClick={this.all}>
                  {" "}
                  Ver Todos
                </Button>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

const Albums = ({ albumList, onClick }) => (
  <div style={{ margin: "1em auto" }}>
    {albumList.length == 0 ? (
      <h5> No has subido albumes</h5>
    ) : (
      albumList.map((el, index) => (
        <Card>
          <Photo
            name={el.title}
            url={el.thumbnail}
            height="150px"
            useLink
            redirectUrl={`/albums/${el.di}`}
          />
        </Card>
      ))
    )}
  </div>
);

const Comments = ({ commentList, onClick }) => (
  <div style={{ margin: "1em auto" }}>
    {commentList.length == 0 ? (
      <h5> No has publicado comentarios </h5>
    ) : (
      commentList.map((el, index) => <p key={el.id}> {el.content} </p>)
    )}
  </div>
);

const mapStateToProps = state => ({
  data: {
    photos: state.user.photos,
    comments: state.user.comments,
    albums: state.user.albums
  },
  user: state.user.userData
});

const mapActionsToProps = dispatch => ({
  onLoadGetPhotos: (user_id, limit, offset) =>
    dispatch(user.getUserPhotos(user_id, limit, offset)),
  onLoadGetAlbums: (user_id, limit, offset) =>
    dispatch(user.getUserAlbums(user_id, limit, offset)),
  onLoadGetComments: (user_id, limit, offset) =>
    dispatch(user.getUserComments(user_id, limit, offset)),
  setRoute: route => dispatch(misc.setCurrentRoute(route))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Dashboard);
