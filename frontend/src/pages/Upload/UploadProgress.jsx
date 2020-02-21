import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Progress,
  Alert,
  ButtonGroup
} from "reactstrap";

/**
 * Upload progess
 *
 * Handles the display of Album creation, metadata creation and photo upload
 *
 * @param {Number} photosUploading total of photos to upload
 * @param {Number} opsFinished ops tried
 * @param {Number} completed photos uploaded successfully
 * @param {Boolean} uploading operation state
 * @param {Function} retry Try to upload failed pictures
 * @param {Function} previousStep
 * @param {Boolean} doAlbum create album?
 * @param {Object} albumInfo
 * @param {Object} albumState operation succeded?
 * @param {Function} saveAlbum create album and add picture IDs to it
 */
const UploadProgress = ({
  photosUploading,
  opsFinished,
  completed, // photosUploaded.length
  uploading,
  retry,
  previousStep,
  doAlbum,
  albumInfo,
  albumState,
  saveAlbum
}) => {
  // TODO: include button to create albums
  const [retryAlbum, setRetryAlbum] = useState(false);

  /**
   * When all photos have been uploaded create an album
   *
   * TODO: refactor this so that individual photos
   * can be asociated to an album
   */
  useEffect(() => {
    if (doAlbum && photosUploading === completed) {
      saveAlbum(albumInfo);
    }
  }, [completed, doAlbum, saveAlbum]);

  /**
   * Retry album creation on state change
   */
  useEffect(() => {
    if (doAlbum && albumState.sent && !albumState.success) {
      setRetryAlbum(true);
    }
  }, [albumState, doAlbum]);

  /**
   * 3 possible states.
   * - In progress: counts all operations (yes, the failed ones too)
   * - Failed: if some ops where unsuccesfull
   * - Completed: all is ok :)
   */
  return (
    <Container>
      <Row>
        <Col>
          <h2 className="upload-title">
            Subir Fotograf&iacute;a /
            {uploading ? "Enviando aporte..." : "¡Operación completada!"}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {uploading ? (
            <Progress animated value={(opsFinished * 100) / photosUploading} />
          ) : (
            <Progress value={100} color="success" />
          )}
        </Col>
      </Row>
      {!uploading && completed !== opsFinished ? (
        <Row>
          <Col>
            <Alert color="warning">
              Algunas fotografias no pudieron ser agregadas con exito. Por favor
              intenta subirlas de nuevo.
            </Alert>
            <ButtonGroup style={{ marginTop: "20px", width: "20em" }}>
              <Button onClick={previousStep}>Editar informaci&oacute;n</Button>
              <Button color="primary" onClick={retry}>
                {" "}
                Reintentar
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      ) : null}
      {!uploading ? (
        <Row>
          <Col>
            <p
              style={{
                textAlign: "center",
                display: "block",
                margin: "auto 1em auto 1em",
                padding: "2em"
              }}
            >
              Las fotos tendr&aacute;n que ser aprobadas para que la comunidad
              las vea. Puedes ver el estado en que se encuentra accediendo a tu
              perfil. Muchas gracias!
            </p>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
};

export default UploadProgress;
