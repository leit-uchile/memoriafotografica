import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Row, Col, Container, Badge } from "reactstrap";
import { user, site_misc, gallery } from "../../../actions";
import EditPhotosModal from "./EditPhotosModal";
import PhotoEditor from "../../../components/PhotoEditor";
import { Helmet } from "react-helmet";
import Gallery from "react-photo-gallery";
import { bindActionCreators } from "redux";
import "./userPhotos.css";
import {
  selectUserPhotos,
  selectUserData,
  selectUserPublicUser,
  selectPhotosUpdatedPhoto,
  selectPhotosRefresh,
} from "../../../reducers";

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
      props.onLoadGetPhotos(props.user.id, 100, 0, "&approved=true"); //no poner limite
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
      <Container fluid className="dashboard">
        <Helmet>
          <title>
            {this.state.isPublic && this.props.publicUser
              ? "Fotos de " + this.props.publicUser.first_name
              : "Mis fotos"}
          </title>
        </Helmet>
        <Row>
          <Col className="dashboard-col">
            <h2
              style={{
                textAlign: `${this.state.isPublic ? "center" : "left"}`,
              }}
            >
              {this.state.isPublic
                ? `Fotos de ${this.props.publicUser.first_name}`
                : "Mis fotos"}{" "}
              <Badge color="primary">{mapped.length}</Badge>
            </h2>
          </Col>
        </Row>
        {this.state.isPublic ? null : (
          <Row>
            <Col className="user-dashboard-buttons">
              <Button
                color="secondary"
                onClick={() => this.putAllToEdit(mapped)}
              >
                {!this.state.selectedAll
                  ? "Seleccionar todas"
                  : "Deseleccionar"}
              </Button>
              <Button
                disabled={this.state.picturesToEdit.length === 0}
                color="primary"
                onClick={() =>
                  this.setState({ modalOpen: !this.state.modalOpen })
                }
              >
                Editar selección ({this.state.picturesToEdit.length})
              </Button>
              <EditPhotosModal
                photosId={this.state.picturesToEdit}
                isOpen={this.state.modalOpen}
                handleToggle={() =>
                  this.setState({ modalOpen: !this.state.modalOpen })
                }
                editPhoto={(id, content) => this.props.editPhoto(id, content)}
                deletePhoto={(id) => this.props.deletePhoto(id)}
                isCurator={false}
                censurePhoto={null}
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col className="dashboard-col">
            <Container fluid>
              <Row>
                <Col
                  sm={
                    mapped.length === 1 ? { size: 4, offset: 4 } : { size: 12 }
                  }
                >
                  <div className="stat-box rounded">
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
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  photos: selectUserPhotos(state),
  user: selectUserData(state),
  publicUser: selectUserPublicUser(state),
  updatedPhoto: selectPhotosUpdatedPhoto(state),
  refresh: selectPhotosRefresh(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      setSelectedId: site_misc.setSelectedId,
      setRoute: site_misc.setCurrentRoute,
      loadPublicUser: user.loadAUser,
      onLoadGetPhotos: user.getUserPhotos,
      onLoadGetPublicPhotos: user.loadPublicUserPhotos,
      editPhoto: gallery.photos.editPhoto,
      deletePhoto: gallery.photos.deletePhoto,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(UserPhotos);
