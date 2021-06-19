import React, { useState, useEffect, useCallback } from "react";

import UnregisteredPrompt from "./Steps/UnregisterPrompt";
import UploadUnregister from "./Steps/UploadUnregister";
import UploadAlbum from "./Steps/UploadAlbum";
import UploadPhoto from "./Steps/UploadPhotov3";
import { useSelector, useDispatch } from "react-redux";
import { metadata, site_misc } from "../../actions";
import { Helmet } from "react-helmet";
import StepWizard from "react-step-wizard";
import "./uploadPage.css";
import UploadSuccess from "./Steps/UploadSuccess";
import {
  selectUserIsAuthenticated,
  selectMetaDataGeneralTagsResult,
} from "../../reducers";

/**
 * Upload page
 *
 * Main component that handles subcomponent transitions, saves information
 * and uploads info to the server
 */
const UploadPage = () => {
  const [state, setState] = useState({
    userInfo: {}, // For anonymous upload
    data: {
      date: "",
      tags: [],
      cc: "",
    }, // All info to upload
    token: null,
  });

  const isAuthenticated = useSelector(selectUserIsAuthenticated);
  const meta = useSelector(selectMetaDataGeneralTagsResult);

  const dispatch = useDispatch();

  const sendAlert = useCallback((m,at,t) => dispatch(site_misc.setAlert(m,at,t)),[dispatch]);
  const recoverMetadata = useCallback((s,p,ps,e) =>
    dispatch(metadata.searchMetadataByValueGeneral(s,p,ps,e)),[dispatch]);

  useEffect(() => {
    dispatch(site_misc.setCurrentRoute("/upload"));
  }, []);

  const savePhotoInfo = (info) => {
    setState({ ...state, data: { ...state.data, ...info } });
  };

  const saveToken = (value) => {
    setState({ ...state, token: value });
  };

  return(
    <>
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
      {!isAuthenticated ? (
        <StepWizard
          className="stepContainer"
          onStepChange={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
          nav={<Nav />}
        >
          <UnregisteredPrompt />
          <UploadUnregister cache={state.userInfo} saveToken={saveToken} />
          <UploadAlbum
            isAuth={isAuthenticated}
            saveAll={savePhotoInfo}
            meta={meta}
            sendAlert={sendAlert}
            searchMeta={recoverMetadata}
          />
          <UploadPhoto
            photoInfo={state.data}
            meta={meta}
            searchMeta={recoverMetadata}
            token={state.token}
            sendAlert={sendAlert}
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
            isAuth={isAuthenticated}
            saveAll={savePhotoInfo}
            meta={meta}
            sendAlert={sendAlert}
            searchMeta={recoverMetadata}
          />
          <UploadPhoto
            photoInfo={state.data}
            meta={meta}
            searchMeta={recoverMetadata}
            sendAlert={sendAlert}
          />
          <UploadSuccess />
        </StepWizard>
      )}
    </>
  );
};

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

export default UploadPage;
