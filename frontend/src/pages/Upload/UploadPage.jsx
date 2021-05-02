import React, { Component, Fragment } from "react";

import UnregisteredPrompt from "./Steps/UnregisterPrompt";
import UploadUnregister from "./Steps/UploadUnregister";
import UploadAlbum from "./Steps/UploadAlbum";
import UploadPhoto from "./Steps/UploadPhotov3";
import { connect } from "react-redux";
import { metadata, gallery, site_misc } from "../../actions";
import { Helmet } from "react-helmet";
import StepWizard from "react-step-wizard";
import "./uploadPage.css";
import UploadSuccess from "./Steps/UploadSuccess";
import { bindActionCreators } from "redux";
import {
  selectUserIsAuthenticated,
  selectUpload,
  selectAlbumCollections,
  selectMetaDataGeneralTagsResult,
  selectMetaData,
} from "../../reducers";

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
      data: {
        date: "",
        tags: [],
        cc: "",
      }, // All info to upload
      uploading: false,
      prog: 0, // May delete this later
      cacheCreatedPhotoIds: [], // In case of upload error
      metadata: [], // Used during metadata creation
      newMetaCount: 0,
      token: null,
    };
    this.props.setRoute("/upload");
  }

  saveUserInfo = (info) => {
    this.setState({
      userInfo: { ...info },
    });
  };

  savePhotoInfo = (info) => {
    this.setState({ data: { ...this.state.data, ...info } });
  };

  saveToken = (value) => {
    this.setState({ token: value });
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
              cache={this.state.userInfo}
              saveToken={this.saveToken}
            />
            <UploadAlbum
              isAuth={this.props.isAuthenticated}
              saveAll={this.savePhotoInfo}
              meta={this.props.meta}
              sendAlert={this.props.sendAlert}
              searchMeta={this.props.recoverMetadata}
            />
            <UploadPhoto
              saveAll={this.startProcess}
              photoInfo={this.state.data}
              meta={this.props.meta}
              searchMeta={this.props.recoverMetadata}
              token={this.state.token}
            />

            <UploadSuccess />
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
              saveAll={this.savePhotoInfo}
              meta={this.props.meta}
              sendAlert={this.props.sendAlert}
              searchMeta={this.props.recoverMetadata}
            />
            <UploadPhoto
              saveAll={this.startProcess}
              photoInfo={this.state.data}
              meta={this.props.meta}
              searchMeta={this.props.recoverMetadata}
            />
            <UploadSuccess />
          </StepWizard>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: selectUserIsAuthenticated(state),
  upload: selectUpload(state),
  album: selectAlbumCollections(state),
  meta: selectMetaDataGeneralTagsResult(state),
  metadataCreation: selectMetaData(state),
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
