import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Photo from "../../components/Photo";
import { connect } from "react-redux";
import { user } from "../../actions";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faCameraRetro,
  faAddressCard,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import "./landing.css";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: "",
      isPublic: props.publicUser ? true : false,
      user: props.publicUser ? props.publicUser : props.user,
    };

    if (this.state.isPublic) {
      this.props.onLoadGetPublicPhotos(this.state.user.id);
      this.props.onLoadGetPublicAlbums(this.state.user.id);
    } else {
      this.props.onLoadGetPhotos(this.state.user.id, 4, 0);
      this.props.onLoadGetAlbums(this.state.user.id, 4, 0);
    }
  }

  render() {
    const { albums, photos } = this.props.data;
    const { user } = this.state;

    if (this.state.redirect !== "") {
      return <Redirect push to={this.state.redirect} />;
    }

    const addMore = (
      <FontAwesomeIcon
        icon={faPlusCircle}
        onClick={() => this.setState({ redirect: "/upload" })}
        style={{ cursor: "pointer", marginRight: "10px" }}
        title="Agregar más"
      />
    );

    return (
      <Container fluid={!this.state.isPublic}>
        <Helmet>
          <title>{`Perfil de ${user.first_name} ${user.last_name}`}</title>
        </Helmet>
        <Row style={{ marginTop: "2em" }}>
          <Col style={{ textAlign: "center" }}>
            <h2>
              {this.state.isPublic
                ? `Perfil de ${user.first_name + " " + user.last_name}`
                : "Mi perfil"}
            </h2>
          </Col>
        </Row>
        <Row style={{ marginTop: "2em" }}>
          <Col>
            <Container fluid>
              <Row className="user-dashboard-row">
                <Col>
                  <h2 className="user-dashboard-title">
                    Fotograf&iacute;as no listadas{" "}
                    {this.state.isPublic ? null : addMore}
                  </h2>
                  {photos.length !== 0 ? (
                    <Link
                      to={
                        this.state.isPublic
                          ? `/user/public/${this.state.user.id}/photos`
                          : "/user/dashboard/photos"
                      }
                      className="user-dashboard-see-all"
                    >
                      {" "}
                      Ver Todas
                    </Link>
                  ) : null}
                </Col>
                <Container fluid>
                  <Row style={{ margin: "1em auto" }} xs="9" align="center">
                    {/* {photos.length === 0 ? (
                      <h5> No hay fotograf&iacute;as </h5>
                    ) : (
                      photos.slice(0, 3).map((el, key) => (
                        <Col sm="3" key={key}>
                          <Photo
                            name={el.title}
                            url={el.thumbnail}
                            height="150px"
                            width="200px"
                            useLink
                            redirectUrl={`/photo/${el.id}/?user=${user.id}`}
                          />
                        </Col>
                      ))
                    )} */}
                    <p>En construccion</p>
                  </Row>
                </Container>
              </Row>
              <Row className="user-dashboard-row">
                <Col>
                  <h2 className="user-dashboard-title">
                    Etiquetas en espera {this.state.isPublic ? null : addMore}
                  </h2>
                  {albums.length !== 0 ? (
                    <Link
                      to={
                        this.state.isPublic
                          ? `/user/public/${this.state.user.id}/albums`
                          : "/user/dashboard/albums"
                      }
                      className="user-dashboard-see-all"
                    >
                      {" "}
                      Ver Todos
                    </Link>
                  ) : null}
                </Col>
                <Container fluid>
                  <Row style={{ margin: "1em auto" }} xs="9" align="center">
                    {/* {albums.length === 0 ? (
                      <h5> No hay &aacute;lbumes </h5>
                    ) : (
                      albums.slice(0, 3).map((el, key) => (
                        <Col sm="3" key={key}>
                          <Photo
                            name={el.title}
                            url={el.thumbnail}
                            height="150px"
                            width="200px"
                            useLink
                            redirectUrl={
                              this.state.isPublic
                                ? `/user/public/albums/${el.id}`
                                : `/user/albums/${el.id}`
                            }
                          />
                        </Col>
                      ))
                    )} */}
                    <p>En construccion</p>
                  </Row>
                </Container>
              </Row>
            </Container>
          </Col>
          <Col className="user-dashboard-row">
            <Container fluid>
              <Row>
                <Col>
                  <h2 className="user-dashboard-title">
                    Me han comentado {this.state.isPublic ? null : addMore}
                  </h2>
                  {albums.length !== 0 ? (
                    <Link
                      to={
                        this.state.isPublic
                          ? `/user/public/${this.state.user.id}/albums`
                          : "/user/dashboard/albums"
                      }
                      className="user-dashboard-see-all"
                    >
                      {" "}
                      Ver Todos
                    </Link>
                  ) : null}
                </Col>
                <Container fluid>
                  <Row style={{ margin: "1em auto" }} xs="9" align="center">
                    {/* {albums.length === 0 ? (
                      <h5> No hay &aacute;lbumes </h5>
                    ) : (
                      albums.slice(0, 3).map((el, key) => (
                        <Col sm="3" key={key}>
                          <Photo
                            name={el.title}
                            url={el.thumbnail}
                            height="150px"
                            width="200px"
                            useLink
                            redirectUrl={
                              this.state.isPublic
                                ? `/user/public/albums/${el.id}`
                                : `/user/albums/${el.id}`
                            }
                          />
                        </Col>
                      ))
                    )} */}
                    <p>En construccion</p>
                  </Row>
                </Container>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

const makeIcons = (rol_id) => {
  switch (rol_id) {
    case 1:
      return <FontAwesomeIcon icon={faCameraRetro} />;
    case 2:
      return <FontAwesomeIcon icon={faAddressCard} />;
    case 3:
      return <FontAwesomeIcon icon={faSuitcase} />;
    default:
      return "Failed";
  }
};
const mapStateToProps = (state) => ({
  data: {
    photos: state.user.photos,
    comments: state.user.comments,
    albums: state.user.albums,
  },
  user: state.user.userData,
});

const mapActionsToProps = (dispatch) => ({
  onLoadGetPhotos: (user_id, limit, offset) =>
    dispatch(user.getUserPhotos(user_id, limit, offset)),
  onLoadGetAlbums: (user_id, limit, offset) =>
    dispatch(user.getUserAlbums(user_id, limit, offset)),
  onLoadGetPublicAlbums: (user_id) =>
    dispatch(user.loadPublicUserAlbums(user_id)),
  onLoadGetPublicPhotos: (user_id) =>
    dispatch(user.loadPublicUserPhotos(user_id)),
});

export default connect(mapStateToProps, mapActionsToProps)(Landing);
