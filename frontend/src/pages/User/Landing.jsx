import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
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
        title="Agregar más"
      />
    );

    return (
      <Container fluid={!this.state.isPublic} className="dashboard">
        <Helmet>
          <title>{`Escritorio de ${user.first_name} ${user.last_name}`}</title>
        </Helmet>
        <Row>
          <Col>
            <h2
              style={{
                textAlign: `${this.state.isPublic ? "center" : "left"}`,
              }}
            >
              {this.state.isPublic
                ? `Perfil de ${user.first_name + " " + user.last_name}`
                : "Escritorio"}
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="stat-box">
              <Container fluid className="stat-box-header">
                <h2>
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
                  >
                    {" "}
                    Ver Todas
                  </Link>
                ) : null}
              </Container>
              <hr />
              <Container fluid>
                <p>En construccion</p>
              </Container>
            </div>
          </Col>
          <Col>
            <div className="stat-box">
              <Container fluid className="stat-box-header">
                <h2>Me han comentado</h2>
              </Container>
              <hr />
              <Container fluid>
                <p>En construccion</p>
              </Container>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="stat-box">
              <Container fluid className="stat-box-header">
                <h2>Notificaciones</h2>
              </Container>
              <hr />
              <Container fluid>
                <p>En construccion</p>
              </Container>
            </div>
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
