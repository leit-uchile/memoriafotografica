import React, { Component, Fragment } from "react";

import UnregisteredPrompt from "./UnregisterPrompt";
import UploadUnregister from "./UploadUnregister";
import UploadAlbum from "./UploadAlbum";
import UploadPhoto from "./UploadPhoto";
import UploadProgress from "./UploadProgress";

import { connect } from "react-redux";
import { metadata, gallery, site_misc } from "../../actions";
import { Helmet } from "react-helmet";
import StepWizard from "react-step-wizard";

import "./uploadPhoto.css";

/**
 * Upload page
 *
 * Main component that handles subcomponent transitions, saves information
 * and uploads info to the server
 */
class UploadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {}, // For anonymous upload
      photos: { onAlbum: false }, // All info to upload
      uploading: false,
      prog: 0, // May delete this later
      cacheCreatedPhotoIds: [], // In case of upload error
      metadata: [], // Used during metadata creation
      newMetaCount: 0
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

  /**
   * Function called when all inputs are ok
   */
  startProcess = (photos, meta) => {
    // Manage metadata creation:
    // Merge tags in one array
    let metadata = {};
    this.state.photos.tags.forEach(tag => {
      metadata[tag.value] = { ...tag };
    });
    meta.forEach(tag => {
      metadata[tag.value] = { ...tag };
    });

    this.setState({ photos: { ...this.state.photos, ...photos } }, () =>
      this.createMetadata(Object.values(metadata))
    );
  };

  // On success componentDidUpdate will call
  // associateMeta()
  createMetadata = meta => {
    let new_metas = meta.filter(el => el.id === undefined).map(el => el.value);
    let id_metas = meta.filter(el => el.id !== undefined);

    // If API call isn't necessary
    if (new_metas.length === 0) {
      this.setState(
        {
          metadata: id_metas,
          newMetaCount: 0
        },
        () => this.associateMeta()
      );
    } else {
      // Save partial metadata state
      // New metadata will be populated later
      this.setState({
        metadata: id_metas,
        newMetaCount: new_metas.length
      });

      this.props.createMultipleMetas(new_metas);
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.metadataCreation.creating && // We were creating
      !this.props.metadataCreation.creating // Its done!
    ) {
      // Update metadata from props info
      this.setState(
        {
          metadata: [
            ...this.state.metadata,
            ...this.props.metadataCreation.newIds
          ],
          newMetaCount: 0
        },
        // Call AssociateMeta after state update
        () => this.associateMeta()
      );
    }
  }

  associateMeta = () => {
    let meta_mapped = {};
    this.state.metadata.forEach(t => {
      meta_mapped[t.value] = t.id;
    });

    // get default metadata
    // As an array of IDs as 1,2,3
    let default_metadata = this.state.photos.tags
      .map(t => {
        return meta_mapped[t.value];
      })
      .join();

    // Read from photoList and change meta
    let photo_copy = this.state.photos.photosList.map(el => {
      // If the information is uniform
      if (el.meta.tags.length === 0) {
        return { ...el, meta: { ...el.meta, tags: default_metadata } };
      } else {
        let custom_metadata = el.meta.tags
          .map(t => {
            // They have name saved
            return meta_mapped[t.value];
          })
          .join();
        return { ...el, meta: { ...el.meta, tags: custom_metadata } };
      }
    });

    // Start process
    this.setState(
      { photos: { ...this.state.photos, photosList: photo_copy } },
      () => this.startUploading({})
    );
  };

  startUploading = photos => {
    // Merge album info and photosList from arg photos
    // Important: photosList is used to store the images
    this.setState(
      {
        photos: { ...this.state.photos, ...photos },
        uploading: true // This may be removed (?)
      },
      () => {
        // Upload all
        this.props.uploadPhotos(this.state.photos);
      }
    );
  };

  /**
   * Create album using photo IDs and Album info
   */
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
            nav={<Nav />}
          >
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
            <UploadPhoto saveAll={this.startProcess} meta={this.props.meta} />
            <UploadProgress
              photosUploading={this.props.upload.photosUploading}
              opsFinished={this.props.upload.opsFinished}
              uploading={this.props.upload.uploading}
              completed={this.props.upload.photosUploaded.length}
              doAlbum={this.state.photos.onAlbum}
              albumInfo={this.state.photos} // TODO: remove data redundancy
              albumState={this.props.album.createAlbum}
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
            nav={<Nav />}
          >
            <UploadAlbum
              isAuth={this.props.isAuthenticated}
              saveAll={this.saveAlbumInfo}
              meta={this.props.meta}
              sendAlert={this.props.sendAlert}
            />
            <UploadPhoto saveAll={this.startProcess} meta={this.props.meta} />
            <UploadProgress
              photosUploading={this.props.upload.photosUploading}
              opsFinished={this.props.upload.opsFinished}
              uploading={this.props.upload.uploading}
              completed={this.props.upload.photosUploaded.length}
              doAlbum={this.state.photos.onAlbum}
              albumInfo={this.state.photos}
              albumState={this.props.album.createAlbum}
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
    color: "var(--leit-pink)",
    opacity: "1",
    textShadow: "0 0px 8px"
  }
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  upload: state.upload,
  album: state.albumcollection,
  meta: state.metadata.all_tags,
  metadataCreation: state.metadata
});

const mapActionsToProps = dispatch => ({
  setRoute: route => dispatch(site_misc.setCurrentRoute(route)),
  uploadPhotos: info => dispatch(gallery.photos.uploadImages(info)),
  recoverMetadata: () => dispatch(metadata.tags()),
  sendAlert: (message, color) => dispatch(site_misc.setAlert(message, color)),
  createAlbum: formData => dispatch(gallery.album.createAlbum(formData)),
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
        style={isActive ? { ...styles.dot, ...styles.active } : styles.dot}
      >
        &bull;
      </span>
    );
  }
  return <div style={styles.nav}>{dots}</div>;
};

export default connect(mapStateToProps, mapActionsToProps)(UploadPage);
