import React, { Fragment, useState } from "react";
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
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
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
    opsFinished,
    error,
  },
  buttonLabel,
  retry, // Retry
  goToNextStep, // go to next step
  edit, // edit failed photo details
}) => {
  /**
   * 3 possible states.
   * - In progress: counts all operations (yes, the failed ones too)
   * - Failed: if some ops where unsuccesfull
   * - Completed: all is ok :)
   */

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const close = () => {
    goToNextStep();
    setModal(!modal); // Close modal
  };

  return (
    <Button
      color="primary"
      onClick={() => {
        retry();
        toggle();
      }}
    >
      {buttonLabel}{' '}
      <FontAwesomeIcon icon={faChevronCircleRight} />
      <Modal isOpen={modal}>
        <ModalHeader >Subir Fotograf&iacute;a</ModalHeader>
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
                  <Progress
                    animated
                    value={(opsFinished * 100) / photosUploading}
                  />
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
                      Algunas fotografias no pudieron ser agregadas con exito.
                      Por favor intenta subirlas de nuevo.
                    </Alert>
                  </Col>
                </Row>
              ) : null
            ) : null}
          </Container>
        </ModalBody>
        <ModalFooter>
          {!uploading && error.length > 0 ? (
            <Fragment>
              <Button color="primary" onClick={() => retry()}>
                Reintentar
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  toggle();
                  edit();
                }}
              >
                Editar fotos fallidas
              </Button>
            </Fragment>
          ) : !uploading ? (
            <Button color="primary" onClick={close}>
              Finalizar
            </Button>
          ) : null}
        </ModalFooter>
      </Modal>
    </Button>
  );
};

UploadProgress.propTypes = {
  upload: PropTypes.object.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  retry: PropTypes.func.isRequired,
  goToNextStep: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  upload: state.upload,
});

export default connect(mapStateToProps, null)(UploadProgress);
