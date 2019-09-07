import React from 'react';
import { Container, Button, Row, Col, Progress, Alert } from "reactstrap";

const UploadProgress = ({
  photosUploading,
  opsFinished,
  completed,
  uploading,
  retry
}) => (
  <Container
    style={{
      marginTop: "2em",
      padding: "2em"
    }}>
    <Row style={{padding: "inherit"}}>
      <Col>
        <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
          {uploading ? "Enviando aporte..." : "¡Operacion completada!"}
        </h2>
      </Col>
    </Row>
    <Row style={{padding: "inherit"}}>
      <Col>
        {uploading ? 
          <Progress animated value={(opsFinished * 100) / photosUploading} /> :
          <Progress value={100} color="success" />
        }
      </Col>
    </Row>
    {!uploading && completed !== opsFinished ? (
      <Row style={{padding: "inherit"}}>
        <Col>
          <Alert color="warning">
            Algunas fotografias no pudieron ser agregadas con exito. Por favor
            intenta subirlas de nuevo.
          </Alert>
          <Button color="primary" onClick={retry}> Reintentar</Button>
        </Col>
      </Row>
    ) : null}
    {!uploading ? (
      <Row style={{padding: "inherit"}}>
        <Col>
          <p
            style={{
              textAlign: "center",
              display: "block",
              margin: "auto 1em auto 1em"
            }}>
            La foto tendra que ser aprobada para que la comunidad la vea. Puedes
            ver el estado en que se encuentra accediendo a tu perfil. Muchas
            gracias!
          </p>
        </Col>
      </Row>
    ) : null}
  </Container>
);

export default UploadProgress;