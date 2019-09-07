import React, { Component } from "react";
import UploadUnregister from "./UploadUnregister";
import UploadPhoto from "./UploadPhoto";
import UploadProgress from "./UploadProgress";
import { connect } from "react-redux";
import { misc, upload, home } from "../../actions";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Progress, Alert } from "reactstrap";
import { Helmet } from "react-helmet";

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
    var newList = this.state.photos.photosList.filter(
      (el, key) => this.props.upload.photosUploaded.indexOf(key) !== -1
    );
    this.savePhotos(newList);
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
            <Row style={styles.marginTopCenter}>
              <Col>
                <h2 style={{ fontWeight: "bold" }}>
                  ¡Ayudanos aportando material!
                </h2>
              </Col>
            </Row>
            <Row style={styles.marginTopCenter}>
              <Col>
                <Button color="primary" tag={Link} to="/login">
                  Iniciar sesion
                </Button>
                <Button color="link" onClick={this.withoutRegister}>
                  Continuar sin registrar
                </Button>
              </Col>
            </Row>
            <Row style={styles.marginTopCenter}>
              <Col>
                <p>
                  Si no inicias sesion tendras que ingresar tus datos cada vez
                  que subas una foto
                </p>
              </Col>
            </Row>
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
  marginTopCenter: {
    textAlign: "center",
    marginTop: "2em"
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
    upload: state.upload,
    meta: state.home.all_tags
  };
};

const mapActionsToProps = dispatch => {
  return {
    setRoute: route => {
      return dispatch(misc.setCurrentRoute(route));
    },
    uploadPhotos: (info, auth) => {
      return dispatch(upload.uploadImages(info, auth));
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
