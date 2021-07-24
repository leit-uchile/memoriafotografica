import React from "react";
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./css/uploadProgress.css";

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
        <Row>
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
          <img src="/assets/cropping-tool.svg" width="30%" alt="next-action-edit"/>
            <h3>Editar fotos</h3>
          </Col>
          <Col className="text-center">
            <Link to="/user/dashboard/albums">
            <img src="/assets/photo-album.svg" width="30%" alt="next-action-album"/>
            <h3>Crear album</h3>
            </Link>
          </Col>
          <Col className="text-center">
          <img src="/assets/image-file.svg" width="30%" alt="next-action-upload"/>
          <h3>¡Subir más!</h3>
          </Col>
        </Row>    
      </Container>
    );
}

export default UploadSuccess; 