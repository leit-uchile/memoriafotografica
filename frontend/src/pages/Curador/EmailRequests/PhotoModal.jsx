import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";

const PhotoModal = (props) => {
  const { buttonLabel, className, request } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="link" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Información del solicitante</ModalHeader>
        <ModalBody>
          <Row style={{ marginBottom: "0.5em" }}>
            <Col>
              <p>Nombre completo</p>
            </Col>
            <Col>
              <p>
                {request.first_name} {request.last_name}
              </p>
            </Col>
          </Row>
          <Row style={{ marginBottom: "0.5em" }}>
            <Col>
              <p>Identificación</p>
            </Col>
            <Col>
              <p>{request.identity_document}</p>
            </Col>
          </Row>
          <Row style={{ marginBottom: "0.5em" }}>
            <Col>
              <p>Profesión</p>
            </Col>
            <Col>
              <p>{request.profession}</p>
            </Col>
          </Row>
          <Row style={{ marginBottom: "0.5em" }}>
            <Col>
              <p>Institución</p>
            </Col>
            <Col>
              <p>{request.institution}</p>
            </Col>
          </Row>
          <Row style={{ marginBottom: "0.5em" }}>
            <Col>
              <p>Dirección</p>
            </Col>
            <Col>
              <p>
                {request.address}, {request.comuna}
              </p>
            </Col>
          </Row>
          <Row style={{ marginBottom: "0.5em" }}>
            <Col>
              <p>Datos de contacto</p>
            </Col>
            <Col>
              <p>
                {request.phone_number}, {request.email}
              </p>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PhotoModal;
