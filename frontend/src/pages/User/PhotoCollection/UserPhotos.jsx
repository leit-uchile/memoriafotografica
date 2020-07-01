import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Button, Row, Col, Container } from "reactstrap";
import { user, site_misc } from "../../../actions";
import EditPhotosModal from "./EditPhotosModal";
import PhotoEditor from "../../../components/PhotoEditor";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Gallery from "react-photo-gallery";
//import "./userphotos.css"

class UserPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      chosenPhotoIndex: 0,
      picturesToEdit: [],
      selectedAll: false,
      modalOpen: false,
      isPublic: props.location.pathname.includes("public"),
    };
    if (props.location.pathname.includes("public")) {
      props.loadPublicUser(props.match.params.id);
      props.onLoadGetPublicPhotos(
        props.match.params.id,
        "&page=1&page_size=100"
      );
    } else {
      props.onLoadGetPhotos(props.user.id, 100, 0); //no poner limite
    }
  }

  componentDidUpdate() {
    if (
      (this.props.updatedPhoto || this.props.refresh) &&
      !this.state.modalOpen
    ) {
      setTimeout(() => window.location.reload(), 1000);
    }
  }

  handleOnRedirect = (obj) => {
    this.setState({
      redirect: true,
      chosenPhotoIndex: obj.index,
    });
  };

  handleOnSelect = (obj) => {
    const id = obj.photo.id;
    const newList = this.state.picturesToEdit.filter((el) => el !== id);
    if (newList.length === this.state.picturesToEdit.length) {
      // si el objeto no estaba
      this.setState({ picturesToEdit: [...newList, id] }); //lo agregamos
    } else {
      this.setState({ picturesToEdit: [...newList] }); //si estaba, asi que lo eliminamos
    }
    // {this.state.picturesToEdit.length === mapped.length
    // ? (this.setState({selectedAll: true}))
    // : (this.setState({selectedAll: false}))}
  };

  putAllToEdit(mapped) {
    !this.state.selectedAll
      ? this.setState({
          picturesToEdit: mapped.map((el) => el.id),
          selectedAll: true,
        })
      : this.setState({
          picturesToEdit: [],
          selectedAll: false,
        });
  }

  render() {
    var mapped = this.props.photos.map((el) => ({
      src: el.thumbnail,
      height: el.aspect_h,
      width: el.aspect_w,
      id: el.id,
    }));

    if (this.state.redirect) {
      this.props.setRoute("/photo"); // For NavLink in Navbar
      this.props.setSelectedId(this.state.chosenPhotoIndex); // For in photo navigation
      return (
        <Redirect
          push
          to={`/photo/${mapped[this.state.chosenPhotoIndex].id}/?user=${
            this.state.isPublic ? this.props.publicUser.id : this.props.user.id
          }`}
        />
      );
    }
    return (
      <Fragment>
        <div className="userphotos-gallery-menu">
          <Helmet>
            <title>
              {this.state.isPublic && this.props.publicUser
                ? "Fotos de " + this.props.publicUser.first_name
                : "Mis fotos"}
            </title>
          </Helmet>
          <Container>
            <Row>
              <Col md="7" lg="9">
                <div className="userphotos-title-container">
                  <Button
                    color="secondary"
                    tag={Link}
                    to={
                      this.state.isPublic && this.props.publicUser
                        ? `/user/public/${this.props.publicUser.id}/`
                        : "/user/dashboard"
                    }
                    style={{ height: "30px" }}
                  >
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                  </Button>
                  <h2 style={{ marginLeft: "10px" }}>
                    {this.state.isPublic && this.props.publicUser
                      ? "Fotos de " + this.props.publicUser.first_name
                      : "Mis fotos"}
                  </h2>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="userphotos-background">
          <Container className="userphotos-gallery-container">
            <Row>
              <Col
                sm={
                  mapped.length === 1
                    ? { size: 4, offset: 4 }
                    : { size: this.state.isPublic ? 12 : 9 }
                }
              >
                {this.state.isPublic ? (
                  <Gallery
                    photos={mapped}
                    targetRowHeight={250}
                    onClick={(e, index) => this.handleOnRedirect(index)}
                  />
                ) : (
                  <PhotoEditor
                    photos={mapped}
                    targetRowHeight={250}
                    onClick={(e, index) => this.handleOnSelect(index)}
                    // putAll={(state) => this.putAllToEdit(mapped,state)}
                    selectAll={this.state.selectedAll}
                    onRedirect={(e, index) => this.handleOnRedirect(index)}
                  />
                )}
              </Col>
              {this.state.isPublic ? null : (
                <Col className="userphotos-filters-container">
                  <Button
                    color="secondary"
                    onClick={() => this.putAllToEdit(mapped)}
                  >
                    {!this.state.selectedAll
                      ? "Seleccionar todas"
                      : "Deseleccionar"}
                  </Button>
                  <EditPhotosModal
                    photosID={this.state.picturesToEdit}
                    isOpen={(bool) => this.setState({ modalOpen: bool })}
                  />
                </Col>
              )}
            </Row>
          </Container>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  photos: state.user.photos,
  user: state.user.userData,
  publicUser: state.user.publicUser,
  updatedPhoto: state.photos.updatedPhoto,
  refresh: state.photos.refresh,
});

const mapActionsToProps = (dispatch) => ({
  setSelectedId: (id) => dispatch(site_misc.setSelectedId(id)),
  setRoute: (route) => dispatch(site_misc.setCurrentRoute(route)),
  loadPublicUser: (id) => dispatch(user.loadAUser(id)),
  onLoadGetPhotos: (user_id, limit, offset) =>
    dispatch(user.getUserPhotos(user_id, limit, offset)),
  onLoadGetPublicPhotos: (user_id, params) =>
    dispatch(user.loadPublicUserPhotos(user_id, params)),
});

export default connect(mapStateToProps, mapActionsToProps)(UserPhotos);
