import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
} from "reactstrap";
import Photo from "../../../components/Photo";
import { connect } from "react-redux";
import { user, site_misc } from "../../../actions";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faCameraRetro,
  faAddressCard,
  faEdit,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { userRolTranslation, userTypeTranslation } from "../utils";
import { UserPicture, ReportModal } from "../../../components/";
import "./userDashboard.css";
import { Helmet } from "react-helmet";

class Dashboard extends Component {
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
      this.props.setRoute("/userDashboard/");
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
        style={{ cursor: "pointer" }}
        title="Agregar más"
      />
    );

    return (
      <Container>
        <Helmet>
          <title>{`Perfil de ${user.first_name} ${user.last_name}`}</title>
        </Helmet>
        <Row style={{ marginTop: "2em" }}>
          <Col style={{ textAlign: "center" }}>
            <h2>{this.state.isPublic ? "Perfil" : "Mi perfil"}</h2>
          </Col>
        </Row>
        <Row style={styles.container}>
          <Col md="3">
            <Card className="user-dashboard-card">
              <UserPicture
                user={user}
                dims={200}
                render={(user) => (
                  <CardImg top width="100%" src={user.avatar} />
                )}
              />
              {this.state.isPublic ? (
                <ReportModal
                  className="editProfile"
                  reportType={1}
                  elementId={user.id}
                  options={["Fotos inapropiadas", "Comentarios ofensivos"]}
                  reportTitle={"Denunciar Usuario"}
                  helpText={
                    "Si consideras que este usuario tiene una conducta que no sigue nuestras reglas de la comunidad por favor envíanos un reporte."
                  }
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEdit}
                  className="editProfile"
                  title="Editar"
                  onClick={() =>
                    this.setState({ redirect: "/user/editProfile" })
                  }
                />
              )}

              <CardBody>
                <CardText className="name">
                  {`${user.first_name} ${user.last_name}`}
                </CardText>
                <CardText>
                  {userTypeTranslation(user.user_type)}{" "}
                  {makeIcons(user.user_type)}
                </CardText>
                <CardText className="rol-card">
                  {userRolTranslation(user.rol_type)}
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="9">
            <Container fluid>
              <Row className="user-dashboard-row">
                <Col>
                  <h2 className="user-dashboard-title">
                    &Uacute;ltimas fotograf&iacute;as{" "}
                    {this.state.isPublic ? null : addMore}
                  </h2>
                  {photos.length !== 0 ? (
                    <Link
                      to={`/photo/${photos[0].id}/?user=${user.id}`}
                      className="user-dashboard-see-all"
                    >
                      {" "}
                      Ver Todas
                    </Link>
                  ) : null}
                </Col>
                <Container fluid>
                  <Row style={{ margin: "1em auto" }} xs="9" align="center">
                    {photos.length === 0 ? (
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
                    )}
                  </Row>
                </Container>
              </Row>
              <Row className="user-dashboard-row">
                <Col>
                  <h2 className="user-dashboard-title">
                    &Aacute;lbumes {this.state.isPublic ? null : addMore}
                  </h2>
                  {albums.length !== 0 ? (
                    <Link
                      to={
                        this.state.isPublic
                          ? `/user/${this.state.user.id}/public/albums`
                          : "/user/albums"
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
                    {albums.length === 0 ? (
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
                    )}
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

const styles = {
  container: {
    marginTop: "2em",
  },
};

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
  setRoute: (route) => dispatch(site_misc.setCurrentRoute(route)),
  onLoadGetPublicAlbums: (user_id) =>
    dispatch(user.loadPublicUserAlbums(user_id)),
  onLoadGetPublicPhotos: (user_id) =>
    dispatch(user.loadPublicUserPhotos(user_id)),
});

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
