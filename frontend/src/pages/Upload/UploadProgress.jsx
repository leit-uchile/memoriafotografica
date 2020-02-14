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

  useEffect(() => {
    if (doAlbum && photosUploading === completed) {
      saveAlbum(albumInfo);
    }
  }, [completed, doAlbum, saveAlbum]);

  useEffect(() => {
    if (doAlbum && albumState.sent && !albumState.success) {
      setRetryAlbum(true);
    }
  }, [albumState, doAlbum]);

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
              }}>
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
