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
      this.state.activeIndex === (this.props.data.photos.length - 1) / 4
        ? 0
        : this.state.activeIndex + 4;
    this.setState({ entering: false }, () =>
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
    this.setState({ entering: false }, () =>
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
    const { user, auth } = this.props;

    this.props.setRoute("/userDashboard/");
    this.props.onLoadGetPhotos(auth, user.id, 15, 0);
    this.props.onLoadGetAlbums(auth, user.id, 15, 0);
    this.props.onLoadGetComments(auth, user.id, 10, 0);
  }
  allowMorePics() {
    this.setState({ maxPhotos: this.state.maxPhotos + 10 });
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
        <Row style={{ marginTop: "2em" }}>
          <Col md="4">
            <Card>
              <CardImg top width="100%"src={user.avatar} />
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
                  to="/user/edit">
                  {" "}
                  Editar mi perfil
                </Button>
              </CardBody>
            </Card>
          </Col>

          <Col md="8">
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
                              this.state.entering
                                ? "animated fadeIn"
                                : "animated fadeOut"
                            }
                            width="calc(25%-4px)"
                            width="160em"
                            height="130em"
                            style={{ display: "inline-block" }}
                            hspace="2em"
                            src={el.image}
                            margin="1em"
                            style={{ margin: "1em auto" }}
                          />
                        ))
                    )}
                  </Row>
                </Container>

                <ButtonGroup style={{ margin: "0 auto" }}>
                  <Button onClick={this.previous}>
                    {" "}
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />{" "}
                  </Button>
                  <Button onClick={this.all}> Ver Todas</Button>
                  <Button onClick={this.next}>
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
      commentList.map((el, index) => <p> {el.content} </p>)
    )}
  </div>
);

const mapStateToProps = state => {
  return {
    data: state.user,
    user: state.auth.user,
    auth: state.auth.token
  };
};

const mapActionsToProps = dispatch => {
  return {
    onLoadGetPhotos: (auth, user_id, limit, offset) => {
      return dispatch(user.getUserPhotos(auth, user_id, limit, offset));
    },
    onLoadGetAlbums: (auth, user_id, limit, offset) => {
      return dispatch(user.getUserAlbums(auth, user_id, limit, offset));
    },
    onLoadGetComments: (auth, user_id, limit, offset) => {
      return dispatch(user.getUserComments(auth, user_id, limit, offset));
    },
    setRoute: route => {
      return dispatch(misc.setCurrentRoute(route));
    }
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Dashboard);