import React, { Component, Fragment } from "react";

import UnregisteredPrompt from "./UnregisterPrompt";
import UploadUnregister from "./UploadUnregister";
import UploadAlbum from "./UploadAlbum";
import UploadPhoto from "./UploadPhotov2";
import UploadProgress from "./UploadProgress";
import { connect } from "react-redux";
import { metadata, gallery, site_misc } from "../../actions";
import { Helmet } from "react-helmet";
import StepWizard from "react-step-wizard";
import "./uploadPage.css";
import { bindActionCreators } from "redux";

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
      data: { onAlbum: false }, // All info to upload
      uploading: false,
      prog: 0, // May delete this later
      cacheCreatedPhotoIds: [], // In case of upload error
      metadata: [], // Used during metadata creation
      newMetaCount: 0,
    };
    this.props.setRoute("/upload");
  }

  saveUserInfo = (info) => {
    this.setState({
      userInfo: { ...info },
    });
  };

  saveAlbumInfo = (info) => {
    this.setState({ data: { ...this.state.data, ...info } });
  };

  /**
   * DISCLAIMER: Uploading and putting data on different models is hard.
   *
   * What follows is all the necessary steps to upload photos with new metadata
   * and finally an album
   *
   * They are called in order as follows
   */

  /**
   * Function called when all inputs are ok
   */
  startProcess = (photos, meta) => {
    // Manage metadata creation:
    // Merge tags in one array
    let metadata = {};
    this.state.data.tags.forEach((tag) => {
      metadata[tag.value] = { ...tag };
    });
    meta.forEach((tag) => {
      metadata[tag.value] = { ...tag };
    });

    this.setState({ data: { ...this.state.data, ...photos } }, () =>
      this.createMetadata(Object.values(metadata))
    );
  };

  // On success componentDidUpdate will call
  // associateMeta()
  createMetadata = (meta) => {
    let new_metas = meta
      .filter((el) => el.id === undefined)
      .map((el) => el.value);
    let id_metas = meta.filter((el) => el.id !== undefined);

    // If API call isn't necessary
    if (new_metas.length === 0) {
      this.setState(
        {
          metadata: id_metas,
          newMetaCount: 0,
        },
        () => this.associateMeta()
      );
    } else {
      // Save partial metadata state
      // New metadata will be populated later
      this.setState({
        metadata: id_metas,
        newMetaCount: new_metas.length,
      });

      this.props.createMultipleMetas(new_metas);
    }
  };

  // Call method associateMeta if needed
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
            ...this.props.metadataCreation.newIds,
          ],
          newMetaCount: 0,
        },
        // Call AssociateMeta after state update
        () => this.associateMeta()
      );
    }
  }

  associateMeta = () => {
    let meta_mapped = {};
    this.state.metadata.forEach((t) => {
      meta_mapped[t.value] = t.id;
    });

    // get default metadata
    // As an array of IDs as 1,2,3
    let default_metadata = this.state.data.tags
      .map((t) => {
        return meta_mapped[t.value];
      })
      .join();

    // Read from photoList and change meta
    let photo_copy = this.state.data.photos.map((el) => {
      // If the information is uniform
      if (el.meta.tags.length === 0) {
        return { ...el, meta: { ...el.meta, tags: default_metadata } };
      } else {
        let custom_metadata = el.meta.tags
          .map((t) => {
            // They have name saved
            return meta_mapped[t.value];
          })
          .join();
        return { ...el, meta: { ...el.meta, tags: custom_metadata } };
      }
    });

    // Start process
    this.setState({ data: { ...this.state.data, photos: photo_copy } }, () =>
      this.startUploading({})
    );
  };

  // Once the metadata is ready we upload photos
  startUploading = (newData) => {
    // Merge album info and photos from arg photos
    // Important: photos is used to store the images
    this.setState(
      {
        data: { ...this.state.data, ...newData },
        uploading: true, // This may be removed (?)
      },
      () => {
        // Upload all
        this.props.uploadPhotos(this.state.data);
      }
    );
  };

  /**
   * Create album using photo IDs and Album info
   */
  saveAlbum = (info) => {
    // Asume name and description in info
    let formData = {
      ...info,
      pictures: [
        ...this.props.upload.newPhotosIds,
        ...this.state.cacheCreatedPhotoIds,
      ],
    };
    this.props.createAlbum(formData);
  };

  // Retry process starting from startUploading
  retryFailed = () => {
    // Create new array with ids from props
    var newData = {
      ...this.state.data,
      photos: this.state.data.photos.filter(
        (el, key) => this.props.upload.photosUploaded.indexOf(key) === -1
      ),
    };
    newData.length = newData.photos.length;
    // Save our already created photos Ids
    this.setState(
      {
        cacheCreatedPhotoIds: [
          ...this.state.cacheCreatedPhotoIds,
          ...this.props.upload.newPhotosIds,
        ],
      },
      this.startUploading(newData)
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
              searchMeta={this.props.recoverMetadata}
            />
            <UploadPhoto
              saveAll={this.startProcess}
              meta={this.props.meta}
              searchMeta={this.props.recoverMetadata}
            />
            <UploadProgress
              photosUploading={this.props.upload.photosUploading}
              opsFinished={this.props.upload.opsFinished}
              uploading={this.props.upload.uploading}
              completed={this.props.upload.photosUploaded.length}
              doAlbum={this.state.data.onAlbum}
              albumInfo={this.state.data} // TODO: remove data redundancy
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
              searchMeta={this.props.recoverMetadata}
            />
            <UploadPhoto
              saveAll={this.startProcess}
              meta={this.props.meta}
              doColumns={false}
              searchMeta={this.props.recoverMetadata}
            />
            <UploadProgress
              photosUploading={this.props.upload.photosUploading}
              opsFinished={this.props.upload.opsFinished}
              uploading={this.props.upload.uploading}
              completed={this.props.upload.photosUploaded.length}
              doAlbum={this.state.data.onAlbum}
              albumInfo={this.state.data}
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  upload: state.upload,
  album: state.albumcollection,
  meta: state.metadata.general_tags.results,
  metadataCreation: state.metadata,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      setRoute: site_misc.setCurrentRoute,
      sendAlert: site_misc.setAlert,
      uploadPhotos: gallery.photos.uploadImages,
      recoverMetadata: metadata.searchMetadataByValueGeneral,
      createAlbum: gallery.album.createAlbum,
      createMultipleMetas: metadata.createMultipleMetas,
    },
    dispatch
  );

// Example nav from https://github.com/jcmcneal/react-step-wizard/blob/master/app/components/nav.js
const Nav = (props) => {
  const dots = [];
  /* onClick={() => props.goToStep(i)}> */
  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i;
    dots.push(
      <span
        key={`step-${i}`}
        className={`upload-page-dot ${isActive ? "active" : ""}`}
      >
        &bull;
      </span>
    );
  }
  return <div className="upload-page-nav">{dots}</div>;
};

export default connect(mapStateToProps, mapActionsToProps)(UploadPage);
