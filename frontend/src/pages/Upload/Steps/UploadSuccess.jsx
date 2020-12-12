import React from "react";
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import "./uploadProgress.css";

const UploadSuccess = () => {
    return (
      <Container>
        <Row>
          <Col>
              <h2 className="page-title">
                  Fotos subidas con &eacute;xito
              </h2>
          </Col>
        </Row>
        <Row style={{ marginTop: "2em"}}>
          <Col md={{ size: 6, offset: 3}}>
            <h4>
                Tus fotos deber&aacute;n ser aprobadas 
                por nuestro equipo de curadores. 
                Cuando esto ocurra tus fotos 
                estar&aacute;n disponibles para la comunidad.
            </h4>
          </Col>
        </Row>
        <Row>
          <h2 className="page-title">Pasos a seguir</h2>
        </Row>
        <Row xs="3">
          <Col className="text-center">
          <img src="/assets/cropping-tool.svg" width="30%"/>
            <h3>Editar fotos</h3>
          </Col>
          <Col className="text-center">
            <img src="/assets/photo-album.svg" width="30%"/>
            <h3>Crear album</h3>
          </Col>
          <Col className="text-center">
          <img src="/assets/image-file.svg" width="30%"/>
          <h3>¡Subir más!</h3>
          </Col>
        </Row>    
      </Container>
    );
}

export default UploadSuccess; 