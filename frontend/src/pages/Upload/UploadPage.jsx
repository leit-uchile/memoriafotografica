import React, { Component, Fragment } from "react";

import UnregisteredPrompt from "./UnregisterPrompt";
import UploadUnregister from "./UploadUnregister";
import UploadAlbum from "./UploadAlbum";
import UploadPhoto from "./UploadPhoto";
import UploadProgress from "./UploadProgress";

import { connect } from "react-redux";
import { misc, upload, home, alert, metadata } from "../../actions";
import { Helmet } from "react-helmet";
import StepWizard from "react-step-wizard";

import "../../css/uploadPhoto.css";

/**
 * Upload page
 * 
 * Main component that handle subcomponent transitions, saves information
 * and uploads info to the server
 */
class UploadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      photos: { onAlbum: false },
      uploading: false,
      prog: 0,
      cacheCreatedPhotoIds: []
    };
    // componentWillMount() (soon deprecated)
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

  startUploading = photos => {
    this.setState(
      {
        photos: { ...this.state.photos, ...photos },
        uploading: true
      },
      () => {
        // Upload all
        this.props.uploadPhotos(this.state.photos);
      }
    );
  };

  createMetadata = () => {};

  saveAlbum = info => {
    // Asume name and description in info
    let formData = {
      ...info,
      pictures: [
        ...this.props.upload.newPhotosIds,
        ...this.state.cacheCreatedPhotoIds
      ]
    };
    this.props.createAlbum(formData);
  };

  retryFailed = () => {
    // Create new array with ids from props
    var newPhotos = {
      ...this.state.photos,
      photosList: this.state.photos.photosList.filter(
        (el, key) => this.props.upload.photosUploaded.indexOf(key) === -1
      )
    };
    newPhotos.length = newPhotos.photosList.length;
    // Save our already created photos Ids
    this.setState(
      {
        cacheCreatedPhotoIds: [
          ...this.state.cacheCreatedPhotoIds,
          ...this.props.upload.newPhotosIds
        ]
      },
      this.startUploading(newPhotos)
    );
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
            onStepChange={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
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
            <UploadPhoto saveAll={this.startUploading} meta={this.props.meta} />
            <UploadProgress
              photosUploading={this.props.upload.photosUploading}
              opsFinished={this.props.upload.opsFinished}
              uploading={this.props.upload.uploading}
              completed={this.props.upload.photosUploaded.length}
              doAlbum={this.state.photos.onAlbum}
              albumInfo={this.state.photos} // TODO: remove data redundancy
              albumState={this.props.upload.createAlbum}
              retry={this.retryFailed}
              saveAlbum={this.saveAlbum}
            />
          </StepWizard>
        ) : (
          <StepWizard
            className="stepContainer"
            onStepChange={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            nav={<Nav />}>
            <UploadAlbum
              isAuth={this.props.isAuthenticated}
              saveAll={this.saveAlbumInfo}
              meta={this.props.meta}
              sendAlert={this.props.sendAlert}
            />
            <UploadPhoto saveAll={this.startUploading} meta={this.props.meta} />
            <UploadProgress
              photosUploading={this.props.upload.photosUploading}
              opsFinished={this.props.upload.opsFinished}
              uploading={this.props.upload.uploading}
              completed={this.props.upload.photosUploaded.length}
              doAlbum={this.state.photos.onAlbum}
              albumInfo={this.state.photos}
              albumState={this.props.upload.createAlbum}
              retry={this.retryFailed}
              saveAlbum={this.saveAlbum}
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  upload: state.upload,
  meta: state.home.all_tags,
  metadataCreation: state.metadata
});

const mapActionsToProps = dispatch => ({
  setRoute: route => dispatch(misc.setCurrentRoute(route)),
  uploadPhotos: info => dispatch(upload.uploadImages(info)),
  recoverMetadata: () => dispatch(home.tags()),
  sendAlert: (message, color) => dispatch(alert.setAlert(message, color)),
  createAlbum: formData => dispatch(upload.createAlbum(formData)),
  createMultipleMetas: name => dispatch(metadata.createMultipleMetas(name))
});


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

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UploadPage);
