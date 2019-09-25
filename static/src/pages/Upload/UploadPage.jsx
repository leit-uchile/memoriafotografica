import React, { Component } from "react";
import UploadUnregister from "./UploadUnregister";
import UploadPhoto from "./UploadPhoto";
import UploadProgress from "./UploadProgress";
import { connect } from "react-redux";
import { misc, upload, home } from "../../actions";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col } from "reactstrap";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";

class UploadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      userInfo: {},
      photos: null,
      uploading: false,
      prog: 0
    };
    this.back = this.back.bind(this);
    this.withoutRegister = this.withoutRegister.bind(this);
    this.saveUserInfo = this.saveUserInfo.bind(this);
    this.savePhotos = this.savePhotos.bind(this);
    this.retryFailed = this.retryFailed.bind(this);
  }

  // Go one step back
  back() {
    if (this.state.currentPage !== 0) {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    }
  }
  // Save user info in case is anonymous
  withoutRegister() {
    if (this.state.currentPage !== 4) {
      this.setState({
        currentPage: 1
      });
    }
  }
  saveUserInfo(info) {
    this.setState({
      currentPage: 2,
      userInfo: { ...info }
    });
  }
  savePhotos(photos) {
    this.setState(
      {
        currentPage: 3,
        photos: { ...photos },
        uploading: true
      },
      () => {
        // Upload all
        this.props.uploadPhotos(this.state.photos, this.props.token);
      }
    );
  }

  retryFailed() {
    // Create new array with ids from props
    var newPhotos = {
      ...this.state.photos,
      photoList: this.state.photos.photosList.filter(
        (el, key) => this.props.upload.photosUploaded.indexOf(key) === -1
      )
    };

    this.savePhotos(newPhotos);
  }

  componentWillMount() {
    this.props.setRoute("/upload");
    this.props.recoverMetadata();
  }

  render() {
    var subupload;
    var current;
    if (this.props.isAuthenticated && this.state.currentPage === 0) {
      current = this.props.isAuthenticated ? 2 : this.state.currentPage;
    } else if (this.props.isAuthenticated && this.state.currentPage === 1) {
      current = 3;
    } else {
      current = this.state.currentPage;
    }
    switch (current) {
      case 0:
        subupload = (
          <Container>
            <Row>
              <Col>
                <h2 style={styles.title}>¡Ayúdanos aportando material!</h2>
              </Col>
            </Row>
            <Container style={styles.container}>
              <Row>
                <Col style={{ borderRight: "1px solid rgb(210,214,218)" }}>
                  <Row style={styles.item}>
                    <FontAwesomeIcon icon={faSignInAlt} size="6x" />
                  </Row>
                  <Row style={styles.item}>
                    <Button color="primary" tag={Link} to="/login">
                      Iniciar sesion
                    </Button>
                  </Row>
                </Col>
                <Col>
                  <Row style={styles.item}>
                    <FontAwesomeIcon icon={faUserPlus} size="6x" />
                  </Row>
                  <Row style={styles.item}>
                    <Button color="success" tag={Link} to="/register">
                      Registrarme
                    </Button>
                    <Button color="link" onClick={this.withoutRegister}>
                      Continuar sin registrar
                    </Button>
                  </Row>
                  <Row style={styles.item}>
                    <p>
                      Si continuas sin registrar tendrás que ingresar tus datos
                      cada vez que subas una foto
                    </p>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Container>
        );
        break;
      case 1:
        subupload = (
          <UploadUnregister
            goBack={this.back}
            saveInfo={this.saveUserInfo}
            cache={this.state.userInfo}
          />
        );
        break;
      case 2:
        subupload = (
          <UploadPhoto
            goBack={this.back}
            saveAll={this.savePhotos}
            meta={this.props.meta}
          />
        );
        break;
      case 3:
        subupload = (
          <UploadProgress
            photosUploading={this.props.upload.photosUploading}
            opsFinished={this.props.upload.opsFinished}
            uploading={this.props.upload.uploading}
            completed={this.props.upload.photosUploaded.length}
            retry={this.retryFailed}
          />
        );
        break;
      default:
        subupload = (
          <Container>
            <Row>
              <Col>
                <h2 style={styles.title}>¡Ayúdanos aportando material!</h2>
              </Col>
            </Row>
            <Container style={styles.container}>
              <Row>
                <Col style={{ borderRight: "1px solid rgb(210,214,218)" }}>
                  <Row style={styles.item}>
                    <FontAwesomeIcon icon={faSignInAlt} size="6x" />
                  </Row>
                  <Row style={styles.item}>
                    <Button color="primary" tag={Link} to="/login">
                      Iniciar sesion
                    </Button>
                  </Row>
                </Col>
                <Col>
                  <Row style={styles.item}>
                    <FontAwesomeIcon icon={faUserPlus} size="6x" />
                  </Row>
                  <Row style={styles.item}>
                    <Button color="success" tag={Link} to="/register">
                      Registrarme
                    </Button>
                    <Button color="link" onClick={this.withoutRegister}>
                      Continuar sin registrar
                    </Button>
                  </Row>
                  <Row style={styles.item}>
                    <p>
                      Si continuas sin registrar tendrás que ingresar tus datos
                      cada vez que subas una foto
                    </p>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Container>
        );
        break;
    }
    return (
      <div>
        <Helmet>
          <meta property="og:title" content="Aportar material" />
          <meta property="og:type" content="Subir contenido a la plataforma" />
          <meta
            property="og:url"
            content=" http://memoriafotografica.ing.fcfm.cl/"
          />
          <meta property="og:image" content=" http://example.com/image.jpg" />
          <meta property="og:description" content="Descripcion" />
          <title>Aportar material</title>
        </Helmet>
        {subupload}
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#f7f7f7",
    padding: "2em",
    marginBottom: "2em",
    border: "1px solid rgb(210,214,218)"
  },
  title: {
    color: "#ff5a60",
    textAlign: "center",
    margin: "1em"
  },
  item: {
    justifyContent: "center",
    margin: "1em"
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
    upload: state.upload,
    meta: state.home.all_tags
  };
};

const mapActionsToProps = dispatch => {
  return {
    setRoute: route => {
      return dispatch(misc.setCurrentRoute(route));
    },
    uploadPhotos: info => {
      return dispatch(upload.uploadImages(info));
    },
    recoverMetadata: () => {
      return dispatch(home.tags());
    }
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UploadPage);
