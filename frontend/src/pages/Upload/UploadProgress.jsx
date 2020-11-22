import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Progress,
  Alert,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
} from "reactstrap";
import { connect } from "react-redux";
import "./uploadProgress.css";
import PropTypes from "prop-types";
import {
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Upload progess
 *
 * Handles the display of Album creation, metadata creation and photo upload
 *
 * @param {Object} upload Redux upload state
 */
const UploadProgress = ({
  upload: {
    uploading,
    photosUploading,
    photosUploaded,
    newPhotosIds,
    opsFinished,
    error,
  },
  buttonLabel,
  callback,
  callback2
}) => {
  /**
   * 3 possible states.
   * - In progress: counts all operations (yes, the failed ones too)
   * - Failed: if some ops where unsuccesfull
   * - Completed: all is ok :)
   */

  const [modal, setModal] = useState(false);

  const toggle = () => {
    callback();
    setModal(!modal);
  };

  const untoggle = () => {
    callback2();
    setModal(!modal);
  }

  return (
    <Button color="primary" onClick={toggle}>{buttonLabel}
    <FontAwesomeIcon icon={faChevronCircleRight} />
    <Modal isOpen={modal} toggle={toggle}>
    <ModalHeader toggle={toggle}>Subir Fotograf&iacute;a</ModalHeader>
    <ModalBody>
    <Container>
      <Row>
        <Col>
          <h2 className="page-title">
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
      {!uploading ? (
        error.length > 0 ? (
          <Row>
            <Col>
              <Alert color="warning">
                Algunas fotografias no pudieron ser agregadas con exito. Por
                favor intenta subirlas de nuevo.
              </Alert>
            </Col>
          </Row>
        ) : null
      ) : null}
    </Container>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={untoggle}>Finalizar</Button>{' '}
      <Button color="secondary" onClick={toggle}>Volver</Button>
    </ModalFooter>
    </Modal>
  </Button>
  );
};

UploadProgress.propTypes = {
  upload: PropTypes.object.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  callback2: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  upload: state.upload,
});

export default connect(mapStateToProps, null)(UploadProgress);
