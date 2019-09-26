import React, { Component, Fragment } from "react";

import UnregisteredPrompt from "./UnregisterPrompt";
import UploadUnregister from "./UploadUnregister";
import UploadAlbum from "./UploadAlbum";
import UploadPhoto from "./UploadPhoto";
import UploadProgress from "./UploadProgress";

import { connect } from "react-redux";
import { misc, upload, home, alert } from "../../actions";
import { Helmet } from "react-helmet";
import StepWizard from "react-step-wizard";

// Example nav from https://github.com/jcmcneal/react-step-wizard/blob/master/app/components/nav.js
const Nav = props => {
  const dots = [];
  /* onClick={() => props.goToStep(i)}> */
  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i;
    dots.push(
      <span
        key={`step-${i}`}
        style={isActive ? { ...styles.dot, ...styles.active } : styles.dot}>
        &bull;
      </span>
    );
  }
  return <div style={styles.nav}>{dots}</div>;
};

class UploadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      photos: null,
      uploading: false,
      prog: 0
    };
  }

  componentWillMount() {
    this.props.setRoute("/upload");
    this.props.recoverMetadata();
  }

  saveUserInfo = info => {
    this.setState({
      userInfo: { ...info }
    });
  };

  saveAlbumInfo = info => {
    this.setState({ photos: { ...this.state.photos, ...info } });
  };

  savePhotos = photos => {
    this.setState(
      {
        photos: { ...this.state.photos, ...photos },
        uploading: true
      },
      () => {
        // Upload all
        this.props.uploadPhotos(this.state.photos, this.props.token);
      }
    );
  };

  retryFailed = () => {
    // Create new array with ids from props
    var newPhotos = {
      ...this.state.photos,
      photoList: this.state.photos.photosList.filter(
        (el, key) => this.props.upload.photosUploaded.indexOf(key) === -1
      )
    };

    this.savePhotos(newPhotos);
  };

  render() {
    return (
      <Fragment>
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
        {!this.props.isAuthenticated ? (
          <StepWizard
            className="stepContainer"
            onStepChange={() => {}}
            nav={<Nav />}>
            <UnregisteredPrompt />
            <UploadUnregister
              saveInfo={this.saveUserInfo}
              cache={this.state.userInfo}
            />
            <UploadAlbum
              isAuth={this.props.isAuthenticated}
              saveAll={this.saveAlbumInfo}
              meta={this.props.meta}
              sendAlert={this.props.sendAlert}
            />
            <UploadPhoto saveAll={this.savePhotos} meta={this.props.meta} />
            <UploadProgress
              photosUploading={this.props.upload.photosUploading}
              opsFinished={this.props.upload.opsFinished}
              uploading={this.props.upload.uploading}
              completed={this.props.upload.photosUploaded.length}
              retry={this.retryFailed}
            />
          </StepWizard>
        ) : (
          <StepWizard
            className="stepContainer"
            onStepChange={() => {}}
            nav={<Nav />}>
            <UploadAlbum
              isAuth={this.props.isAuthenticated}
              saveAll={this.saveAlbumInfo}
              meta={this.props.meta}
              sendAlert={this.props.sendAlert}
            />
            <UploadPhoto saveAll={this.savePhotos} meta={this.props.meta} />
            <UploadProgress
              photosUploading={this.props.upload.photosUploading}
              opsFinished={this.props.upload.opsFinished}
              uploading={this.props.upload.uploading}
              completed={this.props.upload.photosUploaded.length}
              retry={this.retryFailed}
            />
          </StepWizard>
        )}
      </Fragment>
    );
  }
}

const styles = {
  nav: {
    marginBottom: "15px",
    textAlign: "center"
  },
  dot: {
    color: "black",
    cursor: "pointer",
    fontSize: "36px",
    lineHeight: "1",
    margin: "0 15px",
    opacity: ".4",
    textShadow: "none",
    transition: "opacity 1s ease, text-shadow 1s ease",
    willChange: "opacity, text-shadow"
  },
  active: {
    color: "#ff5a60",
    opacity: "1",
    textShadow: "0 0px 8px"
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

const mapActionsToProps = dispatch => ({
  setRoute: route => dispatch(misc.setCurrentRoute(route)),
  uploadPhotos: info => dispatch(upload.uploadImages(info)),
  recoverMetadata: () => dispatch(home.tags()),
  sendAlert: (message, color) => dispatch(alert.setAlert(message, color))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UploadPage);
